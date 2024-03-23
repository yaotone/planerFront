import './calendar.css'
import calendar from '../../icons/calendar.png'

export default function Calendar({onClick}){
    return(
        <>
            <div className='calendar_button' onClick={onClick}>
                <img src={calendar} alt="calendar" className='calendar'/>
            </div>
        </>
    )
}