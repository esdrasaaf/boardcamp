import categorySchema from '../models/categoryModel.js';
import connection from '../database/db.js';

export default async function validateName (req, res, next) {
    const { name } = req.body
    const nameMin = name.toLowerCase()
    const newName = nameMin[0].toUpperCase() + nameMin.substring(1)

    const { error } = categorySchema.validate(req.body, { abortEarly: false })
    if (error) {
        const errors = error.details.map((d) => d.message)
        return res.status(400).send(errors)
    }

    try {
        const categoryExist = await connection.query("SELECT * FROM categories WHERE name = $1;", [newName])

        if (categoryExist.rows.length === 1) {
            return res.sendStatus(409)
        }

        req.newName = newName
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }

    next()
}