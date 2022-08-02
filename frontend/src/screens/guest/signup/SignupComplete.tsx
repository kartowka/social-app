import { FC, useRef, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import LottieView from 'lottie-react-native'
import { signupCompleteWrapper } from '@screens/guest/signup/styles'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { AuthContext } from 'services/context'
import { RootStackParamList, UserDataProps } from 'types'

type signupCompleteScreenProp = StackNavigationProp<RootStackParamList, 'SignupComplete'>
// const SignupComplete: FC<{ redirect: () => void }> = ({ redirect }) => {

const SignupComplete: FC<UserDataProps> = (user) => {
	const navigation = useNavigation<signupCompleteScreenProp>()
	const animation = useRef(null)
	useEffect(() => {
		setTimeout(() => {
			navigation.navigate('Home')
		}, 2000)
	}, [])

	return (
		<View style={signupCompleteWrapper.container}>
			<View style={signupCompleteWrapper.animationContainer}>
				<LottieView
					autoPlay
					ref={animation}
					// Find more Lottie files at https://lottiefiles.com/featured
					source={require('@assets/images/complete.json')}
				/>
			</View>
			<Text style={signupCompleteWrapper.text}> Registration process completed</Text>
			<Text style={signupCompleteWrapper.text}> Redirecting...</Text>
		</View>
	)
}

export default SignupComplete
