import React, { FC, useState, useContext } from 'react'
import { View, Text, StyleSheet, ScrollView, Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback } from 'react-native'
import { PLATFORM_PADDING } from '@constants/index'

import TextInputSettingScreen from '@components/TextInputSettingScreen'
import StyledButton from 'components/StyledButton'
import { AuthContext, UserContext } from 'services/context'
import ImagePickerComponent from '@components/ImagePickerComponent'
import { updateUser, uploadImage } from 'services/user'
import { isPassword } from 'services/validator'
import { useNavigation } from '@react-navigation/native'
import { MainBottomTabParamList, UserContextType } from 'types'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import AsyncStorage from '@react-native-async-storage/async-storage'

type settingsScreenProps = BottomTabNavigationProp<MainBottomTabParamList, 'Settings'>

const SettingsScreen: FC = () => {
	const navigation = useNavigation<settingsScreenProps>()
	const { logOut } = useContext(AuthContext)
	const { userData } = useContext(UserContext) as UserContextType
	const [password, setPassword] = useState('')
	const [fullName, setFullName] = useState(`${userData.firstName} ${userData.lastName}`)
	const [avatar, setAvatar] = useState(userData?.imageURL)
	const onImageSelected = (uri: string) => {
		setAvatar(uri)
	}
	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<View style={[style.container]}>
				<View style={[{ flexDirection: 'row' }]}>
					<StyledButton style={{ width: '20%', borderRadius: 20 }} textStyle={style.text} text={'Cancel'} onClick={() => navigation.navigate('Home')} />
					<Text style={[style.text, { width: '60%' }]}>Settings</Text>
					<StyledButton
						style={{ width: '20%', borderRadius: 20 }}
						textStyle={style.text}
						text={'Save'}
						onClick={async () => {
							if ((fullName != null || fullName != undefined) && (userData.socialLogin || isPassword(password))) {
								if (userData.socialLogin === false) {
									userData.password = password
								}
								userData.firstName = fullName.split(' ')[0]
								userData.lastName = fullName.split(' ')[1]
								if (avatar != '') {
									AsyncStorage.getItem('accessToken').then((accessToken) => {
										uploadImage(avatar as string, accessToken as string)
									})
								}
								AsyncStorage.getItem('accessToken').then(async (accessToken) => {
									const data = await updateUser(userData, accessToken as string)
									AsyncStorage.removeItem('data')
									AsyncStorage.setItem('data', JSON.stringify(data))
								})

								navigation.navigate('Home')
							}
						}}
					/>
				</View>
				<ScrollView>
					<ImagePickerComponent onImageSelected={onImageSelected} />
					<View style={{}}>
						<KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
							<View style={[style.containerTextInput]}>
								<TextInputSettingScreen header='FULL NAME' keyboardType='default' selectionColor={'#1fdf64'} setter={setFullName} placeHolder={fullName} />
								{/* //TODO if user logged via social login password field disabled. else show password field */}
								{!userData.socialLogin && (
									<TextInputSettingScreen header='PASSWORD' keyboardType='default' secureTextEntry={true} iconColor={'#1fdf64'} selectionColor={'#1fdf64'} setter={setPassword} />
								)}
								<StyledButton
									style={style.logoutContainerButton}
									text={'Logout'}
									textStyle={style.text}
									onClick={() => {
										logOut()
									}}
								/>
							</View>
						</KeyboardAvoidingView>
					</View>
				</ScrollView>
			</View>
		</TouchableWithoutFeedback>
	)
}
export default SettingsScreen

const style = StyleSheet.create({
	keyboardFlex: {
		flex: 1,
	},
	logoutContainerButton: {
		marginTop: '10%',
	},
	containerTextInput: {
		height: 400,
		flex: 1,
		marginTop: PLATFORM_PADDING,
	},
	logoutButton: {
		height: '5%',
		width: '100%',
		padding: 10,
		borderColor: 'red',
		borderWidth: 1,
	},
	container: {
		paddingTop: PLATFORM_PADDING,
		flex: 1,
		backgroundColor: '#000000',
	},
	text: {
		fontSize: 15,
		fontWeight: '600',
		textAlign: 'center',
		color: '#1fdf64',
	},
})
