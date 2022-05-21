import { createApp } from 'vue'
import App from './App.vue'
import microApp from "@micro-zoe/micro-app";

microApp.start({
  plugins: {
    modules: {
      'app1': [
        {
          loader(code){
            if (process.env.NODE_ENV === 'development') {
              // 这里 /basename/ 需要和子应用vite.config.js中base的配置保持一致
              console.log("app1: ", code)
              code = code.replace(/(from|import)(\s*['"])(\/sites\/app1\/)/g, all => {
                return all.replace('/sites/app1/', 'http://localhost:3001/')
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
                return all.replace('/sites/app2/', 'http://localhost:3002/')
              })
            }
            return code;
          }
        }
      ]
    }
  }
});

createApp(App).mount('#app')
