import "./button.css"

export default function Button({children, onClick}){

    return(
        <>
        <button onClick={onClick} type="submit">{children} </button>
        </>
    )
}