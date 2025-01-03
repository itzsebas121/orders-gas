const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");
const config = require('./db');
const sql = require('mssql');
const jwt = require('jsonwebtoken');

app.use(express.json());
const JWT_SECRET = 'webtoken';//tenemos que cambiar esto (lo mejor con variables de entorno para mas seguridad) 
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.post('/login', async (req, res) => {
    try {
        await sql.connect(config);
        const request = new sql.Request();
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).send('Username and password are required');
        }

        request.input('Username', sql.VarChar, username);
        request.input('Password', sql.VarChar, password);

        const result = await request.execute('GetUserInfo');
        if (result.recordset.length > 0) {
            const firstRecord = result.recordset[0]

            if (firstRecord.ErrorMessage) {
                return res.status(401).json({ message: firstRecord.ErrorMessage });
            }
            const token = jwt.sign({
                id: firstRecord.ClientID || firstRecord.DistributorID,
                username: firstRecord.Username,
                usertype: firstRecord.UserType
            }, JWT_SECRET, { expiresIn: '1h' });

            res.json({ token });

        }

    } catch (err) {
        console.error('Error en la conexión o consulta:', err);
        res.status(500).send('Error en la base de datos');
    } finally {
        await sql.close();
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
app.get('/ClientOrders/:id', async (req, res) => {
    const id = req.params.id;
    try {
        await sql.connect(config);
        const result = await sql.query`SELECT OrderID, OrderStatus, Location, Total FROM Orders WHERE ClientID = ${id} AND OrderStatus IN ('Pendiente', 'En camino')`;
        if (result.recordset.length === 0) {
            return res.status(404).send('No se encontraron pedidos para este cliente');
        }
        res.status(200).json(result.recordset);
    } catch (err) {
        console.log(err);
    } finally {
        await sql.close();
    }

});
app.listen(port, () => {
    console.log(`Server ready on http://localhost:${port}`);
});
