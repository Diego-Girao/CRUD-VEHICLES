class FormVehicles {

    constructor(repository, ViewVehicles) {
        this.repository = repository;
        this.ViewVehicles = ViewVehicles;
        this.saveHandler = this.saveHandler.bind(this);
        this.clearForm = this.clearForm.bind(this);
        this.alerta = this.alerta.bind(this);
        this.alertaErro = this.alertaErro.bind(this);
    }

    render() {
        this.elId = document.querySelector('input[name="id"]');
        this.elMarca = document.querySelector('input[name="marca"]');
        this.elModelo = document.querySelector('input[name="modelo"]');
        this.elAno = document.querySelector('input[name="ano"]');
        this.btnSave = document.getElementById('btnSave');

        this.btnSave.addEventListener('click', this.saveHandler);
    }

    saveHandler(event) {
        event.preventDefault();
        const id = parseInt(this.elId.value) || null;
        const marca = this.elMarca.value;
        const modelo = this.elModelo.value;
        const ano = this.elAno.value;

        const vehicle = new Vehicle(id, marca, modelo, ano);
        if (!vehicle.id) {
            this.repository.insert(vehicle)
                .then(data => {
                    this.alerta();
                    this.clearForm();
                    this.ViewVehicles.render();
                })
                .catch(error => {
                    this.alertaErro();
                })
        } else {
            this.repository.update(vehicle)
                .then((response) => {
                    this.alerta();
                    this.clearForm();
                    this.ViewVehicles.render();
                })
                .catch(error => {
                    this.alertaErro();
                })
        }
    }
    clearForm() {
        this.elId.value = "";
        this.elMarca.value = "";
        this.elModelo.value = "";
        this.elAno.value = "";
    }
    alerta () {
        Swal.fire(
            'Muito bem !',
            'Dados do veículo gravado com sucesso !',
            'success'
          )
    }
    alertaErro () {
        Swal.fire(
            'Ops!',
            'Não foi possível atualizar o veículo',
            'error'
          )
    }
}