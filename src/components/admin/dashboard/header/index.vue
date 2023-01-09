<template>
  <div id="kt_app_header" class="app-header">
    <!-- Begin:Header Container -->
    <div
      id="kt_app_header_container"
      class="app-container container-fluid d-flex align-items-stretch justify-content-between">
      <!-- Begin:Sidebar Mobile Toggle -->
      <header-sidebar-mobile-toggle />
      <!-- End:Sidebar Mobile Toggle -->
      <!-- Begin:Mobile Logo -->
      <div class="d-flex align-items-center flex-grow-1 flex-lg-grow-0">
        <a href="#" class="d-lg-none">5-PAL Company</a>
      </div>
      <!-- End:Mobile Logo -->
      <!-- Begin:Header Wrapper -->
      <div
        id="kt_app_header_wrapper"
        class="d-flex align-items-stretch justify-content-between flex-lg-grow-1">
        <!-- Begin:Menu -->
        <header-menu />
        <!-- End:Menu -->
        <!-- Begin:Navbar -->
        <header-navbar />
        <!-- End:Navbar -->
      </div>
      <!-- End:Header Wrapper -->
    </div>
    <!-- End:Header Container -->
  </div>
</template>

<script>
import {defineComponent} from "vue"
import HeaderMenu from "./menu/index.vue"
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
