import React, { useEffect, useState } from 'react'
import axios from "axios"

const Chats = ({socket, name, room}) => {
    const [message, setMessage] = useState("");  //current message input by the user
    const [messageList, setMessageList] = useState<Array<any>>([]); //list of messages exchanged in the chat

    //sending msgs through socket
    //in the send msg event itll emit the data you just sent to all users
    const sendMessage = () => {
        if(message !== "") {
            const messageData = {
                room: room,
                author: name, 
                message: message,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
            }
            socket.emit("sendMessage", messageData);
        }
        setMessage("")
    }

    //fetching older msgs in the chat
    const getMessage = async () => {
        const response = await axios.get(`http://localhost:4000/users/getMessages/${room}`)
        // console.log("RESPONSEEEEE",response.data);
        const messagesData = response.data;
        // console.log(messagesData)
        setMessageList(messagesData);
    }

    useEffect(() => {
        //whenever someone types a msg, they emit the send msg event
        socket.on("receiveMsg", (data: any) => {
            console.log("DATA", data)
            setMessageList((prev) =>([...prev,data]))
        })
        getMessage();

        // return () => {
        //     (socket.off("receiveMsg"))
        // }
    }, [])

  return (
    <>
        <div className='chat-header'>
            <p>Live Chat</p>
        </div>
        <div className='chat-body'>
            {messageList.map((messageData, index) => (
                <p key={index}>{messageData.author}: {messageData.message} {messageData.time}</p>
            ))}

        </div>
        <div className='chat-footer'>
            <input type='text' placeholder='Type message...' value={message} onChange={(e) => setMessage(e.target.value)}/>
            <button onClick={sendMessage}>Send Message</button>
        </div>
    </>
  )
}

export default Chats