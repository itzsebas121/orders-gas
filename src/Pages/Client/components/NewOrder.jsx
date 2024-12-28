import React from 'react'

const NewOrder = () => {
    var detailsOrder =[]
    const handleOrderObject = ()=>{
        const cantidad = document.getElementById('cantidad')
        const cylinder = document.getElementById('tipoCilindro')
        const detailOrder = {typeCylinder:cylinder.value, quantity:cantidad.value}
        detailsOrder.push(detailOrder)
        const tbody = document.getElementById('table-body');
        const row = document.createElement('tr')
        row.innerHTML = `<td>${cylinder.options[cylinder.selectedIndex].text}</td><td>${cantidad.value}</td>`
        console.log(detailsOrder)
        tbody.appendChild(row)
    }
    return (
        <div className="new-order">

            <form className="formOrder">
                <div className="columns-form">
                    <div className="input-form">
                        <label>Tipo de Cilindro:</label>
                        <select id="tipoCilindro" name="tipoCilindro" required>
                            <option value="" hidden>Seleccione el tipo</option>
                            <option value="1">Gas Industrial</option>
                            <option value="2">Gas Domestico</option>
                        </select>
                    </div>
                    <div className="input-form">
                        <label >Cantidad:</label>
                        <input type="number" id="cantidad" name="cantidad" min="1" max="100" required />
                    </div>
                </div>

                <div className="columns-form">
                    <div className="input-form">
                        <label >Ubicación:</label>
                        <input type="text" id="ubicacion" name="ubicacion" placeholder="Ingrese la dirección" required />
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
                                <th>
                                    Tipo Cilindro
                                </th>
                                <th>
                                    Cantidad
                                </th>
                            </tr>

                        </thead>
                        <tbody id='table-body'>
                        </tbody>
                    </table>
                </div>
                <label htmlFor="">Total</label>
                <button>Hacer Pedido</button>
            </form>

        </div >
    );
}
export default NewOrder;