import { Injectable } from '@angular/core';
import { MeteorObservable, ObservableCursor } from 'meteor-rxjs';

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

  }

  getCurrentUserProfile(): Observable<Profile> {
    console.log('ProfileService#getCurrentUserProfile called');
    MeteorObservable.subscribe('profileCurrentUser').subscribe(() => {
      MeteorObservable.autorun().subscribe(() => {
        this.profileCurrentUser = of(Profiles.findOne({userId: Meteor.userId()}));
      });
    });
    return this.profileCurrentUser;
  }

  getProfile(profileId: string): Observable<Profile> {
    console.log('ProfileService#getProfile called');
    MeteorObservable.subscribe('profile').subscribe(() => {
      MeteorObservable.autorun().subscribe(() => {
        this.profile = of(Profiles.findOne({_id: profileId}));
      });
    });
    return this.profile;
  }

  updateProfile(profile: Profile) {
    console.log('ProfileService#updateProfile called');
  }

}
