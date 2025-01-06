import React, { useState, useEffect, lazy, Suspense } from "react";
import './styles.css'
const ItemSummary = lazy(() => import("../../mini-components/ItemSummary"));
import ComponentLoading from "../../../../components/ComponentLoading";

const HistorySummary = (props) => {
    const { OrderId } = props;
    const [summary, setSummary] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetch(`http://localhost:3000/getSummaryOrder/${OrderId}`)
            .then(response => response.json())
            .then(data => {
                setSummary(data[0])
                setLoading(false);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, [OrderId]);
    if (loading) {
        return (
            <div className="container-summary">
                <div className="title-summary">
                    <ComponentLoading />
                </div>
            </div>
        );
    }
    return (
        <div className="container-summary">

            <div className="title-summary">
                <p> <b>Resumen del cliente </b> {summary.Name.toUpperCase() + " " + summary.LastName.toUpperCase()}</p>
            </div>
            <div className="items-summary">

                <ItemSummary title={'Total de pedidos'} value={summary.TotalOrders}></ItemSummary>
                <ItemSummary title={'Pedidos entregados'} value={summary.PedidosEntregados}></ItemSummary>
                <ItemSummary title={'Gasto Total'} value={'$ ' + summary.GastoTotal}></ItemSummary>
            </div>

        </div>
    );
}

export default HistorySummary;