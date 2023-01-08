import {createRouter, createWebHistory} from "vue-router"
import i18n, {getI18nLanguages} from "../plugins/i18n"
import store from "../store"
import AuthLayout from "../views/auth.vue"
import MyDashboard from "../views/dashboard.vue"
import SignIn from "../views/sign-in.vue"
import SignUp from "../views/sign-up.vue"

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "root",
      meta: {protected: true},
      redirect: {name: "dashboard"}
    },
    {
      path: "/dashboard",
      name: "dashboard",
      meta: {protected: true},
      component: MyDashboard
    },
    {
      path: "/auth",
      name: "auth",
      meta: {protected: false},
      redirect: {name: "sign-in"},
      component: AuthLayout,
      children: [
        {
          path: "/auth/sign-in",
          name: "sign-in",
          component: SignIn
        },
        {
          path: "/auth/sign-up",
          name: "sign-up",
          component: SignUp
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (store.state.user.token) {
    if (to.path.split("/")[1] === "auth") next({name: "root"})
    else next()
  } else if (to.meta.protected) next({name: "auth"})
  else next()
})

router.beforeEach((to, from, next) => {
  let {languages} = store.state
  if (!languages) languages = store.dispatch("getAPILanguages")

  Promise.resolve(languages).then(() => {
    if (store.state.language) {
      if (store.state.language !== i18n.locale) {
        getI18nLanguages(store.state.language)
        next()
      } else next()
    } else {
      store.dispatch("setLanguage", navigator.languages).then(() => {
        getI18nLanguages(store.state.language)
        next()
      })
    }
  })
})

export default router
