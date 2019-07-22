const BatchesController = require('./controllers/batches');
const ValidationMiddleware = require('../utils/middlewares/auth.validation.middleware');


exports.routesConfig = function (app) {
    app.post('/batches', [
        BatchesController.insert
    ]);
    app.get('/batches/:vendorId', [
        ValidationMiddleware.validJWTNeeded,
        BatchesController.getByVendorId
    ]);
    app.delete('/batches/:batchId', [
        ValidationMiddleware.validJWTNeeded,
        BatchesController.removeById
    ]);
};