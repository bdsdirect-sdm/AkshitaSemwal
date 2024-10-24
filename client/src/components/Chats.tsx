import React, { useEffect, useState } from 'react'

const Chats = ({socket, name, room}) => {
    const [message, setMessage] = useState("");
    const [messageList, setMessageList] = useState([]);

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

    const getMessage = async () => {
        const response = await axios.get("http://localhost:4000/getMessages")
        console.log("RESPONSEEEEE",response);

    //     const messagesData = Array.isArray(response.data.messages) ? response.data.messages : [];
    //     console.log(messagesData)
    //     setMessageList(messagesData);
    // }

    useEffect( () => {
        //whenever someone types a msg, they emit the send msg event
        //in the send msg event itll emit the data you just sent to all users
        socket.on("receiveMsg", (data) => {
            console.log("DATA", data)

            
        })
    }, [socket])

  return (
    <>
        <div className='chat-header'>
            <p>Live Chat</p>
        </div>
        <div className='chat-body'>
            {messageList.map((messageData) => {
                return <p>{messageData.message}</p>
            })}
        </div>
        <div className='chat-footer'>
            <input type='text' placeholder='Type message...' value={message} onChange={(e) => setMessage(e.target.value)}/>
            <button onClick={sendMessage}>Send Message</button>
        </div>
    </>
  )
}

export default Chats;