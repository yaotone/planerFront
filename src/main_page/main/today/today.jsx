import './today.css'
import Plan from './plan'
import { useState } from 'react';
import { useEffect } from 'react';
import axios from '../../../api/axios'

export default function Today({plans, onChange, setCompletePlans, setTodayPlans, completePlans, todayPlans}){

    const [isEmpty, setIsEmpty] = useState(false);

    const dayjs = require('dayjs')
    require('dayjs/locale/ru')
    dayjs.locale('ru')
    dayjs().format()
    var customParseFormat = require('dayjs/plugin/customParseFormat')
    dayjs.extend(customParseFormat)

    function handleCircleClick(index){
        setCompletePlans([...completePlans, plans[index]])
        axios.delete(`/tasks/${plans[index].id}`)
        setTodayPlans([...todayPlans.slice(0, index),
            ...todayPlans.slice(index+1)])
    }

    useEffect(()=>{
        let amount = plans.length;
        (amount === 0) ? setIsEmpty(true) : setIsEmpty(false);
    })

    return(
        <div className='plans_container' onChange={onChange}>
            <div className='plans_header'>
                <p>Сегодня</p>
            </div>
            <div className='plans_horizontal'></div>
            <p className={isEmpty ? 'empty' : 'not_empty'}>Здесь пусто!</p>
            {[...plans].map((item, index)=>
                <Plan key={item.id} header = {item.title} date = {dayjs(item.starts_at).format('MMMM DD')} 
                time = {item.time} tagArr = {item.tags} text = {item.content} onCircleClick = {()=>handleCircleClick(index)}></Plan>
            )}
        </div>
    )
}