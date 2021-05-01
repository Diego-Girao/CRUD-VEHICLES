
class VehicleRouter {
    constructor(controller) {
        this.controller = controller;
        this.configure = this.configure.bind(this);
    }

    configure(app) {
        app.get('/api/vehicles', this.controller.findAll);
        app.post('/api/vehicles', this.controller.insert);
        app.get('/api/vehicles/:id', this.controller.findById);
        app.put('/api/vehicles/:id', this.controller.update);
        app.delete('/api/vehicles/:id', this.controller.remove)
    }
}

module.exports = VehicleRouter;