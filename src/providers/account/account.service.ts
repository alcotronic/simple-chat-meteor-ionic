import { Injectable } from '@angular/core';
import { MeteorObservable } from 'meteor-rxjs';
import { Accounts } from 'meteor/accounts-base';

@Injectable()
export class AccountService {

  constructor() {
    console.log('AccountService#constructor called');
  }

  changeUsername(username: string): Promise<any> {
    console.log('AccountService#changeUsername called');
    return new Promise<void>((resolve, reject) => {
      MeteorObservable.call('changeUsername', username).subscribe(
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

  changeEmail(email: string): Promise<any> {
    console.log('AccountService#changeEmail called');
    return new Promise<void>((resolve, reject) => {
      MeteorObservable.call('changeEmail', email).subscribe(
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

  changePassword(password: string, newPassword: string): Promise<any> {
    console.log('AccountService#changePassword called');
    return new Promise<void>((resolve, reject) => {
      Accounts.changePassword(password, newPassword, (error: Error) => {
        if(!error) {
          resolve();
        } else {
          reject(error);
        }
      });
    });
  }



}
