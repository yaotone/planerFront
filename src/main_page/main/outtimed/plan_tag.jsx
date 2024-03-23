import './plan_tag.css'

export default function PlanTag({tagColor, tagText}){
    return(
        <div className='plan_tag_container'>
            <div className='plan_tag_circle' style={{backgroundColor: tagColor}}>

            </div>
            <div className='plan_tag_text'>
                {tagText}
            </div> 
        </div>
    )
}