import React, { FC, useContext, useEffect, useMemo, useState } from 'react'
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Keyboard } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'
import { PLATFORM_PADDING } from '@constants/index'
import { chatProps, messageProps, UserContextType } from 'types'
import { AuthContext, UserContext } from 'services/context'
const ListItem: FC<chatProps> = ({ username, senderID, body, time }) => {
	const { userData } = useContext(UserContext) as UserContextType
	if (senderID == userData.id) {
		return (
			<View
				style={{
					backgroundColor: '#1fdf64',
					padding: 10,
					marginLeft: '45%',
					borderRadius: 5,
					marginTop: 5,
					marginRight: '5%',
					maxWidth: '50%',
					alignSelf: 'flex-end',
				}}
			>
				<Text style={{ textAlign: 'right', marginRight: -10, marginTop: -10, marginBottom: 5, paddingRight: 10, fontSize: 15, color: '#000000' }}>{username}</Text>
				<Text style={{ fontSize: 16, color: '#000', justifyContent: 'center' }}>{body}</Text>
				<Text style={{ fontSize: 10, color: '#000000', alignSelf: 'flex-end' }}>{time}</Text>

				<View style={styles.rightArrow}></View>

				<View style={styles.rightArrowOverlap}></View>
			</View>
		)
	} else {
		return (
			<View
				style={{
					backgroundColor: '#909090',
					padding: 10,
					borderRadius: 5,
					marginTop: 5,
					marginLeft: '5%',
					maxWidth: '50%',
					alignSelf: 'flex-start',
				}}
			>
				<Text style={{ textAlign: 'right', marginRight: -10, marginTop: -10, marginBottom: 5, paddingRight: 10, fontSize: 15, color: '#000000' }}>{username}</Text>

				<Text style={{ fontSize: 16, color: '#000', justifyContent: 'center' }}>{body}</Text>
				<Text style={{ fontSize: 10, color: '#000000', alignSelf: 'flex-end' }}>{time}</Text>

				<View style={styles.leftArrow}></View>
				<View style={styles.leftArrowOverlap}></View>
			</View>
		)
	}
}
const ChatScreen: FC = () => {
	const { userData, socket } = useContext(UserContext) as UserContextType
	const [height, setHeight] = useState(35)
	const [currentMessage, setCurrentMessage] = useState('')
	const [messageList, setMessageList] = useState<chatProps[]>([])
	const sendMessage = async () => {
		if (currentMessage != '') {
			const messageData: chatProps = {
				senderID: userData.id as string,
				username: `${userData.firstName} ${userData.lastName}`,
				body: currentMessage,
				time: new Date(Date.now()).getHours() + ':' + (new Date(Date.now()).getMinutes() < 10 ? '0' : '') + new Date(Date.now()).getMinutes(),
			}
			socket.emit('send_message', messageData)
			setMessageList((list) => [...list, messageData])
			setCurrentMessage('')
		}
	}
	useEffect(() => {
		let isMounted = true
		socket.on('receive_message', (data: messageProps) => {
			if (isMounted) setMessageList((list) => [...list, data])
		})
		return () => {
			isMounted = false
		}
	}, [])
	return (
		<View style={{ backgroundColor: '#000000', flex: 1, paddingTop: PLATFORM_PADDING }}>
			{/* {isNewUser && (
				<View style={{ alignSelf: 'center', width: '60%', height: '3%', borderRadius: 50, borderColor: '#1fdf64', borderWidth: 1, marginTop: PLATFORM_PADDING }}>
					<Text style={{ color: '#1fdf64', alignSelf: 'center' }}>user joined the chat</Text>
				</View>
			)} */}
			<FlatList
				inverted={true}
				data={[...messageList].reverse()}
				// keyExtractor={(message) => String(message.time)}
				renderItem={({ item }) => <ListItem senderID={item.senderID} body={item.body} username={item.username} time={item.time} />}
			></FlatList>
			<KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
				<View style={{ flexDirection: 'row', marginBottom: 5 }}>
					<View style={{ width: '85%', justifyContent: 'center' }}>
						<TextInput
							multiline={true}
							selectionColor={'#1fdf64'}
							onChangeText={(event) => {
								setCurrentMessage(event)
							}}
							onContentSizeChange={(event) => {
								setHeight(event.nativeEvent.contentSize.height)
							}}
							style={{ height: Math.max(35, height), fontSize: 15, color: '#1fdf64', borderColor: '#1fdf64', borderWidth: 1, borderRadius: 20, paddingLeft: 10 }}
						>
							{currentMessage}
						</TextInput>
					</View>
					<View style={{ backgroundColor: '#1fdf64', width: '10%', bottom: 0, alignSelf: 'flex-end', marginLeft: 10, marginBottom: 7, borderRadius: 50 }}>
						<TouchableOpacity
							onPress={() => {
								sendMessage()
							}}
						>
							<Ionicons name='send' size={20} color={'#000000'} style={{ justifyContent: 'center', textAlign: 'center' }} />
						</TouchableOpacity>
					</View>
				</View>
			</KeyboardAvoidingView>
		</View>
	)
}
export default ChatScreen
const styles = StyleSheet.create({
	rightArrow: {
		position: 'absolute',
		backgroundColor: '#1fdf64',
		width: 20,
		height: 25,
		bottom: 0,
		borderBottomLeftRadius: 25,
		right: -10,
	},

	rightArrowOverlap: {
		position: 'absolute',
		backgroundColor: '#000000',
		width: 20,
		height: 35,
		bottom: -6,
		borderBottomLeftRadius: 18,
		right: -20,
	},

	/*Arrow head for recevied messages*/
	leftArrow: {
		position: 'absolute',
		backgroundColor: '#909090',
		//backgroundColor:"red",
		width: 20,
		height: 25,
		bottom: 0,
		borderBottomRightRadius: 25,
		left: -10,
	},

	leftArrowOverlap: {
		position: 'absolute',
		backgroundColor: '#000000',
		//backgroundColor:"green",
		width: 20,
		height: 35,
		bottom: -6,
		borderBottomRightRadius: 18,
		left: -20,
	},
})
