import './timeline_plan.css'
import { useState, useEffect } from 'react';

export default function TimelinePlan({header, datestart, dateend, daysPercent}){

    const[date,setDate]= useState()
    const[size, setSize] = useState(0);
    const[leftIndent, setLeftIndent] = useState(0);

    const dayjs = require('dayjs')
    require('dayjs/locale/ru')
    dayjs.locale('ru')
    dayjs().format()
    var customParseFormat = require('dayjs/plugin/customParseFormat')
    dayjs.extend(customParseFormat)
    
    function left(){
        // console.log(Math.abs(dayjs().subtract(1, 'month').startOf('month').startOf('day').diff(dayjs(datestart, 'MMMM-DD', 'ru'),'day')+2))
        setLeftIndent(Math.abs(dayjs().subtract(1, 'month').startOf('month').startOf('day').diff(dayjs(datestart, 'MMMM-DD', 'ru'),'day'))*daysPercent) 
    }

    function objSize(){
        //console.log(Math.abs(dayjs(dateend,'MMMM-DD', 'ru').diff(dayjs(datestart,'MMMM-DD', 'ru'), 'day')))
        setSize(Math.abs(dayjs(dateend,'MMMM-DD', 'ru').diff(dayjs(datestart,'MMMM-DD', 'ru'), 'day'))*daysPercent);
    }

    useEffect(()=>{
        // console.log(dayjs().subtract(1, 'month').startOf('month').startOf('day'))
        left()
        objSize()
    },[header])

    return(
        <div className='timeline_plan_container'>
            <div className='timeline_name'><p>{header}</p></div>
            <div className='cont'>
                <div className='prev_month'></div>
                <div className='rn_month'></div>
                <div className='nxt_month'></div>
                <div className='block'
                style={{width: `${size}%`, left:`${leftIndent}%`}}><p>{`${datestart}-${dateend}`}</p></div>
            </div>
        </div>
    )
}