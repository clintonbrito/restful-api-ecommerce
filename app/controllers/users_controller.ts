import type { HttpContext } from '@adonisjs/core/http'

import User from '#models/user'
import JWT from '../../utils/jwt.js'
import hash from '@adonisjs/core/services/hash'
import { userSchema } from '../../utils/schemas.js'

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

  async login({ request, response }: HttpContext) {
    try {
      const data = request.only(['email', 'password'])

      const { error } = userSchema.validate(data)

      if (error) {
        return response.status(422).json({ message: error.details[0].message })
      }

      const user = await User.query().where('email', data.email).first()

      if (!user) {
        return response.status(404).json({ message: 'User not found.' })
      }

      const validPassword = await hash.verify(user.password, data.password)

      if (!validPassword) {
        return response.status(401).json({ message: 'Invalid password.' })
      }

      const token = JWT.sign({ id: user.id, email: user.email })

      return response.status(200).json({ token })
    } catch (error) {
      console.log(error)
      return response.status(500).json({ message: 'Internal server error' })
    }
  }
}
