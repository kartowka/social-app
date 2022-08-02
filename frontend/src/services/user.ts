import backendServiceAPI from 'services/backendServiceAPI'
import FormData from 'form-data'
import { UserDataProps } from 'types'

export const googleLoginOrRegister = async (accessToken: string) => {
	const { data, ok } = await backendServiceAPI.post('/auth/google', { accessToken: accessToken })
	if (ok && typeof data === 'object') {
		const validData: UserDataProps | null = data
		return validData
	} else {
		if (typeof data === 'string') {
			const invalidData: UserDataProps = {
				errorMsg: data,
			}
			return invalidData
		}
	}
}
export const facebookLoginOrRegister = async (accessToken: string) => {
	const { data, ok } = await backendServiceAPI.post('/auth/facebook', { accessToken: accessToken })
	if (ok && typeof data === 'object') {
		const validData: UserDataProps | null = data
		return validData
	} else {
		if (typeof data === 'string') {
			const invalidData: UserDataProps = {
				errorMsg: data,
			}
			return invalidData
		}
	}
}
export const nativeRegisterOrLogin = async (user: { username: string | undefined; password: string | undefined; repeatPassword?: string | undefined; newUser: boolean }) => {
	const { data, ok } = user.newUser ? await backendServiceAPI.post('/auth/register', { user }) : await backendServiceAPI.post('/auth/login', { user })
	if (ok && typeof data === 'object') {
		const validData: UserDataProps | null = data
		return validData
	} else {
		if (typeof data === 'string') {
			const invalidData: UserDataProps = {
				errorMsg: data,
			}
			return invalidData
		}
	}
}
export const updateUser = async (user: UserDataProps, accessToken: string) => {
	const { data, ok } = await backendServiceAPI.patch(
		'/auth/updateUser',
		{ user },
		{
			headers: {
				authorization: `Bearer ${JSON.parse(accessToken)}`,
			},
		}
	)
	if (ok && typeof data === 'object') {
		const validData: UserDataProps | null = data
		return validData
	} else {
		if (typeof data === 'string') {
			const invalidData: UserDataProps = {
				errorMsg: data,
			}
			return invalidData
		}
	}
}
export const uploadImage = async (image: string, accessToken: string) => {
	//TODO save image as id + date.now
	const file = new FormData()
	file.append('file', { name: image, type: '.jpg', uri: image })
	const { data, ok } = await backendServiceAPI.post('/file/upload', file, {
		headers: {
			authorization: `Bearer ${JSON.parse(accessToken)}`,
		},
	})
	if (ok) {
		if (typeof data === 'string') return data
	} else {
		if (typeof data === 'string') return data
	}
}
