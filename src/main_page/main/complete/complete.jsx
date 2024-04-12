import './today.css'
import Plan from './plan'
import { useState, useEffect } from 'react';
import axios from '../../../api/axios';

export default function Complete({circleColor, backgroundCircle, plans, setCompletePlans}){

    const dayjs = require('dayjs')
    require('dayjs/locale/ru')
    dayjs.locale('ru')
    dayjs().format()
    var customParseFormat = require('dayjs/plugin/customParseFormat')
    dayjs.extend(customParseFormat)

    const [plansArr, setPlansArr] = useState(plans);

    const [isEmpty, setIsEmpty] = useState(false);

    let amount = plans.length
    useEffect(()=>{
        (amount === 0) ? setIsEmpty(true) : setIsEmpty(false);
    })

    function handleCircleClick(index){
        axios.post('/tasks',{
            title: plans[index].title,
            content: plans[index].content,
            starts_at: (plans[index].starts_at)
        })
        .then(resp => {
            axios.post(`/tags/${resp.data.id}`, 
            {
                id: plans[index].tags
            })
        })
        setCompletePlans([...plans.slice(0, index), ...plans.slice(index+1)])
    }

    return(
        <div className='plans_container'>
            <div className='plans_header'>
                <p>Выполненные</p>
            </div>
            <div className='plans_horizontal'></div>
            <p className={isEmpty ? 'empty' : 'not_empty'}>Здесь пусто!</p>
            {[...plans].map((item, index)=>
                <Plan key={index} header = {item.title} date = {dayjs(item.starts_at).format('MMMM DD')} tagArr =  {item.tags}
                text = {item.content} circleColor = {circleColor} backgroundCircle = {backgroundCircle} onCircleClick = {()=>handleCircleClick(index)}></Plan>
            )}
        </div>
    )
}