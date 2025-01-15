const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");
const config = require('./db');
const sql = require('mssql');
const jwt = require('jsonwebtoken');

app.use(express.json());
const JWT_SECRET = 'webtoken';


app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
let pool;
sql.connect(config)
    .then(p => {
        pool = p;
        console.log('Conexión a la base de datos establecida');
    })
    .catch(err => console.error('Error al conectar con la base de datos', err));
app.post('/login', async (req, res) => {
    try {
        const request = pool.request();
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).send('Username and password are required');
        }

        request.input('Username', sql.VarChar, username);
        request.input('Password', sql.VarChar, password);

        const result = await request.execute('GetUserInfo');
        if (result.recordset.length > 0) {
            const firstRecord = result.recordset[0];

            if (firstRecord.ErrorMessage) {
                return res.status(401).json({ message: firstRecord.ErrorMessage });
            }
            if (firstRecord.UserType === 'Client') {
                const token = jwt.sign({
                    id: firstRecord.ClientID,
                    username: firstRecord.Username,
                    usertype: firstRecord.UserType,
                    location: firstRecord.Location,
                    nameLocation: firstRecord.NameLocation

                }, JWT_SECRET, { expiresIn: '1h' });
                res.json({ token });
                return;
            } else if (firstRecord.UserType === 'Distributor') {
                const token = jwt.sign({
                    id: firstRecord.DistributorID,
                    username: firstRecord.Username,
                    usertype: firstRecord.UserType
                }, JWT_SECRET, { expiresIn: '3h' });
                res.json({ token });
                return;
            }
            else {
                return res.status(401).json({ message: 'Invalid user type' });
            }


            res.json({ token });
        } else {
            res.status(404).send('Usuario no encontrado');
        }

    } catch (err) {
        console.error('Error en la conexión o consulta:', err);
        res.status(500).send('Error en la base de datos');
    }
});

app.get('/protected', (req, res) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).send('Token no proporcionado');
    }
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).send('Token inválido');
        }
        res.json({ message: 'Acceso permitido', user: decoded });
    });
});
app.get('/ClientCurrentOrders/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const result = await pool.request().query`SELECT OrderID, OrderStatus, Location, LocationName, Total FROM Orders WHERE ClientID = ${id} AND OrderStatus IN ('Pendiente', 'En camino')`;
        if (result.recordset.length === 0) {
            return res.status(404).send('No se encontraron pedidos para este cliente');
        }
        res.status(200).json(result.recordset);
    } catch (err) {
        console.log(err);
    }

});
app.get('/ClientHistoryOrders/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const result = await pool.request().query`select * from vwOrdersDetails where ClientID = ${id}`;
        const orders = []
        for (let index = 0; index < result.recordset.length; index++) {
            const order = result.recordset[index];
            if (typeof order.OrderDetails === 'string') {
                try {
                    order.OrderDetails = JSON.parse(order.OrderDetails);
                    orders.push(order);
                } catch (parseError) {
                    order.OrderDetails = [];
                    orders.push(order);
                }
            }
        }
        res.status(200).json(orders);
    } catch (err) {
        console.log(err);
    }

});
app.get('/OrderDetails/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const result = await pool.request().query`select * from vwOrdersDetails where OrderId = ${id};`;
        const order = result.recordset[0];
        if (typeof order.OrderDetails === 'string') {
            try {
                order.OrderDetails = JSON.parse(order.OrderDetails);
            } catch (parseError) {
                order.OrderDetails = [];
            }
        }
        res.status(200).json(order);
    } catch (err) {
        console.log(err);
    }

})
app.get('/getCylinders', async (req, res) => {
    const id = req.params.id;
    try {
        const result = await pool.request().query`select * from Cylinders`;
        res.status(200).json(result.recordset);
    } catch (err) {
        console.log(err);
    }

})
app.post('/AceptOrder', async (req, res) => {
    try {
        const request = pool.request();
        const { OrderID, DistributorID, Location_Current } = req.body;

        request.input('OrderID', sql.Int, OrderID);
        request.input('DistributorID', sql.Int, DistributorID);
        request.input('Location_Current', sql.NVarChar, Location_Current);

        const result = await request.execute('SetOrderInTransit');
        console.log(result);
        if (result.rowsAffected.length > 0) {
            res.status(200).json({ message: 'Pedido aceptado correctamente' });
        } else {
            res.status(404).send('Usuario no encontrado');
        }

    } catch (err) {
        console.error('Error en la conexión o consulta:', err);
        res.status(500).send('Error en la base de datos');
    }
});

