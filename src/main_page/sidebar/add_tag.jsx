import './add_tag.css'
import './tag.css'
import check from '../../icons/check.png'
import { useState } from 'react'

export default function AddTag({onAdd, isShown, onChangeColor, onChangeText}){
    function handleColor(e){
        onChangeColor(e.target.value);
    }

    function handleText(e){
        onChangeText(e.target.value);
    }

    return(
        <div className={(isShown === 'yes') ? 'add_tag_container show_add_tag' : 'add_tag_container'}>
            
            <div className='input_color'>
                <input type='color' className='choose_color' 
                onChange={handleColor}/>
                            <span className='tag_input'>
                <input type="text" className='add_tag_name' 
                maxLength={19} onChange={handleText}/>
            </span>
            </div>
            <div className='check'>
                <button className='check_button' onClick={onAdd}>
                    <img src={check} alt="check" className='check_icon'/>
                </button>
            </div>

        </div>
    )
}