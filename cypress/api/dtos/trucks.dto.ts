import { customAlphabet } from 'nanoid'
const nanoid = customAlphabet('1234567890abcdef', 5)

export interface ITrucks {
  code?: string
  name?: string
  status?: string
  description?: string
}

export interface ITrucksResponse {
  id: number
  code: string
  name: string
  status: TruckStatus
  description: string
}

export enum TruckStatus {
  OutOfService = 'OUT_OF_SERVICE',
  Loading = 'LOADING',
  ToJob = 'TO_JOB',
  AtJob = 'AT_JOB',
  Returning = 'RETURNING',
}

export class TrucksDto implements ITrucks {
  code: string
  name: string
  status: TruckStatus
  description: string
  constructor(status: TruckStatus = TruckStatus.OutOfService) {
    const randomString: string = nanoid()
    this.status = status
    this.code = `CODE_${randomString}`
    this.name = `NAME_${randomString}`
    this.description = `DESCRIPTION_${randomString}`
  }
}
export const TruckHappyPath = (id: string) => {
  return {
    code: `CODE_${id}`,
    name: `NAME_${id}`,
    status: TruckStatus.OutOfService,
    description: 'DESCRIPTION',
  }
}

export const TruckWithoutDesc = (id: string) => {
  return {
    code: `CODE_${id}`,
    name: `NAME_${id}`,
    status: TruckStatus.OutOfService,
  }
}

export const TruckWithEmptyDesc = (id: string) => {
  return {
    code: `CODE_${id}`,
    name: `NAME_${id}`,
    status: TruckStatus.OutOfService,
    description: '',
  }
}

export const TruckWithEmptyCode = (id: string) => {
  return {
    code: '',
    name: `NAME_${id}`,
    status: TruckStatus.OutOfService,
    description: 'DESCRIPTION',
  }
}

export const TruckWithEmptyName = (id: string) => {
  return {
    code: `CODE_${id}`,
    name: '',
    status: TruckStatus.OutOfService,
    description: 'DESCRIPTION',
  }
}

export const TruckWithEmptyStatus = (id: string) => {
  return {
    code: `CODE_${id}`,
    name: `NAME_${id}`,
    status: '',
    description: 'DESCRIPTION',
  }
}

export const TruckWithoutCode = (id: string) => {
  return {
    name: `NAME_${id}`,
    status: TruckStatus.OutOfService,
    description: 'DESCRIPTION',
  }
}

export const TruckWithoutName = (id: string) => {
  return {
    code: `CODE_${id}`,
    status: TruckStatus.OutOfService,
    description: 'DESCRIPTION',
  }
}

export const TruckWithoutStatus = (id: string) => {
  return {
    code: `CODE_${id}`,
    name: `NAME_${id}`,
    description: 'DESCRIPTION',
  }
}

export const TruckInStatus = (id: string, status: TruckStatus) => {
  return {
    code: `CODE_${id}`,
    name: `NAME_${id}`,
    status: status,
    description: 'DESCRIPTION',
  }
}

export const TruckWithStatusAndDescription = (id: string, status: TruckStatus, description: string) => {
  return {
    code: `CODE_${id}`,
    name: `NAME_${id}`,
    status: status,
    description: description,
  }
}
