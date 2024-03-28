import './timeline_plan.css'
import { useState, useEffect } from 'react';

export default function TimelinePlan({header, datestart,dateend, daysPercent}){

    const[date,setDate]= useState()
    const[size, setSize] = useState(0);
    const[leftIndent, setLeftIndent] = useState(0);

    const dayjs = require('dayjs')
    require('dayjs/locale/ru')
    dayjs.locale('ru')
    dayjs().format()
    var customParseFormat = require('dayjs/plugin/customParseFormat')
    dayjs.extend(customParseFormat)
    
    // function left(){
    //     let dates = date.split('-');
    //     setLeftIndent((dayjs(dates[0],'D MMMM', 'ru').diff(dayjs().month(new Date().getMonth()-1).date(1),'day')+2)*daysPercent) 
    // }

    function objSize(){
        console.log(dayjs(dateend,'D MMMM', 'ru').diff(dayjs(datestart,'D MMMM', 'ru'), 'day'))
        setSize((dayjs(dateend,'D MMMM', 'ru').diff(dayjs(datestart,'D MMMM', 'ru'), 'day'))*daysPercent);
    }

    useEffect(()=>{
        // left()
        objSize()
    })

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