import Joi from 'joi'

const userSchema = Joi.object({
  email: Joi.string().email(),
  password: Joi.string().min(8),
})

const clientSchema = Joi.object({
  fullName: Joi.string().required(),
  cpf: Joi.string().required().length(11),
  userId: Joi.number().required(),
  address: Joi.object({
    street: Joi.string().required(),
    number: Joi.number().required(),
    neighborhood: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    zipCode: Joi.string().required().length(8),
  }).required(),
  phone: Joi.object({
    number: Joi.string().required().min(10).max(11),
  }).required(),
})

export { userSchema, clientSchema }
