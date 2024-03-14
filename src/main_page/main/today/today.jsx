import './today.css'
import Plan from './plan'
import { useState } from 'react';

export default function Today(){

    const [isEmpty, setIsEmpty] = useState(false);

    let plan_arr =[];
    let len = plan_arr.length;

    function handleChange(){
        if(len === 0){
            setIsEmpty(true);
        }
        else{
            setIsEmpty(false);
        }
    }

    return(
        <div className='plans_container' onChange={handleChange}>
            <div className='plans_header'>
                <p>Сегодня</p>
            </div>
            <div className='plans_horizontal'></div>
            <p className={isEmpty ? 'empty' : 'not_empty'}>Здесь пусто!</p>
            <Plan></Plan>
            <Plan></Plan>
            <Plan></Plan>
        </div>
    )
}