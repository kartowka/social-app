import Icons from '@expo/vector-icons/MaterialCommunityIcons'
import { Platform, StyleSheet } from 'react-native'
import { BACKEND_SERVICE_URL, BACKEND_SERVICE_PORT } from '@env'

const BORDERTEST = StyleSheet.create({
	border: {
		borderColor: 'red',
		borderWidth: 1,
	},
})
const defaultScreenOptionStack = ({ route }: any) => ({
	headerStyle: { backgroundColor: '#000000' },
	headerTintColor: '#ffffff',
})

const defaultScreenOptionBottomTab = ({ route }: any) => ({
	headerStyle: { backgroundColor: '#000000' },
	headerShown: false,
	headerTintColor: '#1fdf64',
	tabBarStyle: { backgroundColor: '#000000' },
	tabBarIcon: () => {
		let iconName: any

		if (route.name === 'Home') {
			iconName = 'home'
		} else if (route.name === 'Chat') {
			iconName = 'chat'
		} else if (route.name === 'Posts') {
			iconName = 'forum'
		} else if (route.name === 'Settings') {
			iconName = 'cog'
		}

		// You can return any component that you like here!
		return <Icons name={iconName} size={25} color={'#1fdf64'} />
	},
	tabBarActiveTintColor: '#1fdf64',
	tabBarInactiveTintColor: '#909090',
})
const serverURL = `${BACKEND_SERVICE_URL}:${BACKEND_SERVICE_PORT}`
const endpoints = {
	facebook: serverURL + '/facebook',
	google: serverURL + '/google',
}

const PLATFORM_PADDING = Platform.OS === 'ios' ? 45 : 25

export { defaultScreenOptionStack, defaultScreenOptionBottomTab, PLATFORM_PADDING, BORDERTEST, endpoints }
