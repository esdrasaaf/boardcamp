import connection from "../database/db.js";

export async function getCustomers (req, res) {
    const cpfQuery = req.query.cpf

    try {
        if (!cpfQuery) {
            const customers = await connection.query('SELECT * FROM customers;');
            return res.status(200).send(customers.rows)
        } else {
            const customers = await connection.query(`SELECT * FROM customers WHERE cpf ILIKE '${cpfQuery}%';`);
            return res.status(200).send(customers.rows)
        }
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}

export async function getCustomersById (req, res) {
    const searchId = req.params.id
    
    try {
        const customer = await connection.query('SELECT * FROM customers WHERE id = $1;', [searchId])
        if (customer.rows.length === 0) {
            return res.sendStatus(404)
        } else {
            return res.send(customer.rows[0]).status(200)
        }
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}

export async function postCustomers (req, res) {
    const { name, phone, cpf, birthday } = req.body

    try {
        await connection.query('INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4);', [name, phone, cpf, birthday])
        res.sendStatus(201)
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}

export async function putCustomers (req, res) {
    const { name, phone, cpf, birthday } = req.body
    const searchId = req.params.id

    try {
        await connection.query('UPDATE customers SET name = $1, phone = $2, cpf = $3, birthday = $4 WHERE id = $5;', [name, phone, cpf, birthday, searchId])
        res.sendStatus(200)
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}