import "./sidebar.css"
import SidebarButton from "./sidebar_button"
import today from "../../icons/today.png"
import timeline from "../../icons/timeline.png"
import missed from "../../icons/missed.png"
import complete from "../../icons/complete.png"
import { useState } from "react"
import Folder from "./folder"


export default function Sidebar({handleClick, active, tags, isShown, setTagArr, setIsShown,
    outtimedAmount, completeAmount, timelineAmount, todayAmount}){

    function handleActive(active){
        handleClick(active);
    }

    const [isUnfold, setIsUnfold] = useState(false);

    function handleFolderClick(){
        if(isUnfold === true){
            setIsUnfold(false)
        }
        else{
            setIsUnfold(true)
        }
        
    }

    return(
        
        <div className="sidebar">
            <SidebarButton style={40} image={today} amount={`${todayAmount}`} onClick={()=>handleActive('Сегодня')} isActive={active}>Сегодня</SidebarButton>
            <SidebarButton image={timeline} amount={`${timelineAmount}`} onClick={()=>handleActive('Таймлайн')} isActive={active}>Таймлайн</SidebarButton>
            <SidebarButton image={missed} amount={`${outtimedAmount}`} onClick={()=>handleActive('Просроченные')} isActive={active}>Просроченные</SidebarButton>
            <SidebarButton image={complete} amount={`${completeAmount}`} onClick={()=>handleActive('Выполненые')} isActive={active}>Выполненые</SidebarButton>
            <div className="horizontal">
                <hr />
            </div>
            <Folder onClick={handleFolderClick} isUnfold={isUnfold} 
            tagArr = {tags} isShown ={isShown} setIsShown ={setIsShown} setTagArr = {setTagArr}></Folder>
        </div>
    )
}