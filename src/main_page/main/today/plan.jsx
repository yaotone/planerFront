import './plan.css'
import { useState } from 'react';
import PlanTag from './plan_tag';
import { useEffect } from 'react';
import { useRef } from 'react';


export default function Plan({header, date, time,text,tagArr, circleColor, onCircleClick}){

    const ref = useRef(null)

    const [isFull, setIsFull] = useState(false);
    const [contentHeight, setContentHeight] = useState('80px')

    useEffect(()=>{
        setContentHeight(ref.current.getBoundingClientRect().height + 60+'px')
    })

    function handlePlanUnfold(){
        setIsFull(!isFull)
    }

    function handleComplete(){
    }



    return(
        <div className={isFull? 'plan_container full' : 'plan_container'} style={isFull ? {height: contentHeight } : {height: '80px'}} onClick={handlePlanUnfold}>
            <div className='left_plan'>
                <div className='complete_circle' onClick={onCircleClick}
                style={{backgroundColor: circleColor, outline: circleColor}}></div>
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
                    <div className='plan_text' ref={ref}>
                        {text}
                    </div>
                </div>
            </div>
            <div className='right_plan'>

                {/* {tagArr.map((el)=>(
                    <PlanTag tagColor = {el.tagColor} tagText = {el.tagText}></PlanTag>
                    )
                )} */}

            </div>
        </div>
    )
}

