import type { HttpContext } from '@adonisjs/core/http'
import jwt from 'jsonwebtoken'
import { productSchema } from '../../utils/schemas.js'
import Product from '#models/product'

export default class ProductsController {
  async create({ request, response }: HttpContext) {
    try {
      const token = request.header('Authorization')?.split(' ')[1]
      const user = jwt.verify(token as string, process.env.APP_KEY || 'topsecret')

      if (!user) {
        return response.status(401).json({ message: 'Invalid token.' })
      }

      const payload = request.only(['name', 'description', 'price', 'userId'])
      const { error } = productSchema.validate(payload)

      if (error) {
        return response.status(422).json({ message: error.details[0].message })
      }

      if (!payload.name || !payload.description || !payload.price) {
        return response.status(422).json({ message: 'Name, price and quantity are required.' })
      }

      const product = await Product.create({
        name: payload.name,
        description: payload.description,
        price: payload.price,
        userId: payload.userId,
      })

      return response.status(201).json({ message: 'Product created successfully.' })
    } catch (error) {
      console.log(error)
      return response.status(500).json({
        message: 'Internal server error',
        error: error.message,
      })
    }
  }
}
