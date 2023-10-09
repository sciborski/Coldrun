import { ITrucksResponse, TruckInStatus, TruckStatus } from '../../api/dtos/trucks.dto'
import { TrucksAPI } from '../../api/trucks.api'
import { customAlphabet } from 'nanoid'
const nanoid = customAlphabet('1234567890abcdef', 5)

describe('Validate PUT Trucks API', () => {
  let randomId: string
  let truckResponse: ITrucksResponse
  context('Base truck status: OutOfService', () => {
    beforeEach(() => {
      randomId = nanoid()
      TrucksAPI.postTrucks(TruckInStatus(randomId, TruckStatus.OutOfService)).then(({ body }) => {
        truckResponse = body
      })
    })
    it('Validate update status from OutOfService to Loading', () => {
      TrucksAPI.putTruck(truckResponse.id, TruckInStatus(randomId, TruckStatus.Loading)).then(({ status, body }) => {
        expect(status).to.be.eq(200)
        expect(body.status).to.be.eq(TruckStatus.Loading)
      })
    })
    it('Validate update status from OutOfService to To Job', () => {
      TrucksAPI.putTruck(truckResponse.id, TruckInStatus(randomId, TruckStatus.ToJob)).then(({ status, body }) => {
        expect(status).to.be.eq(200)
        expect(body.status).to.be.eq(TruckStatus.ToJob)
      })
    })
    it('Validate update status from OutOfService to At Job', () => {
      TrucksAPI.putTruck(truckResponse.id, TruckInStatus(randomId, TruckStatus.AtJob)).then(({ status, body }) => {
        expect(status).to.be.eq(200)
        expect(body.status).to.be.eq(TruckStatus.AtJob)
      })
    })
    it('Validate update status from OutOfService to Returning', () => {
      TrucksAPI.putTruck(truckResponse.id, TruckInStatus(randomId, TruckStatus.Returning)).then(({ status, body }) => {
        expect(status).to.be.eq(200)
        expect(body.status).to.be.eq(TruckStatus.Returning)
      })
    })
    it('Validate update status happy path', () => {
      TrucksAPI.putTruck(truckResponse.id, TruckInStatus(randomId, TruckStatus.Loading)).then(({ status, body }) => {
        expect(status).to.be.eq(200)
        expect(body.status).to.be.eq(TruckStatus.Loading)
      })
      TrucksAPI.putTruck(truckResponse.id, TruckInStatus(randomId, TruckStatus.ToJob)).then(({ status, body }) => {
        expect(status).to.be.eq(200)
        expect(body.status).to.be.eq(TruckStatus.ToJob)
      })
      TrucksAPI.putTruck(truckResponse.id, TruckInStatus(randomId, TruckStatus.AtJob)).then(({ status, body }) => {
        expect(status).to.be.eq(200)
        expect(body.status).to.be.eq(TruckStatus.AtJob)
      })
      TrucksAPI.putTruck(truckResponse.id, TruckInStatus(randomId, TruckStatus.Returning)).then(({ status, body }) => {
        expect(status).to.be.eq(200)
        expect(body.status).to.be.eq(TruckStatus.Returning)
      })
      TrucksAPI.putTruck(truckResponse.id, TruckInStatus(randomId, TruckStatus.Loading)).then(({ status, body }) => {
        expect(status).to.be.eq(200)
        expect(body.status).to.be.eq(TruckStatus.Loading)
      })
    })
  })
  context('Truck status set to OutOfSerivce', () => {
    beforeEach(() => {
      randomId = nanoid()
    })
    it('Validate update status from Loading to OutOfService', () => {
      TrucksAPI.postTrucks(TruckInStatus(randomId, TruckStatus.Loading)).then(({ body }) => {
        TrucksAPI.putTruck(body.id, TruckInStatus(randomId, TruckStatus.OutOfService)).then(({ status, body }) => {
          expect(status).to.be.eq(200)
          expect(body.status).to.be.eq(TruckStatus.OutOfService)
        })
      })
    })
    it('Validate update status from ToJob to OutOfService', () => {
      TrucksAPI.postTrucks(TruckInStatus(randomId, TruckStatus.ToJob)).then(({ body }) => {
        TrucksAPI.putTruck(body.id, TruckInStatus(randomId, TruckStatus.OutOfService)).then(({ status, body }) => {
          expect(status).to.be.eq(200)
          expect(body.status).to.be.eq(TruckStatus.OutOfService)
        })
      })
    })
    it('Validate update status from AtJob to OutOfService', () => {
      TrucksAPI.postTrucks(TruckInStatus(randomId, TruckStatus.AtJob)).then(({ body }) => {
        TrucksAPI.putTruck(body.id, TruckInStatus(randomId, TruckStatus.OutOfService)).then(({ status, body }) => {
          expect(status).to.be.eq(200)
          expect(body.status).to.be.eq(TruckStatus.OutOfService)
        })
      })
    })
    it('Validate update status from Returning to OutOfService', () => {
      TrucksAPI.postTrucks(TruckInStatus(randomId, TruckStatus.Returning)).then(({ body }) => {
        TrucksAPI.putTruck(body.id, TruckInStatus(randomId, TruckStatus.OutOfService)).then(({ status, body }) => {
          expect(status).to.be.eq(200)
          expect(body.status).to.be.eq(TruckStatus.OutOfService)
        })
      })
    })
  })
  context('Forbidden scenarios, base truck status: Loading ', () => {
    beforeEach(() => {
      randomId = nanoid()
      TrucksAPI.postTrucks(TruckInStatus(randomId, TruckStatus.Loading)).then(({ body }) => {
        truckResponse = body
      })
    })
    it('Set status to: AtJob', () => {
      TrucksAPI.putTruck(truckResponse.id, TruckInStatus(randomId, TruckStatus.AtJob)).then(({ status, body }) => {
        expect(status).to.be.eq(400)
        expect(body.status).to.be.eq('INVALID_OPERATION')
      })
    })
    it('Set status to: Returning', () => {
      TrucksAPI.putTruck(truckResponse.id, TruckInStatus(randomId, TruckStatus.Returning)).then(({ status, body }) => {
        expect(status).to.be.eq(400)
        expect(body.status).to.be.eq('INVALID_OPERATION')
      })
    })
  })
  context('Forbidden scenarios, base truck status: ToJob ', () => {
    beforeEach(() => {
      randomId = nanoid()
      TrucksAPI.postTrucks(TruckInStatus(randomId, TruckStatus.ToJob)).then(({ body }) => {
        truckResponse = body
      })
    })
    it('Set status to: Loading', () => {
      TrucksAPI.putTruck(truckResponse.id, TruckInStatus(randomId, TruckStatus.Loading)).then(({ status, body }) => {
        expect(status).to.be.eq(400)
        expect(body.status).to.be.eq('INVALID_OPERATION')
      })
    })
    it('Set status to: Returning', () => {
      TrucksAPI.putTruck(truckResponse.id, TruckInStatus(randomId, TruckStatus.Returning)).then(({ status, body }) => {
        expect(status).to.be.eq(400)
        expect(body.status).to.be.eq('INVALID_OPERATION')
      })
    })
  })
  context('Forbidden scenarios, base truck status: AtJob ', () => {
    beforeEach(() => {
      randomId = nanoid()
      TrucksAPI.postTrucks(TruckInStatus(randomId, TruckStatus.AtJob)).then(({ body }) => {
        truckResponse = body
      })
    })
    it('Set status to: Loading', () => {
      TrucksAPI.putTruck(truckResponse.id, TruckInStatus(randomId, TruckStatus.Loading)).then(({ status, body }) => {
        expect(status).to.be.eq(400)
        expect(body.status).to.be.eq('INVALID_OPERATION')
      })
    })
    it('Set status to: ToJob', () => {
      TrucksAPI.putTruck(truckResponse.id, TruckInStatus(randomId, TruckStatus.ToJob)).then(({ status, body }) => {
        expect(status).to.be.eq(400)
        expect(body.status).to.be.eq('INVALID_OPERATION')
      })
    })
  })
  context('Forbidden scenarios, base truck status: Returning ', () => {
    beforeEach(() => {
      randomId = nanoid()
      TrucksAPI.postTrucks(TruckInStatus(randomId, TruckStatus.Returning)).then(({ body }) => {
        truckResponse = body
      })
    })
    it('Set status to: AtJob', () => {
      TrucksAPI.putTruck(truckResponse.id, TruckInStatus(randomId, TruckStatus.AtJob)).then(({ status, body }) => {
        expect(status).to.be.eq(400)
        expect(body.status).to.be.eq('INVALID_OPERATION')
      })
    })
    it('Set status to: ToJob', () => {
      TrucksAPI.putTruck(truckResponse.id, TruckInStatus(randomId, TruckStatus.ToJob)).then(({ status, body }) => {
        expect(status).to.be.eq(400)
        expect(body.status).to.be.eq('INVALID_OPERATION')
      })
    })
  })
})
