const express = require('express');
const router = express.Router();

// Importez la base de données MongoDB depuis server.js
const { db } = require('./server');

// Route POST pour l'inscription des passagers
router.post('/inscriptionPassager', async (req, res) => {
    const { nom, prenom, email, password } = req.body;

    try {
        // Vérifiez si l'utilisateur existe déjà dans la collection des passagers
        const existingUser = await db.collection('passagers').findOne({ email });
        if (existingUser) {
            return res.status(400).send('Un utilisateur avec cet email existe déjà.');
        }

        // Créez un nouvel utilisateur passager
        const newUser = {
            nom,
            prenom,
            email,
            password // Notez que vous devriez utiliser un hash sécurisé pour le mot de passe
        };

        // Insérez le nouvel utilisateur dans la collection des passagers
        await db.collection('passagers').insertOne(newUser);

    } catch (error) {
        console.error(error);
        res.status(500).send('Une erreur est survenue lors de l\'inscription. Veuillez réessayer.');
    }
});

module.exports = router;
