import './tag.css'

export default function Tag({children, color, onTagClick}){
    return(
        <div className='tag_container' onClick={onTagClick}>
            <div className='circle_container'>
                <div className='circle' style={{backgroundColor: color}}>

                </div>
                <span className='tag_name'>
                {children}
                </span>
            </div>
        </div>
    )
}