import React, { useEffect, useState } from "react";
import HistorySummary from "./HistoryComponents/HistorySummary";
import HistoryContent from "./HistoryComponents/HistoryContent";
const History = (props) => {
    const { Client } = props
    const [client, setClient] = useState([])
    useEffect(() => {
        setClient(Client)
    }, [Client])
    return (
        <div className="record-client">
            <HistorySummary Client={client}></HistorySummary>
            <HistoryContent Client={client}></HistoryContent>
        </div>
    );
}

export default History;