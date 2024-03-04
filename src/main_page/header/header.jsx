import './header.css';
import Switch from './switch';
function handleSwitch(){
    document.querySelector('.sidebar').classList.toggle("active");
}

export default function Header(){
    return(
        <div className="header">
            <Switch onClick={handleSwitch}></Switch>
        </div>
    )
}