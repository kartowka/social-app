import { create } from 'apisauce'
import { BACKEND_SERVICE_URL, BACKEND_SERVICE_PORT, BACKEND_SERVICE_API_ROUTE } from '@env'
const backendServiceAPI = create({
	baseURL: `${BACKEND_SERVICE_URL}:${BACKEND_SERVICE_PORT}${BACKEND_SERVICE_API_ROUTE}`,
	headers: { Accept: 'application/vnd.github.v3+json' },
})

export default backendServiceAPI
