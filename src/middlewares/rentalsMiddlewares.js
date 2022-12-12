import dayjs from 'dayjs'
import connection from '../database/db.js'

export async function postBusinessRules (req, res, next) {
    const { customerId, gameId, daysRented } = req.body

    if (daysRented <= 0) { 
        return res.sendStatus(400)
    }

    try {
        const gameExist = await connection.query('SELECT * FROM games WHERE id = $1;', [gameId])
        if (gameExist.rows.length === 0) {
            return res.sendStatus(400)
        }

        const customerExist = await connection.query('SELECT * FROM customers WHERE id = $1;', [customerId])
        if (customerExist.rows.length === 0) {
            return res.sendStatus(400)
        }

        const availableGames = await connection.query('SELECT * FROM rentals WHERE "gameId" = $1;', [gameId])
        if (availableGames.rows.legnth >= gameExist.rows[0].stockTotal) {
            return res.sendStatus(400)
        }

        res.locals.originalPrice = (gameExist.rows[0].pricePerDay * daysRented)
        res.locals.rentDate = dayjs().format('YYYY-MM-DD')
        res.locals.returnDate = null
        res.locals.delayFee = null
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }

    next()
}

export async function deleteValidation (req, res, next) {
    const { id } = req.params

    try {
        const idExist = await connection.query('SELECT * FROM rentals WHERE id = $1;', [id])
        if (idExist.rows.length <= 0) {
            return res.sendStatus(404)
        }

        if (idExist.rows[0].returnDate === null) {
            return res.sendStatus(400)
        }
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }

    next()
}

export async function returnValidation (req, res, next) {
    const { id } = req.params

    try {
        const rentalExist = await connection.query('SELECT * FROM rentals WHERE id = $1;', [id])
        if (rentalExist.rows.length <= 0) {
            return res.sendStatus(404)
        }

        if (rentalExist.rows[0].returnDate !== null) {
            return res.sendStatus(400)
        }

        //Price Per Day
        const gameData = await connection.query('SELECT "pricePerDay" FROM games WHERE id = $1;', [rentalExist.rows[0].gameId])
        const pricePerDay = gameData.rows[0].pricePerDay

        //Days Late
        const present = new Date ()
        const past = new Date(rentalExist.rows[0].rentDate);
        const diff = Math.abs(present.getTime() - past.getTime());
        const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
        const daysLate = days - rentalExist.rows[0].daysRented;

        if (daysLate > 0) {
            res.locals.delayFee = daysLate * pricePerDay
            res.locals.returnDate = dayjs().format('YYYY-MM-DD')
        } else {
            res.locals.delayFee = null
            res.locals.returnDate = dayjs().format('YYYY-MM-DD')
        }
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }

    next()
}