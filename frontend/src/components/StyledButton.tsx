import { FC } from 'react'
import { View, Text, TouchableHighlight } from 'react-native'
import { styledButtonProps } from 'types/index'

const StyledButton: FC<styledButtonProps> = ({ text, onClick, style, textStyle, underlayColor, disabled }) => {
	return (
		<View style={style}>
			<TouchableHighlight disabled={disabled} onPress={onClick} activeOpacity={0.2} underlayColor={underlayColor}>
				<Text style={textStyle}>{text}</Text>
			</TouchableHighlight>
		</View>
	)
}

export default StyledButton
