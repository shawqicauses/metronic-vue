<template>
  <div class="m-0">
    <!-- Begin:Toggle -->
    <button
      type="button"
      data-kt-menu-trigger="click"
      data-kt-menu-placement="bottom-start"
      data-kt-menu-offset="0px, 0px"
      class="btn btn-flex btn-link rotate">
      <img
        :src="`../../../../src/assets/media/flags/${language.icon}`"
        alt="United States Icon"
        data-kt-element="current-lang-flag"
        class="w-25px h-25px rounded-circle me-3" />
      <span data-kt-element="current-lang-name" class="me-2">{{ language.name }}</span>
      <!-- Begin:SVG Icon -->
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
      <!-- End:SVG Icon -->
    </button>
    <!-- End:Toggle -->
    <!-- Begin:Menu -->
    <div
      id="kt_auth_lang_menu"
      data-kt-menu="true"
      class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg-light-primary fw-semibold w-200px py-4">
      <!-- Begin:Menu Items -->
      <languages-menu-item
        v-for="languageItem in languages"
        :key="languageItem.name"
        :name="languageItem.name"
        :icon="languageItem.icon"
        :link="languageItem.link"
        @set-language="setLanguage(languageItem[['short', 'name'].join('')])" />
      <!-- End:Menu Items -->
    </div>
    <!-- End:Menu -->
  </div>
</template>

<script>
import {computed, defineComponent, onBeforeMount, ref} from "vue"
import {useStore} from "vuex"
import {getI18nLanguages} from "../../../plugins/i18n"
import LanguagesMenuItem from "../languages-menu-item.vue"

export default defineComponent({
  name: "form-footer",
  components: {LanguagesMenuItem},
  setup() {
    const store = useStore()
    const language = ref(null)
    const languages = computed(() => store.state.languages)

    const getLanguage = function getLanguage() {
      return languages.value.find(
        (languagesItem) =>
          languagesItem[["short", "name"].join("")] === computed(() => store.state.language).value
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
