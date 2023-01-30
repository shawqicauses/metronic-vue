<!-- Done Reviewing: 29/01/2023 -->
<template>
  <div
    data-kt-menu-trigger="{default: 'click', lg: 'hover'}"
    data-kt-menu-placement="left-start"
    data-kt-menu-offset="-15px, 0"
    class="menu-item px-5">
    <router-link to="#" class="menu-link px-5">
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
    </router-link>
    <div class="menu-sub menu-sub-dropdown w-175px py-4">
      <div v-for="item in languages" :key="item.name" class="menu-item px-3">
        <router-link
          to="#"
          class="menu-link d-flex px-5"
          :class="{active: language.name === item.name}"
          @click.prevent="setLanguage(item.shortname)">
          <span class="symbol symbol-20px me-4">
            <img
              :src="`../../../../../../src/assets/media/flags/${item.icon}`"
              :alt="`${item.name} Icon`"
              class="rounded-1" />
          </span>
          {{ item.name }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import {getI18nLanguages} from "@/plugins/i18n"
import {computed, defineComponent, onBeforeMount, ref} from "vue"
import {useStore} from "vuex"

export default defineComponent({
  name: "navbar-languages-menu",
  setup() {
    const store = useStore()
    const language = ref(null)
    const languages = computed(() => store.state.languages)

    const getLanguage = function getLanguage() {
      const cb = (item) => item.shortname === computed(() => store.state.language).value
      return languages.value.find(cb)
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
