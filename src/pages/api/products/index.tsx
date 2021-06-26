import { API_METHODS } from 'models/api'
import { IProduct } from 'models/product'
import { NextApiRequest, NextApiResponse } from 'next'

import GenericRequestService from 'services/gereneric-request-api'
import { getMethodNotAllowedResponse } from 'utils/api-utils'

const genericRequestService = new GenericRequestService('products')

const addProduct = (request: NextApiRequest, response: NextApiResponse) => {
  const { body: recordData } = request
  const { name, price, ingredients } = recordData
  genericRequestService.addRecord<IProduct>(
    request,
    response,
    { name, price, ingredients },
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
    genericRequestService.getAll<IProduct>(request, response)
  } else if (method === API_METHODS.POST) {
    addProduct(request, response)
  } else {
    response.setHeader('Allow', [API_METHODS.GET, API_METHODS.POST])
    getMethodNotAllowedResponse(`Method ${method} Not Allowed`)
  }
}
