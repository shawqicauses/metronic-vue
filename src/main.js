import {createApp} from "vue"
import App from "./App.vue"
import i18n from "./plugins/i18n"
import router from "./router"
import store from "./store"

const application = createApp(App)
application.use(router)
application.use(store)
application.use(i18n)
application.mount("#kt_app_root")
