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

module.exports = {
    addTodo
}