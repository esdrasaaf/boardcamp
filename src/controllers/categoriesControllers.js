import connection from '../database/db.js';

export async function postCategory (req, res) {
    const name = req.newName

    try {
        await connection.query("INSERT INTO categories (name) VALUES ($1);", [name])
        res.sendStatus(201)

    } catch (error) {
        console.log(error)
        res.send(500)
    }
}

export async function getCategory (req, res) {
    try {
        const categories = await connection.query("SELECT * FROM categories;");
        res.status(200).send(categories.rows)        
    } catch (error) {
        console.log(error)
        res.status(500)
    }
}