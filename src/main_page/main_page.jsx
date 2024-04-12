import "./main_page.css"
import Header from "./header/header"; 
import Sidebar from "./sidebar/sidebar";
import Main from "./main/main";
import Today from "./main/today/today";
import Complete from "./main/complete/complete";
import Outtimed from "./main/outtimed/outtimed";
import Timeline from "./main/timeline/timeline";
import AddPlan from "./main/add_plan/add_plan";
import ChoosedDate from "./main/choosed_date/choosed_date";

import { useState } from "react";
import { useEffect } from "react";
import axios from "../api/axios";
import Found from "./main/found/choosed_date";

function MainPage({accessToken}) {
  const[date, setDate] = useState(new Date());
  const[choosedTags, setChoosedTags] = useState([]);
  const[planText, setPlanText] = useState('');
  const[calendarValue, setCalendarValue] = useState(date);
  const[hours, setHours] = useState((date.getHours() < 10 ? '0' : '').toString() + date.getHours().toString())
  const[minutes, setMinutes] = useState((date.getMinutes() < 10 ? '0' : '').toString() + date.getMinutes().toString())
  const[headerText, setHeaderText] = useState('');
  const[todayPlans, setTodayPlans] = useState([])
  const[outtimedPlans, setOuttimedPlans] = useState([])
  const[completePlans, setCompletePlans] = useState([])
  const[choosedDate, setChoosedDate] = useState()
  const[item, setItem] = useState(0)

  const[amountOuttimed, setAmountOuttimed] = useState(outtimedPlans.length);
  const[amountComplete, setAmountComplete] = useState(0);
  const[amountToday, setAmountToday] = useState(todayPlans.length);
  const[shownTags, setShownTags] = useState([]);  

  const dayjs = require('dayjs')
  require('dayjs/locale/ru')
  dayjs.locale('ru')
  dayjs().format()
  var customParseFormat = require('dayjs/plugin/customParseFormat')
  dayjs.extend(customParseFormat)

  const[timelinePlans, setTimelinePlans]= useState([])
  const[timelinePlansAmount, setTimelinePlansAmount]= useState(0)

  async function getTasksByMonth(month){
    const tasks = await axios.get(`/tasks/month/${month}`)
    return tasks.data
  }

  useEffect(()=>{
    setAmountToday(todayPlans.length)
  }, [todayPlans])

  useEffect(()=>{
    const access_token = localStorage.getItem('token')
    axios.defaults.headers.common ={'Authorization': `Bearer ${access_token}`}
    axios.get('/tasks/outdated')
    .then(data => {
      setAmountOuttimed(data.data.length)
      setOuttimedPlans(data.data)
      // console.log(outtimedPlans)
    })
    .catch(err => console.log(err))

    axios.get(`/tasks/tasks_by_date/${dayjs().format('YYYY-MM-DD')}`).then(data=>{
      setTodayPlans(data.data)
      setAmountToday((data.data).length)
    })
    .catch(err => console.log(err))

      async function fetchData(){
        const prevMonth = await getTasksByMonth(dayjs(dayjs().subtract(1, 'month')).format('YYYY-MM-DD'))
        const currMonth = await getTasksByMonth(dayjs().format('YYYY-MM-DD'))
        const nextMonth = await getTasksByMonth(dayjs(dayjs().add(1, 'month')).format('YYYY-MM-DD'))
       
        setTimelinePlans([...prevMonth, ...currMonth, ...nextMonth])
        setTimelinePlansAmount([...prevMonth, ...currMonth, ...nextMonth].length)
      }
      fetchData()   

    },[])

    useEffect(()=>{
      console.log(choosedTags)
    }, [choosedTags])


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
    axios.post('/tasks',{
      title: headerText,
      content: planText,
      starts_at: dayjs(calendarValue).format('YYYY-MM-DD')
    })
    .then(resp => {
        axios.post(`/tags/${resp.data.id}`, 
        {
          id: choosedTags
        })
    })
    .catch(err => console.log(err))
    setHeaderText('')
    setCalendarValue(date)
    setPlanText('')
    setChoosedTags([])
    setShownTags([])
  }

  const[query, setQuery]= useState('')
  const[answer, setAnswer]= useState([])


  let mainContent = <Today completePlans={completePlans} amount = {amountToday} plans={todayPlans} 
  setTodayPlans = {setTodayPlans} setCompletePlans = {setCompletePlans} todayPlans={todayPlans}></Today>

  if(activeMain === 'Сегодня'){
    mainContent = <Today completePlans={completePlans} amount = {amountToday} plans={todayPlans} 
    setCompletePlans = {setCompletePlans} setTodayPlans = {setTodayPlans} todayPlans={todayPlans}></Today>
  }
  else if(activeMain === 'Таймлайн'){
    mainContent = <Timeline plans={timelinePlans}></Timeline>
  }
  else if(activeMain === 'Просроченные'){
    mainContent = <Outtimed completePlans={completePlans} circleColor={'#FF4040'} setCompletePlans = {setCompletePlans} setPlansArr = {setOuttimedPlans}
    backgroundCircle = {'#FF404010'} plans = {outtimedPlans} amount = {amountOuttimed}
    setOuttimedPlans = {setOuttimedPlans}></Outtimed>
  }
  else if(activeMain === 'Выполненые'){
    mainContent = <Complete setCompletePlans={setCompletePlans}
    circleColor={'#63FF2D'} backgroundCircle = {'#63FF2D10'} plans = {completePlans}></Complete>
  }
  else if(activeMain === 'Добавить'){
    mainContent = <AddPlan tagsArr={tagArr} setTagsArr = {setTagArr} setShownTags = {setShownTags}
    choosedTags = {choosedTags} planText = {planText} shownTags = {shownTags}
    calendarValue = {calendarValue} hours = {hours} minutes = {minutes}
    setCalendarValue = {setCalendarValue} setPlanText = {setPlanText}
    setChoosedTags = {setChoosedTags} setHours = {setHours} setMinutes = {setMinutes}
    headerText = {headerText} setHeaderText = {setHeaderText} onCircleClick = {addPlan}></AddPlan>
  }
  else if(activeMain === 'День'){
    mainContent = <ChoosedDate setCompletePlans={setCompletePlans} completePlans = {completePlans}
    choosedDate={dayjs(choosedDate).format('YYYY-MM-DD')}></ChoosedDate>
  }
  else if(activeMain === 'Поиск'){
    mainContent = <Found plans = {answer} query = {query} completePlans = {completePlans} 
    setCompletePlans = {setCompletePlans} setAnswer = {setAnswer}></Found>
  }


  function handleSearch(el){
    setQuery(el.target.value)
    axios.get(`/tasks/search/${query}`)
    .then(data => {
        if(data.status === 405){
            setAnswer([])
        }
        else{
            setAnswer(data.data)
            setActiveMain('Поиск')
        }
        
    })
    .catch(err => console.log(err))
}
  function handleVarClick(index){
    alert('1')
    setActiveMain('поиск')
    setItem(answer[index])
}

  
  return (
    <>
      <div className = 'main'>
        <Header onAddTagClick={handleAddTagClick} setChoosedDate = {setChoosedDate} handleSearch = {handleSearch}
        setMain = {setActiveMain} varClick={handleVarClick} mainContent = {mainContent} choosedDate = {choosedDate}
        query = {query} answer = {answer}></Header>
        <div className="row">
          <Sidebar handleClick= {handleMain} active={activeMain} tags ={tagArr} isShown ={isShown}
          setTagArr ={setTagArr} setIsShown= {setIsShown} todayAmount = {amountToday}
          timelineAmount = {timelinePlansAmount} outtimedAmount = {amountOuttimed} completeAmount = {completePlans.length}
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
