import './sidebar_button.css'

export default function SidebarButton({onClick, image, children, style, amount, isActive}){

    return(
        <div className='column_sidebar' style={{marginTop:`${style}px`}}>
            <button onClick={onClick} className={(isActive === children) ? 'sidebar_button active_button' : 'sidebar_button'}>
                <div className='left'>
                    <img src={image} alt={image} />
                    <span>{children}</span>
                </div>
                <span className={(isActive === children) ? 'to_do_count to_do_count_active' : 'to_do_count'}>
                    {amount}
                </span>
            </button>
        </div>
    )
}