<!-- Done Reviewing: 29/01/2023 -->
<template>
  <div id="kt_app_header" class="app-header">
    <div
      id="kt_app_header_container"
      class="app-container container-fluid d-flex align-items-stretch justify-content-between">
      <header-sidebar-mobile-toggle />
      <div class="d-flex align-items-center flex-grow-1 flex-lg-grow-0">
        <router-link to="/" class="d-lg-none">5-PAL Company</router-link>
      </div>
      <div
        id="kt_app_header_wrapper"
        class="d-flex align-items-stretch justify-content-between flex-lg-grow-1">
        <header-menu />
        <header-navbar />
      </div>
    </div>
  </div>
</template>

<script>
import {defineComponent} from "vue"
import HeaderMenu from "./menu.vue"
import HeaderNavbar from "./navbar/index.vue"
import HeaderSidebarMobileToggle from "./sidebar-mobile-toggle.vue"

export default defineComponent({
  name: "dashboard-header",
  components: {
    HeaderSidebarMobileToggle,
    HeaderMenu,
    HeaderNavbar
  }
})
</script>
