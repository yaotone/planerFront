import './today.css'
import Plan from './plan'
import { useState } from 'react';
import { useEffect } from 'react';

export default function Today({plans, onChange}){

    const [plansArr, setPlansArr] = useState(plans);

    const [isEmpty, setIsEmpty] = useState(false);

    let amount = plansArr.length
    useEffect(()=>{
        (amount === 0) ? setIsEmpty(true) : setIsEmpty(false);
    })

    return(
        <div className='plans_container' onChange={onChange}>
            <div className='plans_header'>
                <p>Сегодня</p>
            </div>
            <div className='plans_horizontal'></div>
            <p className={isEmpty ? 'empty' : 'not_empty'}>Здесь пусто!</p>
            {[...plansArr].map((item, index)=>
                <Plan key={index} header = {item.header} date = {item.date} 
                time = {item.time} text = {item.text} tagArr = {[...item.tags]}></Plan>
            )}
        </div>
    )
}