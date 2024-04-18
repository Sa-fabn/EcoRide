const express = require('express');
const { MongoClient } = require('mongodb');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3000;
const url = 'mongodb://localhost:27017/ecoride';

// Fonction pour se connecter à la base de données
async function connectToDatabase() {
    try {
        const client = new MongoClient(url);
        await client.connect();
        console.log('Connecté à la base de données');
        return client.db();
    } catch (error) {
        console.error('Erreur de connexion à la base de données :', error);
        throw error;
    }
}

// Utilisation des routes
app.use('/', routes);

// Fonction pour démarrer le serveur
async function startServer() {
    try {
        // Se connecter à la base de données
        const db = await connectToDatabase();

        // Démarrer le serveur
        app.listen(PORT, () => {
            console.log(`Serveur démarré sur le port ${PORT}`);
        });

        // Exporter la base de données après l'avoir créée
        module.exports.db = db;
    } catch (error) {
        console.error('Erreur lors du démarrage du serveur :', error);
    }
}

startServer();
