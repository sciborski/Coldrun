import {
  TruckHappyPath,
  TruckInStatus,
  TruckStatus,
  TruckWithEmptyCode,
  TruckWithEmptyDesc,
  TruckWithEmptyName,
  TruckWithEmptyStatus,
  TruckWithoutCode,
  TruckWithoutDesc,
  TruckWithoutName,
  TruckWithoutStatus,
} from '../../api/dtos/trucks.dto'
import { TrucksAPI } from '../../api/trucks.api'
import { customAlphabet } from 'nanoid'
const nanoid = customAlphabet('1234567890abcdef', 5)

describe('Validate POST Trucks API', () => {
  it('Create truck', () => {
    const data = TruckHappyPath(nanoid())
    TrucksAPI.postTrucks(data).then(({ status, body }) => {
      expect(status).to.be.eq(201)
      expect(body.id).to.not.be.null
      expect(body.code).to.be.eq(data.code)
      expect(body.name).to.be.eq(data.name)
      expect(body.status).to.be.eq(data.status)
      expect(body.description).to.be.eq(data.description)
    })
  })
  it('Validate create truck with not unique code', () => {
    const data = TruckHappyPath(nanoid())
    TrucksAPI.postTrucks(data)
    TrucksAPI.postTrucks(data).then(({ status, body }) => {
      expect(status).to.be.eq(400)
      expect(body.code).to.be.eq('NOT_UNIQUE')
    })
  })
  it('Validate create truck with empty code', () => {
    const data = TruckWithEmptyCode(nanoid())
    TrucksAPI.postTrucks(data).then(({ status, body }) => {
      expect(status).to.be.eq(400)
      expect(body.code).to.be.eq('MINLENGTH')
    })
  })
  it('Validate create truck with empty name', () => {
    const data = TruckWithEmptyName(nanoid())
    TrucksAPI.postTrucks(data).then(({ status, body }) => {
      expect(status).to.be.eq(400)
      expect(body.name).to.be.eq('MINLENGTH')
    })
  })
  it('Validate create truck with empty status', () => {
    const data = TruckWithEmptyStatus(nanoid())
    TrucksAPI.postTrucks(data).then(({ status, body }) => {
      expect(status).to.be.eq(400)
      expect(body.status).to.be.eq('ENUM')
    })
  })
  it('Validate create truck without code', () => {
    const data = TruckWithoutCode(nanoid())
    TrucksAPI.postTrucks(data).then(({ status, body }) => {
      expect(status).to.be.eq(400)
      expect(body.code).to.be.eq('REQUIRED')
    })
  })
  it('Validate create truck without name', () => {
    const data = TruckWithoutName(nanoid())
    TrucksAPI.postTrucks(data).then(({ status, body }) => {
      expect(status).to.be.eq(400)
      expect(body.name).to.be.eq('REQUIRED')
    })
  })
  it('Validate create truck without status', () => {
    const data = TruckWithoutStatus(nanoid())
    TrucksAPI.postTrucks(data).then(({ status, body }) => {
      expect(status).to.be.eq(400)
      expect(body.status).to.be.eq('REQUIRED')
    })
  })
  it('Validate create truck with missing description', () => {
    const data = TruckWithoutDesc(nanoid())
    TrucksAPI.postTrucks(data).then(({ status, body }) => {
      expect(status).to.be.eq(201)
      expect(body.code).to.be.eq(data.code)
      expect(body.name).to.be.eq(data.name)
      expect(body.status).to.be.eq(data.status)
    })
  })
  it('Validate create truck with empty description', () => {
    const data = TruckWithEmptyDesc(nanoid())
    TrucksAPI.postTrucks(data).then(({ status, body }) => {
      expect(status).to.be.eq(201)
      expect(body.code).to.be.eq(data.code)
      expect(body.name).to.be.eq(data.name)
      expect(body.status).to.be.eq(data.status)
      expect(body.description).to.be.eq(data.description)
    })
  })
  it('Validate create truck with correct statuses', () => {
    TrucksAPI.postTrucks(TruckInStatus(nanoid(), TruckStatus.OutOfService)).then(({ status, body }) => {
      expect(status).to.be.eq(201)
      expect(body.status).to.be.eq(TruckStatus.OutOfService)
    })
    TrucksAPI.postTrucks(TruckInStatus(nanoid(), TruckStatus.Loading)).then(({ status, body }) => {
      expect(status).to.be.eq(201)
      expect(body.status).to.be.eq(TruckStatus.Loading)
    })
    TrucksAPI.postTrucks(TruckInStatus(nanoid(), TruckStatus.ToJob)).then(({ status, body }) => {
      expect(status).to.be.eq(201)
      expect(body.status).to.be.eq(TruckStatus.ToJob)
    })
    TrucksAPI.postTrucks(TruckInStatus(nanoid(), TruckStatus.AtJob)).then(({ status, body }) => {
      expect(status).to.be.eq(201)
      expect(body.status).to.be.eq(TruckStatus.AtJob)
    })
    TrucksAPI.postTrucks(TruckInStatus(nanoid(), TruckStatus.Returning)).then(({ status, body }) => {
      expect(status).to.be.eq(201)
      expect(body.status).to.be.eq(TruckStatus.Returning)
    })
  })
})
