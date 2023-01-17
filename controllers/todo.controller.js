const { todoService } = require("../services");
const catchAsync = require("../utils/catchAsync");
const { success } = require("../utils/ResponseHandler");

const addTodo = catchAsync(async (req, res) => {
    const payload = req.body;
    const { userId } = req.params;

    const result = await todoService.addTodo(userId, payload);

    res.send(success(result));
});

const getTodoList = catchAsync(async (req, res) => {
    const { userId } = req.params;
    const result = await todoService.getTodoList(userId);
    res.send(success(result));
});

const updateTodoById = catchAsync(async (req, res) => {
    const { todoId } = req.params;
    const payload = req.body;
    const result = await todoService.updateTodoById(req.user._id, todoId, payload);
    res.send(success(result));
});

const markTodoComplete = catchAsync(async (req, res) => {
    const { todoId } = req.params;
    const result = await todoService.markTodoComplete(todoId, req.user._id);
    res.send(success(result));
});

const deleteTodoById = catchAsync(async (req, res) => {
    const { todoId } = req.params;
    const result = await todoService.deleteTodoById(todoId, req.user._id);
    res.send(success(result));
});

module.exports = {
    addTodo,
    getTodoList,
    updateTodoById,
    markTodoComplete,
    deleteTodoById
};