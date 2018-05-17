import { Meteor } from 'meteor/meteor';
import { publishComposite } from 'meteor/reywood:publish-composite';

import { check, Match } from 'meteor/check';

import { Chat } from '../../models/chat.model';
import { Chats } from '../../collections/chats.collection';
import { Profile } from '../../models/profile.model';
import { Profiles } from '../../collections/profiles.collection';
import { Message } from '../../models/message.model';
import { Messages } from '../../collections/messages.collection';

const nonEmptyString = Match.Where((str) => {
  check(str, String);
  return str.length > 0;
});

publishComposite('messages', function(chatId: string): PublishCompositeConfig<Message> {
  if (!this.userId || !chatId) {
    return;
  }

  check(chatId, nonEmptyString);

  const chat = Chats.findOne({_id: chatId, memberIds: this.userId});

  if(!chat) {
    return;
  }

  return {
    find: () => {
      return Messages.collection.find({chatId: chatId}, {sort: {createdAt: 1}});
    },
    children: [
      <PublishCompositeConfig1<Message, Profile>> {
        find: (message: Message) => {
          return Profiles.collection.find({userId: message.senderId}, { limit: 1 });
        }
      }
    ]
  };
});
