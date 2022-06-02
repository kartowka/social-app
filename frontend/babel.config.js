module.exports = function (api) {
	api.cache(true)
	return {
		presets: ['babel-preset-expo'],
		plugins: [
			[
				'module-resolver',
				{
					root: ['./src'],
					extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json', '.png'],
					alias: {
						'@components': './src/components',
						'@router': './src/router',
						'@screens': './src/screens',
						'@assets': './src/assets',
						'@images': './src/assets/images',
						'@model': './src/model',
						'@constants': './src/constants',
					},
				},
			],
		],
	}
}
