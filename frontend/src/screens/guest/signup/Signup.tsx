import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import StyledButton from 'components/StyledButton'
import StyledTextInput from 'components/StyledTextInput'
import { FC, useState, useContext } from 'react'
import { Alert, SafeAreaView } from 'react-native'
import { signupWrapper } from '@screens/guest/signup/styles'
import { nativeRegisterOrLogin } from 'services/user'
import { AuthContext } from 'services/context'
import { isEmail, isPassword, isPasswordMatch } from 'services/validator'
import { RootStackParamList, UserDataProps } from 'types'

type signupScreenProp = StackNavigationProp<RootStackParamList, 'Signup'>
const Signup: FC<{ route: any }> = ({ route }) => {
	const [username, setUsername] = useState<string>()
	const [password, setPassword] = useState<string>()
	const [repeatPassword, setRepeatPassword] = useState<string>()
	const { signUp } = useContext(AuthContext)
	const navigation = useNavigation<signupScreenProp>()

	return (
		<SafeAreaView style={signupWrapper.container}>
			<StyledTextInput
				text={`Username`}
				keyboardType={'default'}
				secureTextEntry={false}
				onChangeText={(event) => {
					setUsername(event.toLowerCase())
				}}
			>
				{username}
			</StyledTextInput>
			<StyledTextInput
				text={`Password`}
				keyboardType={'default'}
				secureTextEntry={true}
				onChangeText={(event) => {
					setPassword(event)
				}}
			>
				{password}
			</StyledTextInput>
			<StyledTextInput
				text={`Confirm password`}
				keyboardType={'default'}
				secureTextEntry={true}
				onChangeText={(event) => {
					setRepeatPassword(event)
				}}
			>
				{repeatPassword}
			</StyledTextInput>
			<StyledButton
				underlayColor={'grey'}
				textStyle={signupWrapper.buttonText}
				text={'Create account'}
				onClick={async () => {
					if (isEmail(username) && isPassword(password) && isPasswordMatch(password, repeatPassword)) {
						const user: UserDataProps | null | undefined = await nativeRegisterOrLogin({ username: username, password: password, repeatPassword: repeatPassword, newUser: true })
						if (user?.errorMsg) {
							Alert.alert('', user.errorMsg, [
								{
									text: 'OK',
									onPress: () => {
										navigation.popToTop()
									},
									style: 'default',
								},
							])
						} else if (user?.newUser) {
							navigation.navigate('SignupComplete', user)
						}
					} else {
						Alert.alert('', 'validation error!')
					}
				}}
				style={[signupWrapper.styledButton, signupWrapper.buttonContainer]}
			/>
		</SafeAreaView>
	)
}
export default Signup
