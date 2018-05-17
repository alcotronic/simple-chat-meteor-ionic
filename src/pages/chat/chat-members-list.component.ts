import { Component, OnInit } from '@angular/core';
import { Meteor } from "meteor/meteor";
import { MeteorObservable } from 'meteor-rxjs';
import { NavController, NavParams } from 'ionic-angular';

import { Observable } from 'rxjs/Observable';

import { ChatMembersAddComponent } from './chat-members-add.component';

import { Chat } from '../../../api/models/chat.model';
import { Chats } from '../../../api/collections/chats.collection';
import { Profile } from '../../../api/models/profile.model';
import { Profiles } from '../../../api/collections/profiles.collection';
import { AuthGuardService } from '../../providers/auth/auth-guard.service';
import { ChatService } from '../../providers/chat/chat.service';

@Component({
  selector: 'chat-members-list-component',
  templateUrl: 'chat-members-list.component.html'
})
export class ChatMembersListComponent implements OnInit {

  chat: Chat;
  chatId: string;
  private chatMembers: Observable<Profile[]>;

  constructor(
      private authGuardService: AuthGuardService,
      private chatService: ChatService,
      public navController: NavController,
      public navParams: NavParams) {
    console.log('ChatMembersListComponent#constructor called');
    this.chatId = navParams.get('chatId');
  }

  ngOnInit() {
    console.log('ChatMembersListComponent#ngOnInit called');
    this.chatService.getChat(this.chatId)
      .subscribe(chat => this.chat = chat);
  }

  ionViewCanEnter(): boolean {
    console.log('ChatMembersListComponent#ionViewCanEnter called');
    return this.authGuardService.isLoggedIn();
  }

  ionViewWillEnter() {
    console.log('ChatMembersListComponent#ionViewWillEnter called');
    this.chatService.getChat(this.chatId)
      .subscribe(chat => this.chat = chat);
    MeteorObservable.subscribe('chatMembers', this.chat._id).subscribe(()=> {
      MeteorObservable.autorun().subscribe(() => {
        this.chatMembers = this.findChatMembers();
      });
    });
  }

  findChatMembers(): Observable<Profile[]> {
    console.log('ChatMembersListComponent#findChatMembers called');
    const chat = Chats.findOne({_id: this.chat._id});
    if(chat) {
      return Profiles.find({userId: { $in : this.chat.memberIds}});
    } else {
      return null;
    }
  }

  openChatMembersAdd() {
    console.log('ChatMembersListComponent#openChatMembersAdd called');
    this.navController.push(ChatMembersAddComponent, {chatId: this.chatId});
  }

  isChatOwner(): boolean {
    if(this.chat.ownerId === Meteor.userId()) {
      return true;
    } else {
      return false;
    }
  }

}
