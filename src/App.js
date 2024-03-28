import React, { useEffect } from 'react';
import './App.css';
import InputField from "./registerAndSignin/inputField.jsx"
import MainPage from "./main_page/main_page.jsx";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react';

function App() {
  const[accessToken, setAccessToken] = useState('')

  useEffect(()=>{
    console.log(accessToken)
  })
  return (
    <Router>
    <>
      <Routes>
        <Route path="/" element={<InputField setAccessToken={setAccessToken}/>} />
        <Route path="/main_page" element={<MainPage accessToken={accessToken}/>} />
      </Routes>
    </>
    </Router>

  );
}



export default App;
