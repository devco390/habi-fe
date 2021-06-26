import { API_METHODS } from 'models/api'
import { IOrder } from 'models/order'
import { NextApiRequest, NextApiResponse } from 'next'

import GenericRequestService from 'services/gereneric-request-api'
import { getMethodNotAllowedResponse } from 'utils/api-utils'

const genericRequestService = new GenericRequestService('orders')

const addOrder = (request: NextApiRequest, response: NextApiResponse) => {
  const { body: recordData } = request
  genericRequestService.addRecord<IOrder>(request, response, recordData)
}

export default function requestHandler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const { method } = request

  if (method === API_METHODS.GET) {
    genericRequestService.getAll<IOrder>(request, response)
  } else if (method === API_METHODS.POST) {
    addOrder(request, response)
  } else {
    response.setHeader('Allow', [API_METHODS.GET, API_METHODS.POST])
    getMethodNotAllowedResponse(`Method ${method} Not Allowed`)
  }
}
