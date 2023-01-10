import {createApp} from "vue"
import App from "./App.vue"
import i18n from "./plugins/i18n"
import router from "./router"
import store from "./store"
import ElementPlus from 'element-plus'

const application = createApp(App)
application.use(router)
application.use(store)
application.use(i18n)
application.use(ElementPlus)
application.mount("#kt_app_root")
