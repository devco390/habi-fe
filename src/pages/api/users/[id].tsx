import { API_METHODS } from 'models/api'
import { IUser } from 'models/user'
import { NextApiRequest, NextApiResponse } from 'next'

import GenericRequestService from 'services/gereneric-request-api'
import { getMethodNotAllowedResponse } from 'utils/api-utils'

const genericRequestService = new GenericRequestService('users')

const updateUser = (request: NextApiRequest, response: NextApiResponse) => {
  const { body: userData } = request
  const { email } = userData
  genericRequestService.updateRecordWithKeyValidation<IUser>(
    request,
    response,
    'email',
    email
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
    updateUser(request, response)
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
