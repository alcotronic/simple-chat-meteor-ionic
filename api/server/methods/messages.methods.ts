import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';

import { Chats } from '../../collections/chats.collection';
import { Chat } from '../../models/chat.model';
import { Messages } from '../../collections/messages.collection';
import { Message } from '../../models/message.model';

const nonEmptyString = Match.Where((str) => {
  check(str, String);
  return str.length > 0;
});

Meteor.methods({
  addMessage(message: Message) {

    if (!this.userId) {
      throw new Meteor.Error('unauthorized',
        'User must be logged-in to create a new message');
    }

    check(message.chatId, nonEmptyString);
    check(message.text, nonEmptyString);

    let chat = Chats.findOne({_id: message.chatId});

    if(!chat) {
      throw new Meteor.Error('unauthorized',
        'User must be member of the chat to create a new message');
    }

    let now: number = new Date().getTime();
    console.log(now);

    Messages.insert({
      senderId: this.userId,
      chatId: message.chatId,
      text: message.text,
      createdAt: now
    });
  }
});
