import connection from "../database/db.js";
import customerSchema from "../models/customerModel.js";

export async function postValidation (req, res, next) {
    const { cpf } = req.body

    const { error } = customerSchema.validate(req.body, { abortEarly: false })
    if (error) {
        const errors = error.details.map((d) => d.message)
        return res.status(400).send(errors)
    }

    try {
        const cpfExist = await connection.query('SELECT * FROM customers WHERE cpf = $1;', [cpf])
        if (cpfExist.rows.length > 0) {
            return res.sendStatus(409)
        }

    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }

    next()
}

export async function putValidation (req, res, next) {
    const searchId = req.params.id
    const { cpf } = req.body

    const { error } = customerSchema.validate(req.body, { abortEarly: false })
    if (error) {
        const errors = error.details.map((d) => d.message)
        console.log(errors)
        return res.status(400).send(errors)
    }

    try {
        const cpfExist = await connection.query('SELECT * FROM customers WHERE cpf = $1 AND id <> $2 ;', [cpf, searchId]);
        if (cpfExist.rows.length > 0) {
            return res.sendStatus(409)
        }
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }

    next()
}