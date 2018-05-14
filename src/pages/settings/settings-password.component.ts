import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController } from 'ionic-angular';

import { AccountService } from '../../providers/account/account.service';
import { AlertService } from '../../providers/alert/alert.service';
import { AuthGuardService } from '../../providers/auth/auth-guard.service';
import { ToastService } from '../../providers/toast/toast.service';

@Component({
  selector: 'settings-password-component',
  templateUrl: 'settings-password.component.html'
})
export class SettingsPasswordComponent implements OnInit {

  newPasswordForm: FormGroup;

  constructor(private accountService: AccountService,
      private alertService: AlertService,
      private authGuardService: AuthGuardService,
      public navController: NavController,
      private toastService: ToastService) {
    console.log('SettingsComponent#constructor called');
  }

  ngOnInit() {
    console.log('SettingsComponent#ngOnInit called');
    this.newPasswordForm = new FormGroup({
      'password': new FormControl('', [Validators.required]),
      'newPassword': new FormControl('', [Validators.required])
    });
  }

  ionViewCanEnter(): boolean {
    return this.authGuardService.isLoggedIn();
  }

  changePassword() {
    this.accountService.changePassword(this.newPasswordForm.get('password').value, this.newPasswordForm.get('newPassword').value).then(() => {
      console.log('password changed');
      this.toastService.showToast('Password changed.');
      this.navController.pop();
    }).catch((error: Error) => {
      console.log('password not changed');
      console.log(error.message);
      this.alertService.showWithTitleOnly('Please enter correct password.');
    });
  }
}
