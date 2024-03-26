import { useState } from 'react'
import TimelinePlan from './timeline_plan'
import './timeline.css'
import { useEffect } from 'react'


export default function Timeline(){

    const dayjs = require('dayjs')
    require('dayjs/locale/ru')
    dayjs.locale('ru')
    dayjs().format()
    var customParseFormat = require('dayjs/plugin/customParseFormat')
    dayjs.extend(customParseFormat)

    const[daysPercent, setDaysPercent] = useState(100/(dayjs(new Date(new Date().setDate(0))).daysInMonth()
    +dayjs().daysInMonth()+dayjs().month(new Date().getMonth()+1).daysInMonth()));

    useEffect(()=>{
        setDaysPercent()
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
            <TimelinePlan daysPercent={daysPercent} header= {'текст1'} dates = {'12 февраля-31 марта'}></TimelinePlan>
            <TimelinePlan daysPercent={daysPercent} header= {'текст2'} dates = {'2 февраля-15 апреля'}></TimelinePlan>
        </div>
    )
}