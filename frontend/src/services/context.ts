import { createContext } from 'react'
import { AuthContextProps, UserContextType, UserDataProps } from 'types'
export const AuthContext = createContext<any>({
	signIn: (user: UserDataProps | null | undefined) => {},
	signUp: () => {},
	logOut: () => {},
})
export const UserContext = createContext<any>(null)
