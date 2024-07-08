import { AddressDto } from './address_dto.js'
import { PhoneDto } from './phone_dto.js'

export class ClientDto {
  id: number
  fullName: string
  cpf: string
  address: AddressDto
  phone: PhoneDto

  constructor(id: number, fullName: string, cpf: string, address: AddressDto, phone: PhoneDto) {
    this.id = id
    this.fullName = fullName
    this.cpf = cpf
    this.address = address
    this.phone = phone
  }
}
