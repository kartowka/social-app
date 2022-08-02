import { getAllPostsByEmail, deletePostByID, updatePostByID } from 'services/post'
import { StyleSheet, Text, View, KeyboardAvoidingView, Platform, TextInput, FlatList, Image, Modal, Pressable, Alert, RefreshControl, ActivityIndicator } from 'react-native'
import React, { FC, useContext, useEffect, useState, useMemo } from 'react'
import Icon from '@expo/vector-icons/MaterialCommunityIcons'
import { FontAwesome } from '@expo/vector-icons'
import { MaterialIcons } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'

import { PLATFORM_PADDING } from '@constants/index'
import { messageProps, UserContextType } from 'types'
import { AuthContext, UserContext } from 'services/context'
import { uploadImage } from 'services/user'
import { SvgUri } from 'react-native-svg'
import AsyncStorage from '@react-native-async-storage/async-storage'

const ListItem: FC<messageProps> = ({ _id, name, body, imageURL }) => {
	const [imageUrl, setImageUrl] = useState(imageURL)
	const [height, setHeight] = useState(35)

	return (
		<View style={styles.box}>
			<View style={{ flexDirection: 'row' }}>
				<Text style={[styles.text, styles.publisherUsername, { width: '85%' }]}>{name}</Text>
				<EditPostModal _id={_id} body={body} imageURL={imageURL} name={name} />
				<Pressable
					style={{ position: 'absolute', right: 0 }}
					onPress={async () => {
						AsyncStorage.getItem('accessToken').then((accessToken) => {
							deletePostByID(_id as string, accessToken as string)
						})
					}}
				>
					<FontAwesome style={{ right: 0, fontSize: 30, color: 'red' }} name='close' />
				</Pressable>
			</View>

			<Text style={[styles.text, styles.publisherContext]}>{body}</Text>
			{imageUrl != '' && <Image style={{ height: 200 }} source={{ uri: imageUrl }}></Image>}
			{imageUrl == ''}
		</View>
	)
}

const MyPosts: FC = () => {
	const { userData } = useContext(UserContext) as UserContextType
	const [height, setHeight] = useState(35)
	const [message, setMessage] = useState('')
	const [messageArray, setMassages] = useState<Array<messageProps>>([])
	const [isLoading, setIsLoading] = useState(true)
	useEffect(() => {
		loadPosts()
	}, [])
	const loadPosts = () => {
		AsyncStorage.getItem('accessToken').then((accessToken) => {
			getAllPostsByEmail(userData.email as string, accessToken as string)
				.then((data) => {
					setMassages(data as messageProps[])
					setIsLoading(false)
				})
				.catch((err) => {
					console.error(err)
				})
		})
	}
	useEffect(() => {
		let isMounted = true
		setTimeout(() => {
			if (isMounted) loadPosts()
		}, 1000 * 60)
		return () => {
			isMounted = false
		}
	}, [messageArray])

	return (
		<View style={{ flex: 1, backgroundColor: '#000000' }}>
			<Text
				style={{
					color: '#1fdf64',
					marginTop: PLATFORM_PADDING,
					textAlign: 'center',
					fontSize: 20,
					borderColor: '#1fdf64',
					borderWidth: 2,
					borderRadius: 10,
					marginLeft: 50,
					marginRight: 50,
					padding: 10,
					marginBottom: 10,
				}}
			>
				{userData.firstName} {userData.lastName} POSTS
			</Text>
			<View style={{ borderWidth: 1, borderTopColor: '#1fdf64', marginLeft: 10, marginRight: 10, paddingTop: PLATFORM_PADDING }}></View>
			{isLoading ? <ActivityIndicator color='#1fdf64' size={50} /> : null}
			<FlatList
				data={messageArray}
				keyExtractor={(item, index) => index.toString()}
				renderItem={({ item }) => <ListItem name={item.name} _id={item._id} body={item.body} imageURL={item.imageURL} />}
				refreshControl={<RefreshControl refreshing={isLoading} onRefresh={loadPosts} />}
			></FlatList>
			<KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}></KeyboardAvoidingView>
		</View>
	)
}
export default MyPosts

