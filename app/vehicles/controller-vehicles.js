class VehicleController {
    constructor(repository) {
        this.repository = repository;
        this.findAll = this.findAll.bind(this);
        this.insert = this.insert.bind(this);
        this.findById = this.findById.bind(this);
        this.update = this.update.bind(this);
        this.remove = this.remove.bind(this);
    }

    findAll(request, response) {
        this.repository.findAll()
            .then(vehicle => {
                if (vehicle) {
                    response.json(vehicle);
                } else {
                    response.sendStatus(404);
                }
            })
            .catch(erro => {
                response.sendStatus(500);
            })
    }

    insert(request, response) {
        const { marca, modelo, ano } = request.body;
        this.repository.insert({ marca, modelo, ano })
            .then((id) => {
                response.status(201).json({ id });
            })
            .catch(() => {
                response.sendStatus(500);
            })

    }

    findById(request, response) {
        const id = request.params.id;
        this.repository.findById(id)
            .then((vehicle) => {
                if (vehicle) {
                    response.json(vehicle);
                } else {
                    response.sendStatus(404);
                }
            })
            .catch((e) => {
                console.log(e);
                response.sendStatus(500);
            })
    }

    update(request, response) {
        const id = request.params.id;
        const { marca, modelo, ano } = request.body;
        this.repository.update({ id, marca, modelo, ano })
            .then(ok => {
                if (ok) {
                    response.sendStatus(204);
                } else {
                    response.sendStatus(412);
                }
            })
            .catch((error) => {
                console.log(error);
                response.sendStatus(500);
            })
    }

    remove(request, response) {
        const id = request.params.id;
        this.repository.remove(id)
            .then((ok) => {
                if (ok) {
                    response.sendStatus(204);
                } else {
                    response.sendStatus(404);
                }
            })
            .catch((error) => {
                console.log(error);
                response.sendStatus(500);
            });
    }
}

module.exports = VehicleController;