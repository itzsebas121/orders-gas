import React, { useState, useEffect } from "react";
import './styles.css';
import DetailOrder from "./HomeComponents/DetailOrder";
import CurrentOrders from "./HomeComponents/CurrentOrders";
import NewOrder from "./HomeComponents/NewOrder";
import io from "socket.io-client";
const socket = io("http://localhost:8080");
import { useNotification } from "../../../components/Noty";
const Home = (props) => {
    const { Client } = props;
    const [OrderId, setOrderId] = useState("");
    const [overlay, sendOverlay] = useState(false);
    const [client, setClient] = useState([]);
    const [orderUpdated, setOrderUpdated] = useState(false);
    const { emitirNotificacion } = useNotification();

    useEffect(() => {
        
        setClient(Client);
        socket.on("AgreeOrder", (message) => {
            if (message.ClienID === Client.ClienID) {
                emitirNotificacion("Pedido aceptado", {
                    body: `Su pedido Nº: ${message.OrderID} ha sido aceptado y esta en camino`,
                    icon: "https://cdn.iconscout.com/icon/free/png-256/free-transportation-icon-download-in-svg-png-gif-file-formats--truck-delivery-transport-verified-interface-vol-3-pack-user-icons-1162799.png",
                });
            }
            setOrderUpdated((prev) => !prev);
        });
        socket.on("CancelOrder", (message) => {
            if (message.ClienID === Client.ClienID) {
                emitirNotificacion("Pedido cancelado", {
                    body: `Lo sentimos, su pedido Nº: ${message.OrderID} no se podra entregar, por favor intente nuevamente`,
                    icon: "https://cdn.iconscout.com/icon/free/png-256/free-transportation-icon-download-in-svg-png-gif-file-formats--truck-delivery-transport-verified-interface-vol-3-pack-user-icons-1162799.png",
                });
                setOrderUpdated((prev) => !prev);
            }
        });
        socket.on("OrderDelivered", (message) => {
            if (message.ClienID === Client.ClienID) {
                emitirNotificacion("Pedido entrega", {
                    body: `Su pedido Nº: ${message.OrderID} ha sido entregado con exito`,
                    icon: "https://cdn.iconscout.com/icon/free/png-256/free-transportation-icon-download-in-svg-png-gif-file-formats--truck-delivery-transport-verified-interface-vol-3-pack-user-icons-1162799.png",
                });
                setOrderUpdated((prev) => !prev);
            }
        });

        return () => {
            socket.off("AgreeOrder");
            socket.off("CancelOrder");
            socket.off("OrderDelivered");
        };
    }, [Client]);


    const handleOverlay = (value) => {
        sendOverlay(true);
        setOrderId(value);
    };

    const hiddenOverlay = (value) => {
        sendOverlay(value);
    };

    return (
        <div className="home">
            <NewOrder user={client}></NewOrder>
            <CurrentOrders
                sendOverlayClass={handleOverlay}
                user={client}
                orderUpdated={orderUpdated}
            ></CurrentOrders>
            {overlay && <DetailOrder OrderId={OrderId} hidden={hiddenOverlay}></DetailOrder>}
        </div>
    );
};

export default Home;
