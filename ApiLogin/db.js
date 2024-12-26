// db.js
const sql = require('mssql');

const config = {
  user: 'itz_sebas121_SQLLogin_1',
  password: 'xdsebas12',
  server: 'PedidosGas.mssql.somee.com',
  database: 'PedidosGas',
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

module.exports = config;