<!-- Done Reviewing: 30/01/2023 -->
<template>
  <div class="m-0">
    <button
      type="button"
      data-kt-menu-trigger="click"
      data-kt-menu-placement="bottom-start"
      data-kt-menu-offset="0px, 0px"
      class="btn btn-flex btn-link rotate">
      <img
        :src="language.icon"
        :alt="`${language.name} Icon`"
        data-kt-element="current-lang-flag"
        class="w-25px h-25px rounded-circle me-3" />
      <span data-kt-element="current-lang-name" class="me-2">{{
        language.name.charAt(0).toUpperCase() + language.name.slice(1)
      }}</span>
      <span class="svg-icon svg-icon-3 svg-icon-muted rotate-180 m-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          fill="none">
          <path
            d="M11.4343 12.7344L7.25 8.55005C6.83579 8.13583 6.16421 8.13584 5.75 8.55005C5.33579 8.96426 5.33579 9.63583 5.75 10.05L11.2929 15.5929C11.6834 15.9835 12.3166 15.9835 12.7071 15.5929L18.25 10.05C18.6642 9.63584 18.6642 8.96426 18.25 8.55005C17.8358 8.13584 17.1642 8.13584 16.75 8.55005L12.5657 12.7344C12.2533 13.0468 11.7467 13.0468 11.4343 12.7344Z"
            fill="currentColor" />
        </svg>
      </span>
    </button>
    <div
      id="kt_auth_lang_menu"
      data-kt-menu="true"
      class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg-light-primary fw-semibold w-200px py-4">
      <languages-menu-item
        v-for="item in languages"
        :key="item.name"
        :name="item.name.charAt(0).toUpperCase() + item.name.slice(1)"
        :icon="item.icon"
        :link="item.link"
        @set-language="setLanguage(item.shortname)" />
    </div>
  </div>
</template>

<script>
import {computed, defineComponent, onBeforeMount, ref} from "vue"
import {useStore} from "vuex"
import {getI18nLanguages} from "../../../../plugins/i18n"
import LanguagesMenuItem from "./languages-menu-item.vue"

export default defineComponent({
  name: "form-footer",
  components: {LanguagesMenuItem},
  setup() {
    const store = useStore()
    const language = ref(null)
    const languages = computed(() => store.state.languages)

    const getLanguage = function getLanguage() {
      return languages.value.find(
        (item) => item.shortname === computed(() => store.state.language).value
      )
    }

    const setLanguage = function setLanguage(languageSelected) {
      store.dispatch("setLanguage", languageSelected).then(() => {
        getI18nLanguages(languageSelected)
        language.value = getLanguage()
      })
    }

    onBeforeMount(() => {
      language.value = getLanguage()
    })

    return {language, languages, setLanguage}
  }
})
</script>
