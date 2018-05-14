import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController } from 'ionic-angular';

import { Chat } from '../../api/models/chat.model'
import { ChatService } from '../../providers/chat/chat.service';
import { AuthGuardService } from '../../providers/auth/auth-guard.service';
import { ToastService } from '../../providers/toast/toast.service';

@Component({
  selector: 'new-chat-component',
  templateUrl: 'new-chat.component.html'
})
export class NewChatComponent implements OnInit {

  newChatForm: FormGroup;

  newChatData: Chat = {title: '', memberIds: []}

  constructor(private authGuardService: AuthGuardService,
      private chatService: ChatService,
      public navController: NavController,
      private toastService: ToastService) {
  }

  ngOnInit() {
    console.log('NewChatComponent#ngOnInit called');
    this.newChatForm = new FormGroup({
      'title': new FormControl(this.newChatData.title, [Validators.required])
    });
  }

  ionViewCanEnter(): boolean {
    return this.authGuardService.isLoggedIn();
  }

  createChat() {
    if(this.newChatForm.valid) {
      let chat: Chat = { title: this.newChatForm.get('title').value, memberIds: this.newChatData.memberIds};
      this.chatService.createChat(chat).then(() => {
        this.toastService.showToast('Chat created.');
        this.navController.pop();
      }).catch((error: Error) => {
        console.log(error.message);
      });
    }
  }
}
