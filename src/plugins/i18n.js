import messages from "@intlify/unplugin-vue-i18n/messages"
import axios from "axios"
import {createI18n} from "vue-i18n"
import store from "../store"
import axiosClient from "./axios"

const i18n = createI18n({
  legacy: false,
  locale: sessionStorage.getItem("LANGUAGE"),
  fallbackLocale: sessionStorage.getItem("LANGUAGE"),
  messages
})

const i18nLanguages = []

export const setI18nDirections = function setI18nDirections(language, direction) {
  // eslint-disable-next-line
  direction = direction === "rtl" ? direction : ""
  const extension = direction ? `${direction}.css` : `css`

  const HTML_ELEMENT = document.documentElement
  const BODY_ELEMENT = document.body
  const FONT_CSS_ELEMENT = document.getElementById("font-css-element")
  const PLUGINS_CSS_ELEMENT = document.getElementById("plugins-css-element")
  const STYLE_CSS_ELEMENT = document.getElementById("style-css-element")
  const KT_MENU_PLACEMENT_ELEMENTS = document.querySelectorAll("[data-kt-menu-placement]")

  HTML_ELEMENT.removeAttribute("lang")
  HTML_ELEMENT.removeAttribute("dir")
  HTML_ELEMENT.removeAttribute("direction")
  HTML_ELEMENT.setAttribute("lang", language)
  HTML_ELEMENT.setAttribute("dir", direction || "ltr")
  HTML_ELEMENT.setAttribute("direction", direction || "ltr")
  HTML_ELEMENT.style.direction = direction || "ltr"

  const fontCDN = "https://fonts.googleapis.com/css2"
  const fontURL =
    direction === "rtl"
      ? "Tajawal:wght@200;300;400;500;700;800;900"
      : "Inter:wght@100;200;300;400;500;600;700;800;900"

  const fontHREF = [fontCDN, ["family", fontURL].join("=")].join("?")
  BODY_ELEMENT.style.fontFamily = direction === "rtl" ? "Tajawal" : "Inter"
  FONT_CSS_ELEMENT.removeAttribute("href")
  FONT_CSS_ELEMENT.setAttribute("href", fontHREF)

  const cssCDN = "https://preview.keenthemes.com/metronic8/demo1/assets"
  const pluginsCSS = `${cssCDN}/plugins/global/plugins.bundle.${extension}`
  const styleCSS = `${cssCDN}/css/style.bundle.${extension}`
  PLUGINS_CSS_ELEMENT.setAttribute("href", pluginsCSS)
  STYLE_CSS_ELEMENT.setAttribute("href", styleCSS)

  KT_MENU_PLACEMENT_ELEMENTS.forEach((element) => {
    const placement = element.getAttribute("data-kt-menu-placement")
    if (direction === "rtl") {
      element.removeAttribute("data-kt-menu-placement")
      if (placement === "bottom-start") element.setAttribute("data-kt-menu-placement", "bottom-end")
      if (placement === "right-start") element.setAttribute("data-kt-menu-placement", "left-start")
    }

    if (direction === "ltr") {
      element.removeAttribute("data-kt-menu-placement")
      if (placement === "bottom-end") element.setAttribute("data-kt-menu-placement", "bottom-start")
      if (placement === "left-start") element.setAttribute("data-kt-menu-placement", "right-start")
    }
  })
}

export const setI18nLanguages = function setI18nLanguages(language, direction) {
  i18n.locale = language
  i18n.global.locale.value = language
  axios.defaults.headers.common["Accept-Language"] = language
  setI18nDirections(language, direction)
  return language
}

export const getI18nLanguages = function getI18nLanguages(language) {
  let {languages} = store.state
  if (!languages) languages = store.dispatch("getAPILanguages")

  Promise.resolve(languages).then(async () => {
    const {direction} = languages.find((languageItem) => languageItem.shortname === language)
    if (i18nLanguages.includes(language)) {
      if (language !== i18n.locale) setI18nLanguages(language, direction)
      return Promise.resolve()
    }

    return axiosClient(`/locales/lang/${language}`).then((response) => {
      i18nLanguages.push(language)
      i18n.global.setLocaleMessage(language, response.data)
      return setI18nLanguages(language, direction)
    })
  })
}

export default i18n
