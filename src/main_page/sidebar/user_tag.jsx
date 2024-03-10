import './user_tag.css'
import './tag.css'
import del from '../../icons/delete.png'

export default function UserTag({color, children, onClick}){
    return(
    <div className='tag_container'>
        <div className='circle_container'>
            <div className='circle' style={{backgroundColor: color}}>
            </div>
            <span className='tag_name'>
                {children}
            </span>
        </div>
        <div className='delete_container'>
            <button className='delete_button' onClick={onClick}>
                <img src={del} alt="delete" className='delete'/>
            </button>
        </div>
    </div>
    )
}