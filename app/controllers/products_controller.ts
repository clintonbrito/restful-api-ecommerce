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

      if (!payload.name || !payload.description || !payload.price || !payload.userId) {
        return response
          .status(422)
          .json({ message: 'Name, description, price and userId are required.' })
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

  async update({ request, response }: HttpContext) {
    try {
      const token = request.header('Authorization')?.split(' ')[1]
      const user = jwt.verify(token as string, process.env.APP_KEY || 'topsecret')

      if (!user) {
        return response.status(401).json({ message: 'Invalid token.' })
      }

      const { id } = request.params()
      const payload = request.only(['name', 'description', 'price', 'userId'])
      const { error } = productSchema.validate(payload)

      if (error) {
        return response.status(422).json({ message: error.details[0].message })
      }

      if (!payload.name || !payload.description || !payload.price || !payload.userId) {
        return response
          .status(422)
          .json({ message: 'Name, description, price and userId are required.' })
      }

      const product = await Product.findOrFail(id)

      product.merge({
        name: payload.name,
        description: payload.description,
        price: payload.price,
        userId: payload.userId,
      })

      await product.save()

      return response.status(200).json({ message: 'Product updated successfully.' })
    } catch (error) {
      if (error.code === 'E_ROW_NOT_FOUND') {
        return response.status(404).json({ message: 'Product not found.' })
      }
      console.log(error)
      return response.status(500).json({
        message: 'Internal server error',
        error: error.message,
      })
    }
  }
}
