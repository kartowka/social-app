import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import User from '../models/User'
import bcrypt from 'bcryptjs'
import fetch from 'node-fetch'

type UserData = {
	id?: string
	firstName?: string
	lastName?: string
	email?: string
	socialLogin?: boolean
	socialProvider?: string
	password?: string
	repeatPassword?: string
	refreshToken?: string
	accessToken?: string
	errorMsg?: string
	errorCode?: number
	newUser?: boolean
	imageURL?: string
}
type FetchedUser = {
	name: string
	email: string
}

const getUser = async (emailQuery: string) => {
	const user = await User.findOne({ email: emailQuery })
	if (!user) {
		return null
	}
	return user
}
const encryptPassword = async function (password: string) {
	const salt = await bcrypt.genSalt(10)
	return await bcrypt.hash(password, salt)
}
const register = async (userData: UserData): Promise<UserData> => {
	let user
	if (!userData.socialLogin) {
		if (!userData.email || !userData.password) {
			userData.errorMsg = 'please provide all values'
			userData.errorCode = StatusCodes.BAD_REQUEST
			return userData
			// throw new BadRequestError('please provide all values')
		}
		const encryptedPassword = await encryptPassword(userData.password)
		const userExist = await getUser(userData.email)
		if (userExist) {
			userData.errorMsg = 'user already registered'
			userData.errorCode = StatusCodes.BAD_REQUEST
			return userData
		}
		user = await User.create({
			email: userData.email,
			firstName: userData.firstName,
			lastName: userData.lastName,
			password: encryptedPassword,
			imgUrl: 'qwerty',
		})
	} else if (userData.socialLogin === true) {
		user = await User.create({
			email: userData.email,
			firstName: userData.firstName,
			lastName: userData.lastName,
			socialLogin: userData.socialLogin,
			socialProvider: userData.socialProvider,
			imgUrl: 'qwerty',
		})
	}
	const token = user.createJWT()
	user.createRefreshToken()
	await user.save()
	return {
		firstName: userData.firstName,
		lastName: userData.lastName,
		email: userData.email,
		socialLogin: userData.socialLogin,
		socialProvider: userData.socialProvider,
		newUser: true,
		refreshToken: user.refreshToken,
		accessToken: token,
	}
}
const login = async (userData: UserData): Promise<UserData> => {
	let user
	if (!userData.socialLogin) {
		const { email, password } = userData
		if (!email || !password) {
			userData.errorMsg = 'please provide all values'
			userData.errorCode = StatusCodes.BAD_REQUEST
			return userData
		}
		user = await User.findOne({ email }).select('+password')
		if (!user) {
			userData.errorMsg = 'Invalid Credentials'
			userData.errorCode = StatusCodes.UNAUTHORIZED
			return userData
		}
		const isPasswordCorrect = await user.comparePassword(password)
		if (!isPasswordCorrect) {
			userData.errorMsg = 'Invalid Credentials'
			userData.errorCode = StatusCodes.UNAUTHORIZED
			return userData
		}
	}
	user = await User.findOne({ email: userData.email })
	const token = user.createJWT()
	user.createRefreshToken()
	await user.save()
	user.password = undefined
	return {
		id: user.id,
		firstName: user.firstName,
		lastName: user.lastName,
		email: user.email,
		socialLogin: user.socialLogin,
		socialProvider: '',
		newUser: false,
		refreshToken: user.refreshToken,
		accessToken: token,
		imageURL: user.imageUrl != undefined ? user.imageUrl : '',
	}
}
const renewToken = async (req: Request, res: Response) => {
	const user = await getUser(req.body.user.email)
	const token = user.createJWT()
	await user.save()
	res.status(StatusCodes.OK).json({ user, token })
}
const logout = async (req: Request, res: Response) => {
	const user = await getUser(req.body.user.email)
	user.refreshToken = ' '
	await user.save()
	res.status(StatusCodes.OK).json('you have been logout.')
}

const fetchUserFromFacebook = async (req: Request, res: Response) => {
	const { accessToken } = req.body
	const facebookResponse = await fetch(`https://graph.facebook.com/me?access_token=${accessToken}&fields=name,email`)
	const fetchedUser: FetchedUser = await facebookResponse.json()
	const user = await loginOrRegister(fetchedUser, 'facebook')
	user.errorCode ? res.status(user.errorCode).json(user.errorMsg) : res.status(StatusCodes.OK).json(user)
}
const fetchUserFromGoogle = async (req: Request, res: Response) => {
	const { accessToken } = req.body
	const googleResponse = await fetch('https://www.googleapis.com/userinfo/v2/me?fields=name,email', {
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	})
	const fetchedUser: FetchedUser = await googleResponse.json()
	const user = await loginOrRegister(fetchedUser, 'google')
	if (user.errorMsg) {
		res.status(user.errorCode).json(user.errorMsg)
	} else {
		res.status(StatusCodes.OK).json(user)
	}
}
const loginOrRegister = async (fetchedUser: FetchedUser, provider: string) => {
	let user: UserData = {
		firstName: fetchedUser.name.split(' ')[0],
		lastName: fetchedUser.name.split(' ')[1],
		email: fetchedUser.email,
		socialLogin: true,
		socialProvider: provider,
	}
	if (!user) {
		user.errorMsg = 'something happens,try again!'
		user.errorCode = StatusCodes.BAD_REQUEST
		return user
	}
	const dbUser: UserData = await getUser(user.email)
	if (dbUser == null) {
		return await register(user)
	}
	if (dbUser.socialProvider != provider) {
		user.errorMsg = 'user already register with different provider!'
		user.errorCode = StatusCodes.UNAUTHORIZED
		return user
	}
	return await login(dbUser)
}
const nativeRegisterOrLogin = async (req: Request, res: Response) => {
	const { username, password, repeatPassword, newUser } = req.body.user
	let user: UserData = {
		email: username,
		password: password,
	}
	if (newUser) {
		if (password !== repeatPassword) {
			res.status(StatusCodes.NOT_ACCEPTABLE).json('password mismatch')
		}
		user = await register(user)
		user.errorCode ? res.status(user.errorCode).json(user.errorMsg) : res.status(StatusCodes.CREATED).json(user)
	} else {
		user = await login(user)
		user.errorCode ? res.status(user.errorCode).json(user.errorMsg) : res.status(StatusCodes.OK).json(user)
	}
}
const updateUser = async (req: Request, res: Response) => {
	const { id, firstName, lastName, imageURL, password } = req.body.user
	const user = await User.findById(id)
	user.firstName = firstName
	user.lastName = lastName
	user.imageUrl = imageURL
	if (req.body.user.socialLogin === false) {
		user.password = await encryptPassword(password)
	}
	const token = user.createJWT()
	user.createRefreshToken()
	await user.save()
	user.password = undefined
	res.status(StatusCodes.OK).send({
		id: user.id,
		firstName: user.firstName,
		lastName: user.lastName,
		email: user.email,
		socialLogin: user.socialLogin,
		socialProvider: user.socialProvider,
		newUser: false,
		refreshToken: user.refreshToken,
		accessToken: token,
		imageURL: user.imageUrl,
	})
}
export { getUser, register, login, logout, renewToken, fetchUserFromFacebook, fetchUserFromGoogle, nativeRegisterOrLogin, updateUser }
