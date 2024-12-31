import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocation, faClock, faCalendar, faUser} from "@fortawesome/free-solid-svg-icons";
const ItemState = (props) => {
    const { typeIcon, title, value} = props;
    return (
         <div className="item-state">
            {typeIcon === "location" && <FontAwesomeIcon icon={faLocation} />}
            {typeIcon === "clock" && <FontAwesomeIcon icon={faClock} />}
            {typeIcon === "calendar" && <FontAwesomeIcon icon={faCalendar} />}
            {typeIcon === "user" && <FontAwesomeIcon icon={faUser} />}
            <div className="detail-item-state">
                <h4>{title}</h4>
                <p>{value}</p>
            </div>
        </div>
    );
}
export default ItemState;