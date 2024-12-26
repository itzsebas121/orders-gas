const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");
const config = require('./db');
const sql = require('mssql');

app.use(express.json());

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
            return res.status(400).send('Username y password son requeridos');
        }

        request.input('Username', sql.VarChar, username);
        request.input('Password', sql.VarChar, password);

        const result = await request.execute('GetUserInfo');
        
        res.json(result.recordset);
    } catch (err) {
        console.error('Error en la conexión o consulta:', err);
        res.status(500).send('Error en la base de datos');
    } finally {
        await sql.close();
    }
});
app.listen(port, () => {
    console.log(`Server ready on http://localhost:${port}`);
});
