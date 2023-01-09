<template>
  <div id="kt_app_sidebar_logo" class="app-sidebar-logo px-6">
    <!-- Begin:Logo Image -->
    <a href="#">
      <img
        src="../../../../../src/assets/media/logos/default.svg"
        alt="Default Sidebar Logo"
        class="h-25px app-sidebar-logo-default theme-light-show" />
      <img
        src="../../../../../src/assets/media/logos/default-dark.svg"
        alt="Dark Sidebar Logo"
        class="h-25px app-sidebar-logo-default theme-dark-show" />
      <img
        src="../../../../../src/assets/media/logos/default-small.svg"
        alt="Small Sidebar Logo"
        class="h-20px app-sidebar-logo-minimize" />
    </a>
    <!-- End:Logo Image -->
    <!-- Start:Sidebar Toggle -->
    <sidebar-toggle />
    <!-- End:Sidebar Toggle -->
  </div>
</template>

<script>
import {defineComponent} from "vue"
import SidebarToggle from "./toggle.vue"

export default defineComponent({
  name: "sidebar-logo",
  components: {SidebarToggle}
})
</script>
