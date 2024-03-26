import "./inputField.css";
import Input from "./input";
import Button from "./button";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";


export default function InputField() {
  const navigate = useNavigate();
  function switchReg(e) {
    e.preventDefault();
    if (
      document.querySelector(".inputField").classList.contains("active") ===
      true
    ) {
      document.querySelector(".inputField").classList.remove("active");
      document.querySelector(".signInField").classList.add("active");
    } else {
      document.querySelector(".signInField").classList.remove("active");
      document.querySelector(".inputField").classList.add("active");
    }
  }

  const [error, setError] = useState('');

  
  function handleSubmit(el) {
    let form = document.getElementById('RegForm');
    el.preventDefault();
    let email = form.email.value
    if (form.password.value === form.RepPassword.value){
        let password = form.password.value;
        fetch("http://127.0.0.1:8000/users", {
            method: "POST",
            headers: { "Accept": "application/json", "Content-Type": "application/x-www-form-urlencoded" },
            body: JSON.stringify({ 
                email: email,
                password: password 
            })
        });
        switchReg();
    }
    else{
        setError("Пароли не совпадают!");
    }
  }

  async function handleSignIn(el) {    
    el.preventDefault();
    let form = document.getElementById('SignInForm');
    let email = form.email.value;
    let password = form.password.value;
    axios.post('/login', {
      username: email,
      password: password
    },{
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    .then(data=> {
      if (data.status === 200){
        axios.defaults.headers.common ={'Authorization': `bearer: ${data.data.access_token}`}
        navigate('/main_page')
      }
    })
    // возможно надо будет написать с заглавной Bearer
    .catch(err => console.error(err))

  }
 
  return (
    <>
      <div className="inputField active">
        <p className="Register">Регистрация</p>
        <p className="error_message">{error}</p>
        <form className="inputs" id="RegForm" onSubmit={handleSubmit} method="post">
          <Input type="email" minLength={8} setName="email">
            Почта
          </Input>
          <Input type="password" minLength={8} setName="password">
            Пароль
          </Input>
          <Input type="password" minLength={8} setName="RepPassword">
            Повторите пароль
          </Input>
          <Button>Отправить</Button>
          <p>
            Уже есть аккаунт?
            <button className="SignIn" onClick={switchReg}>
              Войти
            </button>
          </p>
        </form>
      </div>
      <div className="signInField">
        <p className="Register">Вход</p>
        <p className="error_message"></p>
        <form id="SignInForm" onSubmit = {handleSignIn}>
          <Input type="email" minLength={8} setName="email">
            Почта
          </Input>
          <Input type="password" minLength={8} setName="password">
            Пароль
          </Input>
          <Button>Отправить</Button>
          <p>
            Нет аккаунта?
            <button className="Reg" onClick={switchReg}>
              Регистрация
            </button>
          </p>
        </form>
      </div>
    </>
  );
}
