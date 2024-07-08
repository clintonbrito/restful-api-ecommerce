import type { HttpContext } from '@adonisjs/core/http'
import jwt from 'jsonwebtoken'
import { saleSchema } from '../../utils/schemas.js'
import Product from '#models/product'
import Client from '#models/client'
import Sale from '#models/sale'

export default class SalesController {
  async create({ request, response }: HttpContext) {
    try {
      const token = request.header('Authorization')?.split(' ')[1]
      const user = jwt.verify(token as string, process.env.APP_KEY || 'topsecret')

      if (!user) {
        return response.status(401).json({ message: 'Invalid token.' })
      }

      const payload = request.only(['clientId', 'productId', 'quantity'])
      const { error } = saleSchema.validate(payload)

      if (error) {
        return response.status(422).json({ message: error.details[0].message })
      }

      if (payload.quantity < 1) {
        return response.status(422).json({ message: 'Quantity must be at least 1.' })
      }

      if (!payload.clientId || !payload.productId) {
        return response
          .status(422)
          .json({ message: 'clientId, productId and quantity are required.' })
      }

      // Check if client and product exist on database
      const client = await Client.findByOrFail('id', payload.clientId)
      if (!client) {
        return response.status(404).json({ message: 'Client not found.' })
      }

      const product = await Product.findByOrFail('id', payload.productId)
      if (!product) {
        return response.status(404).json({ message: 'Product not found.' })
      }

      const totalPrice = product.price * payload.quantity

      const sale = await Sale.create({
        clientId: payload.clientId,
        productId: payload.productId,
        quantity: payload.quantity,
        totalPrice: totalPrice,
      })

      return response.status(201).json({ message: 'Sale created successfully.' })
    } catch (error) {
      console.log(error)
      return response.status(500).json({
        message: 'Internal server error',
        error: error.message,
      })
    }
  }
}
