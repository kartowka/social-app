import { StyleSheet } from 'react-native'

const signupWrapper = StyleSheet.create({
	buttonText: {
		fontSize: 15,
		fontWeight: '400',
		color: '#000000',
		textAlign: 'center',
	},
	buttonContainer: {
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
	styledButton: {
		marginRight: 100,
		marginLeft: 100,
		marginTop: 20,
	},
})
export default signupWrapper
