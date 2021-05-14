import { IAdditionalServiceOption } from './models/AdditionalService'

export enum HTTPStatusCodes {
  Created = 201,
  BadRequest = 400,
  Unauthorized = 401,
  NotFound = 404,
  InternalServerError = 500
}

export interface IService extends IAdditionalServiceOption {
  value: number
}