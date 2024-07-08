export class AddressDto {
  street?: string
  number?: number
  neighborhood?: string
  city?: string
  state?: string
  zipCode?: string

  constructor(
    street: string,
    number: number,
    neighborhood: string,
    city: string,
    state: string,
    zipCode: string
  ) {
    this.street = street
    this.number = number
    this.neighborhood = neighborhood
    this.city = city
    this.state = state
    this.zipCode = zipCode
  }
}
