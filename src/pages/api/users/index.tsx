import { API_METHODS } from 'models/api'
import { IUser } from 'models/user'
import { NextApiRequest, NextApiResponse } from 'next'

import GenericRequestService from 'services/gereneric-request-api'
import { getMethodNotAllowedResponse } from 'utils/api-utils'

const genericRequestService = new GenericRequestService('users')

const addUser = (request: NextApiRequest, response: NextApiResponse) => {
  const { body: userData } = request
  const { email, userName, rol, state } = userData
  genericRequestService.addRecord<IUser>(
    request,
    response,
    { email, userName, rol, state },
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
    genericRequestService.getAll<IUser>(request, response)
  } else if (method === API_METHODS.POST) {
    addUser(request, response)
  } else {
    response.setHeader('Allow', [API_METHODS.GET, API_METHODS.POST])
    getMethodNotAllowedResponse(`Method ${method} Not Allowed`)
  }
}
