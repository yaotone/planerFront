import './header.css';
import Switch from './switch';
import Search from './search';

function handleSwitch(){
    document.querySelector('.sidebar').classList.toggle("active_sidebar");
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

                </div>
            </div>
        </>
    )
}