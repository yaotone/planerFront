import './sidebar_button.css'

export default function SidebarButton({onClick, image, children, style, amount, isActive}){
//     console.log(document.querySelector('.sidebar').classList);
//     let buttonClass;
//     if((isActive === children) && 
//     document.querySelector('.sidebar').classList.contains('active_sidebar')){
//         buttonClass = 'sidebar_button active_button sidebar_button_show';
//     }
//     else if(!(isActive === children) && 
//     document.querySelector('.sidebar').classList.contains('active_sidebar')){
//         buttonClass = 'sidebar_button sidebar_button_show'
//     }
//     else if((isActive === children) && 
//     !document.querySelector('.sidebar').classList.contains('active_sidebar')){
//         buttonClass = 'sidebar_button active_button'
//     }
//     else{
//         buttonClass = 'sidebar_button'
//     }

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