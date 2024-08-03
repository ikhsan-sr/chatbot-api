const fs = require('fs');
const path = require('path');

// Path to corpus directory
const corpusPath = path.join(__dirname, '../corpus');

const getFilePath = (language, intent) => path.join(corpusPath, language, `${intent}.json`);

const readCorpusFile = (filePath) => {
  if (fs.existsSync(filePath)) {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  }
  return null;
};

const writeCorpusFile = (filePath, data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

const deleteCorpusFile = (filePath) => {
  fs.unlinkSync(filePath);
};

module.exports = {
  getFilePath,
  readCorpusFile,
  writeCorpusFile,
  deleteCorpusFile,
};
