import React, { useState } from "react";
import './styles.css'
import Timeline from "../mini-components/Timeline";
import ItemState from "../mini-components/ItemState";

const DetailOrder = (props) => {
  const { OrderId, hidden } = props
  const hiddenOverlay = () => {
    hidden(false)
  }
  return (
    <div className="overlay active">
      <div className="detail-order">
        <h2>Seguimiento del pedido: {OrderId}</h2>
        <div className="detail-distributor-contact">
          <div className="personal-information-distributor">

            <ItemState typeIcon={"user"} title={"Bryan Vladimir Castro Iza"} value={"0962199182"}></ItemState>

          </div>
          <div className="state-order">
            <ItemState typeIcon={"calendar"} title={"Fecha del pedido"} value={"19/01/2025"}></ItemState>
            <ItemState typeIcon={"clock"} title={"Hora estimada de entrega"} value={"19/01/2025"}></ItemState>
            <ItemState typeIcon={"location"} title={"Lugar de entrega"} value={"Av. Moreno y 17 de abril y mas detalles de la direccion a ver mas y que pasa su pongo mas "}></ItemState>
          </div>
        </div>

        <div className="details-order">
          <h3>Detalles del pedido</h3>
          <div className="table">
            <table>
              <thead>
                <tr>
                  <th>Tipo Gas</th>
                  <th>Cantidad</th>
                  <th>Precio Unitario</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Gas Industrial</td><td>4</td><td>2</td><td>$8</td></tr>
                <tr><td>Gas Industrial</td><td>4</td><td>2</td><td>$8</td></tr>
                <tr><td>Gas Industrial</td><td>4</td><td>2</td><td>$8</td></tr>
                <tr><td>Gas Industrial</td><td>4</td><td>2</td><td>$8</td></tr>
                <tr><td>Gas Industrial</td><td>4</td><td>2</td><td>$8</td></tr>
                <tr><td>Gas Industrial</td><td>4</td><td>2</td><td>$8</td></tr>
                <tr><td>Gas Industrial</td><td>4</td><td>2</td><td>$8</td></tr>
                <tr><td>Gas Industrial</td><td>4</td><td>2</td><td>$8</td></tr>
              </tbody>
            </table>
          </div>
            <label><b>Total</b>: $254</label>
        </div>
        <div className="history-order">
          <Timeline />
        </div>
        <div className="map-order">
          <h3>Rastreo del pedido</h3>
          <img src="https://cdn.computerhoy.com/sites/navi.axelspringer.es/public/media/image/2023/02/google-maps-2961754.jpg?tf=3840x" alt="" />
        </div>
        <button onClick={hiddenOverlay} >cerarr</button>
      </div>
    </div>
  );
}
export default DetailOrder;