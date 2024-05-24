const connection = require('./db');

//--------------------------------------- Gestion des vols --------------------------------

// Récupérer tous les vols
function getFlights(callback) {
    const sql = 'SELECT * FROM flights';
    connection.query(sql, (err, results) => {
        if (err) {
            console.error('Erreur lors de la récupération des vols :', err);
            return callback(err, null);
        }
        callback(null, results);
    });
}

module.exports = {
    getFlights
};