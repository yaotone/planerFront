import { Children } from 'react'
import './tag.css'

export default function Tag({children, color}){
    return(
        <div className='tag_container'>
            <div className='circle_container'>
                <div className='circle' style={{backgroundColor: color}}>

                </div>
            </div>
            <span className='tag_name'>
                {children}
            </span>
        </div>
    )
}