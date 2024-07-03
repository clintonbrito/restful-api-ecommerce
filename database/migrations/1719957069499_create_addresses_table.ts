import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'addresses'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('client_id').unsigned().references('id').inTable('clients').onDelete('CASCADE')
      table.string('street', 255).notNullable()
      table.integer('number').notNullable()
      table.string('neighborhood', 255).notNullable()
      table.string('city', 255).notNullable()
      table.string('state', 2).notNullable()
      table.string('zip_code', 8).notNullable()
      table.integer('client_id').unsigned().references('id').inTable('clients').onDelete('CASCADE')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
