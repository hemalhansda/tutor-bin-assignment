const { todoService } = require("../services");
const catchAsync = require("../utils/catchAsync");
const { success } = require("../utils/ResponseHandler");

const addTodo = catchAsync(async (req, res) => {
    const payload = req.body;
    const { userId } = req.params;

    const result = await todoService.addTodo(userId, payload);

    res.send(success(result));
});

module.exports = {
    addTodo
};