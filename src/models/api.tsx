export interface IApiResponse {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any
  code: number
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error?: any
}

export enum RESPONSE_CODES {
  SUCCESS = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  METHOD_NOT_ALLOWED = 405,
  SERVER_ERROR = 500
}

export enum API_METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE'
}
