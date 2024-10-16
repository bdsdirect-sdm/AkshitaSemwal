import React, { useState, useEffect } from 'react'
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

const Form = () => {
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState<string[]>([])

    //runs everytime an event is thrown to us
    useEffect(() => {
      //listening to an event in case it happens
        socket.on('message', (message: string) => {
          setMessages((messages) => [...messages, message]);
        });
      }, [socket]);

    function handleSubmit(e: { preventDefault: () => void; }) {
        e.preventDefault();
        // if (name && message) {
        //     socket.emit('sendMessage', { name, message }); //emitting/broadcasting data to all users who have joined
        //     setName('');
        //     setMessage('');
        //   }

        socket.emit("sendMessage", {message: "Helloooo"})
    }
  return (
    <>
        <form onSubmit={handleSubmit}>
            <input value={name} placeholder='enter your name' onChange={(e) => setName(e.target.value)}/>
            <input value={message} placeholder='enter your message' onChange={(e) => setMessage(e.target.value)}/>
            <button type='submit'>Submit</button>
        </form>
        <ul>
        {messages.map((message, index) => (
          <li key={index}>
            {message.name}: {message.message}
          </li>
        ))}
      </ul>
    </>
  )
}

export default Form