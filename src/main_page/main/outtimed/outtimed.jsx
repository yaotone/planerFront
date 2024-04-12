import './today.css'
import Plan from './plan'
import { useState } from 'react';
import { useEffect } from 'react';
import axios from '../../../api/axios';

export default function Outtimed({circleColor, backgroundCircle, plans,
     setCompletePlans, setOuttimedPlans, completePlans }){
    const[tempArr,setTempArr] = useState([])

    const [isEmpty, setIsEmpty] = useState(false);
    const[isLoading, setIsLoading] = useState(true)

    const dayjs = require('dayjs')
    require('dayjs/locale/ru')
    dayjs.locale('ru')
    dayjs().format()
    var customParseFormat = require('dayjs/plugin/customParseFormat')
    dayjs.extend(customParseFormat)

    function handleCircleClick(index){
        setCompletePlans([...completePlans, plans[index]])
        axios.delete(`/tasks/${plans[index].id}`)
        setOuttimedPlans([...plans.slice(0, index),
            ...plans.slice(index+1)])
    }

    useEffect(()=>{
        console.log(plans)
    })

    return(
        <div className='plans_container'>
            <div className='plans_header'>
                <p>Просроченные</p>
            </div>
            <div className='plans_horizontal'></div>
            <p className={isEmpty ? 'empty' : 'not_empty'}>Здесь пусто!</p>
            {
            plans.map((item, index)=>
                <Plan tagArr={item.tags} key={item.id} header = {item.title} date ={dayjs(item.starts_at).format('MMMM DD')} 
                text = {item.content} circleColor = {circleColor} backgroundCircle = {backgroundCircle} onCircleClick = {()=>handleCircleClick(index)}></Plan>
            )}
        
        </div>
    )
}