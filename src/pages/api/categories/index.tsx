import { API_METHODS } from 'models/api'
import { ICategory } from 'models/categories'
import { NextApiRequest, NextApiResponse } from 'next'

import GenericRequestService from 'services/gereneric-request-api'
import { getMethodNotAllowedResponse } from 'utils/api-utils'

const genericRequestService = new GenericRequestService('categories')

const addCategory = (request: NextApiRequest, response: NextApiResponse) => {
  const { body: recordData } = request
  const { name, products } = recordData
  genericRequestService.addRecord<ICategory>(
    request,
    response,
    { name, products },
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
    genericRequestService.getAll<ICategory>(request, response)
  } else if (method === API_METHODS.POST) {
    addCategory(request, response)
  } else {
    response.setHeader('Allow', [API_METHODS.GET, API_METHODS.POST])
    getMethodNotAllowedResponse(`Method ${method} Not Allowed`)
  }
}
