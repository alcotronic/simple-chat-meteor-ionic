import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { check, Match } from 'meteor/check';

import { Registration } from '../../models/registration.model';
import { Profile } from '../../models/profile.model';
import { Profiles } from '../../collections/profiles.collection';
import { DEFAULT_AVATAR_URL } from '../../models/avatar.model';

const nonEmptyString = Match.Where((str) => {
  check(str, String);
  return str.length > 0;
});

const emailString = Match.Where((str) => {
  check(str, String);
  check(str, nonEmptyString);

  var EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if(EMAIL_REGEXP.test(str)) {
      return true;
  } else {
      return false;
  }
});

Meteor.methods({
  createAccount(registration: Registration) {
    check(registration.username, nonEmptyString);
    check(registration.password, nonEmptyString);
    check(registration.email, emailString);

    if(!!this.userId) {
      return;
    }

    let account = Accounts.findUserByEmail(registration.email);
    
    if(!!account) {
      return;
    }

    let accountId: string = Accounts.createUser({username: registration.username, email: registration.email, password: registration.password});
    Profiles.insert({userId: accountId, name: registration.username, pictureUrl: DEFAULT_AVATAR_URL});
  }
});

Meteor.methods({
  changeUsername(username: string) {
    check(username, nonEmptyString);

    if(!this.userId) {
      throw new Meteor.Error('unauthorized',
        'User must be logged-in to change email.');
    }

    Accounts.setUsername(this.userId, username);
    let profile = Profiles.findOne({userId: this.userId});
    profile.name = username;
    Profiles.update({_id: profile._id}, profile);
  }
});

Meteor.methods({
  changeEmail(email: string) {
    check(email, emailString);

    if (!this.userId) {
      throw new Meteor.Error('unauthorized',
        'User must be logged-in to change email.');
    }

    let account : any = Accounts.findUserByEmail(email);

    if(account) {
      if(account._id === this.userId) {
        return;
      } else {
        throw new Meteor.Error('unauthorized',
          'unauthorized');
      }
    }


    let user = Meteor.users.findOne({_id: this.userId});
    user.emails = [{ address: email, verified: false}];

    Meteor.users.update({_id: this.userId}, user);

  }
});
