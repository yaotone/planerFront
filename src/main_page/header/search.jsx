import "./search.css"
import "../../icons/magnifying_glass.png"
import Variant from "./search_variant"
import loupe from '../../icons/magnifying_glass.png'
import axios from "../../api/axios"
import { useEffect, useState } from "react"
import { useRef } from "react"
import Found from "../main/found/choosed_date"

export default function Search({mainContent, setMain, handleVarClick, handleSearch, query, answer}){
    const[isVisible, setIsVisible] = useState(false)
    const varRef = useRef(null)



    function handleFocus(){
        setIsVisible(true)
    }
    function handleBlur(){
        setIsVisible(false)
    }


    return(
        <div className="column">
            <div className="search_div">
                <img src={loupe} className="loupe" alt="loupe"/> 
                <input placeholder="Быстрый поиск..." ref={varRef} onFocus ={handleFocus}
            className="search" onInput={handleSearch} value = {query} onBlur={handleBlur}/>
            
            </div>
{/*             
            {   
                [...answer].map((item, index)=>
                <Variant key={index} onClick={()=>handleVarClick(index)} isVisible={isVisible} margin={(index+1)*30}>{item.title}</Variant>)
            } */}
        </div>
    )
}