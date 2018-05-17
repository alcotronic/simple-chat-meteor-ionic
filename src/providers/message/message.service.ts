
import { Injectable } from '@angular/core';
import { MeteorObservable } from 'meteor-rxjs';

import { Message } from '../../../api/models/message.model';

@Injectable()
export class MessageService {

  constructor() {
    console.log('MessageService#constructor called');
  }

  addMessage(message: Message): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      console.log('MessageService#addMessage called for message.text: '+message.text);
      MeteorObservable.call('addMessage', message).subscribe(
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

  deleteMessage (message: Message | string): void {
    const id = typeof message === 'string' ? message : message._id;
    Meteor.call('removeMessage', id, function(error) {
      if(error && error.error === "message-not-exists") {
        console.log(error.message);
      }
    });
  }

  updateMessage (message: Message): void {
    Meteor.call('updateMessage', message, function(error) {
      if(error && error.error === "message-not-exists") {
        console.log(error.message);
      }
    });
  }
}
