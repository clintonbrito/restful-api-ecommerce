export class SaleDto {
  clientId: number
  productId: number
  productPrice: number
  quantity: number
  totalPrice: number

  constructor(clientId: number, productId: number, productPrice: number, quantity: number) {
    this.clientId = clientId
    this.productId = productId
    this.productPrice = productPrice
    this.quantity = quantity
    this.totalPrice = quantity * this.productPrice
  }
}
