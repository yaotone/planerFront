import './today.css'
import Plan from './plan'
import { useState } from 'react';
import { useEffect } from 'react';
import axios from '../../../api/axios';

export default function Outtimed({circleColor, backgroundCircle, plans, setCompletePlans, amount, setPlansArr}){
    const[tempArr,setTempArr] = useState([])

    const [isEmpty, setIsEmpty] = useState(false);

    const dayjs = require('dayjs')
    require('dayjs/locale/ru')
    dayjs.locale('ru')
    dayjs().format()
    var customParseFormat = require('dayjs/plugin/customParseFormat')
    dayjs.extend(customParseFormat)


    useEffect(()=>{
        axios.get('/tasks/all')
        .then((data) => {
            setTempArr(data.data)
      })
      .then(()=>{
        setPlansArr([]);
        console.log(tempArr)
        for(let i=0; i<tempArr.length; i++ ){
            if(dayjs(tempArr[i].starts_at).isBefore(dayjs())){
                console.log(tempArr[i])
                setPlansArr(...plans, tempArr[i])
            }
        }
        (amount === 0) ? setIsEmpty(true) : setIsEmpty(false);
      })
      .finally(()=>{

      })
    },[])

    return(
        <div className='plans_container'>
            <div className='plans_header'>
                <p>Сегодня</p>
            </div>
            <div className='plans_horizontal'></div>
            <p className={isEmpty ? 'empty' : 'not_empty'}>Здесь пусто!</p>
            {plans.map((item, index)=>
                <Plan tagArr={[]} key={item.id} header = {item.title} date ={dayjs(item.starts_at).format('MMMM DD')} 
                text = {item.content} circleColor = {circleColor} backgroundCircle = {backgroundCircle}></Plan>
            )}
        </div>
    )
}