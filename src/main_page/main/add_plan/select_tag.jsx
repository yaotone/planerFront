import './select_tag.css'
import Tag from '../../sidebar/tag'
import { useState } from 'react'

export default function SelectTag({isShown, onClose, tagsArr, onTagClick}){

    return(
        <div className={isShown ? 'select_tag_container' : 'select_tag_container_hidden'}>
            <div className='close_tags_container' >
                <div className='close_tags' onClick={onClose}>
                    <div id='close_bar1'></div>
                    <div id='close_bar2'></div>
                </div>
            </div>
            {[...tagsArr].map((item,index)=>
                <Tag key={index} color = {item.tagColor} children = {item.tagText} onTagClick = {() => onTagClick(index)}></Tag>
            )}
        </div>
    )
}