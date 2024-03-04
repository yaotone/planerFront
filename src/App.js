import React from 'react';
import './App.css';
import InputField from "./registerAndSignin/inputField.jsx"
import MainPage from "./main_page/main_page.jsx";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
    <>
      <Routes>
        <Route path="/" element={<InputField />} />
        <Route path="/main_page" element={<MainPage />} />
      </Routes>
    </>
    </Router>

  );
}



export default App;
