import { Component, ViewChild } from '@angular/core';
import { MenuController, Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { ChatsComponent } from '../pages/chats/chats.component';
import { SettingsComponent } from '../pages/settings/settings.component';
import { WelcomeComponent }     from '../pages/welcome/welcome.component';
import { AuthGuardService } from '../providers/auth/auth-guard.service';
import { AuthenticationService } from '../providers/auth/authentication.service';

@Component({
  selector: 'app-comonent',
  templateUrl: 'app.component.html'
})
export class AppComponennt {
  @ViewChild(Nav) nav: Nav;
  rootPage:any;
  menucontent: any;

  constructor(private authGuardService: AuthGuardService, private authenticationService: AuthenticationService, platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public menu: MenuController) {

    if(authGuardService.isLoggedIn()) {
      this.rootPage = ChatsComponent;
      menu.enable(true);
    } else {
      this.rootPage = WelcomeComponent;
      menu.enable(false);
    }

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      if(platform.is('cordova')) {
        statusBar.styleDefault();
        splashScreen.hide();
      }
    });
  }

  goToChats() {
    this.rootPage = ChatsComponent;
    this.menu.close();
  }

  goToSettings() {
    this.rootPage = SettingsComponent;
    this.menu.close();
  }

  logout() {
    this.menu.close();
    this.authenticationService.logout().then((error) => {
      if(!error) {
        this.rootPage = WelcomeComponent;
      }
    });
  }
}
