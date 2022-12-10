import joi from 'joi';

const gameSchema = joi.object({
    name: joi.string().required().min(3),
    image:joi.string().required(),
    stockTotal: joi.number().required().greater(0),
    categoryId: joi.number().required(),
    pricePerDay: joi.number().required().greater(0),
});

export default gameSchema