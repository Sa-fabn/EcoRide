const express = require('express');
const router = express.Router();

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

module.exports = router;


