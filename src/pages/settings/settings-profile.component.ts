import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Meteor } from "meteor/meteor";
import { NavController } from 'ionic-angular';

import { AccountService } from '../../providers/account/account.service';
import { AlertService } from '../../providers/alert/alert.service';
import { AuthGuardService } from '../../providers/auth/auth-guard.service';
import { ToastService } from '../../providers/toast/toast.service';

@Component({
  selector: 'settings-profile-component',
  templateUrl: 'settings-profile.component.html'
})
export class SettingsProfileComponent implements OnInit {

  usernameForm: FormGroup;

  constructor(private accountService: AccountService,
      private alertService: AlertService,
      private authGuardService: AuthGuardService,
      public navController: NavController,
      private toastService: ToastService) {
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
}
