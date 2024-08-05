const { NlpManager } = require('node-nlp');
const path = require('path');
const fs = require('fs');

// Fungsi untuk membuat dan melatih model NLP
const createNlpInstance = async () => {
  const manager = new NlpManager({ languages: ['id', 'en'] });

  // Load corpus dynamically
  const loadCorpus = (language) => {
    const corpusPath = path.join(__dirname, `../corpus/${language}`);
    const files = fs.readdirSync(corpusPath);

    for (const file of files) {
      const filePath = path.join(corpusPath, file);
      const corpus = require(filePath);
      corpus.intents.forEach(intent => {
        intent.examples.forEach(example => {
          manager.addDocument(language, example, intent.intent);
        });
        intent.responses.forEach(response => {
          manager.addAnswer(language, intent.intent, response);
        });
      });
    }
  };

  loadCorpus('id');
  loadCorpus('en');

  // Train and return the manager
  await manager.train();
  manager.save();
  return manager;
};

module.exports = { createNlpInstance };
