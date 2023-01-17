const express = require('express');
const authRoute = require('./auth.route');
const todoRoute = require('./todo.route');

const router = express.Router();

router.use('/auth', authRoute);
router.use('/todo', todoRoute);

module.exports = router;