<!-- Done Reviewing: 29/01/2023 -->
<template>
  <div data-kt-menu-trigger="click" class="menu-item menu-accordion">
    <span class="menu-link">
      <span class="menu-icon">
        <span class="svg-icon svg-icon-2">
          <globe-icon />
        </span>
      </span>
      <span class="menu-title">{{ title }}</span>
      <span class="menu-arrow"></span>
    </span>
    <div v-if="children" class="menu-sub menu-sub-accordion">
      <div v-for="child in children" :key="child.title" class="menu-item">
        <router-link :to="`/dashboard/${child.link.replaceAll('.', '/')}`" class="menu-link">
          <span class="menu-bullet">
            <span class="bullet bullet-dot"></span>
          </span>
          <span class="menu-title">{{ child.title }}</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import {defineComponent} from "vue"
import {useI18n} from "vue-i18n"
import GlobeIcon from "../../icons/home/globe-icon.vue"

export default defineComponent({
  name: "sidebar-menu-item",
  components: {GlobeIcon},
  props: {
    title: {type: String, required: true},
    icon: {type: Object, required: false, default: null},
    children: {type: Array, required: false, default: null}
  },
  setup() {
    const {t} = useI18n({useScope: "global"})
    return {t}
  }
})
</script>
