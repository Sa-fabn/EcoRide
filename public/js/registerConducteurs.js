const express = require('express');
const router = express.Router();

// Importez la base de données MongoDB depuis server.js
const { db } = require('./server');

// Route POST pour l'inscription des conducteurs
router.post('/inscriptionConducteur', async (req, res) => {
    const { nom, prenom, email, password, vehicule } = req.body;

    try {
        // Vérification si l'utilisateur existe déjà dans la collection des conducteurs
        const utilisateurExistant = await db.collection('conducteurs').findOne({ email });

        if (utilisateurExistant) {
            return res.status(409).send("Un conducteur avec cet email existe déjà.");
        }

        // Insertion du nouveau conducteur dans la base de données
        await db.collection('conducteurs').insertOne({
            nom,
            prenom,
            email,
            password,
            vehicule
        });

    } catch (error) {
        console.error(error);
        res.status(500).send('Une erreur est survenue lors de l\'inscription du conducteur. Veuillez réessayer.');
    }
});

module.exports = router;
