import React from "react";
import ItemSummary from "../../mini-components/ItemSummary";
import './styles.css'
const HistorySummary = () => {
    return (
        <div className="container-summary">

            <div className="title-summary">
                <p> <b>Resumen del cliente: </b> Tipan</p>
            </div>
            <div className="items-summary">
                <ItemSummary title={'Total de pedidos'} value={'5'}></ItemSummary>
                <ItemSummary title={'Pedidos entregados'} value={'2'}></ItemSummary>
                <ItemSummary title={'Gasto Total'} value={'$1750'}></ItemSummary>
            </div>

        </div>
    );
}

export default HistorySummary;