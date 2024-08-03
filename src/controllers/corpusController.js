const { getFilePath, readCorpusFile, writeCorpusFile, deleteCorpusFile } = require('../utils/fileHelper');

const createIntent = (req, res) => {
  const { language } = req.params;
  const { intent, examples, responses } = req.body;
  const filePath = getFilePath(language, intent);

  if (fs.existsSync(filePath)) {
    return res.status(400).json({ message: 'Intent already exists' });
  }

  const corpus = {
    intents: [{
      intent,
      examples,
      responses
    }]
  };

  writeCorpusFile(filePath, corpus);
  res.status(201).json({ message: 'Intent created successfully' });
};

const readIntent = (req, res) => {
  const { language, intent } = req.params;
  const filePath = getFilePath(language, intent);

  const corpus = readCorpusFile(filePath);
  if (!corpus) {
    return res.status(404).json({ message: 'Intent not found' });
  }

  res.json(corpus);
};

const updateIntent = (req, res) => {
  const { language, intent } = req.params;
  const { examples, responses } = req.body;
  const filePath = getFilePath(language, intent);

  const existingCorpus = readCorpusFile(filePath);
  if (!existingCorpus) {
    return res.status(404).json({ message: 'Intent not found' });
  }

  const existingIntent = existingCorpus.intents.find(i => i.intent === intent);

  if (examples) {
    existingIntent.examples = [...new Set([...existingIntent.examples, ...examples])];
  }

  if (responses) {
    existingIntent.responses = [...new Set([...existingIntent.responses, ...responses])];
  }

  writeCorpusFile(filePath, existingCorpus);
  res.json({ message: 'Intent updated successfully' });
};

const deleteIntent = (req, res) => {
  const { language, intent } = req.params;
  const filePath = getFilePath(language, intent);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ message: 'Intent not found' });
  }

  deleteCorpusFile(filePath);
  res.json({ message: 'Intent deleted successfully' });
};

module.exports = {
  createIntent,
  readIntent,
  updateIntent,
  deleteIntent,
};
