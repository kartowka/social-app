import { UserDataProps } from 'types'
const isEmail = (event: string | undefined) => {
	const mailFormat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	return mailFormat.test(String(event).toLowerCase())
}
const isPassword = (password: string | undefined) => {
	const passwordStrength = /^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).{8,}$/
	return passwordStrength.test(String(password))
}
const isPasswordMatch = (password: string | undefined, repeatPassword: string | undefined) => {
	return password === repeatPassword
}

export { isEmail, isPassword, isPasswordMatch }
