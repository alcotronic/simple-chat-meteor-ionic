import { Component, OnInit } from '@angular/core';
import { Meteor } from "meteor/meteor";
import { MeteorObservable } from 'meteor-rxjs';

import { AuthGuardService } from '../../providers/auth/auth-guard.service';
import { AuthenticationService } from '../../providers/auth/authentication.service';

@Component({
  selector: 'profile-component',
  templateUrl: 'profile.component.html'
})
export class ProfileComponent implements OnInit {

  username: string = '';
  email: string = '';
  picture: string;
  edit: boolean = false;

  constructor(private authGuardService: AuthGuardService, private authenticationService: AuthenticationService) {
    console.log('ProfileComponent#constructor called');
  }

  ngOnInit() {
    console.log('ProfileComponent#ngOnInit called');
    this.username = Meteor.user().username || '';
    this.email = Meteor.user().emails[0].address || '';
  }

  ionViewCanEnter(): boolean {
    return this.authGuardService.isLoggedIn();
  }

  editProfile() {
    this.edit = true;
  }

  cancle() {
    this.edit = false;
  }

  saveProfile() {
    this.edit = false;
  }
}
