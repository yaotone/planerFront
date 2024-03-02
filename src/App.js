import React from 'react';
import './App.css';
import InputField from "./registerAndSignin/inputField.jsx"
import MainPage from "./main_page";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
    <div>
      <Routes>
        <Route path="/" element={<InputField />} />
        <Route path="/main_page" element={<MainPage />} />
      </Routes>
    </div>
    </Router>

  );
}



export default App;
