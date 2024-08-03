const LanguageDetect = require('languagedetect');

const lngDetector = new LanguageDetect();

function detectLanguage(message) {
  const detectedLanguages = lngDetector.detect(message, 1);
  return detectedLanguages.length > 0 && detectedLanguages[0][0] === 'english' ? 'en' : 'id';
}

module.exports = {
  detectLanguage,
};
