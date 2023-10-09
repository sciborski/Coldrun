import { ITrucksResponse, TruckStatus, TruckWithStatusAndDescription } from '../../api/dtos/trucks.dto'
import { TrucksAPI } from '../../api/trucks.api'
import { customAlphabet } from 'nanoid'
const nanoid = customAlphabet('1234567890abcdef', 5)

describe('Validate GET Trucks API', () => {
  const description = `DESC_${nanoid()}`
  let truckResponses: ITrucksResponse[] = []
  before(() => {
    TrucksAPI.postTrucks(TruckWithStatusAndDescription(nanoid(), TruckStatus.OutOfService, description)).then(
      ({ body }) => {
        truckResponses.push(body)
      },
    )
    TrucksAPI.postTrucks(TruckWithStatusAndDescription(nanoid(), TruckStatus.Loading, description)).then(({ body }) => {
      truckResponses.push(body)
    })
    TrucksAPI.postTrucks(TruckWithStatusAndDescription(nanoid(), TruckStatus.ToJob, description)).then(({ body }) => {
      truckResponses.push(body)
    })
    TrucksAPI.postTrucks(TruckWithStatusAndDescription(nanoid(), TruckStatus.AtJob, description)).then(({ body }) => {
      truckResponses.push(body)
    })
    TrucksAPI.postTrucks(TruckWithStatusAndDescription(nanoid(), TruckStatus.Returning, description)).then(
      ({ body }) => {
        truckResponses.push(body)
      },
    )
  })
  it('Validate GET by id', () => {
    TrucksAPI.getTruckById(truckResponses[0].id).then(({ status, body }) => {
      expect(status).to.be.eq(200)
      expect(body.id).to.be.eq(truckResponses[0].id)
      expect(body.code).to.be.eq(truckResponses[0].code)
      expect(body.name).to.be.eq(truckResponses[0].name)
      expect(body.status).to.be.eq(truckResponses[0].status)
      expect(body.description).to.be.eq(truckResponses[0].description)
    })
  })
  it('GET Trucks by description and limit', () => {
    TrucksAPI.getTrucks(`description=${description}&limit=3`).then(({ status, body }) => {
      expect(status).to.be.eq(200)
      expect(body).to.have.length(3)
      expect(body[0].id).to.be.eq(truckResponses[0].id)
      expect(body[1].id).to.be.eq(truckResponses[1].id)
      expect(body[2].id).to.be.eq(truckResponses[2].id)
    })
  })
  it('GET Trucks by description, limit and pages', () => {
    TrucksAPI.getTrucks(`description=${description}&limit=3&page=2`).then(({ status, body }) => {
      expect(status).to.be.eq(200)
      expect(body).to.have.length(2)
      expect(body[0].id).to.be.eq(truckResponses[3].id)
      expect(body[1].id).to.be.eq(truckResponses[4].id)
    })
  })
  it('GET Trucks by description and order by id DESC', () => {
    TrucksAPI.getTrucks(`description=${description}&sort=id&order=desc`).then(({ status, body }) => {
      expect(status).to.be.eq(200)
      expect(body).to.have.length(5)
      expect(body[0].id).to.be.eq(truckResponses[4].id)
      expect(body[1].id).to.be.eq(truckResponses[3].id)
      expect(body[2].id).to.be.eq(truckResponses[2].id)
      expect(body[3].id).to.be.eq(truckResponses[1].id)
      expect(body[4].id).to.be.eq(truckResponses[0].id)
    })
  })
  it('GET Trucks by description and order by status DESC', () => {
    TrucksAPI.getTrucks(`description=${description}&sort=status&order=desc`).then(({ status, body }) => {
      expect(status).to.be.eq(200)
      expect(body).to.have.length(5)
      expect(body[0].id).to.be.eq(truckResponses[2].id)
      expect(body[1].id).to.be.eq(truckResponses[4].id)
      expect(body[2].id).to.be.eq(truckResponses[0].id)
      expect(body[3].id).to.be.eq(truckResponses[1].id)
      expect(body[4].id).to.be.eq(truckResponses[3].id)
    })
  })
  it('GET Trucks by description and order by status ASC', () => {
    TrucksAPI.getTrucks(`description=${description}&sort=status&order=asc`).then(({ status, body }) => {
      expect(status).to.be.eq(200)
      expect(body).to.have.length(5)
      expect(body[0].id).to.be.eq(truckResponses[3].id)
      expect(body[1].id).to.be.eq(truckResponses[1].id)
      expect(body[2].id).to.be.eq(truckResponses[0].id)
      expect(body[3].id).to.be.eq(truckResponses[4].id)
      expect(body[4].id).to.be.eq(truckResponses[2].id)
    })
  })
  it('GET Trucks by description and code', () => {
    TrucksAPI.getTrucks(`description=${description}&code=${truckResponses[2].code}`).then(({ status, body }) => {
      expect(status).to.be.eq(200)
      expect(body).to.have.length(1)
      expect(body[0].id).to.be.eq(truckResponses[2].id)
    })
  })
  it('GET Trucks by description and name', () => {
    TrucksAPI.getTrucks(`description=${description}&name=${truckResponses[2].name}`).then(({ status, body }) => {
      expect(status).to.be.eq(200)
      expect(body).to.have.length(1)
      expect(body[0].id).to.be.eq(truckResponses[2].id)
    })
  })
  it('GET Trucks by code', () => {
    TrucksAPI.getTrucks(`code=${truckResponses[2].code}`).then(({ status, body }) => {
      expect(status).to.be.eq(200)
      expect(body).to.have.length(1)
      expect(body[0].id).to.be.eq(truckResponses[2].id)
    })
  })
  it('GET Trucks by name', () => {
    TrucksAPI.getTrucks(`name=${truckResponses[2].name}`).then(({ status, body }) => {
      expect(status).to.be.eq(200)
      expect(body).to.have.length(1)
      expect(body[0].id).to.be.eq(truckResponses[2].id)
    })
  })
})
