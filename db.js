const mariadb = require('mariadb');

const db = mariadb.createPool({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "djf",
    connectionLimit: 10
})

module.exports = db;