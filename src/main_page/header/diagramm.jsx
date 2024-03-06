import './diagramm.css'

export default function Diagramm({percents}){

    return(
        <div className="pie" style={{background:`conic-gradient(white ${percents}%, #333333 ${percents}%)`}}></div>
    )
}