const mysql = require('mysql')

const mysqlConnection = mysql.createPool({
    host: 'db4free.net',
    port:'3306',
    user: 'jpcy18',
    password: '12345678',
    database: 'api1819'
})

module.exports = mysqlConnection