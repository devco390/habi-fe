/* eslint-disable @typescript-eslint/no-explicit-any */
import { IApiResponse, RESPONSE_CODES } from 'models/api'

export const getSuccessResponse = (data: any): IApiResponse => {
  return { data, code: RESPONSE_CODES.SUCCESS }
}

export const getCreatedResponse = (data: any): IApiResponse => {
  return { data, code: RESPONSE_CODES.CREATED }
}

export const getBadRequestResponse = (error: any): IApiResponse => {
  return { error, code: RESPONSE_CODES.BAD_REQUEST }
}

export const getNotFoundResponse = (error: any): IApiResponse => {
  return { error, code: RESPONSE_CODES.NOT_FOUND }
}

export const getServerErrorResponse = (error: any): IApiResponse => {
  return { error, code: RESPONSE_CODES.SERVER_ERROR }
}

export const getMethodNotAllowedResponse = (error: any): IApiResponse => {
  return { error, code: RESPONSE_CODES.CREATED }
}
