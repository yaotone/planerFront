import './plan.css'
import { useState } from 'react';
import PlanTag from './plan_tag';

export default function Plan(circle_color){

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
                <div className='complete_circle'></div>
                <div className='plan_data'>
                    <div className='plan_header'>
                        Заголовок 
                    </div>
                    <div className={isFull ? 'plan_date date_compressed' : 'plan_date'}>
                        <div className='plan_day'>
                            1 января
                        </div>
                        <div className='plan_time'>
                            12:30
                        </div>
                    </div>
                    <div className='plan_text' onChange={handleChange}>
                        lwfnelwnflewnlkdnewwwe nnn
                        weflmewklfnklwenfklnweklnfklwenlfnweklnflkwenlkfnwelknflewnlkfnwfewfewf
                        efewfwefwenlfnwenfklw
                        efwfklweflwnelkfnklwef
                        lwfnelwnflewnlkdnewwwe nnn
                        lwfnelwnflewnlkdnewwwe nnn
                        weflmewklfnklwenfklnweklnfklwenlfnweklnflkwenlkfnwelknflewnlkfnwfewfewf
                        efewfwefwenlfnwenfklw
                        efwfklweflwnelkfnklwef
                        lwfnelwnflewnlkdnewwwe nnn
                        lwfnelwnflewnlkdnewwwe nnn
                        weflmewklfnklwenfklnweklnfklwenlfnweklnflkwenlkfnwelknflewnlkfnwfewfewf
                        efewfwefwenlfnwenfklw
                        efwfklweflwnelkfnklwef
                        lwfnelwnflewnlkdnewwwe nnn
                    </div>
                </div>
            </div>
            <div className='right_plan'>

                <PlanTag></PlanTag>
                <PlanTag></PlanTag>
                <PlanTag></PlanTag>

            </div>
        </div>
    )
}

