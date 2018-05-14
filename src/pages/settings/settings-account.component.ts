import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Meteor } from "meteor/meteor";
import { NavController } from 'ionic-angular';

import { AccountService } from '../../providers/account/account.service';
import { AlertService } from '../../providers/alert/alert.service';
import { AuthGuardService } from '../../providers/auth/auth-guard.service';
import { ToastService } from '../../providers/toast/toast.service';

@Component({
  selector: 'settings-account-component',
  templateUrl: 'settings-account.component.html'
})
export class SettingsAccountComponent implements OnInit {

  email: string = '';
  newEmailForm: FormGroup;

  constructor(private accountService: AccountService,
      private alertService: AlertService,
      private authGuardService: AuthGuardService,
      public navController: NavController,
      private toastService: ToastService) {
    console.log('SettingsComponent#constructor called');
  }

  ngOnInit() {
    console.log('SettingsComponent#ngOnInit called');
    this.email = Meteor.user().emails[0].address || '';
    this.newEmailForm = new FormGroup({
      'email': new FormControl(this.email, [Validators.required])
    });
  }

  ionViewCanEnter(): boolean {
    return this.authGuardService.isLoggedIn();
  }

  changeEmail() {
    if(this.newEmailForm.valid) {
      this.accountService.changeEmail(this.newEmailForm.get('email').value).then(() => {
        console.log('email changed');
        this.toastService.showToast('Email changed.');
        this.navController.pop();
      }).catch((error: Error) => {
        console.log('email not changed');
        console.log(error.message);
        this.alertService.showWithTitleOnly('Please enter correct email address.');
      });
    }
  }
}
