const express = require('express');
const validate = require('../../middlewares/validate');

const auth = require('../../middlewares/auth');

const { todoValidation } = require('../../validations');
const { todoController } = require('../../controllers');

const router = express.Router();

router
  .patch('/mark/:todoId', auth('manageSelf'), validate(todoValidation.markTodoComplete), todoController.markTodoComplete)
  .post('/:userId', auth('manageSelf'), validate(todoValidation.addTodo), todoController.addTodo)
  .patch('/:todoId', auth('manageSelf'), validate(todoValidation.updateTodoById), todoController.updateTodoById)
  .delete('/:todoId', auth('manageSelf'), validate(todoValidation.deleteTodoById), todoController.deleteTodoById)
  .get('/:userId', auth('manageSelf'), validate(todoValidation.getTodoList), todoController.getTodoList);

module.exports = router;