import React, { FC, useState } from 'react'
import { Text, View, TextInput } from 'react-native'
import Icon from '@expo/vector-icons/MaterialCommunityIcons'
import styles from '@components/TextInputSettingScreenWrapper'
import { textInputSettingsScreenProps } from 'types'

const TextInputSettingScreen: FC<textInputSettingsScreenProps> = ({ header, keyboardType, secureTextEntry, iconColor, selectionColor, errorMessage, placeHolder, setter }) => {
	const [passwordVisible, setPasswordVisible] = useState(secureTextEntry)
	const [placeholder, setPlaceholder] = useState(placeHolder)

	const handleChange = (input: string) => {
		setter(input)
	}
	return (
		<View style={[styles.MainContainer]}>
			<View style={styles.descriptionTextContainer}>
				<Text style={styles.descriptionTextStyle}>{header}</Text>
			</View>
			<View style={[styles.textInputContainer]}>
				<TextInput
					inlineImageLeft='search_icon'
					keyboardType={keyboardType}
					selectionColor={selectionColor}
					secureTextEntry={passwordVisible}
					style={[styles.descriptionTextStyle, styles.textInputStyle]}
					onChangeText={handleChange}
				>
					{placeholder}
				</TextInput>

				{secureTextEntry ? <Icon name={passwordVisible ? 'eye-off' : 'eye'} size={24} color={iconColor} style={styles.iconStyle} onPress={() => setPasswordVisible(!passwordVisible)} /> : null}
			</View>
			<View style={styles.errorContainer}>
				<Text style={styles.errorTextStyle}>{errorMessage}</Text>
			</View>
		</View>
	)
}
export default TextInputSettingScreen

{
}
