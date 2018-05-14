import { Injectable } from '@angular/core';
import { MeteorObservable, ObservableCursor } from 'meteor-rxjs';
import { Platform } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

import { Avatar } from '../../api/models/avatar.model';
import { Avatars } from '../../api/collections/avatars.collection';

@Injectable()
export class AvatarService {

  constructor() {
    console.log('AvatarService#constructor called');

  }

  getPicture() {
    console.log('AvatarService#getAvatar called');

  }

  upload() {
    console.log('AvatarService#upload called');
  }

}
