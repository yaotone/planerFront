import { useEffect } from "react"
import "./search_variant.css"

export default function Variant({children, margin, isVisible, onClick}){
    return(
        <div onClick={onClick} className={isVisible ? "variant": "variant_hide"} style={{marginTop: `${margin}px`}}>
            <span>{children}</span>
        </div>
    )
}