import { UploadFS } from 'meteor/jalik:ufs';
import { GridFSStore } from 'meteor/jalik:ufs-gridfs';
import gm from 'gm';

import { Avatar, DEFAULT_AVATAR_URL } from '../models/avatar.model';
import { Avatars } from '../collections/avatars.collection';

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

const AvatarsStore = new GridFSStore({
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
        extensions: ['jpg', 'png']
    })
});
