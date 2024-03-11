import "./sidebar.css"
import SidebarButton from "./sidebar_button"
import today from "../../icons/today.png"
import timeline from "../../icons/timeline.png"
import missed from "../../icons/missed.png"
import complete from "../../icons/complete.png"
import { useState } from "react"
import Folder from "./folder"


export default function Sidebar({handleClick, active}){

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
            <SidebarButton style={40} image={today} amount={"4"} onClick={()=>handleActive('Сегодня')} isActive={active}>Сегодня</SidebarButton>
            <SidebarButton image={timeline} amount={"20"} onClick={()=>handleActive('Таймлайн')} isActive={active}>Таймлайн</SidebarButton>
            <SidebarButton image={missed} amount={"1"} onClick={()=>handleActive('Просроченные')} isActive={active}>Просроченные</SidebarButton>
            <SidebarButton image={complete} amount={"1"} onClick={()=>handleActive('Выполненые')} isActive={active}>Выполненые</SidebarButton>
            <div className="horizontal">
                <hr />
            </div>
            <Folder onClick={handleFolderClick} isUnfold={isUnfold}></Folder>
        </div>
    )
}