const mysql = require('mysql');


const conFlights1 = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'flights'
});

conFlights1.connect((err) => {
    if (err) {
        console.error('Erreur de connexion à la base de données flights :', err);
        return;
    }
    console.log('Connexion à la base de données flights réussie.');
});

const conFlights2 = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'flights2'
});

conFlights2.connect((err) => {
    if (err) {
        console.error('Erreur de connexion à la base de données flights2 :', err);
        return;
    }
    console.log('Connexion à la base de données flights2 réussie.');
});

const conPlanes1 = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'planes'
});

conPlanes1.connect((err) => {
    if (err) {
        console.error('Erreur de connexion à la base de données planes :', err);
        return;
    }
    console.log('Connexion à la base de données planes réussie.');
});

const conPlanes2 = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'planes2'
});

conPlanes2.connect((err) => {
    if (err) {
        console.error('Erreur de connexion à la base de données planes2 :', err);
        return;
    }
    console.log('Connexion à la base de données planes2 réussie.');
});

module.exports = {
    conFlights1,
    conFlights2,
    conPlanes1,
    conPlanes2
};
