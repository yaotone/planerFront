import "./main_page.css"
import Header from "./header/header"; 
import Sidebar from "./sidebar/sidebar";
import Main from "./main/main";
import Today from "./main/today/today";
import Complete from "./main/complete/comlete";
import Outtimed from "./main/outtimed/outtimed";
import Timeline from "./main/timeline/timeline";

import { useState } from "react";

function MainPage() {

  const [activeMain, setActiveMain] = useState('Сегодня');
  function handleMain(activeMain){
    setActiveMain(activeMain);
  }

  let mainContent = <Today></Today>

  if(activeMain === 'Сегодня'){
    mainContent = <Today></Today>
  }
  else if(activeMain === 'Таймлайн'){
    mainContent = <Timeline></Timeline>
  }
  else if(activeMain === 'Просроченные'){
    mainContent = <Outtimed></Outtimed>
  }
  else if(activeMain === 'Выполненные'){
    mainContent = <Complete></Complete>
  }
  
  return (
    <>
      <div className = 'main'>
        <Header></Header>
        <div className="row">
          <Sidebar handleClick= {handleMain} active={activeMain}></Sidebar>
          <Main>
            {mainContent}
          </Main>
        </div>
        
      </div>
    </>
  );
}



export default MainPage;
