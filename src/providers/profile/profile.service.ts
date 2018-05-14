import { Injectable } from '@angular/core';
import { MeteorObservable } from 'meteor-rxjs';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { Profile } from '../../api/models/profile.model';
import { Profiles } from '../../api/collections/profiles.collection';

@Injectable()
export class ProfileService {

  private profileCurrentUser: Observable<Profile>;
  private profile: Observable<Profile>;

  constructor() {
    console.log('ProfileService#constructor called');
    MeteorObservable.subscribe('profile');
  }

  getProfile(profileId: string): Observable<Profile> {
    console.log('ProfileService#getProfile called');
    return of(Profiles.findOne({_id: profileId}));
  }

}
