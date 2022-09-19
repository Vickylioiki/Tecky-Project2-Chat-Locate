import { Chatroom } from "../class/Chatroom";
export let chatRooms: {} = {};
// Find opponent profile in chatrooms by userID
export function getOpponentProfile(myUserId: number) {
  for (let roomId in chatRooms) {
    let chatroom: Chatroom = chatRooms[roomId];
    getOpponentProfileInsideChatroom(chatroom, myUserId);
  }
}

// Find opponent profile in specific chatroom by userID
export function getOpponentProfileInsideChatroom(
  chatroom: Chatroom,
  myUserId: number
) {
  if (chatroom.getUserA().id == myUserId) {
    return chatroom.getUserB();
  }
  if (chatroom.getUserB().id == myUserId) {
    return chatroom.getUserA();
  }
}
export function getChatRoomByUserId(myUserId: number) {
  for (let roomId in chatRooms) {
    let chatroom: Chatroom = chatRooms[roomId];

    if (
      chatroom.getUserA().id == myUserId ||
      chatroom.getUserB().id == myUserId
    ) {
      return chatroom;
    }
  }
  throw new Error("Chatroom not found for user id: " + myUserId);
}
