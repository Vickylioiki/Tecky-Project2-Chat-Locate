import moment from "moment";
export interface Conversation {
  from: any;
  content: any;
  image?: any;
  createdAt: string;
}
export class Chatroom {
  conversations: Conversation[] = [];
  constructor(private roomId: string, private userA: any, private userB: any) {}

  static makeConversationObj(
    from: number,
    content: string,
    image: string | null,
    createdAt: Date
  ) {
    let conversation: Conversation = {
      from,
      content,
      image,
      createdAt: moment(createdAt).format("hh:mm A | MMM M"),
    };
    return conversation;
  }
  addConversation(conversation: Conversation) {
    this.conversations.push(conversation);
  }
  getUserA() {
    return this.userA;
  }
  getUserB() {
    return this.userB;
  }
  getConversations() {
    return this.conversations;
  }
}
