import { StyleSheet } from 'react-native'
const loginWrapper = StyleSheet.create({
	buttonText: {
		fontSize: 15,
		fontWeight: '400',
		color: '#000000',
		textAlign: 'center',
	},
	buttonContainer: {
		width: '30%',
		borderColor: 'grey',
		padding: 10,
		borderRadius: 50,
		backgroundColor: 'grey',
	},
	textInputContainer: {
		borderColor: 'grey',
		padding: 10,
		backgroundColor: 'grey',
		marginBottom: 10,
		marginRight: 10,
		borderRadius: 5,
	},
	textInput: {
		color: '#ffffff',
		fontSize: 20,
	},
	container: {
		flex: 1,
		backgroundColor: '#000000',
	},
	text: {
		color: '#ffffff',
		fontSize: 20,
		fontWeight: '600',
	},
	textGuide: {
		fontSize: 11,
	},
	styleButton: {
		marginRight: 160,
		marginLeft: 160,
		marginTop: 20,
	},
})

export default loginWrapper
