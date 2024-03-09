import './folder.css'
import unfold from '../../icons/unfold.png'
import add from '../../icons/add.png'
import Tag from './tag'

export default function Folder({onClick, isUnfold}){
    return(
        <>
            <div className='folder_container'>
                <input type="checkbox" id='folder' onClick={onClick}/>
                <label htmlFor="folder" className='folder'>
                    <div className='folder_left'>
                        <div className='unfold_container'>
                            <img src={unfold} alt="unfold" className='unfold'/>
                        </div>              
                        <div className='text'>
                            Метки
                        </div>
                    </div>
                    <div className='folder_right'>
                        <button className='add_tag'>
                            <img src={add} alt="add" className='add'/>
                        </button>
                    </div>
                </label>
            </div>
            <div className={isUnfold ? 'dropdown_container dropdown_show' : 'dropdown_container'}>
                <Tag color={'red'}>Важное</Tag>
                <Tag color={'#63FF2D'}>Купить</Tag>
                <Tag color={'#E021FF'}>Подарок</Tag>
            </div>
        </>
    )
}