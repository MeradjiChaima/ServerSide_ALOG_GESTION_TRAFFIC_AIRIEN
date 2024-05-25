const { conPlanes1, conPlanes2 } = require('./db');


function isConnectionAlive(connection, callback) {
    connection.ping(err => {
        if (err) {
            console.error('La connexion a échoué :', err);
            return callback(false);
        }
        callback(true);
    });
}


function getPlanes(callback) {
    const sql = 'SELECT * FROM planes';

    // Vérifier la première connexion
    isConnectionAlive(conPlanes1, isAlive => {
        if (isAlive) {
            // Si la première connexion est valide
            conPlanes1.query(sql, (err, planes) => {
                if (err) {
                    console.error('Erreur lors de la récupération des avions avec la première connexion :', err);
                    return callback(err, null);
                }
                callback(null, planes);
            });
        } else {
            // Sinon, utiliser la deuxième connexion
            console.log('Utilisation de la deuxième connexion...');
            conPlanes2.query(sql, (err, planes) => {
                if (err) {
                    console.error('Erreur lors de la récupération des avions avec la deuxième connexion :', err);
                    return callback(err, null);
                }
                callback(null, planes);
            });
        }
    });
}

function getPlanePaths(planeId, callback) {
    const sql = 'SELECT * FROM plane_paths WHERE plane_id = ?';

    // Vérifier la première connexion
    isConnectionAlive(conPlanes1, isAlive => {
        if (isAlive) {
            // Si la première connexion est valide
            conPlanes1.query(sql, [planeId], (err, paths) => {
                if (err) {
                    console.error('Erreur lors de la récupération des trajectoires de l\'avion avec la première connexion :', err);
                    return callback(err, null);
                }
                callback(null, paths);
            });
        } else {
            // Sinon, utiliser la deuxième connexion
            console.log('Utilisation de la deuxième connexion...');
            conPlanes2.query(sql, [planeId], (err, paths) => {
                if (err) {
                    console.error('Erreur lors de la récupération des trajectoires de l\'avion avec la deuxième connexion :', err);
                    return callback(err, null);
                }
                callback(null, paths);
            });
        }
    });
}

function getPlaneData(callback) {
    const planesData = [];

    // Fonction pour récupérer les trajectoires d'un avion spécifique par son ID
    function getPlanePaths(connection, planeId, callback) {
        const sql = 'SELECT * FROM plane_paths WHERE plane_id = ?';
        connection.query(sql, [planeId], (err, paths) => {
            if (err) {
                console.error(`Erreur lors de la récupération des trajectoires de l'avion ${planeId} :`, err);
                return callback(err, null);
            }
            callback(null, paths);
        });
    }

    // Récupérer les données de chaque avion
    function fetchPlaneData(connection, plane, callback) {
        // Obtenir les trajectoires de l'avion
        getPlanePaths(connection, plane.id, (err, paths) => {
            if (err) {
                console.error(`Erreur lors de la récupération des trajectoires de l'avion ${plane.id} :`, err);
                return callback(err);
            }
            // Formater les données de l'avion avec les trajectoires
            const planeData = {
                id: plane.id,
                name: plane.name,
                color: plane.color,
                speed: plane.speed,
                path: paths.map(path => ({ lat: path.lat, lng: path.lng }))
            };
            planesData.push(planeData);
            callback(null);
        });
    }

    // Récupérer les données de chaque avion et leurs trajectoires
    const sql = 'SELECT * FROM planes';
    // Vérifier la première connexion
    isConnectionAlive(conPlanes1, isAlive => {
        if (isAlive) {
            // Si la première connexion est valide, exécuter la requête avec elle
            conPlanes1.query(sql, (err, planes) => {
                if (err) {
                    console.error('Erreur lors de la récupération des avions avec la première connexion :', err);
                    return callback(err, null);
                }
                let completedCount = 0;
                planes.forEach(plane => {
                    fetchPlaneData(conPlanes1, plane, (err) => {
                        if (err) {
                            console.error(`Erreur lors de la récupération des données de l'avion ${plane.id} :`, err);
                        }
                        completedCount++;
                        // Vérifier si toutes les requêtes sont terminées
                        if (completedCount === planes.length) {
                            callback(null, planesData);
                        }
                    });
                });
            });
        } else {
            // Si la première connexion échoue, utiliser la deuxième connexion
            console.log('Utilisation de la deuxième connexion...');
            conPlanes2.query(sql, (err, planes) => {
                if (err) {
                    console.error('Erreur lors de la récupération des avions avec la deuxième connexion :', err);
                    return callback(err, null);
                }
                let completedCount = 0;
                planes.forEach(plane => {
                    fetchPlaneData(conPlanes2, plane, (err) => {
                        if (err) {
                            console.error(`Erreur lors de la récupération des données de l'avion ${plane.id} :`, err);
                        }
                        completedCount++;
                        // Vérifier si toutes les requêtes sont terminées
                        if (completedCount === planes.length) {
                            callback(null, planesData);
                        }
                    });
                });
            });
        }
    });
}



module.exports = {
    getPlanes,
    getPlanePaths ,
    getPlaneData
};
