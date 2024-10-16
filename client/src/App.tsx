import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Signup from './pages/Signup';
import Form from './pages/Form';
// import Login from './pages/Login';
// import Profile from './pages/Profile';
// import Update from './pages/Update';

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Form/>}/>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;