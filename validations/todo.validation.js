const Joi = require('joi');
const { objectId } = require("./custom.validation");

const addTodo = {
    params: Joi.object().keys({userId: Joi.required().custom(objectId)}),
    body: Joi.object().keys({
        title: Joi.string().required(),
        body: Joi.string(),
        completed: Joi.boolean()
    })
};

const getTodoList = {
    params: Joi.object().keys({userId: Joi.required().custom(objectId)}),
};

const updateTodoById = {
    params: Joi.object().keys({todoId: Joi.required().custom(objectId)}),
    body: Joi.object().keys({
        title: Joi.string(),
        body: Joi.string()
    })
};

const markTodoComplete = {
    params: Joi.object().keys({todoId: Joi.required().custom(objectId)}),
};

const deleteTodoById = {
    params: Joi.object().keys({todoId: Joi.required().custom(objectId)}),
};

module.exports = {
    addTodo,
    getTodoList,
    updateTodoById,
    markTodoComplete,
    deleteTodoById
}