
const mongoose = require('mongoose');


const chatboat = new mongoose.Schema({
    email:{
type: String,
    required: true,
    },
 messages:[
    {
        user: {
            type: String,
            required: true,
          },
          messages: {
            type: String,
            required: true,
          },
          chatboat:{
            type: String,
            required: true,
          },
          ChatMessage:{
            type: String,
            required: true,
          }
    }
 ]
 
},

{
    timestamps:true
}
);


const ChatMessage = mongoose.model('ChatMessage', chatboat);


module.exports = ChatMessage;
