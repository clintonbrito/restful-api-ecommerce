import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'phones'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropUnique(['number'])
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.unique(['number'])
    })
  }
}
