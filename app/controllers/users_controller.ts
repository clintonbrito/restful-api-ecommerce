import type { HttpContext } from '@adonisjs/core/http'

import User from '#models/user'
import JWT from '../../utils/jwt.js'
import { userSchema } from '../../utils/schemas.js'

export default class UsersController {
  async signup({ request, response, auth }: HttpContext) {
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

      const user = await User.verifyCredentials(data.email, data.password)

      // if (!user) {
      //   return response.status(404).json({ message: 'User not found.' })
      // }

      // const validPassword = await hash.verify(user.password, data.password)

      // if (!validPassword) {
      //   return response.status(401).json({ message: 'Invalid password.' })
      // }

      // const token = JWT.sign({ id: user.id, email: user.email })

      return response.status(200).json({ message: 'User logged in successfully.' })
    } catch (error) {
      if (error.code === 'E_INVALID_CREDENTIALS') {
        return response.status(404).json({ message: 'Email or password is incorrect.' })
      }
      console.log(error)
      return response.status(500).json({ message: 'Internal server error' })
    }
  }
}
