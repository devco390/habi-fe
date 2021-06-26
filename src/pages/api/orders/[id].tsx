import { API_METHODS } from 'models/api'
import { IOrder } from 'models/order'
import { NextApiRequest, NextApiResponse } from 'next'

import GenericRequestService from 'services/gereneric-request-api'
import { getMethodNotAllowedResponse } from 'utils/api-utils'

const genericRequestService = new GenericRequestService('orders')

const updateOrder = (request: NextApiRequest, response: NextApiResponse) => {
  genericRequestService.updateRecord<IOrder>(request, response)
}

export default function requestHandler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const { method } = request

  if (method === API_METHODS.GET) {
    genericRequestService.getRecord(request, response)
  } else if (method === API_METHODS.PUT) {
    updateOrder(request, response)
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