app.post('/createOrder', async (req, res) => {
    const { id, location } = req.body;
    try {

        const request = pool.request();
        request.input('ClientID', sql.Int, id);
        request.input('Location', sql.VarChar, location);
        const result = await request.execute('Insert_Order');
        res.status(200).json(result.recordset);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Error al crear el pedido' });
    }
});
app.post('/InsertDetails/:id', async (req, res) => {
    const { OrderID, cylinder_id, quantity } = req.body;

    try {
        const request = pool.request();
        request.input('Order_ID', sql.Int, OrderID);
        request.input('Cylinder_id', sql.Int, cylinder_id);
        request.input('Quantiti_cylinders', sql.Int, quantity);
        const result = await request.execute('Insert_Detail_Order');
        res.status(200).json({ message: 'Detalle agregado correctamente' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Error al crear el pedido' });
    }
});
app.get('/getSummaryOrder/:clientid', async (req, res) => {
    const clientid = req.params.clientid;
    try {
        const result = await pool.request().query`select * from vwSummaryClient where ClientID = ${clientid}`;
        res.status(200).json(result.recordset);
    } catch (err) {
        console.log(err);
    }
});
app.get('/getStatusOrder/:orderid', async (req, res) => {
    const orderid = req.params.orderid;
    try {
        const result = await pool.request().query`select * from DetailStatus where OrderID = ${orderid}`;
        res.status(200).json(result.recordset);
    } catch (err) {
        console.log(err);
    }
});
app.get('/getNewOrders', async (req, res) => {
    const orderid = req.params.orderid;
    try {
        const result = await pool.request().query`select * from vwGetNewOrders`;
        const orders = result.recordset;
        const newOrders = []
        orders.forEach(order => {

            console.log(order)
            console.log(typeof order.OrderDetails)
            if (typeof order.OrderDetails === 'string') {
                try {
                    order.OrderDetails = JSON.parse(order.OrderDetails);
                    newOrders.push(order)
                } catch (parseError) {
                    order.OrderDetails = [];
                    newOrders.push(order)
                }
            } else {
                order.OrderDetails = [];
                newOrders.push(order)

            }
        });
        res.status(200).json(newOrders);
    } catch (err) {
        console.log(err);
    }
})
app.get('/GetCurrentOrdersDistributor/:id', async (req, res) => {
    const orderid = req.params.orderid;
    const id = req.params.id;
    try {
        const result = await pool.request().query`select * from vwGetCurrentOrdersDistributor where DistributorID = ${id}`;
        const orders = result.recordset;
        const newOrders = []
        orders.forEach(order => {

            console.log(order)
            console.log(typeof order.OrderDetails)
            if (typeof order.OrderDetails === 'string') {
                try {
                    order.OrderDetails = JSON.parse(order.OrderDetails);
                    newOrders.push(order)
                } catch (parseError) {
                    order.OrderDetails = [];
                    newOrders.push(order)
                }
            } else {
                order.OrderDetails = [];
                newOrders.push(order)

            }
        });
        res.status(200).json(newOrders);
    } catch (err) {
        console.log(err);
    }
})
process.on('SIGINT', async () => {
    if (pool) {
        await pool.close();
        console.log('Conexiones cerradas');
    }
    process.exit();
});
app.listen(port, () => {
    console.log(`Server ready on http://localhost:${port}`);
});
