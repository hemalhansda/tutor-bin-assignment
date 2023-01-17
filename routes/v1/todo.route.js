const express = require('express');
const validate = require('../../middlewares/validate');

const auth = require('../../middlewares/auth');

const { todoValidation } = require('../../validations');
const { todoController } = require('../../controllers');

const router = express.Router();

router
  .post('/:userId', auth('manageSelf'), validate(todoValidation.addTodo), todoController.addTodo);

module.exports = router;