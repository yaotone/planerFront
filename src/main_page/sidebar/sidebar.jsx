import "./sidebar.css"
import SidebarButton from "./sidebar_button"
import today from "../../icons/today.png"
import timeline from "../../icons/timeline.png"
import missed from "../../icons/missed.png"
import complete from "../../icons/complete.png"

export default function Sidebar(){
    return(
        <div className="sidebar">
            <SidebarButton style={40} image={today} amount={"4"}>Сегодня</SidebarButton>
            <SidebarButton image={timeline} amount={"20"}>Таймлайн</SidebarButton>
            <SidebarButton image={missed} amount={"1"}>Просроченные</SidebarButton>
            <SidebarButton image={complete} amount={"1"}>Выполненые</SidebarButton>
        </div>
    )
}