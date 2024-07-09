// import { AddressDto } from './address_dto.js'
import { PhoneDto } from './phone_dto.js'
import { SaleDto } from './sale_dto.js'

export class ClientDto {
  fullName: string
  cpf: string
  // address: AddressDto
  phone: PhoneDto
  sales: SaleDto[]

  constructor(
    fullName: string,
    cpf: string,
    // address: AddressDto,
    phone: PhoneDto,
    sales: SaleDto[]
  ) {
    this.fullName = fullName
    this.cpf = cpf
    // this.address = address
    this.phone = phone
    this.sales = sales
  }
}

// address is commented out because it's not being used in the controller at the moment
