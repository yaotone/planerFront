import './choosed_date.css'

export default function ChoosedDate({choosedDate}){
    return(
        <div className='add_plan_container'>
                <div className='add_plan_header'>
                    <p>{choosedDate}</p>
                </div>
                <div className='plans_horizontal'></div>
                
            </div>
    )
}