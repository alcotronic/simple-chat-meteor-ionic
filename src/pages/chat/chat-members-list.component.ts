import { Component, OnInit, Input } from '@angular/core';
import { Meteor } from "meteor/meteor";
import { MeteorObservable } from 'meteor-rxjs';
import { NavController, NavParams } from 'ionic-angular';

import { Observable } from 'rxjs/Observable';

import { ChatMembersAddComponent } from './chat-members-add.component';

import { Chat } from '../../api/models/chat.model';
import { Chats } from '../../api/collections/chats.collection';
import { Profile } from '../../api/models/profile.model';
import { Profiles } from '../../api/collections/profiles.collection';

import { AuthGuardService } from '../../providers/auth/auth-guard.service';

@Component({
  selector: 'chat-members-list-component',
  templateUrl: 'chat-members-list.component.html'
})
export class ChatMembersListComponent implements OnInit {

  chat: Chat;
  private chatMembers: Observable<Profile[]>;

  constructor(
      private authGuardService: AuthGuardService,
      public navController: NavController,
      public navParams: NavParams) {
    console.log('ChatMembersListComponent#constructor called');
    this.chat = navParams.get('chat');
  }

  ngOnInit() {
    console.log('ChatMembersListComponent#ngOnInit called');
    MeteorObservable.subscribe('chatMembers', this.chat._id).subscribe(()=> {
      MeteorObservable.autorun().subscribe(() => {
        this.chatMembers = this.findChatMembers();
      });
    });
  }

  ionViewCanEnter(): boolean {
    return this.authGuardService.isLoggedIn();
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
    this.navController.push(ChatMembersAddComponent, {chat: this.chat});
  }

  isChatOwner(): boolean {
    if(this.chat.ownerId === Meteor.userId()) {
      return true;
    } else {
      return false;
    }
  }
}
