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

const productSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number()
    .required()
    .min(0) // use ".greater(0)" instead in order to remove the possibility of 0 price
    .positive()
    .custom((value, helpers) => {
      if (Math.floor(value) !== value && value.toString().split('.')[1].length > 2) {
        return helpers.error('number.precision', { limit: 2 })
      }
      return value
    }, 'Precision validation')
    .message('{{#label}} must be a positive number with a maximum of 2 decimal places.'),
  userId: Joi.number().required(),
  // quantity: Joi.number().required(), // implement stock control later
})

const saleSchema = Joi.object({
  clientId: Joi.number().required(),
  productId: Joi.number().required(),
  quantity: Joi.number().required().min(1),
})

export { userSchema, clientSchema, productSchema, saleSchema }
