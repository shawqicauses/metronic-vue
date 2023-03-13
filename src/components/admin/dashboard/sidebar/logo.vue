<!-- Done Reviewing: 29/01/2023 -->
<template>
  <div id="kt_app_sidebar_logo" class="app-sidebar-logo px-6">
    <router-link to="/">
      <img
        :src="CDN + '1/assets/media/logos/default.svg'"
        alt="Default Sidebar Logo"
        class="h-25px app-sidebar-logo-default theme-light-show" />
      <img
        :src="CDN + '1/assets/media/logos/default-dark.svg'"
        alt="Dark Sidebar Logo"
        class="h-25px app-sidebar-logo-default theme-dark-show" />
      <img
        :src="CDN + '1/assets/media/logos/default-small.svg'"
        alt="Small Sidebar Logo"
        class="h-20px app-sidebar-logo-minimize" />
    </router-link>
    <sidebar-toggle />
  </div>
</template>

<script>
import {defineComponent} from "vue"
import SidebarToggle from "./toggle.vue"

export default defineComponent({
  name: "sidebar-logo",
  components: {SidebarToggle},
  setup() {
    const CDN = "https://preview.keenthemes.com/metronic8/demo"
    return {CDN}
  }
})
</script>
