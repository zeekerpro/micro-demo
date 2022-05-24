import microApp from '@micro-zoe/micro-app'

interface AppModelType {
	id: number
	name: string
	url: string
	base: string
}

const generateConfig = async () => {
	const ret = await fetch('http://localhost:4000/apps', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	})

	const apps = (await ret.json()) as Array<AppModelType>
	// TODO: generage apps micro config

	const microConfigs = {
		plugins: {
			modules: {
				[apps[0].name]: [
					{
						loader(code: any) {
							if (process.env.NODE_ENV === 'development') {
								// 这里 /basename/ 需要和子应用vite.config.js中base的配置保持一致
								// const reg = new RegExp(`(from|import)(\s*['"])(\/sites\/app1\/)`, 'g');
								code = code.replace(
									/(from|import)(\s*['"])(\/sites\/app1\/)/g,
									(all: any) => {
										return all.replace(
											'/sites/app1/',
											'http://localhost:3101/sites/app1/'
										)
									}
								)
							}
							return code
						},
					},
				],
				app2: [
					{
						loader(code: any) {
							if (process.env.NODE_ENV === 'development') {
								// 这里 /basename/ 需要和子应用vite.config.js中base的配置保持一致
								code = code.replace(
									/(from|import)(\s*['"])(\/sites\/app2\/)/g,
									(all: any) => {
										return all.replace(
											'/sites/app2/',
											'http://localhost:3102/sites/app2/'
										)
									}
								)
							}
							return code
						},
					},
				],
			},
		},
	}

	return microConfigs
}

export const setupMicro = () => {
	generateConfig().then((microConfig) => {
		microApp.start(microConfig)
	})
}
