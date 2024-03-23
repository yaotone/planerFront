import { useState } from 'react'
import 'react-calendar/dist/Calendar.css';
import {Calendar as CalendarPopUp} from 'react-calendar';
import './add_plan.css'
import Calendar from '../../header/calendar';
import { useEffect, useRef } from 'react';
import MiniTag from './mini_tag';
import SelectTag from './select_tag';

export default function AddPlan({tagsArr, choosedTags, planText, 
    calendarValue, hours, minutes, setCalendarValue, setPlanText, setChoosedTags,
    setMinutes, setHours, onCircleClick, headerText, setHeaderText}){

    const[isDisabled, setIsDisabled] = useState(false);

    const[tagsToChoose, setTagsToChoose] = useState(
        [{tagColor: 'red', tagText: 'Важное'},{tagColor: '#63FF2D', tagText: 'Купить'},
        {tagColor: '#E021FF', tagText: 'Подарок'}, ...tagsArr]);

    const[isTagsShown, setIsTagsShown] = useState(false);
    const[calendarShown, setCalendarShown] = useState(false);
    const calendarRef = useRef(null);

    function handleCalendar(){
        setCalendarShown(!calendarShown)
    }

    function handleDateChange(newValue){
        setCalendarValue(newValue);
    }

    function handleOutsideClick(e){
        if(calendarRef.current && !calendarRef.current.contains(e.target)){
            setCalendarShown(false)
        }
    }

    function jump(el){
        let maxLength = el.target.getAttribute('maxLength');
        if(maxLength && el.target.value.length >= maxLength){
            el = el.target.nextSibling;
            el = el.nextSibling;
            el.focus();
        }
    }

    function handlePlanTextChange(el){
        setPlanText(el.target.value);
        let textarea = el.target;
        textarea.style.height = 0;
        textarea.style.height = textarea.scrollHeight + 'px';
    }

    function handleAddTag(){
        setIsTagsShown(!isTagsShown);
    }

    function handleCloseTags(){
        setIsTagsShown(false)
    }

    function handleTagClick(index){
        setChoosedTags([...choosedTags,tagsToChoose[index]])
    }

    function handleMiniTagClick(index){
        setChoosedTags([...choosedTags.slice(0, index),
            ...choosedTags.slice(index+1)]);
    }

    function handleMinutesChange(el){
        let value = el.target.value.replace(/[^0-9]/g, '');
        if(value > 59){
            value = '59'
        }
        setMinutes(value)
    }

    function handleHoursChange(el){
        let value = el.target.value.replace(/[^0-9]/g, '');
        if(value > 23){
            value = '23'
        }

        setHours(value)
    }

    function handleHeaderChange(el){
        setHeaderText(el.target.value)
    }

    useEffect(()=>{
        if(choosedTags.length>2){
            setIsDisabled(true)
        }
        else{
            setIsDisabled(false)
        }
        document.addEventListener('click', handleOutsideClick)
    })

    function nothing(){

    }

    return(
        <>
            <div className='add_plan_container'>
                <div className='add_plan_header'>
                    <p>Создание заметки</p>
                </div>
                <div className='plans_horizontal'></div>
                <div className='plan_inputs_container'>
                    <div className='complete_circle' onClick={onCircleClick}></div>
                    <div className='plan_inputs'>
                        <input className='header_input' maxLength={80} onChange = {handleHeaderChange}
                        placeholder='Введите заголовок для заметки' value={headerText} required></input>
                        <div className='date_and_tags'>
                            <div className='dates' ref={calendarRef}>
                                <Calendar onClick={handleCalendar}></Calendar>
                                <CalendarPopUp returnValue='range' selectRange = {true} minDate = {new Date()}
                                className={calendarShown ? 'add_dates' : 'add_dates_hidden'} 
                                value={calendarValue} onChange = {handleDateChange}></CalendarPopUp>
                            </div>
                            <div className='selected_date'>
                                {calendarValue.toLocaleString('ru-RU',
                                {month: 'long', day: 'numeric'}).replace(',', ' - ')}
                            </div>

                            <input type={'text'} className='hours_input' onKeyUp={jump} maxLength={2} size = {2}
                            placeholder = 'чч' value={hours} onChange = {handleHoursChange} pattern = {"[0-9]*"}/>
                            :<input type={'text'} className='minute_input' maxLength={2} size = {2}
                            placeholder = 'мм' value={minutes} onChange = {handleMinutesChange} max = {60} min = {0} pattern = {'[0-9]*'}/>
                            <div className='add_tag_to_plan'>
                                {[...choosedTags].map((item,index)=>
                                    <MiniTag color={item.tagColor} text = {item.tagText} onClick = {() => handleMiniTagClick(index)}></MiniTag>
                                )}
                                <div className='add_tag_to_plan_button' onClick={handleAddTag}>Добавить метку</div>
                            </div>
                        </div>
                        <textarea onChange={handlePlanTextChange} className='add_text_to_plan' placeholder='Введите подробную информацию' value={planText}></textarea>
                    </div>
                </div>
                
            </div>
            <SelectTag isShown={isTagsShown} onClose ={handleCloseTags} 
            tagsArr = {tagsToChoose} onTagClick = {isDisabled? nothing : handleTagClick}></SelectTag>
        </>
    )
}