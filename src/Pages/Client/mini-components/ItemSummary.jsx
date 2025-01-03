import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReorder } from "@fortawesome/free-solid-svg-icons";
import './styles.css'
const ItemSummary = (props) => {
    const { title, value} = props
    return (
        <div className="item-summary">
            <div className="content-summary">
                <h4>{title}</h4>
                <p>{value}</p>
            </div>
        </div>
    );
}
export default ItemSummary;