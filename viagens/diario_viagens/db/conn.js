const mysql = require('mysql2')

const pool = mysql.createPool({
    connectionLimit: 10,
    host: '127.0.0.1',
    port: '3306',                         
    user: 'aluno_medio',
    password: '@lunoSenai23.',
    database: 'viagens'
})

module.exports = pool