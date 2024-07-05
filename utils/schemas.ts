import Joi from 'joi'

const userSchema = Joi.object({
  email: Joi.string().email(),
  password: Joi.string().min(8),
})

export default userSchema
