import { StyleSheet } from 'react-native'

const style = StyleSheet.create({
	iconPlacement: {
		flexDirection: 'row-reverse',
	},
	textInputContainer: {
		flexDirection: 'row',
		borderColor: 'grey',
		backgroundColor: 'grey',
		padding: 10,
		borderRadius: 5,
		marginLeft: 10,
		marginRight: 10,
		marginBottom: 10,
	},
	textInput: {
		flex: 1,
		color: '#ffffff',
		fontSize: 25,
	},

	text: {
		color: '#ffffff',

		fontSize: 25,
		fontWeight: '600',
		marginBottom: 2,
		marginLeft: 10,
	},
})
export default style
