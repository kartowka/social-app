import React, { FC, useContext } from 'react'
import { View, Text, ImageBackground, StatusBar, Alert } from 'react-native'
import { SvgUri } from 'react-native-svg'
import SocialButton from '@components/SocialButton'
import style from '@screens/guest/home/styles'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import * as Facebook from 'expo-auth-session/providers/facebook'
import * as Google from 'expo-auth-session/providers/google'
import * as WebBrowser from 'expo-web-browser'
import { facebookLoginOrRegister, googleLoginOrRegister } from 'services/user'
import { GOOGLE_CLIENT_ID, FACEBOOK_CLIENT_ID } from '@env'
import { AuthContext } from 'services/context'
import { RootStackParamList, UserDataProps } from 'types'
type homeScreenProp = StackNavigationProp<RootStackParamList, 'Home'>

WebBrowser.maybeCompleteAuthSession()

const HomeScreen: FC<{ route: any; onClick: () => void }> = ({ route, onClick }) => {
	const navigation = useNavigation<homeScreenProp>()
	const { signIn } = useContext(AuthContext)

	const [_, __, facebookPromptAsync] = Facebook.useAuthRequest({
		clientId: FACEBOOK_CLIENT_ID,
	})
	const [___, ____, googlePromptAsync] = Google.useAuthRequest({
		expoClientId: GOOGLE_CLIENT_ID,
	})
	const googleRegister = async () => {
		const response = await googlePromptAsync()
		if (response.type === 'success') {
			const { access_token } = response.params
			const user: UserDataProps | null | undefined = await googleLoginOrRegister(access_token)
			if (user?.errorMsg) {
				Alert.alert('', user.errorMsg)
			} else if (!user?.newUser) {
				signIn(user)
			} else if (user?.newUser) {
				navigation.navigate('SignupComplete')
			}
		}
	}
	const facebookRegister = async () => {
		const response = await facebookPromptAsync()
		if (response.type === 'success') {
			const { access_token } = response.params
			const user: UserDataProps | null | undefined = await facebookLoginOrRegister(access_token)
			if (user?.errorMsg) {
				Alert.alert('', user.errorMsg)
			} else if (!user?.newUser) {
				signIn(user)
			} else if (user?.newUser) {
				navigation.navigate('SignupComplete')
			}
		}
	}
	return (
		<View style={style.container}>
			<StatusBar animated={true} backgroundColor='#000000' />
			<ImageBackground source={require('@images/anonymous-option2.jpg')} resizeMode='cover' style={style.imageBackground}>
				<View style={style.descriptionContainer}>
					<SvgUri width='20%' height='20%' uri='https://upload.wikimedia.org/wikipedia/commons/e/e0/Anonymous.svg' />
					<Text style={style.descriptionText}>We are Anonymous, We are legion, We do not forget, We do not forgive.</Text>
				</View>
				<View>
					<SocialButton text='Sign up' name='' onPress={() => navigation.navigate('Signup')} color='#1fdf64' textColor='#000000' />
					<SocialButton text='Continue with Google' name='Google' onPress={() => googleRegister()} color='' textColor='#ffffff' />
					<SocialButton text='Continue with Facebook' name='Facebook' onPress={() => facebookRegister()} color='' textColor='#ffffff' />
					<SocialButton text='Log in' name='' onPress={() => navigation.navigate('Login')} color='' textColor='#ffffff' />
				</View>
			</ImageBackground>
		</View>
	)
}

export default HomeScreen
