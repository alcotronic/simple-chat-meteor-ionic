import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MenuController, NavController } from 'ionic-angular';


import { ChatsComponent } from '../chats/chats.component';
import { ToastService } from '../../providers/toast/toast.service';
import { AuthGuardService } from '../../providers/auth/auth-guard.service';
import { AuthenticationService } from '../../providers/auth/authentication.service';

@Component({
  selector: 'signin-component',
  templateUrl: 'signin.component.html'
})
export class SigninComponent implements OnInit {

  signinForm: FormGroup;

  signinData = {email: '', password: ''}

  constructor(
    private toastService: ToastService,
    private authGuardService: AuthGuardService,
    private authenticationService: AuthenticationService,
    public menu: MenuController,
    public navController: NavController
  ) {}

  ngOnInit() {
    console.log('SigninComponent#ngOnInit called');
    this.signinForm = new FormGroup({
      'email': new FormControl(this.signinData.email, [Validators.required]),
      'password':  new FormControl(this.signinData.password, [Validators.required])
    });
  }

  ionViewCanEnter(): boolean {
    return this.authGuardService.isNotLoggedIn();
  }

  signin() {
    if(this.signinForm.valid) {
      this.authenticationService.login(
        this.signinForm.get('email').value,
        this.signinForm.get('password').value
      ).then(() => {
        this.navController.setRoot(ChatsComponent);
        this.menu.enable(true);
      }).catch((error: Error) => {
        console.log(error.message);
      });
    } else if(this.signinForm.get('email').invalid && this.signinForm.get('password').valid) {
      this.toastService.showToast('Email required!');
    } else if(this.signinForm.get('email').valid && this.signinForm.get('password').invalid) {
      this.toastService.showToast('Password required!');
    } else {
      this.toastService.showToast('Email and password required!');
    }
  }
}
