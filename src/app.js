const express = require('express');
const fs = require('fs');
const path = require('path');
const { createNlpInstance } = require('./nlpManager');
const { detectLanguage } = require('./languageDetector');

const app = express();
const port = 3000;
const unansweredLogPath = path.join(__dirname, '../unanswered-questions.log');

app.use(express.json());

(async () => {
  const nlp = await createNlpInstance();

  app.post('/chat', async (req, res) => {
    const { message } = req.body;
    const language = detectLanguage(message);
    const response = await nlp.process(language, message);

    let reply = response.answer || (language === 'id'
      ? "Maaf, saya tidak mengerti pertanyaan Anda. Bisakah Anda menanyakan dengan cara yang berbeda?"
      : "Sorry, I don't understand your question. Could you please ask in a different way?");

    // Simpan pertanyaan yang tidak bisa dijawab ke dalam file log
    if (!response.answer) {
      fs.appendFileSync(unansweredLogPath, `${new Date().toISOString()} - ${language} - ${message}\n`);
    }

    res.json({ reply });
  });

  app.listen(port, () => {
    console.log(`Chat bot listening at http://localhost:${port}`);
  });
})();
