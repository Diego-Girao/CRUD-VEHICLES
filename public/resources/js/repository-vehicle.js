class VehicleRepository {

    async findAll() {
        const response = await fetch('/api/vehicles');
        return response.json();
    }

    async insert(vehicle) {
        const response = await fetch('/api/vehicles', {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(vehicle)
        })
        return response.json();
    }
    async findById(id) {
        const response = await fetch('/api/vehicles/' + id);
        return response.json();
    }

    async update(vehicle) {
        return fetch(`/api/vehicles/${vehicle.id}`, {
            method: 'PUT',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(vehicle)
        })
    }

    async remove(id) {
        const removed = await fetch(`/api/vehicles/${id}`, {
            method: 'DELETE',
            headers: {
                "Content-type": "application/json"
            },
        })
        return removed;
    }
}