import connection from '../database/db.js';
import gameSchema from '../models/gamesModel.js';

export default async function postValidate (req, res, next) {
    const { name, categoryId } = req.body

    const { error } = gameSchema.validate(req.body, { abortEarly: false })
    if (error) {
        const errors = error.details.map((d) => d.message)
        return res.status(400).send(errors)
    }

    try {
        const categoryExist = await connection.query("SELECT * FROM categories WHERE id = $1;", [categoryId])
        if (categoryExist.rows.length === 0) {
            return res.sendStatus(400)
        }

        const gameExist = await connection.query("SELECT * FROM games WHERE name = $1;", [name])
        if (gameExist.rows.length > 0) {
            return res.sendStatus(409)
        }
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }

    next()
}