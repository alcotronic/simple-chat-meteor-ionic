import { Component, OnInit } from '@angular/core';
import { Meteor } from "meteor/meteor";
import { MeteorObservable } from 'meteor-rxjs';
import { NavController, NavParams } from 'ionic-angular';

import { Observable } from 'rxjs/Observable';

import { Chat } from '../../../api/models/chat.model';
import { Profile } from '../../../api/models/profile.model';
import { Profiles } from '../../../api/collections/profiles.collection';
import { AuthGuardService } from '../../providers/auth/auth-guard.service';
import { ChatService } from '../../providers/chat/chat.service';

@Component({
  selector: 'chat-members-add-component',
  templateUrl: 'chat-members-add.component.html'
})
export class ChatMembersAddComponent implements OnInit {

  private chat: Chat;
  chatId: string;
  private users: Observable<Profile[]>;
  private selectedUserIds: Array<string> = [];

  constructor(private authGuardService: AuthGuardService,
      private chatService: ChatService,
      public navController: NavController,
      public navParams: NavParams) {
    console.log('ChatMembersAddComponent#constructor called');
    this.chatId = navParams.get('chatId');
  }

  ngOnInit() {
    console.log('ChatMembersAddComponent#ngOnInit called');
    this.chatService.getChat(this.chatId)
      .subscribe(chat => this.chat = chat);
  }

  ionViewCanEnter(): boolean {
    return this.authGuardService.isLoggedIn();
  }

  ionViewWillEnter() {
    this.chatService.getChat(this.chatId)
      .subscribe(chat => this.chat = chat);
    MeteorObservable.subscribe('chatMembersNew', this.chat._id).subscribe(()=> {
      MeteorObservable.autorun().subscribe(() => {
        this.users = this.findChatMembersNew();
      });
    });
  }

  findChatMembersNew(): Observable<Profile[]> {
    console.log('ChatMembersAddComponent#findUsers called');
    return Profiles.find({userId: { $nin : this.chat.memberIds}}).map(profiles => {
      profiles.forEach(profile => {
        profile.selected = false;
      });
      return profiles;
    });
  }

  toggleSelectUser(user: Profile) {
    console.log('ChatMembersAddComponent#toggleSelectUser called');
    if(user.selected === true) {
      user.selected = false;
      this.removeId(user.userId);
    } else {
      user.selected = true;
      this.addId(user.userId);
    }
    console.log('ChatMembersAddComponent#toggleSelectUser result - selected: '+user.selected);
  }

  addId(userId: string) {
    let idFound: boolean = false
    for(let id of this.selectedUserIds) {
      if(id === userId) {
        idFound = true;
      }
    }
    if(!idFound) {
      this.selectedUserIds.push(userId);
    }
  }

  removeId(userId: string) {
    let tempIds: Array<string> = [];
    for(let id of this.selectedUserIds) {
      if(id !== userId) {
        tempIds.push(id);
      }
    }
    this.selectedUserIds = tempIds;
  }

  addUsers() {
    console.log('ChatMembersAddComponent#addUsers called');
    console.log('ChatMembersAddComponent#addUsers selected: '+this.selectedUserIds.length);
    Meteor.call('addChatMember', this.chat._id, this.selectedUserIds, function(error) {
      if(error) {
        console.log(error.message);
      } else {
        console.log('ChatMembersAddComponent#addUsers success');
      }
    });
    this.navController.pop();
  }
}
