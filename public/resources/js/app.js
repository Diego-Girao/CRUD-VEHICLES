const repository = new VehicleRepository();
const viewVehicles = new ViewVehicles(repository);
const viewFormVehicles = new FormVehicles(repository, viewVehicles);


viewVehicles.render();
viewFormVehicles.render();