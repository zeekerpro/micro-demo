import microApp from "@micro-zoe/micro-app";

const microConfigs = {
	plugins: {
		modules: {
			'app1': [
				{
					loader(code){
						if (process.env.NODE_ENV === 'development') {
							// 这里 /basename/ 需要和子应用vite.config.js中base的配置保持一致
							code = code.replace(/(from|import)(\s*['"])(\/sites\/app1\/)/g, all => {
								return all.replace('/sites/app1/', 'http://localhost:3101/')
							})
						}
						return code;
					}
				}
			],
			'app2': [
				{
					loader(code){
						if (process.env.NODE_ENV === 'development') {
							// 这里 /basename/ 需要和子应用vite.config.js中base的配置保持一致
							code = code.replace(/(from|import)(\s*['"])(\/sites\/app2\/)/g, all => {
								return all.replace('/sites/app2/', 'http://localhost:3102/')
							})
						}
						return code;
					}
				}
			]
		}
	}
}

export const setupMicro = () => {
	microApp.start(microConfigs);
}
