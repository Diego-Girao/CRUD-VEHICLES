class ContactController {
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
            .then(contacts => {
                if (contacts) {
                    response.json(contacts);
                } else {
                    response.sendStatus(404);
                }
            })
            .catch(erro => {
                response.sendStatus(500);
            })
    }

    insert(request, response) {
        const { name, email, phone } = request.body;
        this.repository.insert({ name, email, phone })
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
            .then((contact) => {
                if (contact) {
                    response.json(contact);
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
        const { name, email, phone } = request.body;
        this.repository.update({ id, name, email, phone })
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

module.exports = ContactController;