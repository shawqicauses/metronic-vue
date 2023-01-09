<template>
  <div
    data-kt-menu-trigger="{default: 'click', lg: 'hover'}"
    data-kt-menu-placement="left-start"
    data-kt-menu-offset="-15px, 0"
    class="menu-item px-5">
    <a href="#" class="menu-link px-5">
      <span class="menu-title position-relative">
        Language
        <span
          class="fs-8 rounded bg-light px-3 py-2 position-absolute translate-middle-y top-50 end-0">
          {{ language.name }}
          <img
            :src="`../../../../../../src/assets/media/flags/${language.icon}`"
            :alt="`${language.name} Icon`"
            class="w-15px h-15px rounded-1 ms-2" />
        </span>
      </span>
    </a>
    <!-- Begin:Menu Sub -->
    <div class="menu-sub menu-sub-dropdown w-175px py-4">
      <!-- Begin:Menu Items -->
      <div v-for="languageItem in languages" :key="languageItem.name" class="menu-item px-3">
        <a
          href="#"
          class="menu-link d-flex px-5"
          :class="{active: language.name === languageItem.name}"
          @click.prevent="setLanguage(languageItem[['short', 'name'].join('')])">
          <span class="symbol symbol-20px me-4">
            <img
              :src="`../../../../../../src/assets/media/flags/${languageItem.icon}`"
              alt=""
              class="rounded-1" />
          </span>
          {{ languageItem.name }}
        </a>
      </div>
      <!-- End:Menu Items -->
    </div>
    <!-- End:Menu Sub -->
  </div>
</template>

<script>
import {computed, defineComponent, onBeforeMount, ref} from "vue"
import {useStore} from "vuex"
import {getI18nLanguages} from "../../../../../plugins/i18n"

export default defineComponent({
  name: "navbar-languages-menu",
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

    return {
      language,
      languages,
      setLanguage
    }
  }
})
</script>
