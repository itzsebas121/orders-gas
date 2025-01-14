import React, { useState } from 'react'


const ItemNewOrder = (props) => {
    const { order } = props
    const [locationCurrent, setLocationCurrent] = useState("")
    const handlesumit = () => {
        alert(order.OrderID + "  aver a qui")
        startTracking()
        alert(locationCurrent)
    }
    const startTracking = () => {
        if ("geolocation" in navigator) {
          const watchId = navigator.geolocation.watchPosition(
            (position) => {
              console.log("Latitud:", position.coords.latitude);
              console.log("Longitud:", position.coords.longitude);
              console.log("Precisión:", position.coords.accuracy, "metros");
            },
            (error) => {
              console.error("Error al obtener ubicación:", error.message);
            },
            {
              enableHighAccuracy: true, // Usa GPS para máxima precisión
              timeout: 20000,          // Espera hasta 20 segundos por datos
              maximumAge: 0,           // Siempre obtiene datos frescos
            }
          );
      
          // Si necesitas detener el seguimiento después de un tiempo
          setTimeout(() => {
            navigator.geolocation.clearWatch(watchId);
          }, 60000); // Detén el seguimiento después de 1 minuto
        } else {
          alert("Geolocalización no está disponible en este navegador.");
        }
      };
      

    return (
        <div className="item-new-order">
            <div className="container-item">
                <div className="name-item">
                    <h2>{order.Name} {order.LastName}</h2>
                </div>
                <div className="order-items">
                    {order.OrderDetails.map((item, index) => (
                        <p key={index} className="item">
                            {item.Quantity} x {item.TypeCylinder}
                        </p>
                    ))}
                </div>
                <p className="total">Total: <span>${order.Total}</span></p>
                <p className="location">Dirección: <span>{order.LocationName}</span></p>
                <div className="buttons-new-orders">
                    <button onClick={handlesumit}>Aceptar pedido</button>
                </div>
            </div>

        </div>
    )
}
export default ItemNewOrder