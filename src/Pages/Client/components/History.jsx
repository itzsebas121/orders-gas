import React from "react";
import HistorySummary from "./HistoryComponents/HistorySummary";
import HistoryContent from "./HistoryComponents/HistoryContent";
const History = () => {
    return (
        <div className="record-client">
            <HistorySummary OrderId={1}></HistorySummary>
            <HistoryContent></HistoryContent>
        </div>
    );
}

export default History;