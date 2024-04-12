import { useState } from 'react'
import TimelinePlan from './timeline_plan.jsx'
import './timeline.css'
import { useEffect } from 'react'
import axios from '../../../api/axios'


export default function Timeline({plans}){


    const[isEmpty, setIsEmpty] = useState(true)

    const dayjs = require('dayjs')
    require('dayjs/locale/ru')
    dayjs.locale('ru')
    dayjs().format()
    var customParseFormat = require('dayjs/plugin/customParseFormat')
    dayjs.extend(customParseFormat)

    const[daysPercent, setDaysPercent] = useState(100/(dayjs(new Date(new Date().setDate(0))).daysInMonth()
    +dayjs().daysInMonth()+dayjs().month(new Date().getMonth()+1).daysInMonth()));


  async function getTasksByMonth(month){
    const tasks = await axios.get(`/tasks/month/${month}`)
      return tasks.data

  }

  async function getTasks(){
    const tasks = await axios.get(`/tasks/month/${dayjs().format('YYYY-MM-DD')}`)
  }

    useEffect(()=>{

        if(plans.length === 0){
            setIsEmpty(true)
        }
        else{
            setIsEmpty(false)
        }
    })

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
            <p className={isEmpty ? 'empty' : 'not_empty'}>Здесь пусто!</p>
            {
            [...plans].map((item, index)=>{
                return <TimelinePlan daysPercent={daysPercent} header = {item.title} dateend = {dayjs(item.starts_at).format('MMMM-DD')} datestart={dayjs(item.created_at).format('MMMM-DD')}></TimelinePlan>
            })}
        </div>
    )
}