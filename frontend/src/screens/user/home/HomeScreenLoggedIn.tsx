import { PLATFORM_PADDING } from '@constants/index'
import { FC } from 'react'
import { View, Text, StyleSheet, StatusBar } from 'react-native'

const HomeScreenLoggedIn: FC = () => {
	return (
		<View style={style.container}>
			<StatusBar animated={true} backgroundColor='#000000' barStyle={'light-content'} />
			<Text style={style.text}>Homepage</Text>
		</View>
	)
}
export default HomeScreenLoggedIn

const style = StyleSheet.create({
	container: {
		paddingTop: PLATFORM_PADDING,
		flex: 1,
		backgroundColor: '#000000',
	},
	text: {
		display: 'flex',
		fontSize: 15,
		fontWeight: '500',
		color: '#1fdf64',
		textAlign: 'center',
		justifyContent: 'center',
		alignItems: 'center',
	},
})
