import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Observable } from 'rxjs/Observable';

import { Chat } from '../../api/models/chat.model';
import { ChatComponent } from '../chat/chat.component';
import { ChatService } from '../../providers/chat/chat.service';
import { AuthGuardService } from '../../providers/auth/auth-guard.service';

@Component({
  selector: 'chats-list-component',
  templateUrl: 'chats-list.component.html'
})
export class ChatsListComponent implements OnInit {

  private chats: Observable<Chat[]>;

  constructor(private authGuardService: AuthGuardService, private navController: NavController, private chatService: ChatService) {}

  ngOnInit() {
    console.log('ChatsListComponent#ngOnInit called');
    this.chats = this.chatService.getChats();
  }

  ionViewCanEnter(): boolean {
    return this.authGuardService.isLoggedIn();
  }

  goToChat(chat: Chat) {
    this.navController.push(ChatComponent, {chatId: chat._id});
  }
}
