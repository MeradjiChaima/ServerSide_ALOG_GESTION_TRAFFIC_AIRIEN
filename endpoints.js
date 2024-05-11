const express = require('express');
const { getAllReservations,getAllParkings , getAllUsers ,createUser, authenticateUser ,getParkingDetails, makeReservation, getUserReservations ,searchParkingByName } = require('./queries');
const path = require('path'); // Déplacez cette ligne vers le haut

const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());


//--------------------------------Routes Usrs ----------------------------------------------

app.get('/users', (req, res) => {
    getAllUsers((err, users) => {
        if (err) {
            return res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs.' });
        }
        res.json(users);
    });
});


// Route pour créer un nouvel utilisateur
app.post('/register', (req, res) => {
    const userData = req.body;
    createUser(userData, (err, userId) => {
        if (err) {
            return res.status(500).json({ error: 'Erreur lors de la création du compte utilisateur.' });
        }
        res.json({ message: 'Compte utilisateur créé avec succès.', userId });
    });
});



// Route pour l'authentification de l'utilisateur
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    authenticateUser({ email, password }, (err, isAuthenticated, user) => {
        if (err) {
            return res.status(500).json({ error: 'Erreur lors de l\'authentification.' });
        }
        if (!isAuthenticated) {
            return res.status(401).json({ error: 'Adresse email ou mot de passe incorrect.' });
        }
        res.json({ message: 'Authentification réussie.', user });
    });
});

//--------------------------------------Routes Parkings--------------------------------------------


app.get('/parkings/:imageName', (req, res) => {
    const imageName = req.params.imageName;
    const imagePath = path.join(__dirname, 'images/parkings', imageName);
    res.sendFile(imagePath);
});

// Autres routes...

app.use(express.static('images/parkings'));
app.get('/parkings', (req, res) => {
    getAllParkings((err, parkings) => {
        if (err) {
            return res.status(500).json({ error: 'Erreur lors de la récupération des parkings.' });
        }
        res.json(parkings);
    });
});

// route pour search parking by name 
app.get('/parkingSearch', (req, res) => {
    const parkingName = req.query.name; 
    if (!parkingName) {
        return res.status(400).json({ error: 'Nom du parking non fourni dans la requête.' });
    }
    searchParkingByName(parkingName, (err, parkings) => {
        if (err) {
            return res.status(500).json({ error: 'Erreur lors de la recherche des parkings.' });
        }
        res.json(parkings);
    });
});

// Route pour afficher les détails d'un parking
app.get('/parking/:id', (req, res) => {
    const parkingId = req.params.id;
    getParkingDetails(parkingId, (err, parking) => {
        if (err) {
            return res.status(500).json({ error: 'Erreur lors de la récupération des détails du parking.' });
        }
        if (!parking) {
            return res.status(404).json({ error: 'Parking non trouvé.' });
        }
        res.json(parking);
    });
});


//-----------------------------------------Reservations Routes ----------------------------------
// Route pour get all reservation 
app.get('/AllReservations', (req, res) => {
    getAllReservations((err, reservations) => {
        if (err) {
            return res.status(500).json({ error: 'Erreur lors de la récupération des réservations.' });
        }
        res.json(reservations);
    });
});

// Route pour effectuer une réservation
app.post('/makeReservation', function (req, res) {
    const reservationData = req.body; 
    makeReservation(reservationData, function (err, reservation) {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(200).json({ reservation: reservation }); 
        }
    });
});



// Route pour afficher les réservations de l'utilisateur
app.get('/reservations/:userId', (req, res) => {
    const userId = req.params.userId;
    getUserReservations(userId, (err, reservations) => {
        if (err) {
            return res.status(500).json({ error: 'Erreur lors de la récupération des réservations de l\'utilisateur.' });
        }
        res.json(reservations);
    });
});


//------------------------------ places Routes -----------------------------------------------






const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Serveur en écoute sur le port ${PORT}`);
});
