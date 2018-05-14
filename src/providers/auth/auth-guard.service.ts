import { Injectable }     from '@angular/core';
import { Meteor } from 'meteor/meteor';

@Injectable()
export class AuthGuardService {

  isLoggedIn(): boolean {
    if(!! Meteor.userId()) {
      return true;
    } else {
      return false;
    }
  }

  isNotLoggedIn(): boolean {
    if(!! Meteor.userId()) {
      return false;
    } else {
      return ;
    }
  }

}
