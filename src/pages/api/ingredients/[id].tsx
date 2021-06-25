import { API_METHODS } from 'models/api'
import { IIngredient } from 'models/ingredients'
import { NextApiRequest, NextApiResponse } from 'next'

import GenericRequestService from 'services/gereneric-request-api'
import { getMethodNotAllowedResponse } from 'utils/api-utils'

const genericRequestService = new GenericRequestService('ingredients')

const updateIngredient = (
  request: NextApiRequest,
  response: NextApiResponse
) => {
  const { body: ingredientData } = request
  const { name } = ingredientData
  genericRequestService.updateRecordWithKeyValidation<IIngredient>(
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
    updateIngredient(request, response)
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
