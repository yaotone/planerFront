import "./inputField.css";
import Input from "./input";
import Button from "./button";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";


export default function InputField({setAccessToken}) {
  const[email, setEmail] = useState('')
  const[password, setPassword] = useState('')
  const[repPassword, setRepPassword] = useState('')
  const[activeField, setActiveField] = useState('reg')

  const navigate = useNavigate();
  function switchReg() {
    if(activeField === 'reg'){
      setActiveField('sign')
    }
    else{
      setActiveField('reg')
    }
    // if(activeField === 'reg'){
    //   document.querySelector(".inputField").classList.remove("active");
    //   document.querySelector(".signInField").classList.add("active");
    // }
    // else{
    //   setActiveField('reg')
    // }
    // if (
    //   document.querySelector(".inputField").classList.contains("active") ===
    //   true
    // ) {
    //   document.querySelector(".inputField").classList.remove("active");
    //   document.querySelector(".signInField").classList.add("active");
    // } else {
    //   document.querySelector(".signInField").classList.remove("active");
    //   document.querySelector(".inputField").classList.add("active");
    // }
  }

  const [error, setError] = useState('');

  
  function handleSubmit(el) {
    el.preventDefault();
    if (password === repPassword){
        axios.post("/users",
            { 
                email: email,
                password: password 
            }
        ).catch(err =>console.log(err))
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
        localStorage.setItem('token',data.data.access_token)
        const access_token = localStorage.getItem('token')
        console.log(access_token)
        navigate('/main_page')
      }
      else{
        console.log('er')
      }
    })
    // возможно надо будет написать с заглавной Bearer
    .catch(err => console.error(err))

  }

  function onEmailChange(el){
    setEmail(el.target.value)
  }
  function onPasswordChange(el){
    setPassword(el.target.value)
  }

  function onRepPasswordChange(el){
    setRepPassword(el.target.value)
  }
 
  return (
    <>
      <div className={activeField === 'reg'? "inputField active": 'inputField'}>
        <p className="Register">Регистрация</p>
        <p className="error_message">{error}</p>
        <form className="inputs" id="RegForm" method="post" onSubmit={handleSubmit}>
          <Input type="email" minLength={8} setName="email" onChange={onEmailChange} value = {email}>
            Почта
          </Input>
          <Input type="password" minLength={8} setName="password" onChange={onPasswordChange} value = {password}>
            Пароль
          </Input>
          <Input type="password" minLength={8} setName="RepPassword" onChange={onRepPasswordChange} value = {repPassword}>
            Повторите пароль
          </Input>
          <Button>Отправить</Button>
          <p>
            Уже есть аккаунт?
            <button className="SignIn" onClick={switchReg} type = 'button'>
              Войти
            </button>
          </p>
        </form>
      </div>
      <div className={activeField === 'sign'? "signInField active" : "signInField"}>
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
            <button className="Reg" onClick={switchReg} type = 'button'>
              Регистрация
            </button>
          </p>
        </form>
      </div>
    </>
  );
}
