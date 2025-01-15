import React, { useState, useEffect, lazy, Suspense } from "react";
import Timeline from "../../mini-components/Timeline";
import Loading from "../../../../components/Loading";
const ItemState = lazy(() => import("../../mini-components/ItemState"));
import Map from "../../../../components/Map";
import '../styles.css'

const DetailOrder = (props) => {
  const { OrderId, hidden } = props;
  const [Orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const orderDateUTC = new Date(Orders.OrderDate);

  const formattedDate = orderDateUTC.toLocaleString();

  const AproxDate = new Date(orderDateUTC);

  const deliveryDate = new Date(AproxDate);
  deliveryDate.setMinutes(deliveryDate.getMinutes() + 20);
  const hiddenOverlay = () => {
    hidden(false);
  }

  useEffect(() => {
    fetch(`http://localhost:3000/OrderDetails/${OrderId}`)
      .then(response => response.json())
      .then(data => {
        setOrders(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  if (loading) {
    return (
      <div className="overlay active">
        <div className="detail-order">
          <Loading />
        </div>
      </div>
    );
  }

  return (
    <div className="overlay active">
      <div className="detail-order">
        <h2>Seguimiento del pedido {OrderId}</h2>

        <div className="detail-distributor-contact">
          <div className="personal-information-distributor">
            <Suspense fallback={<div>Loading...</div>}>
              <ItemState typeIcon={"user"} title={Orders.Name.toUpperCase() + ' ' + Orders.LastName.toUpperCase()} value={'+593 ' + Orders.PhoneNumber} />
            </Suspense>
          </div>

          <div className="state-order">
            <Suspense fallback={<div>Loading...</div>}>
              <ItemState typeIcon={"calendar"} title={"Fecha del pedido"} value={formattedDate} />
              {Orders.OrderStatus == 'Cancelado' ? < ItemState typeIcon={"clock"} title={"Hora estimada de entrega"}
                value={'El pedido feu cancelado o rechazado'} /> :
                < ItemState typeIcon={"clock"} title={"Hora estimada de entrega"} value={deliveryDate.toLocaleString()} />}

              <ItemState typeIcon={"location"} title={"Lugar de entrega"} value={Orders.LocationName} />
            </Suspense>
          </div>
        </div>

        <div className="details-order">
          <h3>Detalles del pedido</h3>
          <div className="table detail" style={{ height: '120px' }}>
            <table >
              <thead>
                <tr>
                  <th>Tipo Gas</th>
                  <th>Cantidad</th>
                  <th>Precio Unitario</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {Orders.OrderDetails.map((item, index) => (
                  <tr key={index}>
                    <td>{item.TypeCylinder}</td>
                    <td>{item.Quantity}</td>
                    <td>$ {item.Price}</td>
                    <td>$ {item.DetailTotal}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <label><b>Total</b>: ${Orders.OrderTotal}</label>
        </div>

        <div className="history-order">
          <Timeline OrderId={OrderId} />
        </div>

        <div className="map-order">
          <h3>Rastreo del pedido</h3>
          <div className="map-location">
            <Map locationStart={Orders.LocationCurrent} locationEnd={Orders.Location}></Map>
          </div>
        </div>

        <button onClick={hiddenOverlay}>Cerrar</button>
      </div>
    </div>
  );
}

export default DetailOrder;