const EditPostModal: FC<messageProps> = ({ _id, name, imageURL, body }) => {
	const { userData } = useContext(UserContext) as UserContextType
	const [height, setHeight] = useState(35)
	const [modalVisible, setModalVisible] = useState(false)
	const [publisher, setPublisher] = useState(name)
	const profileAvatar = userData.imageURL
	const [description, setDescription] = useState(body)
	const [embedded_photo, setEmbeddedPhoto] = useState<string>(imageURL as string)
	const [data, setData] = useState<messageProps>({ name: name, body: description, imageURL: embedded_photo })
	useEffect(() => {
		let isMounted = true
		if (isMounted) {
			requestPermission()
		}
		return () => {
			isMounted = false
		}
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
				setEmbeddedPhoto(response.uri)
			}
		} catch (error) {
			console.log(error)
		}
	}
	const openGallery = async () => {
		try {
			const response = await ImagePicker.launchImageLibraryAsync()
			if (!response.cancelled) {
				AsyncStorage.getItem('accessToken').then((accessToken) => {
					uploadImage(response.uri, accessToken as string).then((url) => {
						setEmbeddedPhoto(url as string)
					})
				})
			}
		} catch (error) {
			console.log(error)
		}
	}
	const postUpdate = async () => {
		const accessToken = await AsyncStorage.getItem('accessToken')
		data.email = userData.email as string
		data.name = publisher
		data.body = description
		data.imageURL = embedded_photo
		data._id = _id
		await updatePostByID(data, accessToken as string)
		setModalVisible(!modalVisible)
	}
	return (
		<View style={{ flex: 1 }}>
			<Modal
				animationType='slide'
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => {
					setModalVisible(!modalVisible)
				}}
			>
				<View style={styles.centeredView}>
					<KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{}}>
						<View style={styles.modalView}>
							<View style={{ flexDirection: 'row' }}>
								<Text style={styles.modalText}>Edit Post</Text>
								<Pressable style={[styles.button, styles.buttonClose]} onPress={() => setModalVisible(!modalVisible)}>
									<Icon style={styles.closeIcon} name='close'></Icon>
								</Pressable>
							</View>
							<View style={{ borderTopColor: '#1fdf64', borderWidth: 1, flex: 1 }}>
								<View style={{ flexDirection: 'row' }}>
									{profileAvatar != '' && <Image style={{ width: 50, height: 50, borderRadius: 1000, marginLeft: 10, marginTop: 10 }} source={{ uri: profileAvatar as string }}></Image>}
									{profileAvatar == '' && <SvgUri width={50} height={50} uri='https://upload.wikimedia.org/wikipedia/commons/e/e0/Anonymous.svg' />}
									<Text style={[styles.text, { margin: 10 }]}>{name}</Text>
								</View>
								<View style={{ marginTop: 10, flex: 1 }}>
									<TextInput
										placeholder='Whats on your mind?'
										placeholderTextColor={'#1fdf64'}
										multiline={true}
										selectionColor={'#1fdf64'}
										onChangeText={(e) => {
											setDescription(e)
										}}
										onContentSizeChange={(event) => {
											setHeight(event.nativeEvent.contentSize.height)
										}}
										style={{ fontSize: 15, color: '#1fdf64' }}
									>
										{body}
									</TextInput>
									{embedded_photo != '' && <Image style={{ flex: 1 }} source={{ uri: imageURL }}></Image>}
									{embedded_photo == ''}
								</View>
								<View style={{ borderColor: '#1fdf64', borderWidth: 1, height: 40, borderRadius: 10, flexDirection: 'row' }}>
									<Text style={{ color: '#1fdf64', textAlign: 'left', marginTop: 10, marginLeft: 10 }}>Add to your post</Text>
									<Pressable style={{ position: 'absolute', right: 0 }} onPress={openGallery}>
										<FontAwesome style={[styles.closeIcon, { right: 40, fontSize: 30 }]} name='file-photo-o' />
									</Pressable>
									<Pressable style={{ position: 'absolute', right: 0 }} onPress={openCamera}>
										<MaterialIcons style={[styles.closeIcon, { right: 5, fontSize: 30 }]} name='add-a-photo' />
									</Pressable>
								</View>
								<View style={{ marginTop: 10, borderColor: '#1fdf64', borderWidth: 1, height: 40, borderRadius: 10 }}>
									<Pressable onPress={postUpdate}>
										<Text style={{ color: '#1fdf64', textAlign: 'center', marginTop: 10 }}>Update</Text>
									</Pressable>
								</View>
							</View>
						</View>
					</KeyboardAvoidingView>
				</View>
			</Modal>
			<Pressable style={{}} onPress={() => setModalVisible(true)}>
				<FontAwesome style={{ fontSize: 30, color: '#1fdf64' }} name='edit' />
			</Pressable>
		</View>
	)
}

const styles = StyleSheet.create({
	box: {
		flex: 1,
		padding: 10,
		margin: 5,
		borderRadius: 20,
		marginBottom: 5,
		borderColor: '#1fdf64',
		borderWidth: 1,
	},
	container: {
		paddingTop: PLATFORM_PADDING,
		flex: 1,
		backgroundColor: '#000000',
	},
	text: {
		fontSize: 15,
		color: '#1fdf64',
		textAlign: 'left',
	},
	publisherUsername: {
		paddingBottom: 3,
		fontWeight: '700',
	},
	publisherContext: {
		fontWeight: '500',
	},
	centeredView: {
		flex: 1,
		margin: 5,
		justifyContent: 'center',
		alignItems: 'center',
	},
	modalView: {
		flex: 1,
		padding: 20,
		borderRadius: 20,
		marginTop: PLATFORM_PADDING,
		marginBottom: 85,
		borderColor: '#1fdf64',
		borderWidth: 1,
		backgroundColor: '#000000',
		opacity: 0.9,
		width: '100%',
		height: '50%',
	},
	button: {
		borderRadius: 20,
		paddingTop: 10,
		elevation: 2,
	},
	buttonOpen: {
		marginBottom: 10,
		borderColor: '#1fdf64',
		borderWidth: 1,
	},
	buttonClose: {
		backgroundColor: '#000000',
	},
	textStyle: {
		marginBottom: 5,
		color: '#1fdf64',
		fontWeight: 'bold',
		textAlign: 'center',
	},
	modalText: {
		marginBottom: 15,
		fontSize: 30,
		color: '#1fdf64',
		width: '100%',
		paddingLeft: '30%',
	},
	closeIcon: {
		color: '#1fdf64',
		fontSize: 40,
		position: 'absolute',
		right: 0,
	},
})
