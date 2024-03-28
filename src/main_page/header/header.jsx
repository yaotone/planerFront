import './header.css';
import Switch from './switch';
import Search from './search';
import plus_todo from '../../icons/plus_todo.png'
import Calendar from './calendar';
import Diagramm from './diagramm';
import exit from '../../icons/exit.png'
import {Calendar as CalendarPopUp} from 'react-calendar';
import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';


function handleSwitch(){
    document.querySelector('.sidebar').classList.toggle("active_sidebar");
    document.querySelector('.tasks_menu').classList.toggle("move_task_menu");
    let sidebar_buttons = document.querySelectorAll('.sidebar_button');
    sidebar_buttons.forEach((e)=>e.classList.toggle('sidebar_button_show'));
}

export default function Header({onAddTagClick, setChoosedDate, setMain, choosedDate, 
    mainContent, varClick, handleSearch, query, answer}){

    const[isCalendarShown, setIsCalendarShown] = useState(false);
    const calendarRef = useRef(null);

    function handleOutsideClick(e){
        if(calendarRef.current && !calendarRef.current.contains(e.target)){
            setIsCalendarShown(false)
        }
    }

    function calendarClick(){
        setIsCalendarShown(!isCalendarShown)
    }


    function dayClick(activ){
        setMain(activ)
    }

    function handleDate(value){
        setChoosedDate(value)
    }

    useEffect(()=>{
        document.addEventListener('click', handleOutsideClick)
    })

    return(
        <>
            <div className="header">
                <div className='search_menu'>
                    <Switch onClick={handleSwitch}></Switch>
                    <Search mainContent={mainContent} handleVarClick = {varClick} setMain = {setMain} handleSearch = {handleSearch}
                    query = {query} answer = {answer}/>
                </div>
                <div className='tasks_menu'>
                    <button className='plus_button' onClick={onAddTagClick}>
                        <img className='plus_todo' src={plus_todo} alt='add'/> 
                    </button>
                    <div className='select_date' ref={calendarRef}>
                        <Calendar onClick={calendarClick}></Calendar>
                        <CalendarPopUp className={isCalendarShown ? 'shown_calendar' : 'calendar_hidden'}
                        onClickDay = {()=>dayClick('День')} onChange = {handleDate}
                        value = {choosedDate}></CalendarPopUp>
                    </div>
                   
                    {/* <Diagramm percents={1/4*100} />
                    <span className='tasks_complete' title=
                    'Выполненые задания из всех поставленных на сегодня'
                    >1/4</span> */}
                </div>
                <div className='exit'>
                    <img className="exit_icon" src={exit} alt="exit" />
                </div>
            </div>
        </>
    )
}