import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { NewChatComponent } from '../chat/new-chat.component';
import { AuthGuardService } from '../../providers/auth/auth-guard.service';

@Component({
  selector: 'chats-component',
  templateUrl: 'chats.component.html'
})
export class ChatsComponent implements OnInit {

  constructor(private authGuardService: AuthGuardService, public navController: NavController) {}

  ngOnInit() {
    console.log('ChatsComponent#ngOnInit called');
  }

  ionViewCanEnter(): boolean {
    return this.authGuardService.isLoggedIn();
  }

  goToNewChat() {
    this.navController.push(NewChatComponent);
  }

}
