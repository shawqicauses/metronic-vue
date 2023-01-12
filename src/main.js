import ElementPlus from "element-plus"
import "element-plus/theme-chalk/index.css"
import "sweetalert2/dist/sweetalert2.css"
import {createApp} from "vue"
import App from "./App.vue"
import Router from "./Router"
import I18N from "./plugins/i18n"
import Store from "./store"

const application = createApp(App)
application.use(Router)
application.use(Store)
application.use(I18N)
application.use(ElementPlus)
application.mount("#kt_app_root")
