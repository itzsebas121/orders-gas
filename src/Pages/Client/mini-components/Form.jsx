import React, { useEffect, useState } from 'react'
import NewOrder from './NewOrder';
import DetailOrder from '../components/HomeComponents/DetailOrder';
const Form = (props) => {
    const { user } = props
    const [cylinders, setCylinders] = useState([])
    const [overlay, setOverlay] = useState(false);
    const [detailOrder, setDetailOrder] = useState([]);
    const handlePrice = (e) => {

        document.getElementById('price').value = e.target.options[e.target.selectedIndex].getAttribute('data-price')
    }
    useEffect(() => {
            
        fetch('http://localhost:3000/getCylinders')
            .then(res => res.json())
            .then(data => setCylinders(data))
    }, [])
    
    const handleOrderObject = () => {
        const cylinder = document.getElementById('tipoCilindro')
        const cantidad = document.getElementById('cantidad').value
        const price = document.getElementById('price').value
        if (price === '') {
            alert('Seleeccione un cilindro')
            return
        } else if (cantidad === '') {
            alert('Ingrese la cantidad')
            return
        }
        const detailOrder2 = { OrderID: 0, cylinder_id: cylinder.value, quantity: cantidad }
        const OrderDetails = []
        detailOrder.map(item => {
            OrderDetails.push(item)
        })
        OrderDetails.push(detailOrder2)
        setDetailOrder(OrderDetails)

        const tbody = document.getElementById('table-body');
        const row = document.createElement('tr')
        row.innerHTML = `<td>${cylinder.options[cylinder.selectedIndex].text}</td><td>${cantidad}</td><td>$ ${price}</td> <td>$${cantidad * price}</td>`
        tbody.appendChild(row)
    }
    const handleSubmit = () => {
        if (detailOrder.length === 0) {
            alert('Agregue al menos un producto')
            return
        }
        setOverlay(true)
    }
    const hiddenOverlay = (value) => {
        setOverlay(value)
    }
    return (
        <>
            <form className="formOrder">
                <h1>Nuevo Pedido</h1>
                <div className="columns-form">
                    <div className="input-form">
                        <label>Tipo de Cilindro:</label>
                        <select id="tipoCilindro" name="tipoCilindro" required onChange={handlePrice}>
                            <option value="" hidden>Seleccione un cilindro...</option>
                            {
                                cylinders.map(cylinder => (

                                    <option key={cylinder.CylinderID} value={cylinder.CylinderID} data-price={cylinder.Price}>{cylinder.TypeCylinder} </option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="input-form">
                        <label >Precio:</label>
                        <input type="number" id="price" name="price" placeholder="Seleccione un cilindro" disabled />

                    </div>
                </div>

                <div className="columns-form">
                    <div className="input-form">
                        <label >Ubicación:</label>
                        <input type="text" id="ubicacion" name="ubicacion" value={user.nameLocation} readOnly />
                    </div>
                    <div className="input-form">
                        <label>Cambiar</label>
                        <button style={{ width: '100%' }} type='button'>Cambiar ubicacion</button>
                    </div>

                </div>
                <div className="columns-form">
                    <div className="input-form">
                        <label >Cantidad:</label>
                        <input type="number" id="cantidad" name="cantidad" min="1" max="100" required placeholder='Ingrese la cantidad' />
                    </div>
                    <div className="input-form">
                        <label >Agregar:</label>
                        <button type='button' onClick={handleOrderObject}>+</button>
                    </div>
                </div>
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
                        <tbody id='table-body'>
                        </tbody>
                    </table>
                </div>
                <label >Total</label>
                <button type='button' onClick={handleSubmit}>Hacer Pedido</button>
            </form>
            {overlay && <NewOrder hidden={hiddenOverlay} newOrder={user} OrderDetail={detailOrder}></NewOrder>}
        </>

    );
}
export default Form;