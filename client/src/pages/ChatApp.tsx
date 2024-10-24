import React, { useState } from 'react'
import io from "socket.io-client"
import Chats from '../components/Chats'

export const socket = io("http://localhost:4000")

const ChatApp = () => {
    const [name, setName] = useState("");
    const [room, setRoom] = useState("");
    const [showChat, setShowChat] = useState(false)

    const joinRoom = () => {
        if(name !== "" && room !== "") {
            socket.emit("joinRoom", room);
        }
        setShowChat(true);
        console.log("SHOWWWW", showChat)
    }

  return (
    <>
        <div className='app'>
            { !showChat ? 
                <div>
                    <h3>Join A Chat</h3>
                    <input type="text" placeholder='enter the room id' value={room} onChange={(e) => setRoom(e.target.value)}/>
                    <input type="text" placeholder='enter your username' value={name} onChange={(e) => setName(e.target.value)}/>

                    <button onClick={joinRoom}>Join</button>
                {/* passing socket and username, room as props*/}
                </div>
            : <Chats socket={socket} name={name} room={room}/>
            }
            
        </div>
    </>
  )
}

export default ChatApp