const routes = [
    require('./app/vehicles').router,
    require('./app/contacts').router
]

function configure(app) {
    for (let route of routes) {
        route.configure(app);
    }

}

module.exports = {
    configure
}