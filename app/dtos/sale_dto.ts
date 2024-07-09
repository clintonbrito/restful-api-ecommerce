export class SaleDto {
  clientId: number
  productId: number
  quantity: number
  totalPrice: number

  constructor(clientId: number, productId: number, quantity: number, totalPrice: number) {
    this.clientId = clientId
    this.productId = productId
    this.quantity = quantity
    this.totalPrice = totalPrice
  }
}
