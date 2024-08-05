const express = require('express');
const bodyParser = require('body-parser');
const { createNlpInstance } = require('./nlpManager');
const corpusRoutes = require('./routes/corpus');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use('/corpus', corpusRoutes);

(async () => {
  const nlp = await createNlpInstance();

  app.post('/chat', async (req, res) => {
    const { message } = req.body;
    const language = detectLanguage(message);
    const response = await nlp.process(language, message);

    const reply = response.answer || (language === 'id'
      ? "Maaf, saya tidak mengerti pertanyaan Anda. Bisakah Anda menanyakan dengan cara yang berbeda?"
      : "Sorry, I don't understand your question. Could you please ask in a different way?");

    res.json({ reply });
  });

  app.listen(port, () => {
    console.log(`Chat bot listening at http://localhost:${port}`);
  });
})();

function detectLanguage(message) {
  // Implement your language detection logic here
  return 'id'
}
