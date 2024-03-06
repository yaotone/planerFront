import "./button.css"

export default function Button({children, onClick}){

    return(
        <>
        <button className="submit_button" onClick={onClick} type="submit">{children}</button>
        </>
    )
}