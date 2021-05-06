class ViewVehicles {
    constructor(repository) {
        this.repository = repository;
        this.elTable = document.querySelector('#tableBodyVehicles');
        this.render = this.render.bind(this);
        this.editHandler = this.editHandler.bind(this);
        this.deleteHandler = this.deleteHandler.bind(this);
    }

    render() {

        //renderizado os itens da table
        this.repository.findAll()
            .then((vehicles) => {

                for (let index = this.elTable.childElementCount - 1; index > -1; index--) {
                    const line = this.elTable.children[index];
                    line.remove();
                }

                for (let index = 0; index < vehicles.length; index++) {
                    const vehicle = vehicles[index];

                    const line = document.createElement('tr');
                    const colCode = document.createElement('td');
                    const colMarca = document.createElement('td');
                    const colModelo = document.createElement('td');
                    const colAno = document.createElement('td');
                    const colAcoes = document.createElement('td');
                    const btnEdit = document.createElement('button');
                    const btnApagar = document.createElement('button');

                    colCode.innerHTML = vehicle.id;
                    colMarca.innerHTML = vehicle.marca;
                    colModelo.innerHTML = vehicle.modelo;
                    colAno.innerHTML = vehicle.ano;

                    // Inicio ações do btnEdit
                    btnEdit.innerHTML = 'Editar';
                    btnEdit.setAttribute('data-id', vehicle.id);
                    btnEdit.setAttribute('class', 'btn btn-outline-secondary');
                    btnEdit.addEventListener('click', this.editHandler);
                    colAcoes.appendChild(btnEdit);
                    // Final ações do btnEdit

                    // Inicio ações do btnApagar    
                    btnApagar.innerHTML = 'Excluir';
                    btnApagar.setAttribute('data-id', vehicle.id);
                    btnApagar.setAttribute('class', 'btn btn-outline-danger');
                    btnApagar.addEventListener('click', this.deleteHandler);
                    colAcoes.appendChild(btnApagar);
                    // Final ações do btnApagar
                    
                    /* Teste do alert trazendo as informações
                     btnApagar.addEventListener('click', (event) => {
                         const id = event.target.getAttribute('data-id');
                         alert('O id: ' + id);
                     }) */

                    line.appendChild(colCode);
                    line.appendChild(colMarca);
                    line.appendChild(colModelo);
                    line.appendChild(colAno);
                    line.appendChild(colAcoes);

                    this.elTable.appendChild(line);
                }

            })

            .catch((err) => {
                alert('Não foi possivel carregar os dados tabela de veículos !');
            });
    }

    editHandler(event) {
        const id = event.target.getAttribute('data-id');
        this.repository.findById(parseInt(id))
            .then(vehicle => {
                document.querySelector('input[name="id"]').value = vehicle.id;
                document.querySelector('input[name="marca"]').value = vehicle.marca;
                document.querySelector('input[name="modelo"]').value = vehicle.modelo;
                document.querySelector('input[name="ano"]').value = vehicle.ano;
            })
            .catch(err => {
                alert('Não foi possível carregar o veículo !');
            });
    }

    deleteHandler(event) {
        const id = event.target.getAttribute('data-id');
        this.repository.remove(id)
            .then(data => {
                alert('O veículo foi removido com sucesso !!!');
                this.render();
            })
            .catch(error => {
                alert('Não foi possível remover o veículo !');
                
            });
    }
}