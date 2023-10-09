import { ITrucks } from './dtos/trucks.dto'

export class TrucksAPI {
  static readonly url = 'trucks'
  static postTrucks(body: ITrucks) {
    return cy
      .request({
        method: 'POST',
        body: body,
        url: this.url,
        failOnStatusCode: false,
      })
      .then(res => {
        console.log(res.body)
        cy.wrap(res)
      })
  }

  static getTruckById(id: number) {
    return cy
      .request({
        method: 'GET',
        url: `${this.url}/${id}`,
        failOnStatusCode: false,
      })
      .then(res => {
        cy.wrap(res)
      })
  }

  static getTrucks(parameters: string) {
    return cy
      .request({
        method: 'GET',
        url: `${this.url}?${parameters}`,
        failOnStatusCode: false,
      })
      .then(res => {
        cy.wrap(res)
      })
  }

  static putTruck(id: number, body: ITrucks) {
    return cy
      .request({
        method: 'PUT',
        url: `${this.url}/${id}`,
        body: body,
        failOnStatusCode: false,
      })
      .then(res => {
        cy.wrap(res)
      })
  }
}
