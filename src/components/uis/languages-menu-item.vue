<template>
  <div class="menu-item px-3" @click="setLanguage" @keypress="setLanguage">
    <a :href="link" :data-kt-lang="name" class="menu-link d-flex px-5">
      <span class="symbol symbol-20px me-4">
        <img
          :src="`../../../src/assets/media/flags/${icon}`"
          :alt="`${name} Icon`"
          data-kt-element="lang-flag"
          class="rounded-1" />
      </span>
      <span data-kt-element="lang-name">{{ name }}</span>
    </a>
  </div>
</template>

<script>
import {defineComponent} from "vue"

export default defineComponent({
  name: "languages-menu-item",
  props: {
    name: {type: String, required: true},
    icon: {type: String, required: true},
    link: {type: String, required: true}
  },
  emits: ["setLanguage"],
  setup(props, {emit}) {
    const setLanguage = function setLanguage() {
      emit("setLanguage")
    }

    return {setLanguage}
  }
})
</script>
