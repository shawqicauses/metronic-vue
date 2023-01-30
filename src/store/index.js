// Done Reviewing: 30/01/2023
import {shallowRef} from "vue"
import {createStore} from "vuex"
import GroupIcon from "../components/admin/icons/communication/group-icon.vue"
import GlobeIcon from "../components/admin/icons/home/globe-icon.vue"
import axiosClient from "../plugins/axios"

const icons = {
  group: shallowRef(GroupIcon),
  globe: shallowRef(GlobeIcon)
}

const store = createStore({
  state: {
    user: {token: sessionStorage.getItem("TOKEN") || null, data: {}},
    language: sessionStorage.getItem("LANGUAGE") || null,
    languages: JSON.parse(sessionStorage.getItem("LANGUAGES")) || null,
    navigation: JSON.parse(sessionStorage.getItem("NAVIGATION")) || null
  },
  getters: {
    user(state) {
      return state.user
    },
    language(state) {
      return state.language
    },
    languages(state) {
      return state.languages
    },
    navigation(state) {
      return state.navigation
    }
  },
  actions: {
    setLanguage({commit, state}, data) {
      if (typeof data === "string") commit("SET_LANGUAGE", data)
      else {
        const languages = Object.keys(state.languages).map((key) => state.languages[key].shortname)
        const language = languages.find((languagesItem) =>
          data.find((item) =>
            item.split(new RegExp(languagesItem, "gi")).length - 1 > 0 ? languagesItem : null
          )
        )

        commit("SET_LANGUAGE", language)
      }
    },
    async getAPILanguages({commit}) {
      return axiosClient.get("/locales/langs").then((response) => {
        commit("SET_LANGUAGES", response.data.data)
        return response.data.data
      })
    },
    async getAPINavigation({commit}) {
      return axiosClient.get("/navigation").then((response) => {
        response.data.forEach((item) => {
          const [name] = item.icon.split("/")[1].split(".")
          item.icon = icons[name.toLowerCase()]
        })

        commit("SET_NAVIGATION", response.data)
        return response.data
      })
    },
    async signUp({commit}, data) {
      return axiosClient.post("/register", data).then((response) => {
        commit("SET_USER", response.data)
        return response.data
      })
    },
    async signIn({commit}, data) {
      return axiosClient.post("/login", data).then((response) => {
        commit("SET_USER", response.data)
        return response.data
      })
    },
    async signOut({commit}) {
      return axiosClient.post("/logout").then((response) => {
        commit("UN_SET_USER")
        return response
      })
    }
  },
  mutations: {
    SET_USER(state, user) {
      state.user.token = user.token
      state.user.data = user.user
      sessionStorage.setItem("TOKEN", user.token)
    },
    UN_SET_USER(state) {
      state.user.token = null
      state.user.data = {}
      sessionStorage.removeItem("TOKEN")
    },
    SET_LANGUAGE(state, language) {
      state.language = language
      sessionStorage.setItem("LANGUAGE", language)
    },
    SET_LANGUAGES(state, languages) {
      state.languages = languages
      sessionStorage.setItem("LANGUAGES", JSON.stringify(languages))
    },
    SET_NAVIGATION(state, navigation) {
      state.navigation = navigation
      sessionStorage.setItem("NAVIGATION", JSON.stringify(navigation))
    }
  }
})

export default store
