import { createApp } from 'vue'
import App from "./App.vue";
import { setupMicro } from "./vendors/micro";

export async function createMainboardApp() {
  const app = createApp(App);

  const mainboard = {
    app
  }

  setupMicro();

  return mainboard;
}

