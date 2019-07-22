const VerifyBatchMiddleware = require('./middlewares/verify.batch.middleware');
const AuthorizationController = require('./controllers/authorization.controller');
const AuthValidationMiddleware = require('../utils/middlewares/auth.validation.middleware');
exports.routesConfig = function (app) {

    app.post('/auth', [
        VerifyBatchMiddleware.hasAuthValidFileType,
        AuthorizationController.login
    ]);

    app.post('/auth/refresh', [
        AuthValidationMiddleware.validJWTNeeded,
        AuthValidationMiddleware.verifyRefreshBodyField,
        AuthValidationMiddleware.validRefreshNeeded,
        AuthorizationController.login
    ]);
};