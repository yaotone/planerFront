import './plan.css'
import { useState } from 'react';
import PlanTag from './plan_tag';

export default function Plan({header, date, time,text,tagArr, circleColor, backgroundCircle} ){

    const [isFull, setIsFull] = useState(false);
    const [contentHeight, setContentHeight] = useState('80px')


    function handlePlanUnfold(){
        setIsFull(!isFull)
        setContentHeight(document.querySelector('.plan_text').getBoundingClientRect().height + 60)
    }

    function handleChange(){
        document.querySelector('.main_content').addEventListener('resize', ()=>setContentHeight(document.querySelector('.plan_text').getBoundingClientRect().height + 60));
    }

    function handleComplete(){
    }



    return(
        <div className={isFull? 'plan_container full' : 'plan_container'} style={isFull ? {height: contentHeight } : {height: '80px'}} onClick={handlePlanUnfold}>
            <div className='left_plan'>
                <div className='complete_circle'  style={{backgroundColor:backgroundCircle, outline:`1px solid ${circleColor}`}}></div>
                <div className='plan_data'>
                    <div className='plan_header'>
                        {header}
                    </div>
                    <div className={isFull ? 'plan_date date_compressed' : 'plan_date'}>
                        <div className='plan_day'>
                            {date}
                        </div>
                        <div className='plan_time'>
                            {time}
                        </div>
                    </div>
                    <div className='plan_text' onChange={handleChange}>
                        {text}
                    </div>
                </div>
            </div>
            <div className='right_plan'>

                {tagArr.map((el)=>(
                    <PlanTag tagColor = {el.tagColor} tagText = {el.tagText}></PlanTag>
                    )
                )}

            </div>
        </div>
    )
}

