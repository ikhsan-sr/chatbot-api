const express = require('express');
const { createIntent, readIntent, updateIntent, deleteIntent } = require('../controllers/corpusController');
const router = express.Router();

router.post('/:language', createIntent);
router.get('/:language/:intent', readIntent);
router.put('/:language/:intent', updateIntent);
router.delete('/:language/:intent', deleteIntent);

module.exports = router;
