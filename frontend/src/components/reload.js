import React from 'react'
import reload from "../assets/image/refresh.png"
import "../assets/css/reload.css"
export default function Reload(props) {
    return (
        <div id="reload">
            <div className="text">
                Unfortunately, something bad happened,Please try to reload it
            </div>
            <div className="reload-icon">
                <img className="reload-image" src={reload} alt="refresh" onClick={()=>props.refresh()}/>
            </div>
        </div>
    )
}
