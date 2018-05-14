import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Chat } from '../../api/models/chat.model';
import { ChatMembersListComponent } from './chat-members-list.component';
import { ChatService } from '../../providers/chat/chat.service';

import { AuthGuardService } from '../../providers/auth/auth-guard.service';

@Component({
  selector: 'chat-component',
  templateUrl: 'chat.component.html'
})
export class ChatComponent implements OnInit {
  chat: Chat;
  chatId: string;

  constructor(
    private authGuardService: AuthGuardService,
    public navController: NavController,
    public navParams: NavParams,
    private chatService: ChatService
  ) {
    this.chatId = navParams.get('chatId');
  }

  ngOnInit() {
    console.log('ChatsComponent#ngOnInit called');
    this.chatService.getChat(this.chatId)
      .subscribe(chat => this.chat = chat);
  }

  ionViewCanEnter(): boolean {
    return this.authGuardService.isLoggedIn();
  }

  goToChatMembers() {
    this.navController.push(ChatMembersListComponent, {chat: this.chat});
  }
}
