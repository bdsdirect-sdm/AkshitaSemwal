import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ChatApp from './pages/ChatApp';

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
         <Route path="/" element={<ChatApp/>}/>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;