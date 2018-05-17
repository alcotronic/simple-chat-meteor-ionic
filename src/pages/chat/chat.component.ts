import { Component, OnInit } from '@angular/core';
import { ActionSheetController, NavController, NavParams, } from 'ionic-angular';

import { Chat } from '../../../api/models/chat.model';
import { ChatMembersListComponent } from './chat-members-list.component';
import { AuthGuardService } from '../../providers/auth/auth-guard.service';
import { ChatService } from '../../providers/chat/chat.service';

@Component({
  selector: 'chat-component',
  templateUrl: 'chat.component.html'
})
export class ChatComponent implements OnInit {
  chat: Chat;
  chatId: string;

  constructor(
    private authGuardService: AuthGuardService,
    private chatService: ChatService,
    public navController: NavController,
    public navParams: NavParams,
    public actionSheetController: ActionSheetController

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

  ionViewWillEnter() {
    this.chatService.getChat(this.chatId)
      .subscribe(chat => this.chat = chat);
  }

  openChatMenu() {
    let chatMenu = this.actionSheetController.create({
      title: 'Chat settings',
      cssClass: 'alert-signin',
      buttons: [{
        text: 'Rename chat',
        handler: () => {
          console.log('Rename chat clicked');
        }
      },{
        text: 'Delete chat',
        handler: () => {
          console.log('Delete chat clicked');
        }
      },{
        text: 'Cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    chatMenu.present();
  }

  goToChatMembers() {
    this.navController.push(ChatMembersListComponent, {chatId: this.chatId});
  }
}
