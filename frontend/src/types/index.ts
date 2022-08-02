import { ColorValue, KeyboardTypeOptions, StyleProp, TextStyle, ViewStyle } from 'react-native'
import { Socket } from 'socket.io-client'

export type chatProps = {
	senderID?: string
	body?: string
	username?: string
	time?: string
}
export type styledButtonProps = {
	disabled?: boolean
	text: string
	onClick: () => void
	style?: StyleProp<ViewStyle>
	textStyle?: StyleProp<TextStyle>
	underlayColor?: ColorValue
}
export type styledTextInputProps = {
	text: string
	keyboardType: KeyboardTypeOptions
	secureTextEntry: boolean
	onChangeText?: ((text: string) => void) | undefined
}
export type textInputSettingsScreenProps = {
	header: string
	selectionColor?: string
	iconColor?: string
	keyboardType?: KeyboardTypeOptions
	secureTextEntry?: boolean
	errorMessage?: string
	placeHolder?: string
	setter: React.Dispatch<React.SetStateAction<string>>
}
export type RootStackParamList = {
	Home: undefined
	Login: undefined
	Signup: undefined
	SignupComplete?: UserDataProps
}
export type UserDataProps = {
	id?: string | null
	firstName?: string | null
	lastName?: string | null
	email?: string | null
	socialLogin?: boolean
	socialProvider?: string | null
	password?: string | null
	repeatPassword?: string | null
	refreshToken?: string | null
	accessToken?: string | null
	errorMsg?: string | null
	errorCode?: number
	imageURL?: string | null
	newUser?: boolean
	isValidationError?: boolean
}
export type MainBottomTabParamList = {
	Home: undefined
	Chat: undefined
	Posts: undefined
	Settings: undefined
}
export type messageProps = {
	_id?: string
	email?: string
	name?: string
	body?: string
	imageURL?: string
}
export type AuthContextProps = {
	signIn: (user?: UserDataProps | null) => void
	signUp: (user?: UserDataProps | null) => void
	logOut: (user?: UserDataProps | null) => void
}
export type UserContextType = {
	socket: Socket
	userData: UserDataProps
	setUserData: (userData: UserDataProps) => void
}
