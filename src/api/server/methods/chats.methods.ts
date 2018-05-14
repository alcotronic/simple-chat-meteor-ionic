import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';

import { Observable } from 'rxjs/Observable';

import { Chats } from '../../collections/chats.collection';
import { Chat } from '../../models/chat.model';

const nonEmptyString = Match.Where((str) => {
  check(str, String);
  return str.length > 0;
});

Meteor.methods({
  addChat(chat: Chat): Observable<string> {

    if (!this.userId) {
      throw new Meteor.Error('unauthorized',
        'User must be logged-in to create a new chat');
    }

    check(chat.title, nonEmptyString);

    let memberIds: string[];
    if(chat.memberIds) {
      memberIds = chat.memberIds;
      memberIds.push(this.userId);
    } else {
      memberIds = [this.userId];
    }

    let now: number = new Date().getTime();
    console.log(now);

    let chatId = Chats.insert({
      ownerId: this.userId,
      memberIds: memberIds,
      title: chat.title,
      createdAt: now
    });

    if(chatId) {
      return chatId;
    } else {
      throw new Meteor.Error('chat-not-created',
        'Error appeared while chat creation.');
    }
  }
});
