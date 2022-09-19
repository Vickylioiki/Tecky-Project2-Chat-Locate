import express from "express";
export const chatRoutes = express.Router();
import { Files } from "formidable";
import { form } from "../utils/formidable";
import { io } from "../utils/socket";
import { Chatroom } from "../class/Chatroom";
import {
  getChatRoomByUserId,
  getOpponentProfileInsideChatroom,
} from "../utils/chatroom-helper";

chatRoutes.get("/getchatroom", async (req, res) => {
  try {
    const userId = req.session["user"].id;
    let chatRoom: Chatroom = getChatRoomByUserId(userId);
    const opponentUserInfo = getOpponentProfileInsideChatroom(chatRoom, userId);

    let returnObj = {
      opponentUserInfo,
      myUserInfo: req.session["user"],
      conversations: chatRoom.getConversations(),
    };
    res.json(returnObj);
  } catch (err) {
    console.log(err);

    res.status(400).json({
      message: err,
    });
  }
});

chatRoutes.post("/", async (req, res) => {
  const userId = req.session["user"].id;
  // const opponentUserId = getOpponentUserId(userId);
  // const sender = opponentUserId === userId ? opponentUserId : userId

  form.parse(req, (err: any, fields: any, files: Files) => {
    if (err) {
      console.log("err:", err);
    }

    try {
      const content = fields.content;
      // const fromSocketId = fields.fromSocketId;
      let imageFile: any = ""; //因為有可能係null
      let file = Array.isArray(files.image) ? files.image[0] : files.image; //如果多過一個file upload, file 就會係一串array
      //upload file都要check, 有機會upload多過一個file(會以array存),
      //如果係Array就淨係拎第1個file, 即file.image[0],
      //如果只有一個file, 即files.image
      if (file) {
        imageFile = file.newFilename;
      }

      let chatRoom = getChatRoomByUserId(userId);
      let opponentUserProfile = getOpponentProfileInsideChatroom(
        chatRoom,
        userId
      );
      let conversation = Chatroom.makeConversationObj(
        userId,
        content,
        imageFile,
        new Date()
      );
      chatRoom.addConversation(conversation);

      io.to(opponentUserProfile.username).emit("new-message", conversation);
      res.status(200).json(conversation);
    } catch (err) {
      res.status(400).json("internal server error");
      console.log(err);
    }
  });
});
