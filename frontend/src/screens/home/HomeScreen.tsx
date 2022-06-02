import { FC } from 'react'
import { View, Text, ImageBackground } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { SvgUri } from 'react-native-svg'
import SocialButton from '@components/SocialButton'

const HomeScreen: FC<{ onClick: () => void }> = ({ onClick }) => {
	const onPress = () => {
		onClick()
	}
	return (
		<View style={{ flex: 1 }}>
			<ImageBackground source={require('@images/Untitled.jpg')} resizeMode='cover' style={{ flex: 1, justifyContent: 'center' }}>
				<View style={{ marginBottom: -30, marginTop: 300, marginLeft: 100, marginRight: 100, alignContent: 'center', alignItems: 'center' }}>
					<SvgUri width='20%' height='20%' uri='https://upload.wikimedia.org/wikipedia/commons/e/e0/Anonymous.svg' />
					<Text style={{ fontFamily: 'Optima', fontSize: 20, color: '#ffffff', textAlign: 'center' }}>We are Anonymous, We are legion, We do not forget, We do not forgive.</Text>
				</View>
				<View>
					<SocialButton text='Sign up free' name='' onPress={onPress} color='#1fdf64' textColor='#000000' />
					<SocialButton text='Continue with Google' name='Google' onPress={onPress} color='' textColor='#ffffff' />
					<SocialButton text='Continue with Facebook' name='Facebook' onPress={onPress} color='' textColor='#ffffff' />
					<SocialButton text='Continue with Apple' name='Apple' onPress={onPress} color='' textColor='#ffffff' />
					<SocialButton text='Log in' name='' onPress={onPress} color='' textColor='#ffffff' />
				</View>
			</ImageBackground>
			<StatusBar style='auto' />
		</View>
	)
}

export default HomeScreen
