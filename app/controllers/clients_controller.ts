import type { HttpContext } from '@adonisjs/core/http'
import { clientSchema } from '../../utils/schemas.js'
import Client from '#models/client'
import Address from '#models/address'
import Phone from '#models/phone'
import jwt from 'jsonwebtoken'
import { ClientDto } from '../dtos/client_dto.js'

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

      return response.status(201).json({ message: 'Client created successfully.' })
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

  async getAll({ response }: HttpContext) {
    try {
      const clients = await Client.query().orderBy('id', 'asc')

      if (!clients.length) {
        return response.status(404).json({ message: 'No clients found.' })
      }

      // Não consegui fazer o mapeamento de address e phone, pois não consegui acessar os dados de address e phone. Resolver depois.
      const clientsDto = clients.map(
        (client) =>
          new ClientDto(client.id, client.fullName, client.cpf, client.address, client.phone)
      )

      return response.status(200).json({ data: clientsDto })
    } catch (error) {
      console.log(error)
      return response.status(500).json({
        message: 'Internal server error',
        error: error.message,
      })
    }
  }

  async update({ request, response }: HttpContext) {
    try {
      const token = request.header('Authorization')?.split(' ')[1]
      const user = jwt.verify(token as string, process.env.APP_KEY || 'topsecret')

      if (!user) {
        return response.status(401).json({ message: 'Invalid token.' })
      }

      const { id } = request.params()

      const payload = request.only(['fullName', 'cpf', 'userId', 'address', 'phone'])
      const { error } = clientSchema.validate(payload)

      if (error) {
        return response.status(422).json({ message: error.details[0].message })
      }

      if (!payload.address || !payload.phone) {
        return response.status(422).json({ message: 'Address and phone information are required.' })
      }

      const client = await Client.findOrFail(id)
      // console.log('console log do client: ' + client)

      client.merge({
        fullName: payload.fullName,
        cpf: payload.cpf,
        userId: payload.userId,
      })

      await client.save()

      const address = await Address.findByOrFail('clientId', id)
      address.merge(payload.address)
      await address.save()

      const phone = await Phone.findByOrFail('clientId', id)
      phone.merge(payload.phone)
      await phone.save()

      return response.status(200).json({ message: 'Client updated successfully.' })
    } catch (error) {
      if (error.code === 'E_ROW_NOT_FOUND') {
        return response.status(404).json({ message: 'Client not found.' })
      }
      console.log(error)
      return response.status(500).json({
        message: 'Internal server error',
        error: error.message,
      })
    }
  }
}
