var mysql = require('mysql2');

// Pool criado UMA única vez e reutilizado (Singleton)
const pool = mysql.createPool({
    host: 'localhost',
    database: 'ecomercio',
    user: 'root',
    password: '',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    enableKeepAlive: true,      // mantém conexões vivas
    keepAliveInitialDelay: 0    // keepalive imediato
});

// Listener para logar erros do pool sem derrubar o servidor
pool.on('error', function (err) {
    console.error('Erro no pool MySQL:', err.code)
})

class Database {

    ExecutaComando(sql, valores) {
        return new Promise(function (res, rej) {
            pool.query(sql, valores, function (error, results) {
                if (error)
                    rej(error);
                else
                    res(results);
            });
        })
    }

    ExecutaComandoNonQuery(sql, valores) {
        return new Promise(function (res, rej) {
            pool.query(sql, valores, function (error, results) {
                if (error)
                    rej(error);
                else
                    res(results.affectedRows > 0);
            });
        })
    }

    ExecutaComandoLastInserted(sql, valores) {
        return new Promise(function (res, rej) {
            pool.query(sql, valores, function (error, results) {
                if (error)
                    rej(error);
                else
                    res(results.insertId);
            });
        })
    }
}

module.exports = Database;