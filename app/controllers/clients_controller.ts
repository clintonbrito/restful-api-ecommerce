import type { HttpContext } from '@adonisjs/core/http'
import { clientSchema } from '../../utils/schemas.js'
import Client from '#models/client'
import Address from '#models/address'
import Phone from '#models/phone'
import jwt from 'jsonwebtoken'

export default class ClientsController {
  async create({ request, response }: HttpContext) {
    try {
      const token = request.header('Authorization')?.split(' ')[1]
      // console.log('console log do token: ' + token)
      const user = jwt.verify(token as string, process.env.APP_KEY || 'topsecret')
      // console.log('console log da verificação do token: ' + user)

      if (!user) {
        return response.status(401).json({ message: 'Invalid token.' })
      }

      const payload = request.only(['fullName', 'cpf', 'userId', 'address', 'phone'])
      const { error } = clientSchema.validate(payload)

      if (error) {
        return response.status(422).json({ message: error.details[0].message })
      }

      if (!payload.address || !payload.phone) {
        return response.status(422).json({ message: 'Address and phone information are required.' })
      }

      const client = await Client.create({
        fullName: payload.fullName,
        cpf: payload.cpf,
        userId: payload.userId,
      })

      const address = await Address.create({
        ...payload.address,
        clientId: client.id,
      })

      const phone = await Phone.create({
        ...payload.phone,
        clientId: client.id,
      })

      return response.status(201).json({
        message: 'Client created successfully.',
        data: { client, address, phone },
      })
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        return response.status(400).json({ message: 'Client with this CPF already exists.' })
      }
      console.log(error)
      return response.status(500).json({
        message: 'Internal server error',
        error: error.message,
      })
    }
  }
}
