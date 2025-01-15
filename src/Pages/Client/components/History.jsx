import React, { useEffect, useState } from "react";
import HistorySummary from "./HistoryComponents/HistorySummary";
import HistoryContent from "./HistoryComponents/HistoryContent";
import DetailOrder from "./HomeComponents/DetailOrder";
const History = (props) => {
    const { Client } = props
    const [client, setClient] = useState([])
    const [OrderId, setOrderId] = useState("");
    const [overlay, sendOverlay] = useState(false);

    useEffect(() => {
        setClient(Client)
    }, [Client])

    const handleOverlay = (value) => {
        sendOverlay(true)
        setOrderId(value)
    }
    const hiddenOverlay = (value) => {
        sendOverlay(value)
    }
    return (
        <div className="record-client">
            <HistorySummary Client={client}></HistorySummary>
            <HistoryContent  sendOverlayClass={handleOverlay} Client={client}></HistoryContent>
            {overlay && <DetailOrder OrderId={OrderId} hidden={hiddenOverlay} ></DetailOrder>}
        </div>
    );
}

export default History;