import { MongoObservable } from 'meteor-rxjs';
import { Meteor } from 'meteor/meteor';


import { Avatar } from '../models/avatar.model';

export const Avatars = new MongoObservable.Collection<Avatar>('avatars');

Avatars.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; }
});
