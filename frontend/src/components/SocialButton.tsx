import { FC } from 'react'
import { View, Text, TouchableHighlight } from 'react-native'
import { SvgUri } from 'react-native-svg'
import style from '@components/SocialButtonWrapper'

const SocialButton: FC<{ text: string; name: string; onPress: (serviceName: string) => void; color: string; textColor: string }> = ({ text, name, onPress, color, textColor }) => {
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
		<View style={name != '' ? style.containerOuterSocial : [style.containerOuterSignup, { backgroundColor: color, borderColor: color }]}>
			<TouchableHighlight onPress={() => onPress(name)} activeOpacity={0.2} underlayColor={color}>
				<View style={name != '' ? style.containerInnerSocial : style.containerInnerSignup}>
					<SvgUri width='40%' height='100%' uri={socialSign()} style={name != '' ? style.iconPlacement : null} />
					<Text style={[style.text, { color: textColor }, name != '' ? null : { textAlign: 'center' }]}>{text}</Text>
				</View>
			</TouchableHighlight>
		</View>
	)
}

export default SocialButton
