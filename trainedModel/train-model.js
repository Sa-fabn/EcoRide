const { NlpManager } = require('node-nlp'); 
const intents = require('./dataset/Intent.json'); 

const manager = new NlpManager({ languages: ['en'] }); 

intents.intents.forEach(intent => { 
    const intentName = intent.intent; 
    const texts = intent.text; 
    const responses = intent.responses;  
    texts.forEach((text, index) => { 
    manager.addDocument('en', text, intentName); 
    manager.addAnswer('en', intentName, responses[index]);  
    }); 
}); 
// Entraîner le modèle 
(async () => { 
    await manager.train(); 
    console.log('Modèle entraîné avec succès'); 
    // Sauvegarder le modèle 
    await manager.save(); 
    console.log('Modèle sauvegardé avec succès'); 
})(); 
