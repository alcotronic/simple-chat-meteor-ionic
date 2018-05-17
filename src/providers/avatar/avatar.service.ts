import { Injectable } from '@angular/core';
import { UploadFS } from 'meteor/jalik:ufs';
import { Platform } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

@Injectable()
export class AvatarService {

  constructor(private platform: Platform,
    private camera: Camera) {
    console.log('AvatarService#constructor called');
  }

  getPicture(cameraSelected: boolean): Promise<File> {
    console.log('AvatarService#getPicture called');
    if(!this.platform.is('cordova')) {
      return new Promise((resolve, reject) => {
        try {
          UploadFS.selectFile((file: File) => {
            resolve(file);
          });
        } catch(error) {
          reject(error);
        }
      });
    } else {
      return this.camera.getPicture(<CameraOptions>{
        destinationType: this.camera.DestinationType.DATA_URL,
        quality: 50,
        targetHeight: 400,
        targetWidth: 400,
        correctOrientation: true,
        saveToPhotoAlbum: false,
        sourceType: cameraSelected ? this.camera.PictureSourceType.CAMERA : this.camera.PictureSourceType.PHOTOLIBRARY,
        encodingType: this.camera.EncodingType.PNG
      }).then((dataURI) => {
        return this.convertToFile(dataURI);
      });
    }
  }

  upload(file: File): Promise<any> {
    console.log('AvatarService#upload called');
    return new Promise((resolve, reject) => {
      let avatar = {
        name: "avatar.png",
        size: file.size,
        type: file.type,
      }
      const upload = new UploadFS.Uploader({
        data: file,
        file: avatar,
        store: 'avatars',
        onComplete: resolve,
        onError: reject
      });
      upload.start();
    });
  }

  convertToFile(dataURI): Promise<any> {
    console.log('AvatarService#convertToFile called');
    return new Promise((resolve, reject) => {
      try {
        let binary = atob(dataURI);
        let charCodes = Object.keys(binary)
           .map<number>(Number)
           .map<number>(binary.charCodeAt.bind(binary));
        let blob: Blob = new Blob([new Uint8Array(charCodes)], {type: 'image/png'});
        resolve(blob);
      } catch(error) {
        reject(error);
      }
    });
  }
}
