const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { authService, userService, tokenService } = require('../services');
const { success } = require('../utils/ResponseHandler');

const register = catchAsync(async (req, res) => {
    console.log('sadasdad');
    let user = await userService.createUser(req.body);
    const tokens = await tokenService.generateAuthTokens(user);
    res.send(success({ user, tokens }, httpStatus.OK));
});

const login = catchAsync(async (req, res) => {
    const { email, password } = req.body;
    let user = null;
    if (email && password) {
        user = await authService.loginUserWithEmailAndPassword(email, password);

        const tokens = await tokenService.generateAuthTokens(user);

        res.send(success({ user, tokens }));
    }

    res.send(success({ status: `Unauthorized!` }));
});

const logout = catchAsync(async (req, res) => {
    await authService.logout({ ...req.body });
    res.status(httpStatus.NO_CONTENT).send();
});

const refreshTokens = catchAsync(async (req, res) => {
    const tokens = await authService.refreshAuth(req.body.refreshToken);
    res.send(success(tokens));
});

module.exports = {
  register,
  login,
  logout,
  refreshTokens
};
