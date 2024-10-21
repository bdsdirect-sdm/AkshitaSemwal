import React, { useState } from 'react'

const Chats = ({socket, name, room}: any) => {
    const [message, setMessage] = useState("");

    const sendMessage = async() => {
        if(message !== "") {
            const messageData = {
                room: room,
                author: name, 
                message: message,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
            }
            await socket.emit("sendMessage", messageData);
        }
    }

    console.log("HELLOOO", name)
  return (
    <>
        <div className='chat-header'>
            <p>Live Chat</p>
        </div>
        <div className='chat-body'></div>
        <div className='chat-footer'>
            <input type='text' placeholder='Type message...' value={message} onChange={(e) => setMessage(e.target.value)}/>
            <button onClick={sendMessage}>Send Message</button>
        </div>
    </>
  )
}

export default Chats