import './sidebar_button.css'

export default function SidebarButton({onClick, image, children, style, amount}){
    return(
        <div className='column_sidebar' style={{marginTop:`${style}px`}}>
            <button onClick={onClick} className='sidebar_button'>
                <div className='left'>
                    <img src={image} alt={image} />
                    <span>{children}</span>
                </div>
                <span className='to_do_count'>
                    {amount}
                </span>
            </button>
        </div>
    )
}