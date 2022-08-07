declare module '@env' {
	export const BACKEND_SERVICE_URL: string
	export const GOOGLE_CLIENT_ID: string
	export const FACEBOOK_CLIENT_ID: string
	export const BACKEND_SERVICE_PORT: string
	export const BACKEND_SERVICE_API_ROUTE: string
}
/**
 *  this file contain type declaration for the .env file, Typescript fix.
 *  to make this .env file works  you should declare inside babal.config.js those lines under plugin
 *  [
 * 	'module:react-native-dotenv',
 * 	{
 * 		moduleName: 'react-native-dotenv',
 * 	},
 * ],
 * then declare your variables under .env in root directory API_KEY="URL"
 */
