import { Meteor } from 'meteor/meteor';
import { UploadFS } from 'meteor/jalik:ufs';
import { GridFSStore } from 'meteor/jalik:ufs-gridfs';

import { Avatars } from '../../collections/avatars.collection';
import { Profiles } from '../../collections/profiles.collection';

function loggedIn(userId): boolean {
  return !!userId;
}

function avatarOwner(userId, doc): boolean {
  if(!!userId && !!doc) {
    if(userId === doc.userId) {
      return true;
    }
  }
  return false;
}

export const AvatarsStore = new GridFSStore({
    collection: Avatars.collection,
    name: 'avatars',
    path: '/uploads/avatar',
    // Apply a filter to restrict file upload
    permissions: new UploadFS.StorePermissions({
        insert: loggedIn,
        update: avatarOwner,
        delete: avatarOwner
    }),
    filter: new UploadFS.Filter({
        minSize: 1,
        maxSize: 1024 * 5000, // 5MB,
        contentTypes: ['image/*'],
        extensions: ['png']
    }),
    onFinishUpload(file) {
      console.log('Uploaded userId: '+Meteor.userId()+' file: '+file.name+' id: '+file._id);
      Profiles.update({ userId: Meteor.userId() }, { $set: { pictureId: file._id, pictureUrl: file.url }})
    }
});
