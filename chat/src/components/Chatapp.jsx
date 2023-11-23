import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import "./chat.css"
const socket = io('https://chat-boat-three.vercel.app/'); 

function ChatApp() {
  const [chatbot, setChatbot] = useState([]);
  const [userMessage, setUserMessage] = useState('');
const [userInputs,setuserInput] = useState("")
const [load,setload] = useState(false)






  useEffect(() => {
    // setload(true)
    socket.on('message', (message) => {
      
      setChatbot((prevChatbot) => [...prevChatbot, message]);
    });

    showPrompt()
    
    return () => {
      socket.off('message');
    };
  }, []);


  const showPrompt = () => {
    const userInput = window.prompt('Enter Your Email:');
    if (userInput !== null) {
      setuserInput(userInput)
      console.log('User input:', userInput);
    } else {

      console.log('User canceled the prompt.');
    }
  };

  const sendMessage = () => {
    socket.emit('chatMessage', { user: userInputs, message: userMessage });
    setUserMessage('');
  };

  return (
    <div 
    className='body'
    >

      <div>
        <ul 
        className='messages'
        >
          {
          
          chatbot.map((msg, index) => (
            <li key={index}>
              <strong>{msg.user}:</strong> {msg.message}
            </li>
          ))
     
        }
        </ul>
      </div>
      <div
      className='form'
      >
        <input
        className='input'
          type="text"
          placeholder='message chatboat'
          value={userMessage}
          autoComplete="off"
          onChange={(e) => setUserMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default ChatApp;
