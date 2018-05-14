import { Injectable } from '@angular/core';
import { Meteor } from 'meteor/meteor';
import { MeteorObservable } from 'meteor-rxjs';

import { Registration } from '../../api/models/registration.model';

@Injectable()
export class AuthenticationService {

  register(username: string, email: string, password: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      let registration: Registration = {
        username: username,
        email: email,
        password: password
      };

      MeteorObservable.call('createAccount', registration).subscribe(
        {
          next: () => {
            resolve();
          },
          error: (error: Error) => {
            reject(error);
          }
        }
      );
    });
  }

  login(email: string, password: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      Meteor.loginWithPassword(email, password, (error: Error) => {
        if(!error) {
          console.log("login success");
          resolve();
        } else {
          console.log(error.message);
          return reject(error);
        }
      });
    });

  }

  logout() : Promise<void> {
    return new Promise<void>((resolve, reject) => {
      Meteor.logout((error: Error) => {
        if(error) {
          console.log(error.message);
          return reject(error);
        } else {
          console.log("logout success");
          resolve();
        }
      });
    });
  }
}
