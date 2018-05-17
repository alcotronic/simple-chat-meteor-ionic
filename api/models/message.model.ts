export interface Message {
  _id?: string;
  chatId?: string;
  senderId?: string;
  senderName?: string;
  senderPictureUrl?: string;
  text?: string;
  createdAt?: number;
}
