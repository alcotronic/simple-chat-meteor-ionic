import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { MeteorObservable, ObservableCursor } from 'meteor-rxjs';

import { Chat } from '../../api/models/chat.model';
import { Chats } from '../../api/collections/chats.collection';

@Injectable()
export class ChatService {

  private chats: ObservableCursor<Chat>;

  constructor() {
    console.log('ChatService#constructor called');
    MeteorObservable.subscribe('chats').subscribe(()=> {
      MeteorObservable.autorun().subscribe(() => {
        this.chats = Chats.find({});
      });
    });
  }

  getChats (): Observable<Chat[]> {
    console.log('ChatService#getChats called');
    this.chats = Chats.find({});
    return this.chats;
  }

  getChat(id: string): Observable<Chat> {
    console.log('ChatService#getChat called for id: '+id);
    return of(Chats.findOne({_id: id}));
  }

  createChat(chat: Chat): Promise<void> {
    console.log('ChatService#createChat called');
    return new Promise<void>((resolve, reject) => {
      MeteorObservable.call('addChat', chat).subscribe(
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

}
