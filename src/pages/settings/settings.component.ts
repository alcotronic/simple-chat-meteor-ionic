import { Component, OnInit } from '@angular/core';
import { Meteor } from "meteor/meteor";
import { NavController } from 'ionic-angular';

import { AuthGuardService } from '../../providers/auth/auth-guard.service';
import { ProfileService } from '../../providers/profile/profile.service';
import { Profile } from '../../../api/models/profile.model';
import { SettingsAccountComponent } from './settings-account.component';
import { SettingsProfileComponent } from './settings-profile.component';
import { SettingsPasswordComponent } from './settings-password.component';

@Component({
  selector: 'settings-component',
  templateUrl: 'settings.component.html'
})
export class SettingsComponent implements OnInit {

  username: string = '';
  picture: string;

  constructor(
    private authGuardService: AuthGuardService,
    private profileService: ProfileService,
    private navController: NavController
  ) {
    console.log('SettingsComponent#constructor called');
  }

  ngOnInit() {
    console.log('SettingsComponent#ngOnInit called');
    this.username = Meteor.user().username || '';
    this.profileService.getCurrentUserProfile().subscribe((profile) => {
      if(profile) {
        this.picture = profile.pictureUrl;
      }
    });
  }

  ionViewCanEnter(): boolean {
    return this.authGuardService.isLoggedIn();
  }

  ionViewWillEnter() {
    this.username = Meteor.user().username || '';
    this.profileService.getCurrentUserProfile().subscribe((profile) => {
      if(profile) {
        this.picture = profile.pictureUrl;
      }
    });
  }

  goToEditAccount() {
    this.navController.push(SettingsAccountComponent);
  }

  goToEditProfile() {
    this.navController.push(SettingsProfileComponent);
  }

  goToEditPassword() {
    this.navController.push(SettingsPasswordComponent);
  }
}
