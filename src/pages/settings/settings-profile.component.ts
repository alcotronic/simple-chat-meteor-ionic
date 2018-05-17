import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Meteor } from "meteor/meteor";
import { ActionSheetController, NavController, Platform } from 'ionic-angular';

import { AccountService } from '../../providers/account/account.service';
import { AlertService } from '../../providers/alert/alert.service';
import { AuthGuardService } from '../../providers/auth/auth-guard.service';
import { AvatarService } from '../../providers/avatar/avatar.service';
import { ProfileService } from '../../providers/profile/profile.service';
import { Profile } from '../../../api/models/profile.model';
import { ToastService } from '../../providers/toast/toast.service';

@Component({
  selector: 'settings-profile-component',
  templateUrl: 'settings-profile.component.html'
})
export class SettingsProfileComponent implements OnInit {

  picture: string;
  usernameForm: FormGroup;

  constructor(private accountService: AccountService,
      private alertService: AlertService,
      private authGuardService: AuthGuardService,
      private avatarService: AvatarService,
      private profileService: ProfileService,
      private toastService: ToastService,
      private  actionSheetController: ActionSheetController,
      private navController: NavController,
      private platform: Platform) {
    console.log('SettingsProfileComponent#constructor called');
  }

  ngOnInit() {
    console.log('SettingsProfileComponent#ngOnInit called');
    this.usernameForm = new FormGroup({
      'username': new FormControl(Meteor.user().username || '', [Validators.required])
    });

  }

  ionViewCanEnter(): boolean {
    return this.authGuardService.isLoggedIn();
  }

  ionViewWillEnter() {
    this.profileService.getCurrentUserProfile().subscribe((profile) => {
      if(profile) {
        this.picture = profile.pictureUrl;
      }
    });
  }

  changeUsername() {
    if(this.usernameForm.valid) {
      this.accountService.changeUsername(this.usernameForm.get('username').value).then(() => {
        console.log('username changed');
        this.toastService.showToast('Username changed.');
        this.navController.pop();
      }).catch((error: Error) => {
        console.log('username not changed');
        console.log(error.message);
        this.alertService.showWithTitleOnly('Please enter correct username.');
      });
    }
  }

  selectAvatar() {

    try {
      if(!this.platform.is('cordova')) {
        this.getAvatar(false);
      } else {
        let selectSourceMenu = this.actionSheetController.create({
          title: 'Select source',
          cssClass: 'alert-signin',
          buttons: [{
            text: 'Camera',
            handler: () => {
              console.log('Camera clicked');
              this.getAvatar(true);
            }
          },{
            text: 'Galery',
            handler: () => {
              console.log('Galery clicked');
              this.getAvatar(false);
            }
          },{
            text: 'Cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          }]
        });
        selectSourceMenu.present();
      }
    } catch(error) {
      console.log(error.message)
    }
  }

  getAvatar(camera: boolean) {
    this.avatarService.getPicture(camera).then((file: File) => {
      this.uploadAvatar(file);
    }).catch((error: Error) => {
      console.log(error.message);
    });
  }

  uploadAvatar(file: File) {
    this.avatarService.upload(file).then((picture) => {
      this.picture = picture.url;
    }).catch((error: Error) => {
      console.log(error.message);
    });
  }
}
