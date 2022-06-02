import { FC } from 'react'
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native'
import { SvgUri } from 'react-native-svg'

const SocialButton: FC<{ text: string; name: string; onPress: () => void; color: string; textColor: string }> = ({ text, name, onPress, color, textColor }) => {
	const socialSign = () => {
		if (name === 'Facebook') {
			return 'https://www.svgrepo.com/show/138943/facebook.svg'
		} else if (name === 'Google') {
			return 'https://www.svgrepo.com/show/223041/google.svg'
		} else if (name === 'Apple') {
			return 'https://www.svgrepo.com/show/25162/apple.svg'
		}
		return ''
	}
	return (
		<TouchableHighlight style={name != '' ? null : [style.containerSignup, { backgroundColor: color, borderColor: color }]} onPress={() => onPress()} activeOpacity={0.2} underlayColor={color}>
			<View style={name != '' ? style.containerSocial : null}>
				<View style={name != '' ? style.containerInnerSocial : null}>
					<SvgUri width='40%' height='100%' uri={socialSign()} style={name != '' ? style.iconPlacement : null} />
					<Text style={[style.text, { color: textColor }, name != '' ? null : { textAlign: 'center' }]}>{text}</Text>
				</View>
			</View>
		</TouchableHighlight>
	)
}

export default SocialButton

const style = StyleSheet.create({
	containerSignup: {
		marginBottom: 10,
		borderWidth: 10,
		borderRadius: 60,
		marginLeft: 30,
		marginRight: 30,
	},
	containerSocial: {
		borderColor: 'grey',
		borderWidth: 1,
		borderRadius: 60,
		marginLeft: 30,
		marginRight: 30,
		marginBottom: 10,
	},
	containerInnerSocial: {
		borderColor: '#000000',
		borderRadius: 60,
		borderWidth: 10,
		flexDirection: 'row',
	},
	text: {
		fontFamily: 'Optima',
		fontSize: 15,
	},
	iconPlacement: {
		marginLeft: -50,
	},
})
