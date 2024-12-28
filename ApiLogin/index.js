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
        if(result.recordset.length > 0){
            const firstRecord = result.recordset[0]

            if(firstRecord.ErrorMessage){
                return res.status(401).json({ message: firstRecord.ErrorMessage });
            }
            const token = jwt.sign({ 
                id: firstRecord.ClientID || firstRecord.DistributorID, 
                username: firstRecord.Username ,
                usertype: firstRecord.UserType 
            }, JWT_SECRET, { expiresIn: '1h' });

            res.json({token});

        }

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
