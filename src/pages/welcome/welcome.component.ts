import { Component, OnInit } from '@angular/core';

import { AuthGuardService } from '../../providers/auth/auth-guard.service';

@Component({
  selector: 'welcome-component',
  templateUrl: 'welcome.component.html'
})
export class WelcomeComponent implements OnInit {

  public signinOrSignup: string = 'signin';

  constructor(private authGuardService: AuthGuardService) {

  }

  ngOnInit() {
    console.log('WelcomeComponent#ngOnInit called');
    if(this.authGuardService.isLoggedIn()) {
      // this.router.navigate(['/chats']);
      // TODO: add ionic navigation
    }
  }

  ionViewCanEnter(): boolean {
    return this.authGuardService.isNotLoggedIn();
  }
}
