import './mini_tag.css'

export default function MiniTag({color, text, onClick}){
    return(
        <div className='mini_tag_container' onClick={onClick}>
            <div className='mini_tag_circle' style={{backgroundColor: color}}></div>
            <div className='mini_tag_text'>{text}</div>
        </div>
    )
}