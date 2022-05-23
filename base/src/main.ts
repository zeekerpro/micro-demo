import { createMainboardApp } from "./createMainboardApp";

createMainboardApp().then(async (mainboardApp) => {
  mainboardApp.app.mount('#micro-app');
})
