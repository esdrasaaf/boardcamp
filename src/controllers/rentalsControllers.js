import connection from "../database/db.js";

export async function getRentals (req, res) {
    const { customerId, gameId } = req.query

    try {
        if (!customerId && !gameId) {
            const rentals = await connection.query(`SELECT rentals.*, row_to_json (customers.*) AS customer, json_build_object ('id', games.id, 'name', games.name, 'categoryId', games."categoryId", 'categoryName', categories.name) AS game FROM rentals JOIN customers ON customers.id = rentals."customerId" JOIN games ON games.id = rentals."gameId" JOIN categories ON categories.id = games."categoryId";`);
            return res.status(200).send(rentals.rows) 
        }

        if (customerId && gameId) {
            const rentals = await connection.query(`SELECT rentals.*, row_to_json (customers.*) AS customer, json_build_object ('id', games.id, 'name', games.name, 'categoryId', games."categoryId", 'categoryName', categories.name) AS game FROM rentals JOIN customers ON customers.id = rentals."customerId" JOIN games ON games.id = rentals."gameId" JOIN categories ON categories.id = games."categoryId" WHERE "customerId" = $1 AND "gameId" = $2;`, [customerId, gameId]);
            return res.status(200).send(rentals.rows) 
        }

        if (customerId) {
            const rentals = await connection.query(`SELECT rentals.*, row_to_json (customers.*) AS customer, json_build_object ('id', games.id, 'name', games.name, 'categoryId', games."categoryId", 'categoryName', categories.name) AS game FROM rentals JOIN customers ON customers.id = rentals."customerId" JOIN games ON games.id = rentals."gameId" JOIN categories ON categories.id = games."categoryId" WHERE "customerId" = $1;`, [customerId]);
            return res.status(200).send(rentals.rows)  
        }

        if (gameId) {
            const rentals = await connection.query(`SELECT rentals.*, row_to_json (customers.*) AS customer, json_build_object ('id', games.id, 'name', games.name, 'categoryId', games."categoryId", 'categoryName', categories.name) AS game FROM rentals JOIN customers ON customers.id = rentals."customerId" JOIN games ON games.id = rentals."gameId" JOIN categories ON categories.id = games."categoryId" WHERE "gameId" = $1;`, [gameId]);
            return res.status(200).send(rentals.rows)  
        }      
    } catch (error) {
        console.log(error)
        res.status(500)
    }
}

export async function postRentals (req, res) {
    const { customerId, gameId, daysRented } = req.body
    const { originalPrice, rentDate, returnDate, delayFee } = res.locals

    try {
        await connection.query('INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee") VALUES ($1, $2, $3, $4, $5, $6, $7);', [customerId, gameId, rentDate, daysRented, returnDate, originalPrice, delayFee]);
        res.sendStatus(201)
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}

export async function deleteRentals (req, res) {
    const { id } = req.params
    
    try {
        await connection.query('DELETE FROM rentals WHERE id = $1;', [id])
        res.sendStatus(200)
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}

export async function postReturnRentals (req, res) {
    const { id } = req.params
    const { returnDate, delayFee } = res.locals

    try {
        await connection.query('UPDATE rentals SET "returnDate"= $1, "delayFee" = $2 WHERE id = $3;', [returnDate, delayFee, id])
        res.sendStatus(200)
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}