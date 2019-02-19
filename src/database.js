const mysql = require('mysql')

const mysqlConnection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'prueba'
})

module.exports = mysqlConnection