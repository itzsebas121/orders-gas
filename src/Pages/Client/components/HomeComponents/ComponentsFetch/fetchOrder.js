const fetchOrders = async () => {
    const response = await fetch(`http://localhost:3000/ClientCurrentOrders/${1}`);
    const data = await response.json();

    if (Array.isArray(data)) {
        return data;
    } else {
        throw new Error("Los datos no son un arreglo");
    }
}

export default fetchOrders;
