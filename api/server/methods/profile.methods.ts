import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { check, Match } from 'meteor/check';

import { Registration } from '../../models/registration.model';
import { Profile } from '../../models/profile.model';
import { Profiles } from '../../collections/profiles.collection';

const nonEmptyString = Match.Where((str) => {
  check(str, String);
  return str.length > 0;
});

Meteor.methods({
  updateProfile(profile: Profile) {
    check(profile.name, nonEmptyString);

    Profiles.update({userId: this.userId}, {name: profile.name});
  }
});
