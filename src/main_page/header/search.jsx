import "./search.css"
import "../../icons/magnifying_glass.png"
import Variant from "./search_variant"
import loupe from '../../icons/magnifying_glass.png'

export default function Search(){
    return(
        <div className="column">
            <div className="search_div">
                <img src={loupe} className="loupe" alt="loupe"/>
                <input placeholder="Быстрый поиск..." 
            className="search" />
            </div>
            
            {/* <Variant>fnlsnflksd</Variant>
            <Variant>dwkfbdk</Variant>
            <Variant>fjlknjn</Variant> */}
        </div>
    )
}