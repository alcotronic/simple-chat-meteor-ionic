import { Meteor } from 'meteor/meteor';
import { ObservableCursor } from 'meteor-rxjs';

import { Profile } from '../../models/profile.model';
import { Profiles } from '../../collections/profiles.collection';

Meteor.publish('profile', function(profileId: string): ObservableCursor<Profile> {
  if (!this.userId || !profileId) {
    return;
  }
  return Profiles.find({ _id: profileId });
});

Meteor.publish('profileCurrentUser', function(): ObservableCursor<Profile> {
  if (!this.userId) {
    return;
  }
  return Profiles.find({ userId: this.userId });
});

Meteor.publish('profiles', function(): ObservableCursor<Profile> {
  if (!this.userId) {
    return;
  }
  return Profiles.find({ });
});

Meteor.publish('profilesSearch', function(searchTerm: string): ObservableCursor<Profile> {
  if (!this.userId) {
    return;
  }
  return Profiles.find({name: searchTerm});
});
