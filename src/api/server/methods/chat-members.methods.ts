import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';

import { Chats } from '../../collections/chats.collection';
import { Chat } from '../../models/chat.model';

const nonEmptyString = Match.Where((str) => {
  check(str, String);
  return str.length > 0;
});

Meteor.methods({
  addChatMember(chatId: string, chatMemberIds: Array<string>): void {

    if (!this.userId) {
      throw new Meteor.Error('unauthorized',
        'User must be logged-in to create a new chat');
    }

    check(chatId, nonEmptyString);

    const chat = Chats.findOne({_id: chatId});

    if(!chat) {
      throw new Meteor.Error('chat-not-found',
        'chat not found');
    }

    if(!chatMemberIds || chatMemberIds.length === 0) {
      throw new Meteor.Error('chatMemberIds-empty',
        'chatMemberIds empty');
    }

    for(let userId of chatMemberIds) {
      let idFound: boolean = false
      for(let id of chat.memberIds) {
        if(id === userId) {
          idFound = true;
        }
      }
      if(!idFound) {
        chat.memberIds.push(userId);
      }
    }

    Chats.update({_id: chat._id}, {ownerId: chat.ownerId, memberIds: chat.memberIds, createdAt: chat.createdAt, title: chat.title});
  }
});
