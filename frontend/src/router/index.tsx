import React, { FC, useState, useMemo, useEffect, useRef } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import { Signup, Login, SignupComplete, HomeScreen } from '@screens/guest/index'
import { defaultScreenOptionStack, defaultScreenOptionBottomTab } from '@constants/index'
import { ChatScreen, PostsScreen, SettingsScreen, MyPosts } from '@screens/user/index'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { AuthContext, UserContext } from 'services/context'
import { ActivityIndicator, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { MainBottomTabParamList, RootStackParamList, UserDataProps } from 'types'
import { BACKEND_SERVICE_URL, BACKEND_SERVICE_PORT } from '@env'
import io from 'socket.io-client'
const Stack = createNativeStackNavigator<RootStackParamList>()
const Tab = createBottomTabNavigator<MainBottomTabParamList>()
const socket = io(`${BACKEND_SERVICE_URL}:${BACKEND_SERVICE_PORT}`)
const Router: FC = () => {
	const [userData, setUserData] = useState<UserDataProps>()
	const [isLoading, setIsLoading] = useState(false)
	const [isLoggedIn, setIsLoggedIn] = useState(false)
	const authContext = useMemo(
		() => ({
			signIn: (user: UserDataProps) => {
				setUserData(user)
				AsyncStorage.setItem('data', JSON.stringify(user))
				AsyncStorage.setItem('accessToken', JSON.stringify(user.accessToken))
				AsyncStorage.setItem('firstName', JSON.stringify(user.firstName))
				AsyncStorage.setItem('lastName', JSON.stringify(user.lastName))
				AsyncStorage.setItem('email', JSON.stringify(user.email))
				AsyncStorage.setItem('refreshToken', JSON.stringify(user.refreshToken))
				if (user?.id != undefined) {
					AsyncStorage.setItem('id', JSON.stringify(user.id))
				}
				setIsLoading(false)
				setIsLoggedIn(true)
			},
			logOut: () => {
				AsyncStorage.clear()
				setIsLoading(false)
				setIsLoggedIn(false)
			},
			signUp: () => {
				setIsLoading(false)
			},
		}),
		[isLoading, isLoggedIn]
	)
	const setDataFromLocalStorage = async () => {
		await AsyncStorage.getItem('accessToken').then((data) => {
			if (data != null || data != undefined) {
				setIsLoggedIn(true)
			}
		})
		await AsyncStorage.getItem('data').then((data) => {
			if (data != null || data != undefined) {
				const parsed: UserDataProps = JSON.parse(data as string)
				setUserData(parsed)
			}
		})
	}
	useEffect(() => {
		let isMount = true
		setTimeout(async () => {
			if (isMount) setDataFromLocalStorage()
		}, 1)
		return () => {
			isMount = false
		}
	}, [])
	if (isLoading) {
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<ActivityIndicator size='large' />
			</View>
		)
	}
	return (
		<AuthContext.Provider value={authContext}>
			<UserContext.Provider value={{ userData: userData, setUserData: setUserData, socket: socket }}>
				<NavigationContainer>
					{isLoggedIn ? (
						<Tab.Navigator screenOptions={defaultScreenOptionBottomTab}>
							<Tab.Screen name='Home' component={PostsScreen} options={{ headerTitle: 'Home' }} />
							<Tab.Screen name='Posts' component={MyPosts} options={{ headerTitle: 'Posts' }} />
							<Tab.Screen name='Chat' component={ChatScreen} options={{ headerTitle: 'Chat' }} />
							<Tab.Screen name='Settings' component={SettingsScreen} options={{ headerTitle: 'Settings' }} />
						</Tab.Navigator>
					) : (
						<Stack.Navigator screenOptions={defaultScreenOptionStack}>
							<Stack.Screen name={'Home'} component={HomeScreen} options={{ headerShown: false }} />
							<Stack.Screen name={'Signup'} component={Signup} options={{ headerTitle: 'Create account' }} />
							<Stack.Screen name={'Login'} component={Login} options={{ headerTitle: 'Log in' }} />
							<Stack.Screen name={'SignupComplete'} component={SignupComplete} options={{ headerShown: false }} />
						</Stack.Navigator>
					)}
				</NavigationContainer>
			</UserContext.Provider>
		</AuthContext.Provider>
	)
}
export default Router
