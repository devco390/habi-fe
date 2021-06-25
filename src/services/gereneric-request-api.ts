import { NextApiRequest, NextApiResponse } from 'next'

import GenericCrudService from 'services/gereneric-crud-api'

class GenericRequestService {
  collection: string
  genericCrudService: GenericCrudService

  constructor(collection: string) {
    this.collection = collection
    this.genericCrudService = new GenericCrudService(collection)
  }

  async getAll<T>(request: NextApiRequest, response: NextApiResponse) {
    const data = await this.genericCrudService.getAll<T>()
    const { code, ...dataTosend } = data

    response.status(code).send(dataTosend)
  }

  async addRecord<T>(
    request: NextApiRequest,
    response: NextApiResponse,
    dataRecord: T,
    fieldToMatch: string,
    valueToMatch: string
  ) {
    const data = await this.genericCrudService.add<T>(
      dataRecord,
      fieldToMatch,
      valueToMatch
    )
    const { code, ...dataTosend } = data
    response.status(code).send(dataTosend)
  }

  async getRecord(request: NextApiRequest, response: NextApiResponse) {
    const { id } = request.query
    const data = await this.genericCrudService.getRecord(id as string)
    const { code, ...dataTosend } = data

    response.status(code).send(dataTosend)
  }

  async deleteRecord(request: NextApiRequest, response: NextApiResponse) {
    const { id } = request.query
    const data = await this.genericCrudService.delete(id as string)
    const { code, ...dataTosend } = data

    response.status(code).send(dataTosend)
  }

  async updateRecord<T>(request: NextApiRequest, response: NextApiResponse) {
    const { id } = request.query
    const { body: bodyData } = request
    const data = await this.genericCrudService.update<T>(id as string, bodyData)
    const { code, ...dataTosend } = data

    response.status(code).send(dataTosend)
  }

  async updateRecordWithKeyValidation<T>(
    request: NextApiRequest,
    response: NextApiResponse,
    fieldToMatch: string,
    valueToMatch: string
  ) {
    const { id } = request.query
    const { body: bodyData } = request
    const data = await this.genericCrudService.updateRecordWithKeyValidation<T>(
      id as string,
      bodyData,
      fieldToMatch,
      valueToMatch
    )
    const { code, ...dataTosend } = data

    response.status(code).send(dataTosend)
  }
}

export default GenericRequestService
