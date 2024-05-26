const express = require('express');
const { getFlights} = require('./queriesFlights');
const { getPlanes, getPlanePaths , getPlaneData} = require('./queriesPlanes');
const app = express();
const cors = require('cors');
app.use(cors());
const bodyParser = require('body-parser');
app.use(bodyParser.json());


app.get('/flights', (req, res) => {
    getFlights((err, flights) => {
        if (err) {
            return res.status(500).json({ error: 'Erreur lors de la récupération des vols.' });
        }
        res.json(flights);
    });
});

app.get('/planes', (req, res) => {
    getPlanes((err, planes) => {
        if (err) {
            console.error('Erreur lors de la récupération des avions :', err);
            res.status(500).json({ error: 'Erreur lors de la récupération des avions' });
            return;
        }
        res.json(planes);
    });
});

app.get('/plane_paths/:planeId', (req, res) => {
    const planeId = req.params.planeId;
    getPlanePaths(planeId, (err, paths) => {
        if (err) {
            console.error('Erreur lors de la récupération des trajectoires de l\'avion :', err);
            res.status(500).json({ error: 'Erreur lors de la récupération des trajectoires de l\'avion' });
            return;
        }
        res.json(paths);
    });
});

app.get('/planes_data', (req, res) => {
    getPlaneData((err, data) => {
        if (err) {
            console.error('Erreur lors de la récupération des données des avions :', err);
            return res.status(500).json({ error: 'Erreur lors de la récupération des données des avions' });
        }
        res.json(data);
    });
});



const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Serveur en écoute sur le port ${PORT}`);
});
