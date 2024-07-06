import Joi from 'joi'

const userSchema = Joi.object({
  email: Joi.string().email(),
  password: Joi.string().min(8),
})

const clientSchema = Joi.object({
  fullName: Joi.string().required(),
  cpf: Joi.string().required().min(11).max(11),
  userId: Joi.number().required(),
  address: Joi.object({
    street: Joi.string().required(),
    number: Joi.number().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    zipCode: Joi.string().required(),
  }).required(),
  phone: Joi.object({
    ddd: Joi.string().required().min(2).max(2),
    number: Joi.string().required().min(8).max(9),
  }).required(),
})

export { userSchema, clientSchema }
