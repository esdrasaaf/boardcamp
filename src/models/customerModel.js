import joi from "joi";

const customerSchema = joi.object({
    name: joi.string().required().min(2),
    phone: joi.string().required().min(10).max(11).regex(/^[0-9]+$/),
    cpf: joi.string().required().length(11).regex(/^[0-9]+$/),
    birthday: joi.date().required().iso()
})

export default customerSchema