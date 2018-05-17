import { Meteor } from 'meteor/meteor';
import { UploadFS } from 'meteor/jalik:ufs';
import './config/uploadfs.config';
import './methods/accounts.methods';
import './methods/chats.methods';
import './methods/chat-members.methods';
import './methods/messages.methods';
import './publications/chats.publication';
import './publications/chat-members.publication';
import './publications/messages.publication';

Meteor.startup(() => {
  // code to run on server at startup
});
