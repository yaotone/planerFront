import "./inputField.css";
import Input from "./input";
import Button from "./button";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";



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

  function handleSignIn(el) {    
    el.preventDefault();
    let form = document.getElementById('SignInForm');
    let email = form.email.value;
    let password = form.password.value;
    alert(JSON.stringify({ 
      username: email,
      password: password 
  }));
    fetch("http://127.0.0.1:8000/login", {
        method: "POST",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({ 
            username: email,
            password: password 
        })
    });
    navigate("/main_page");
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
