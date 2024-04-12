import { useEffect } from 'react'
import './choosed_date.css'
import { useState } from 'react'
import Plan from '../today/plan'
import axios from '../../../api/axios'

export default function Found({plans, query, completePlans, setCompletePlans, setAnswer}){
    const dayjs = require('dayjs')
    require('dayjs/locale/ru')
    dayjs.locale('ru')
    dayjs().format()
    var customParseFormat = require('dayjs/plugin/customParseFormat')
    dayjs.extend(customParseFormat)

    function onCircleClick(index){
        setCompletePlans([...completePlans, plans[index]])
        axios.delete(`/tasks/${plans[index].id}`)
        setAnswer([...plans.slice(0, index), ...plans.slice(index+1)])
    }

    return(
        <div className='add_plan_container'>
                <div className='add_plan_header'>
                    <p>результаты по запросу: {query}</p>
                </div>
                <div className='plans_horizontal'></div>
                
                    {
                        [...plans]?.map((item, index)=>{
                            return <Plan tagArr={item.tags} header = {item.title} date = {dayjs(item.starts_at).format('MMMM DD')} 
                            text = {item.content} onCircleClick={()=>onCircleClick(index)}></Plan>
                        })  
                    }
                
            </div>
    )
}