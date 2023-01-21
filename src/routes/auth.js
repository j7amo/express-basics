const express = require('express');

const router = express.Router();
const login = require('../controllers/auth');

// It is considered a good practice to extract handlers to a separate folder
// which is called "controllers" by CONVENTION. Then import those controllers (just
// another name for "handlers"/"request listeners") into "routes" file
// and use them as a HANDLER/REQUEST LISTENER:
router.post('/', login);

module.exports = router;
