// Done Reviewing: 30/01/2023
import AuthLayout from "@/components/layouts/admin/auth.vue"
import DashboardLayout from "@/components/layouts/admin/dashboard.vue"
import i18n, {getI18nLanguages} from "@/plugins/i18n"
import store from "@/store"
import ConstantsList from "@/views/admin/constants/list.vue"
import ForgotPassword from "@/views/admin/forgot-password.vue"
import LabelsList from "@/views/admin/labels/list.vue"
import LanguagesList from "@/views/admin/languages/list.vue"
import NewPassword from "@/views/admin/new-password.vue"
import SectionAdd from "@/views/admin/sections/add.vue"
import SectionList from "@/views/admin/sections/list.vue"
import SignIn from "@/views/admin/sign-in.vue"
import SignUp from "@/views/admin/sign-up.vue"
import TranslationsList from "@/views/admin/translations/list.vue"
import {createRouter, createWebHistory} from "vue-router"

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
      component: DashboardLayout,
      children: [
        {
          path: "/dashboard/localization/languages",
          name: "languages",
          component: LanguagesList
        },
        {
          path: "/dashboard/localization/labels",
          name: "labels",
          component: LabelsList
        },
        {
          path: "/dashboard/localization/translations",
          name: "translations",
          component: TranslationsList
        },
        {
          path: "/dashboard/constants/:constant",
          name: "translations-list",
          component: ConstantsList
        },
        {
          path: "/dashboard/sections/:section",
          name: "section-list",
          component: SectionList
        },
        {
          path: "/dashboard/sections/:section/add",
          name: "section-add",
          component: SectionAdd
        },
        {
          path: "/dashboard/sections/:section/update/:id",
          name: "section-update",
          component: SectionAdd
        }
      ]
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
        },
        {
          path: "/auth/forgot-password",
          name: "forgot-password",
          component: ForgotPassword
        },
        {
          path: "/auth/new-password/:token",
          name: "new-password",
          component: NewPassword
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
