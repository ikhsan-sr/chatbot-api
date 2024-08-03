const fs = require('fs');
const path = require('path');
const { NlpManager } = require('node-nlp');

const modelPath = path.join(__dirname, '../model.nlp');

// Fungsi untuk membuat dan melatih model NLP
const createNlpInstance = async () => {
  const manager = new NlpManager({ languages: ['en', 'id'] });

  // Load corpus for English
  const englishCorpusPath = path.join(__dirname, '../corpus/english');
  const englishFiles = fs.readdirSync(englishCorpusPath);

  for (const file of englishFiles) {
    const filePath = path.join(englishCorpusPath, file);
    const corpus = require(filePath);
    corpus.intents.forEach(intent => {
      intent.examples.forEach(example => {
        manager.addDocument('en', example, intent.intent);
      });
      intent.responses.forEach(response => {
        manager.addAnswer('en', intent.intent, response);
      });
    });
  }

  // Load corpus for Indonesian
  const indonesianCorpusPath = path.join(__dirname, '../corpus/indonesian');
  const indonesianFiles = fs.readdirSync(indonesianCorpusPath);

  for (const file of indonesianFiles) {
    const filePath = path.join(indonesianCorpusPath, file);
    const corpus = require(filePath);
    corpus.intents.forEach(intent => {
      intent.examples.forEach(example => {
        manager.addDocument('id', example, intent.intent);
      });
      intent.responses.forEach(response => {
        manager.addAnswer('id', intent.intent, response);
      });
    });
  }

  // Train and return the manager
  await manager.train();
  manager.save();
  return manager;
}; 

module.exports = {
  createNlpInstance,
};
