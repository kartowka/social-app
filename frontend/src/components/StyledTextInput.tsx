import { FC, useState } from 'react'
import { View, Text, TextInput, KeyboardTypeOptions } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'
import style from '@components/StyledTextInputWrapper'
import { styledTextInputProps } from 'types/index'

const StyledTextInput: FC<styledTextInputProps> = ({ text, keyboardType, secureTextEntry, onChangeText }) => {
	const [passwordVisible, setPasswordVisible] = useState(secureTextEntry)
	return (
		<View>
			<Text style={style.text}>{text}</Text>
			<View style={style.textInputContainer}>
				<TextInput secureTextEntry={passwordVisible} keyboardType={keyboardType} selectionColor={'#1fdf64'} style={style.textInput} onChangeText={onChangeText} />
				<View style={{ flexDirection: 'row-reverse', alignItems: 'center' }}>
					{secureTextEntry ? <Ionicons name={passwordVisible ? 'eye-off' : 'eye'} size={24} style={style.iconPlacement} onPress={() => setPasswordVisible(!passwordVisible)} /> : null}
				</View>
			</View>
		</View>
	)
}

export default StyledTextInput
