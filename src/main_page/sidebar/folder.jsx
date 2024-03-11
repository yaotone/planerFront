import './folder.css'
import unfold from '../../icons/unfold.png'
import add from '../../icons/add.png'
import Tag from './tag'
import UserTag from './user_tag'
import AddTag from './add_tag'
import { useState } from 'react'


export default function Folder({onClick, isUnfold}){

    const [tagArr, setTagArr] = 
    useState([{tagColor: 'red', tagText: 'fwfwefw'}, {tagColor: 'black', tagText: 'text2'}])
    // max 19 symbols
    const [isShown, setIsShown] = useState('no');

    function remove(index){
        setTagArr([...tagArr.slice(0, index),
            ...tagArr.slice(index+1)])
    }

    function handleCancel(){
        if(isShown === 'no'){
            setIsShown('yes');
        }
        else{
            setIsShown('no');
        }
    }


    const[color, setColor] = useState('');
    const[text, setText] = useState('');


    function handleChangeColor(color){
        setColor(color);
    }

    function handleChangeText(text){
        setText(text);
    }

    function handleOnAdd(){
        let newUserTag = {
            tagColor: color,
            tagText: text
        }
        setIsShown('no');
        setTagArr([...tagArr, newUserTag]);
    }

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
                        <button className='add_tag' onClick={handleCancel} disabled={!isUnfold}>
                            <img src={add} alt="add" className={(isShown==='yes' ? 'add add_rotate' : 'add')}/>
                        </button>
                    </div>
                </label>
            </div>
            <div className={isUnfold ? 'dropdown_container dropdown_show' : 'dropdown_container'}>
                <Tag color={'red'}>Важное</Tag>
                <Tag color={'#63FF2D'}>Купить</Tag>
                <Tag color={'#E021FF'}>Подарок</Tag>

                { [...tagArr].map((item, index) => 
                <UserTag key={index} color={item.tagColor} onClick={()=>remove(index)}> 
                {item.tagText} </UserTag> ) }

                <AddTag onAdd={handleOnAdd} isShown={isShown}
                onChangeColor={handleChangeColor} onChangeText={handleChangeText}
                ></AddTag>
            </div>
        </>
    )
}