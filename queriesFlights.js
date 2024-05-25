const { conFlights1, conFlights2 } = require('./db');

function isConnectionAlive(connection, callback) {
    connection.ping(err => {
        if (err) {
            console.error('La connexion a échoué :', err);
            return callback(false);
        }
        callback(true);
    });
}

function getFlights(callback) {
    const sql = 'SELECT * FROM flights';

    isConnectionAlive(conFlights1, isAlive => {
        if (isAlive) {
            conFlights1.query(sql, (err, results) => {
                if (err) {
                    console.error('Erreur lors de la récupération des vols avec la première connexion :', err);
                    return callback(err, null);
                }
                callback(null, results);
            });
        } else {
            console.log('Utilisation de la deuxième connexion...');
            conFlights2.query(sql, (err, results) => {
                if (err) {
                    console.error('Erreur lors de la récupération des vols avec la deuxième connexion :', err);
                    return callback(err, null);
                }
                callback(null, results);
            });
        }
    });
}

module.exports = {
    getFlights
};
