import './calendar.css'
import calendar from '../../icons/calendar.png'

export default function Calendar(){
    return(
        <>
            <div className='calendar_button'>
                <img src={calendar} alt="calendar" className='calendar'/>
            </div>
        </>
    )
}