import { API_METHODS } from 'models/api'
import { IProduct } from 'models/product'
import { NextApiRequest, NextApiResponse } from 'next'

import GenericRequestService from 'services/gereneric-request-api'
import { getMethodNotAllowedResponse } from 'utils/api-utils'

const genericRequestService = new GenericRequestService('products')

const updateProduct = (request: NextApiRequest, response: NextApiResponse) => {
  const { body: recordData } = request
  const { name } = recordData
  genericRequestService.updateRecordWithKeyValidation<IProduct>(
    request,
    response,
    'name',
    name
  )
}

export default function requestHandler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const { method } = request

  if (method === API_METHODS.GET) {
    genericRequestService.getRecord(request, response)
  } else if (method === API_METHODS.PUT) {
    updateProduct(request, response)
  } else if (method === API_METHODS.DELETE) {
    genericRequestService.deleteRecord(request, response)
  } else {
    response.setHeader('Allow', [
      API_METHODS.GET,
      API_METHODS.DELETE,
      API_METHODS.PUT
    ])
    getMethodNotAllowedResponse(`Method ${method} Not Allowed`)
  }
}
