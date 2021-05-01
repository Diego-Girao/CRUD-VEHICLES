class ContactRepository {
    constructor(dataBase) {
        this.dataBase = dataBase;
        this.findAll = this.findAll.bind(this);
        this.findById = this.findById.bind(this);
        this.findByEmail = this.findByEmail.bind(this);
        this.insert = this.insert.bind(this);
        this.update = this.update.bind(this);
        this.remove = this.remove.bind(this);
    }

    async findAll() {
        const sql = 'select * from contacts';
        let contacts = null;
        let connection = null;
        try {
            connection = await this.dataBase.getConnection();
            const data = await connection.query(sql);
            contacts = [...data]
        } catch (error) {
            console.log('Falha ao buscar os dados');
        } finally {
            connection && connection.end();
        }
        return contacts;
    }
    async findById(id) {
        const sql = 'select * from contacts where id = ?';
        const params = [id];
        let contact = null;
        let connection = null;
        try {
            connection = await this.dataBase.getConnection();
            const data = await connection.query(sql, params);
            const rows = [...data]
            if (rows.length > 0) {
                contact = rows[0];
            }
        } catch (error) {
            console.log('Falha ao buscar os dados');
            throw error;
        } finally {
            connection && connection.end();
        }
        return contact
    }
    findByEmail(email) {

    }
    async insert(contact) {
        const sql = 'insert into contacts(name, email, phone) values (?,?,?)';
        const params = [contact.name, contact.email, contact.phone];
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
    async update(contact) {
        const sql = "update contacts set name = ?, email = ?, phone = ? where id = ?";
        const params = [contact.name, contact.email, contact.phone, contact.id];
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
        const sql = "delete from contacts where id = ?";
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


module.exports = ContactRepository;