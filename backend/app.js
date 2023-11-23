require("dotenv").config();

const express = require("express");
const { createServer } = require("http");
const app = express();
const server = createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const cors = require('cors');
const chatMessage = require("./model/chatschemma");
const generateChatbotResponse = require("./Openai");
app.use(cors());
app.use(express.json());

io.on("connection", (socket) => {
  require('./db/conn');
  console.log("User is connected", socket.id);

  socket.on('chatMessage', async (data) => {
    io.emit('message', { user: data.user, message: data.message });

    const botResponse = await generateChatbotResponse(data.message);

    io.emit('message', { user: 'Chatbot', message: botResponse });

    const check = await chatMessage.findOne({ email: data.user });
    console.log(check);

    if (check) {
      const userMessage = { user: data.user, message: data.message };
      const chatBoat = { chatboat: "Chatboat", ChatMessage: botResponse };

      await chatMessage.updateOne(
        { _id: check._id },
        { $push: { messages: { ...userMessage, ...chatBoat } } }
      );

      console.log("update");
    } else {
      const newChatMessage = new chatMessage({
        email: data.user,
        messages: [
          {
            user: data.user,
            message: data.message,
            chatboat: "ChatBoat",
            ChatMessage: botResponse
          }
        ]
      });

      await newChatMessage.save();
      console.log("save");
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(8080, () => {
  console.log("Server is running");
});
