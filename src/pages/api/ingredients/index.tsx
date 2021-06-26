import { API_METHODS } from 'models/api'
import { IIngredient } from 'models/ingredients'
import { NextApiRequest, NextApiResponse } from 'next'

import GenericRequestService from 'services/gereneric-request-api'
import { getMethodNotAllowedResponse } from 'utils/api-utils'

const genericRequestService = new GenericRequestService('ingredients')

const addIngredient = (request: NextApiRequest, response: NextApiResponse) => {
  const { body: ingredientData } = request
  const { name, price } = ingredientData
  genericRequestService.addRecordWithFieldValidation<IIngredient>(
    request,
    response,
    { name, price },
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
    genericRequestService.getAll<IIngredient>(request, response)
  } else if (method === API_METHODS.POST) {
    addIngredient(request, response)
  } else {
    response.setHeader('Allow', [API_METHODS.GET, API_METHODS.POST])
    getMethodNotAllowedResponse(`Method ${method} Not Allowed`)
  }
}
