const db = require('../../db');
const VehicleRepository = require('./repository-vehicles');
const VehicleController = require('./controller-vehicles');
const VehicleRouter = require('./routes-vehicles');

const repository = new VehicleRepository(db);
const controller = new VehicleController(repository);
const router = new VehicleRouter(controller);

module.exports = {
    router
}

