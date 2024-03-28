import { useEffect } from 'react'
import './choosed_date.css'
import { useState } from 'react'
import Plan from '../today/plan'
import axios from '../../../api/axios'

export default function Found({title, content, date}){
    const dayjs = require('dayjs')
    require('dayjs/locale/ru')
    dayjs.locale('ru')
    dayjs().format()
    var customParseFormat = require('dayjs/plugin/customParseFormat')
    dayjs.extend(customParseFormat)

    return(
        <div className='add_plan_container'>
                <div className='add_plan_header'>
                    <p>{title}</p>
                </div>
                <div className='plans_horizontal'></div>
                
                
                    <Plan header = {title} date = {dayjs(date).format('MMMM DD')} 
                    text = {content} ></Plan>
                
            </div>
    )
}