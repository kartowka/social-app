import http from 'http'

import app from './app'

let serverInstance: http.Server

const serverStart = (PORT = Number(process.env.PORT)) => {
	serverInstance = http.createServer(app)
	serverInstance.listen(PORT, () => {
		console.info(`🚀 server in up and running on PORT ${PORT} 🚀 `)
		console.info(`🚀 http://localhost:${PORT}                 🚀 `)
	})
	return serverInstance
}
export { serverStart, serverInstance }

// serverStart(3000)
