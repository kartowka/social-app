import React, { useState, FC, useEffect, useContext } from 'react'
import { View, StyleSheet, Image, Alert, TouchableOpacity } from 'react-native'

import * as ImagePicker from 'expo-image-picker'
import { SvgUri } from 'react-native-svg'
import Icon from '@expo/vector-icons/MaterialCommunityIcons'
import { AuthContext, UserContext } from 'services/context'
import { UserContextType } from 'types/index'

const ImagePickerComponent: FC<{ onImageSelected: (uri: string) => void }> = ({ onImageSelected }) => {
	const { userData } = useContext(UserContext) as UserContextType
	const [imageUri, setImageUri] = useState(userData.imageURL)
	useEffect(() => {
		requestPermission()
	}, [])
	const requestPermission = async () => {
		const response = await ImagePicker.requestCameraPermissionsAsync()
		if (!response.granted) {
			Alert.alert('', 'permisson request.')
		}
	}
	const openCamera = async () => {
		try {
			const response = await ImagePicker.launchCameraAsync()
			if (!response.cancelled) {
				setImageUri(response.uri)
				onImageSelected(response.uri)
			}
		} catch (error) {
			console.log(error)
		}
	}
	const openGallery = async () => {
		try {
			const response = await ImagePicker.launchImageLibraryAsync()
			if (!response.cancelled) {
				setImageUri(response.uri)
				onImageSelected(response.uri)
			}
		} catch (error) {
			console.log(error)
		}
	}
	return (
		<View style={styles.avatarContainer}>
			{imageUri != '' && <Image style={styles.avatar_image} source={{ uri: imageUri as string }}></Image>}
			{imageUri == '' && <SvgUri width={150} height={150} uri='https://upload.wikimedia.org/wikipedia/commons/e/e0/Anonymous.svg' />}
			<TouchableOpacity style={styles.image_icon} onPress={openGallery}>
				<Icon name='image' size={40} color='#1fdf64' />
			</TouchableOpacity>
			<TouchableOpacity style={styles.camera_icon} onPress={openCamera}>
				<Icon name='camera-plus' size={40} color='#1fdf64' />
			</TouchableOpacity>
		</View>
	)
}

const styles = StyleSheet.create({
	avatar_image: {
		width: 150,
		height: 150,
		borderRadius: 1000,
		borderWidth: 2,
	},
	image_icon: {
		borderWidth: 0,
		backgroundColor: '#000000',
		borderRadius: 50,
		position: 'absolute',
		right: '0%',
		bottom: '80%',
	},
	camera_icon: {
		borderWidth: 0,
		backgroundColor: '#000000',
		borderRadius: 50,
		position: 'absolute',
		left: '-2%',
		bottom: '82%',
	},
	avatarContainer: {
		marginTop: 20,
		paddingTop: 10,
		marginLeft: 100,
		marginRight: 100,
		height: '30%',
		alignContent: 'center',
		alignItems: 'center',
		alignSelf: 'auto',
		textAlign: 'center',
		borderRadius: 100,
	},
	image_picker_image: {
		width: '100%',
		height: 250,
		resizeMode: 'contain',
		padding: 10,
	},
	image_picker_camera_btn: {
		position: 'absolute',
		bottom: -5,
		left: 10,
	},
	image_picker_gallery_btn: {
		position: 'absolute',
		bottom: -5,
		right: 10,
	},
})

export default ImagePickerComponent
