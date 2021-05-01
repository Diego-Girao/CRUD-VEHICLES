class VehicleRepository {
    constructor(dataBase) {
        this.dataBase = dataBase;
        this.findAll = this.findAll.bind(this);
        this.findById = this.findById.bind(this);
        // this.findByEmail = this.findByEmail.bind(this); // Ainda não está sendo utilizado neste projeto.
        this.insert = this.insert.bind(this);
        this.update = this.update.bind(this);
        this.remove = this.remove.bind(this);
    }

    async findAll() {
        const sql = 'select * from vehicle';
        let vehicle = null;
        let connection = null;
        try {
            connection = await this.dataBase.getConnection();
            const data = await connection.query(sql);
            vehicle = [...data]
        } catch (error) {
            console.log('Falha ao buscar os dados');
        } finally {
            connection && connection.end();
        }
        return vehicle;
    }
    async findById(id) {
        const sql = 'select * from vehicle where id = ?';
        const params = [id];
        let vehicle = null;
        let connection = null;
        try {
            connection = await this.dataBase.getConnection();
            const data = await connection.query(sql, params);
            const rows = [...data]
            if (rows.length > 0) {
                vehicle = rows[0];
            }
        } catch (error) {
            console.log('Falha ao buscar os dados');
            throw error;
        } finally {
            connection && connection.end();
        }
        return vehicle;
    }

    // Ainda não está sendo utilizado neste projeto.
    /* findByEmail(email) {

    }*/

    async insert(vehicle) {
        const sql = 'insert into vehicle(marca, modelo, ano) values (?,?,?)';
        const params = [vehicle.marca, vehicle.modelo, vehicle.ano];
        let connection = null;
        let result = null;
        try {
            connection = await this.dataBase.getConnection();
            const { insertId } = await connection.query(sql, params);
            result = insertId;
        } catch (error) {
            console.log('Falha ao buscar os dados');
            throw error;
        } finally {
            connection && connection.end();
        }
        return result;
    }
    async update(vehicle) {
        const sql = "update vehicle set marca = ?, modelo = ?, ano = ? where id = ?";
        const params = [vehicle.marca, vehicle.modelo, vehicle.ano, vehicle.id];
        let ok = false;
        let connection = null;
        try {
            connection = await this.dataBase.getConnection();
            const result = await connection.query(sql, params);
            ok = result.affectedRows > 0;
        } catch (error) {
            console.log(error);
            throw error;
        } finally {
            connection && connection.end();
        }
        return ok;
    }
    async remove(id) {
        const sql = "delete from vehicle where id = ?";
        const params = [id];
        let ok = false;
        let connection = null;
        try {
            connection = await this.dataBase.getConnection();
            const result = await connection.query(sql, params);
            ok = result.affectedRows > 0;
        } catch (error) {
            console.log(error);
            throw error;
        } finally {
            connection && connection.end();
        }
        return ok;
    }
}


module.exports = VehicleRepository;