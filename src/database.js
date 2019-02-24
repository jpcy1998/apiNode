const mysql = require('mysql')

const mysqlConnection = mysql.createPool({
    host: 'remotemysql.com',
    port:'3306',
    user: 'H5rpElQOAM',
    password: 'v0SbifQE5g',
    database: 'H5rpElQOAM'
})

module.exports = mysqlConnection