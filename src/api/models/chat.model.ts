import {Message} from "./message.model";

export interface Chat {
  _id?: string;
  ownerId?: string;
  memberIds?: string[];
  createdAt?: number;
  title?: string;
  picture?: string;
  lastMessage?: Message;
  lastActivity?: number;
}
