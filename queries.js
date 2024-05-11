const connection = require('./db');

// liste parkings 
//---------------------------------------------------------------------------
function getAllParkings(callback) {
    const sql = 'SELECT * FROM Parkings';
    connection.query(sql, (err, results) => {
        if (err) {
            console.error('Erreur lors de la récupération des parkings :', err);
            return callback(err, null);
        }
        callback(null, results);
    });
}


// liste users
//---------------------------------------------------------------------------
function getAllUsers(callback) {
    const sql = 'SELECT * FROM Utilisateurs';
    connection.query(sql, (err, results) => {
        if (err) {
            console.error('Erreur lors de la récupération des utilisateurs :', err);
            return callback(err, null);
        }
        callback(null, results);
    });
}


// register ( new user )
//---------------------------------------------------------------------------
function createUser(user, callback) {
    const { Username , Adresse_email, Mot_de_passe} = user;
    const sql = "INSERT INTO Utilisateurs (Username, Adresse_email, Mot_de_passe) VALUES (?, ?, ?)";
    connection.query(sql, [Username, Adresse_email, Mot_de_passe], (err, result) => {
        if (err) {
            console.error('Erreur lors de la création de l\'utilisateur :', err);
            return callback(err, null);
        }
        console.log('Utilisateur créé avec succès.');
        callback(null, result.insertId);
    });
}


// login ( existed user ) 
//---------------------------------------------------------------------------
function authenticateUser(credentials, callback) {
    const { email, password } = credentials;
    const sql = 'SELECT * FROM Utilisateurs WHERE Adresse_email = ? AND Mot_de_passe = ?';
    connection.query(sql, [email, password], (err, result) => {
        if (err) {
            console.error('Erreur lors de l\'authentification de l\'utilisateur :', err);
            return callback(err, null);
        }
        if (result.length === 0) {
            return callback(null, false);
        }
        console.log('Utilisateur authentifié avec succès.');
        callback(null, true, result[0]);
    });
}



// details parking  
//---------------------------------------------------------------------------

function getParkingDetails(parkingId, callback) {
    const sql = 'SELECT * FROM Parkings WHERE ID_parking = ?';
    connection.query(sql, [parkingId], (err, result) => {
        if (err) {
            console.error('Erreur lors de la récupération des détails du parking :', err);
            return callback(err, null);
        }
        if (result.length === 0) {
            return callback(null, null);
        }
        console.log('Détails du parking récupérés avec succès.');
        callback(null, result[0]);
    });
}


// search parking  
//---------------------------------------------------------------------------
function searchParkingByName(parkingName, callback) {
    const sql = "SELECT * FROM Parkings WHERE Nom LIKE ?";
    connection.query(sql, ['%' + parkingName + '%'], (err, result) => {
        if (err) {
            console.error('Erreur lors de la recherche des parkings par nom :', err);
            return callback(err, null);
        }
        console.log('Résultats de la recherche récupérés avec succès.');
        callback(null, result);
    });
}



// Get all reservations
function getAllReservations(callback) {
    const query = 'SELECT * FROM Reservations';

    connection.query(query, (err, reservations) => {
        if (err) {
            console.error('Erreur lors de la récupération des réservations :', err);
            return callback(err, null);
        }
        callback(null, reservations);
    });
}


// Faire une réservation
function makeReservation(reservationData, callback) {
    const { EmailUser, ID_parking, Date_debut, Date_fin, Code_QR, Type_place } = reservationData;

    connection.beginTransaction(function (err) {
        if (err) {
            console.error('Erreur lors du début de la transaction :', err);
            return callback(err, null);
        }

        const selectPlaceSql = 'SELECT ID_place FROM places WHERE ID_parking = ? AND valide = true LIMIT 1';
        connection.query(selectPlaceSql, [ID_parking], function (err, placeResult) {
            if (err) {
                return connection.rollback(function () {
                    console.error('Erreur lors de la récupération de la place disponible :', err);
                    callback(err, null);
                });
            }

            if (placeResult.length === 0) {
                console.error('Aucune place disponible dans ce parking.');
                return connection.rollback(function () {
                    callback(new Error('Aucune place disponible dans ce parking.'), null);
                });
            }

            const ID_place = placeResult[0].ID_place;

            const updatePlaceSql = 'UPDATE Places SET Valide = false WHERE ID_place = ? AND ID_parking = ?';
            connection.query(updatePlaceSql, [ID_place, ID_parking], function (err, result) {
                if (err) {
                    return connection.rollback(function () {
                        console.error('Erreur lors de la mise à jour de l\'état de la place :', err);
                        callback(err, null);
                    });
                }

                const updateParkingSql = 'UPDATE Parkings SET Num_valides = Num_valides - 1 WHERE ID_parking = ?';
                connection.query(updateParkingSql, [ID_parking], function (err, result) {
                    if (err) {
                        return connection.rollback(function () {
                            console.error('Erreur lors de la mise à jour du nombre de places dans le parking :', err);
                            callback(err, null);
                        });
                    }

                    const insertReservationSql = 'INSERT INTO Reservations (EmailUser, ID_parking, ID_place, Date_debut, Date_fin, Code_QR, Type_place) VALUES (?, ?, ?, ?, ?, ?, ?)';
                    connection.query(insertReservationSql, [EmailUser, ID_parking, ID_place, Date_debut, Date_fin, Code_QR, Type_place], function (err, result) {
                        if (err) {
                            return connection.rollback(function () {
                                console.error('Erreur lors de l\'insertion de la réservation :', err);
                                callback(err, null);
                            });
                        }

                        const reservation = {
                            ID_reservation: result.insertId,
                            EmailUser,
                            ID_parking,
                            ID_place,
                            Date_debut,
                            Date_fin,
                            Code_QR,
                            Type_place
                        };

                        connection.commit(function (err) {
                            if (err) {
                                return connection.rollback(function () {
                                    console.error('Erreur lors de la validation de la transaction :', err);
                                    callback(err, null);
                                });
                            }

                            console.log('Réservation effectuée avec succès.');
                            callback(null, reservation); // Retourner la réservation ajoutée
                        });
                    });
                });
            });
        });
    });
}



// mes reservations 
//---------------------------------------------------------------------------
function getUserReservations(userId, callback) {
    const sql = 'SELECT * FROM Reservations WHERE ID_utilisateur = ?';
    connection.query(sql, [userId], (err, results) => {
        if (err) {
            console.error('Erreur lors de la récupération des réservations de l\'utilisateur :', err);
            return callback(err, null);
        }
        console.log('Réservations de l\'utilisateur récupérées avec succès.');
        callback(null, results);
    });
}


module.exports = { getAllReservations, getAllParkings , getAllUsers ,createUser, authenticateUser ,getParkingDetails, makeReservation, getUserReservations , searchParkingByName};