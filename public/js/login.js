const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

// Importez la base de données MongoDB depuis server.js
const { db } = require('./server');

// Route POST pour la connexion
router.post('/connexion', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Recherche de l'utilisateur dans la collection passagers
        let utilisateur = await db.collection('passagers').findOne({ email });

        // Si l'utilisateur n'est pas trouvé dans la collection passagers, recherchez dans la collection conducteurs
        if (!utilisateur) {
            utilisateur = await db.collection('conducteurs').findOne({ email });
        }

        // Si aucun utilisateur n'est trouvé avec l'e-mail fourni
        if (!utilisateur) {
            return res.status(401).send('Identifiants incorrects. Veuillez réessayer.');
        }

        // Comparaison du mot de passe fourni avec le mot de passe stocké
        const passwordMatch = await bcrypt.compare(password, utilisateur.mdp);

        if (!passwordMatch) {
            return res.status(401).send('Identifiants incorrects. Veuillez réessayer.');
        }

    } catch (error) {
        console.error(error);
        res.status(500).send('Une erreur est survenue lors de la connexion. Veuillez réessayer.');
    }
});

module.exports = router;
