const express = require('express');
const router = express.Router();

// Importer le module 'body-parser' pour parser les données du formulaire
const bodyParser = require('body-parser');

// Middleware pour parser le corps des requêtes en JSON
router.use(bodyParser.urlencoded({ extended: true }));

// Route POST pour la réservation
router.post('/reservation', function(req, res) {
    const depart = req.body.depart;
    const arrivee = req.body.arrivee;
    const dateDepart = req.body.dateDepart;
    const dateArrivee = req.body.dateArrivee;
    const nombrePassagers = req.body.nombrePassagers;

    console.log('Données de réservation reçues :', req.body);

    // création du bloc html
    const reservationHTML = `
        <div class="reservation-info">
            <h2>Confirmation de réservation</h2>
            <p>Lieu de départ : ${depart}</p>
            <p>Lieu d'arrivée : ${arrivee}</p>
            <p>Date et heure de départ : ${dateDepart}</p>
            <p>Date et heure d'arrivée : ${dateArrivee}</p>
            <p>Nombre de passagers : ${nombrePassagers}</p>
        </div>
    `;

    // envoyer le bloc html de confirmation dans la réponse
    res.status(200).send(reservationHTML);
});

router.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/html/index.html');
});

router.get('/login.html', function(req, res) {
    res.sendFile(__dirname + '/public/html/login.html');
});

router.get('/registerPassagers.html', function(req, res) {
    res.sendFile(__dirname + '/public/html/registerPassagers.html');
});

router.get('/registerConducteurs.html', function(req, res) {
    res.sendFile(__dirname + '/public/html/registerConducteurs.html');
});

router.get('/reservation.html', function(req, res) {
    res.sendFile(__dirname + '/public/html/reservation.html');
});

// Route pour error.html
router.get('*', function(req, res) {
    res.sendFile(__dirname + '/public/html/error.html');
});

router.post('/connexion', async (req, res) => {
    res.redirect('/reservation.html');
});

router.post('/inscriptionPassager', async (req, res) => {
    res.redirect('/reservation.html');
});

router.post('/inscriptionConducteur', async (req, res) => {
    res.redirect('/reservation.html');
});


module.exports = router;

