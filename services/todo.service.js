const { Todo } = require("../models");

const addTodo = async (userId, payload) => {
    payload.user = userId;
    const result = await Todo.create(payload);
    return result;
};

const updateTodoById = async (userId, todoId, payload) => {
    const result = await Todo.updateOne({user: userId, _id: todoId, active: true}, {
        $set: {
            ...payload
        }
    });

    return result;
};

const deleteTodoById = async (todoId, userId) => {
    const result = await Todo.updateOne({user: userId, _id: todoId, active: true}, {
        $set: { active: false }
    });

    return result;
};

const getTodoList = async (userId) => {
    const result = await Todo.find({user: userId, active: true});
    return result;
};

const markTodoComplete = async (todoId, userId) => {
    const result = await updateTodoById(userId, todoId, { completed: true });
    return result;
};

module.exports = {
    addTodo,
    updateTodoById,
    getTodoList,
    deleteTodoById,
    markTodoComplete
}