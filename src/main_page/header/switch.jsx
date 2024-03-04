import "./switch.css"

export default function Switch({onClick}){
    return(
        <>
            <input type="checkbox" id="checkbox" onClick={onClick}/>
            <label htmlFor="checkbox" className="toggle" >
                <div className="bars" id="bar1"></div>
                <div className="bars" id="bar2"></div>
                <div className="bars" id="bar3"></div>
            </label>
        </>
    )
}