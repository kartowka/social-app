import StyledTextInput from '@components/StyledTextInput'
import StyledButton from '@components/StyledButton'
import React, { FC, useContext, useState } from 'react'
import { Alert, SafeAreaView } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { loginWrapper } from '@screens/guest/signup/styles'
import { nativeRegisterOrLogin } from 'services/user'
import { AuthContext } from 'services/context'
import { RootStackParamList, UserDataProps } from 'types'
import { isEmail, isPassword } from 'services/validator'
type loginScreenProp = StackNavigationProp<RootStackParamList, 'Login'>
const Login: FC<{ route: any }> = ({ route }) => {
	const [username, setUsername] = useState<string>()
	const [password, setPassword] = useState<string>()
	const { signIn } = useContext(AuthContext)
	const navigation = useNavigation<loginScreenProp>()
	return (
		<SafeAreaView style={loginWrapper.container}>
			<StyledTextInput
				text={'Username'}
				keyboardType={'default'}
				secureTextEntry={false}
				onChangeText={(event) => {
					setUsername(event.toLowerCase())
				}}
			>
				{username}
			</StyledTextInput>
			<StyledTextInput
				text={'Password'}
				keyboardType={'default'}
				secureTextEntry={true}
				onChangeText={(event) => {
					setPassword(event)
				}}
			>
				{password}
			</StyledTextInput>
			<StyledButton
				underlayColor={'grey'}
				style={[loginWrapper.styleButton, loginWrapper.buttonContainer]}
				text='Log in'
				textStyle={loginWrapper.buttonText}
				onClick={async () => {
					if (isEmail(username) && isPassword(password)) {
						const user: UserDataProps | null | undefined = await nativeRegisterOrLogin({
							username: username,
							password: password,
							newUser: false,
						})
						if (user?.errorMsg) {
							Alert.alert('', user.errorMsg)
						} else if (!user?.newUser) {
							signIn(user)
						}
					} else {
						Alert.alert('', 'validation error!')
					}
				}}
			></StyledButton>
		</SafeAreaView>
	)
}
export default Login
