import './header.css';
import Switch from './switch';
import Search from './search';
import plus_todo from '../../icons/plus_todo.png'
import Calendar from './calendar';
import Diagramm from './diagramm';
import exit from '../../icons/exit.png'


function handleSwitch(){
    document.querySelector('.sidebar').classList.toggle("active_sidebar");
    document.querySelector('.tasks_menu').classList.toggle("move_task_menu");
    let sidebar_buttons = document.querySelectorAll('.sidebar_button');
    sidebar_buttons.forEach((e)=>e.classList.toggle('sidebar_button_show'));
}

export default function Header(){
    return(
        <>
            <div className="header">
                <div className='search_menu'>
                    <Switch onClick={handleSwitch}></Switch>
                    <Search />
                </div>
                <div className='tasks_menu'>
                    <button className='plus_button'>
                        <img className='plus_todo' src={plus_todo} alt='add'/> 
                    </button>
                    <Calendar></Calendar>
                    <Diagramm percents={1/4*100} />
                    <span className='tasks_complete' title=
                    'Выполненые задания из всех поставленных на сегодня'
                    >1/4</span>
                </div>
                <div className='exit'>
                    <img className="exit_icon" src={exit} alt="exit" />
                </div>
            </div>
        </>
    )
}