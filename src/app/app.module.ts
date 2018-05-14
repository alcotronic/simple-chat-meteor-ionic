import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { AppComponennt } from './app.component';
import { ChatComponent } from '../pages/chat/chat.component';
import { ChatMembersAddComponent } from '../pages/chat/chat-members-add.component';
import { ChatMembersListComponent } from '../pages/chat/chat-members-list.component';
import { ChatsComponent } from '../pages/chats/chats.component';
import { ChatsListComponent } from '../pages/chats/chats-list.component';
import { NewChatComponent } from '../pages/chat/new-chat.component';
import { MessageInputComponent } from '../pages/message/message-input.component';
import { MessagesListComponent } from '../pages/message/messages-list.component';
import { ProfileComponent } from '../pages/profile/profile.component';
import { SettingsComponent } from '../pages/settings/settings.component';
import { SettingsAccountComponent } from '../pages/settings/settings-account.component';
import { SettingsProfileComponent } from '../pages/settings/settings-profile.component';
import { SettingsPasswordComponent } from '../pages/settings/settings-password.component';
import { SigninComponent } from '../pages/signin/signin.component';
import { SignupComponent } from '../pages/signup/signup.component';
import { WelcomeComponent } from '../pages/welcome/welcome.component';

import { AccountService } from '../providers/account/account.service';
import { AlertService } from '../providers/alert/alert.service';
import { AuthGuardService } from '../providers/auth/auth-guard.service';
import { AuthenticationService } from '../providers/auth/authentication.service';
import { ChatService } from '../providers/chat/chat.service';
import { MessageService } from '../providers/message/message.service';
import { ToastService } from '../providers/toast/toast.service';

@NgModule({
  declarations: [
    AppComponennt,
    ChatComponent,
    ChatMembersAddComponent,
    ChatMembersListComponent,
    ChatsComponent,
    ChatsListComponent,
    NewChatComponent,
    MessageInputComponent,
    MessagesListComponent,
    ProfileComponent,
    SettingsComponent,
    SettingsAccountComponent,
    SettingsProfileComponent,
    SettingsPasswordComponent,
    SigninComponent,
    SignupComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(AppComponennt)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    AppComponennt,
    ChatComponent,
    ChatMembersAddComponent,
    ChatMembersListComponent,
    ChatsComponent,
    NewChatComponent,
    ProfileComponent,
    SettingsComponent,
    SettingsAccountComponent,
    SettingsProfileComponent,
    SettingsPasswordComponent,
    WelcomeComponent
  ],
  providers: [
    AccountService,
    AlertService,
    AuthGuardService,
    AuthenticationService,
    ChatService,
    MessageService,
    ToastService,
    Camera,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
