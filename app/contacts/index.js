const db = require('../../db');
const ContactRepository = require('./repository-contacts');
const ContactController = require('./controller-contacts');
const ContactRouter = require('./routes-contacts');

const repository = new ContactRepository(db);
const controller = new ContactController(repository);
const router = new ContactRouter(controller);

module.exports = {
    router
}

