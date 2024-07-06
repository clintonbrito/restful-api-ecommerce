import type { HttpContext } from '@adonisjs/core/http'
import { clientSchema } from '../../utils/schemas.js'
import Client from '#models/client'
import Address from '#models/address'
import Phone from '#models/phone'

export default class ClientsController {
  async create({ request, response }: HttpContext) {
    try {
      const payload = request.only(['fullName', 'cpf', 'userId', 'address', 'phone'])

      const { error } = clientSchema.validate(payload)

      if (error) {
        return response.status(422).json({ message: error.details[0].message })
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

      return response.created({ client, address, phone })
    } catch (error) {
      console.log(error)
      return response.status(500).json({ message: 'Internal server error' })
    }
  }
}
