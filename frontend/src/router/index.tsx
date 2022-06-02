import { FC } from 'react'
import HomeScreen from '@screens/home/HomeScreen'

const Router: FC = () => {
	const onPress = () => {
		console.log('button clicked parent')
	}
	return <HomeScreen onClick={onPress} />
}

export default Router
