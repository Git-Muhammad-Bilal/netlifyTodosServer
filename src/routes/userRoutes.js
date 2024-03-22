const express = require('express');
const { createUser, getUser } = require('../controllers/createUser');
const router = express.Router();

router.post('/createUser', createUser)
router.post('/getUser', getUser)

module.exports = router;