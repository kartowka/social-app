import { create } from 'apisauce'
const backendServiceAPI = create({
	baseURL: process.env.BACKEND_SERVICE_URL,
	headers: { Accept: 'application/vnd.github.v3+json' },
})

export default backendServiceAPI
