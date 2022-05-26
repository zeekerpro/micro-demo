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

	const modules = {};

	apps.forEach(app => {
		const loader = (code: any) => {
			if (process.env.NODE_ENV === 'development') {
				// 这里 /basename/ 需要和子应用vite.config.js中base的配置保持一致
				let basename = app.base;
				const reg = new RegExp(`(from|import)(\\s*['"])(${basename})`, 'g');
				code = code.replace(
					reg,
					(all: any) => {
						return all.replace(
							basename,
							`${new URL(basename, app.url)}`
						)
					}
				)
			}
			return code;
		};
		Reflect.set(modules, app.name, [ { loader } ]);
	})

	const microConfigs = {
		plugins: {
			modules
		},
	}

	return microConfigs
}

export const setupMicro = () => {
	generateConfig().then((microConfig) => {
		microApp.start(microConfig)
	})
}
