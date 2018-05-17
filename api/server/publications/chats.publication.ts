import { Meteor } from 'meteor/meteor';
import { ObservableCursor } from 'meteor-rxjs';

import { Chat } from '../../models/chat.model';
import { Chats } from '../../collections/chats.collection';

Meteor.publish('chats', function(): ObservableCursor<Chat> {
  if (!this.userId) {
    return;
  }
  return Chats.find({ memberIds: this.userId });
});
