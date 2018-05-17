import { Component, OnInit, Input } from '@angular/core';
import { Meteor } from "meteor/meteor";
import { MeteorObservable } from 'meteor-rxjs';

import { Observable } from 'rxjs/Observable';

import { Message } from '../../../api/models/message.model';
import { Messages } from '../../../api/collections/messages.collection';
import { Profiles } from '../../../api/collections/profiles.collection';
import { AuthGuardService } from '../../providers/auth/auth-guard.service';

@Component({
  selector: 'messages-list-component',
  templateUrl: 'messages-list.component.html'
})
export class MessagesListComponent implements OnInit {
  @Input() chatId: string;
  private messages: Observable<Message[]>;


  constructor(private authGuardService: AuthGuardService) {
    console.log('MessagesListComponent#constructor called');

  }

  ngOnInit() {
    console.log('MessagesListComponent#ngOnInit called');

    MeteorObservable.subscribe('messages', this.chatId).subscribe(()=> {
      MeteorObservable.autorun().subscribe(() => {
        this.messages = this.findMessages();
      });
    });

  }

  ionViewCanEnter(): boolean {
    return this.authGuardService.isLoggedIn();
  }

  findMessages(): Observable<Message[]> {
    return Messages.find({chatId: this.chatId}).map(messages => {
      messages.forEach(message => {
        message.senderName = '';
        message.senderPictureUrl = '';
        const profile = Profiles.findOne({userId: message.senderId});
        if(profile) {
          message.senderName = profile.name;
          message.senderPictureUrl = profile.pictureUrl;
        }
      });
      return messages;
    });
  }

  fromCurrentUser(message: Message): boolean {
    if(Meteor.userId() === message.senderId) {
      return true;
    } else {
      return false;
    }
  }

}
