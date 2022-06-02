import { StyleSheet } from 'react-native'
import Constants from 'expo-constants'
const statusBarHeight = Constants.statusBarHeight

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	logo: {
		flex: 1,
		resizeMode: 'contain',
		width: '100%',
		height: '100%',
		marginTop: statusBarHeight + 120,
		alignItems: 'center',
		justifyContent: 'center',
		opacity: 100,
	},
	textBoxContainer: {
		justifyContent: 'center',
		marginTop: statusBarHeight + 100,
		margin: 50,
	},
	textInput: {
		margin: 10,
		borderColor: '#000000',
		borderWidth: 1,
		borderRadius: 60,
		fontSize: 20,
	},
	buttonContainer: {
		borderColor: '#000000',
		borderWidth: 1,
		borderRadius: 60,
		margin: 10,
		backgroundColor: '#d9ff00',
		alignContent: 'center',
		alignItems: 'center',
		textAlign: 'center',
	},
	buttonText: {
		fontSize: 20,
	},
	socialContainer: {},
})
export default styles
