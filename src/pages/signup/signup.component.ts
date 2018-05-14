import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MenuController, NavController } from 'ionic-angular';

import { ChatsComponent } from '../chats/chats.component';
import { AuthGuardService } from '../../providers/auth/auth-guard.service';
import { AuthenticationService } from '../../providers/auth/authentication.service';

@Component({
  selector: 'signup-component',
  templateUrl: 'signup.component.html'
})
export class SignupComponent implements OnInit {

  public signupForm: FormGroup;

  signupData = {username: '', email: '', password: ''}

  constructor(
    private authGuardService: AuthGuardService,
    private authenticationService: AuthenticationService,
    public menu: MenuController,
    public navController: NavController
  ) {}

  ngOnInit() {
    console.log('SignupComponent#ngOnInit called');
    this.signupForm = new FormGroup({
      'username': new FormControl(this.signupData.username, [Validators.required]),
      'email': new FormControl(this.signupData.email, [Validators.required]),
      'password':  new FormControl(this.signupData.password, [Validators.required])
    });
  }

  ionViewCanEnter(): boolean {
    return this.authGuardService.isNotLoggedIn();
  }

  signup() {
    if(this.signupForm.valid) {
      this.authenticationService.register(
        this.signupForm.get('username').value,
        this.signupForm.get('email').value,
        this.signupForm.get('password').value
      ).then(() => {
        this.authenticationService.login(
          this.signupForm.get('email').value,
          this.signupForm.get('password').value
        ).then(() => {
          this.navController.setRoot(ChatsComponent);
          this.menu.enable(true);
        }).catch((error: Error) => {
          console.log(error.message);
        });
      }).catch((error: Error) => {
          console.log(error.message);
      });

    }
  }

}
