import type { HttpContext } from '@adonisjs/core/http'

import User from '#models/user'
import userSchema from '../../utils/schemas.js'
import JWT from '../../utils/jwt.js'

export default class UsersController {
  async signup({ request, response }: HttpContext) {
    try {
      const data = request.only(['email', 'password'])

      const { error } = userSchema.validate(data)

      if (error) {
        return response.status(422).json({ message: error.details[0].message })
      }

      // Verify if the email already exists in DB
      const emailExists = await User.query().where('email', data.email).first()

      if (emailExists) {
        return response.status(400).json({ message: 'E-mail already in use.' })
      }

      const newUser = await User.create(data)

      const token = JWT.sign({ id: newUser.id, email: newUser.email })

      return response.status(201).json({ token })
    } catch (error) {
      console.log(error)
      return response.status(500).json({ message: 'Internal server error' })
    }
  }
}
