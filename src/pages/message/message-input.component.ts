import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Message } from '../../../api/models/message.model';
import { MessageService } from '../../providers/message/message.service';
import { AuthGuardService } from '../../providers/auth/auth-guard.service';

@Component({
  selector: 'message-input-component',
  templateUrl: 'message-input.component.html'
})
export class MessageInputComponent implements OnInit {
  @Input() chatId: string;
  newMessageForm: FormGroup;
  newMessageData: Message = {text: ''};

  constructor(private authGuardService: AuthGuardService, private messageService: MessageService) {

  }

  ngOnInit() {
    console.log('MessageInputComponent#ngOnInit called');
    this.newMessageForm = new FormGroup({
      'text': new FormControl(this.newMessageData.text, [Validators.required])
    });
  }

  ionViewCanEnter(): boolean {
    return this.authGuardService.isLoggedIn();
  }

  sendMessage() {
    if(this.newMessageForm.valid) {
      let message: Message = { chatId: this.chatId, text: this.newMessageForm.get('text').value};
      this.messageService.addMessage(message).then(() => {
        this.clear();
      }).catch((error: Error) => {
        this.clear();
        console.log(error.message);
      });
    } else {
      console.log("newMessageForm valid: "+this.newMessageForm.valid);
    }
  }

  clear() {
    this.newMessageData.text = '';
    this.newMessageForm.setValue({'text': ''});
  }
}
