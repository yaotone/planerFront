import "./main_page.css"
import Header from "./header/header"; 
import Sidebar from "./sidebar/sidebar";
import Main from "./main/main";
import Today from "./main/today/today";
import Complete from "./main/complete/complete";
import Outtimed from "./main/outtimed/outtimed";
import Timeline from "./main/timeline/timeline";
import AddPlan from "./main/add_plan/add_plan";

import { useState } from "react";
import { useEffect } from "react";

function MainPage() {
  const[date, setDate] = useState(new Date());
  const[choosedTags, setChoosedTags] = useState([]);
  const[planText, setPlanText] = useState('');
  const[calendarValue, setCalendarValue] = useState([date,date]);
  const[hours, setHours] = useState((date.getHours() < 10 ? '0' : '').toString() + date.getHours().toString())
  const[minutes, setMinutes] = useState((date.getMinutes() < 10 ? '0' : '').toString() + date.getMinutes().toString())
  const[headerText, setHeaderText] = useState('');
  const[todayPlans, setTodayPlans] = useState([])
  const[outtimedPlans, setOuttimedPlans] = useState([])
  const[completePlans, setCompletePlans] = useState([])

  const[amountOuttimed, setAmountOuttimed] = useState(outtimedPlans.length);
  const[amountComplete, setAmountComplete] = useState(completePlans.length);
  const[amountToday, setAmountToday] = useState(todayPlans.length);  

  useEffect(()=>{
    setAmountComplete(completePlans.length)
    setAmountOuttimed(outtimedPlans.length)
    setAmountToday(todayPlans.length)
  })

  const [tagArr, setTagArr] = 
  useState([{tagColor: 'red', tagText: 'fwfwefw'}, {tagColor: 'black', tagText: 'text2'}])

  const [isShown, setIsShown] = useState('no');

  const [activeMain, setActiveMain] = useState('Сегодня');
  function handleMain(activeMain){
    setActiveMain(activeMain);
  }

  function handleAddTagClick(){
    setActiveMain('Добавить');
  }

  function addPlan(){
    setTodayPlans([...todayPlans,
      {
        header: headerText,
        date: calendarValue.toLocaleString('ru-RU',
        {month: 'long', day: 'numeric'}).replace(',', ' - '),
        time: `${hours}:${minutes}`,
        text: planText,
        tags: choosedTags
      }
    ]);
    setHeaderText('')
    setCalendarValue([date, date])
    setHours((date.getHours() < 10 ? '0' : '').toString() + date.getHours().toString())
    setMinutes((date.getMinutes() < 10 ? '0' : '').toString() + date.getMinutes().toString())
    setPlanText('')
    setChoosedTags([])
  }


  let mainContent = <Today plans={todayPlans} ></Today>

  if(activeMain === 'Сегодня'){
    mainContent = <Today plans={todayPlans}></Today>
  }
  else if(activeMain === 'Таймлайн'){
    mainContent = <Timeline></Timeline>
  }
  else if(activeMain === 'Просроченные'){
    mainContent = <Outtimed circleColor={'#FF4040'} backgroundCircle = {'#FF404010'} plans = {outtimedPlans}></Outtimed>
  }
  else if(activeMain === 'Выполненые'){
    mainContent = <Complete circleColor={'#63FF2D'} backgroundCircle = {'#63FF2D10'} plans = {completePlans}></Complete>
  }
  else if(activeMain === 'Добавить'){
    mainContent = <AddPlan tagsArr={tagArr} setTagsArr = {setTagArr}
    choosedTags = {choosedTags} planText = {planText} 
    calendarValue = {calendarValue} hours = {hours} minutes = {minutes}
    setCalendarValue = {setCalendarValue} setPlanText = {setPlanText}
    setChoosedTags = {setChoosedTags} setHours = {setHours} setMinutes = {setMinutes}
    headerText = {headerText} setHeaderText = {setHeaderText} onCircleClick = {addPlan}></AddPlan>
  }

  
  return (
    <>
      <div className = 'main'>
        <Header onAddTagClick={handleAddTagClick}></Header>
        <div className="row">
          <Sidebar handleClick= {handleMain} active={activeMain} tags ={tagArr} isShown ={isShown}
          setTagArr ={setTagArr} setIsShown= {setIsShown} todayAmount = {amountToday}
          timelineAmount = {10} outtimedAmount = {amountOuttimed} completeAmount = {amountComplete}
          ></Sidebar>
          <Main>
            {mainContent}
          </Main>
        </div>
        
      </div>
    </>
  );
}



export default MainPage;
