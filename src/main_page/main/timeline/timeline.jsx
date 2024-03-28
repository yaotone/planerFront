import { useState } from 'react'
import TimelinePlan from './timeline_plan'
import './timeline.css'
import { useEffect } from 'react'
import axios from '../../../api/axios'


export default function Timeline({plans}){
    const[plan, setPlan] = useState([...plans])

    const dayjs = require('dayjs')
    require('dayjs/locale/ru')
    dayjs.locale('ru')
    dayjs().format()
    var customParseFormat = require('dayjs/plugin/customParseFormat')
    dayjs.extend(customParseFormat)

    const[daysPercent, setDaysPercent] = useState(100/(dayjs(new Date(new Date().setDate(0))).daysInMonth()
    +dayjs().daysInMonth()+dayjs().month(new Date().getMonth()+1).daysInMonth()));

    useEffect(()=>{
        // axios.get(`/tasks/month?date_query="${dayjs().format('YYYY-MM-DD')}"`)
        // .then(data => console.log(data))
        // .catch(err => console.log(err))
        setDaysPercent()
        setPlan(plans)
        console.log(plans)
    },[plan])

    return(
        <div className='timeline_container'>
            <div className='timeline_header'>
                <div className='timeline_plans'>Заметки</div>
                <div className='previous_month'>
                    {new Date(new Date().setDate(0)).toLocaleString('ru-RU',
                    {month: 'long'})[0].toUpperCase()+new Date(new Date().setDate(0)).toLocaleString('ru-RU',
                    {month: 'long'}).slice(1)}
                </div>
                <div className='now_month'>{new Date().toLocaleString('ru-RU',
                    {month: 'long'})[0].toUpperCase() + new Date().toLocaleString('ru-RU',
                    {month: 'long'}).slice(1)}</div>
                <div className='next_month'>{dayjs().month(new Date().getMonth()+1).format('MMMM')[0].toUpperCase()
                +dayjs().month(new Date().getMonth()+1).format('MMMM').slice(1)}</div>
            </div>
            {[...plans].map((item)=>{
                <TimelinePlan daysPercent={daysPercent} header = {item.title} dateend = {dayjs(item.starts_at).format('MMMM-DD')} datestart={dayjs(item.owner.created_at).format('MMMM-DD')}></TimelinePlan>
            })}
        </div>
    )
}