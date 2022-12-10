import connection from '../database/db.js';

export async function postGames (req, res) {
    const { name, image, stockTotal, categoryId, pricePerDay } = req.body

    try {
        await connection.query('INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay") VALUES ($1, $2, $3, $4, $5);', [name, image, stockTotal, categoryId, pricePerDay])
        res.sendStatus(201)
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}

export async function getGames (req, res) {
    const nameQuery = req.query.name

    try {
        if (!nameQuery) {
            const games = await connection.query('SELECT games.*, categories.name AS "categoryName" FROM games JOIN categories ON "categoryId" = categories.id;');
            res.status(200).send(games.rows)
        } else {
            const games = await connection.query(`SELECT games.*, categories.name AS "categoryName" FROM games JOIN categories ON "categoryId" = categories.id WHERE games.name ILIKE '${nameQuery}%';`);
            res.status(200).send(games.rows)
        }
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}