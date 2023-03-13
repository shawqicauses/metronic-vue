<!-- Done Reviewing: 29/01/2023 -->
<template>
  <div
    data-kt-menu-trigger="click"
    class="menu-item menu-accordion"
    :class="{'hover show': children.length > 0}">
    <span class="menu-link">
      <span class="menu-icon">
        <span class="svg-icon svg-icon-2">
          <component :is="icon" />
        </span>
      </span>
      <span class="menu-title">{{ t(title) }}</span>
      <span v-if="children.length > 0" class="menu-arrow"></span>
    </span>
    <div v-if="children.length > 0" class="menu-sub menu-sub-accordion">
      <div v-for="child in children" :key="child.title" class="menu-item">
        <router-link :to="`/dashboard/${child.link.replaceAll('.', '/')}`" class="menu-link">
          <span class="menu-bullet">
            <span class="bullet bullet-dot"></span>
          </span>
          <span class="menu-title">{{ t(child.title) }}</span>
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
