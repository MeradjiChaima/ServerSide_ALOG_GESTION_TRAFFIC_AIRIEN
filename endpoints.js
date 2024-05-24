const express = require('express');
const { getFlights} = require('./queries'); // Importez les fonctions de gestion des vols
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// Route pour récupérer tous les vols
app.get('/flights', (req, res) => {
    getFlights((err, flights) => {
        if (err) {
            return res.status(500).json({ error: 'Erreur lors de la récupération des vols.' });
        }
        res.json(flights);
    });
});


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Serveur en écoute sur le port ${PORT}`);
});
