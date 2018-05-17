import { Meteor } from 'meteor/meteor';
import { ObservableCursor } from 'meteor-rxjs';

import { Chat } from '../../models/chat.model';
import { Chats } from '../../collections/chats.collection';
import { Profile } from '../../models/profile.model';
import { Profiles } from '../../collections/profiles.collection';

Meteor.publish('chatMembers', function(chatId: string): ObservableCursor<Profile> {
  console.log('method#chatMembers called');
  if (!this.userId || !chatId) {
    return;
  }

  const chat: Chat = Chats.findOne({ _id: chatId, memberIds: this.userId });

  if(!chat) {
    console.log('method#chatMembers chat not found');
    return;
  } else {
    console.log('method#chatMembers chat found');
  }

  console.log('method#chatMembers'+Profiles.collection.find({userId: { $in: chat.memberIds}}).count()+' chatMembers found');
  return Profiles.find({userId: { $in: chat.memberIds}});
});

Meteor.publish('chatMembersNew', function(chatId: string): ObservableCursor<Profile> {
  console.log('method#chatMembers called');
  if (!this.userId || !chatId) {
    return;
  }

  const chat: Chat = Chats.findOne({ _id: chatId, memberIds: this.userId });

  if(!chat) {
    console.log('method#chatMembers chat not found');
    return;
  } else {
    console.log('method#chatMembers chat found');
  }

  console.log('method#chatMembers'+Profiles.collection.find({userId: { $in: chat.memberIds}}).count()+' chatMembers found');
  return Profiles.find({userId: { $nin: chat.memberIds}});
});
