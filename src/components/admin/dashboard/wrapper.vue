<template>
  <div id="kt_app_wrapper" class="app-wrapper flex-column flex-row-fluid">
    <!-- Begin:Sidebar -->
    <div
      id="kt_app_sidebar"
      class="app-sidebar flex-column"
      data-kt-drawer="true"
      data-kt-drawer-name="app-sidebar"
      data-kt-drawer-toggle="#kt_app_sidebar_mobile_toggle"
      data-kt-drawer-activate="{default: true, lg: false}"
      data-kt-drawer-width="225px"
      data-kt-drawer-direction="start"
      data-kt-drawer-overlay="true">
      <!-- Begin:Logo -->
      <sidebar-logo />
      <!-- End:Logo -->
      <!-- Begin:Sidebar Menu -->
      <sidebar-menu />
      <!-- End:Sidebar Menu -->
    </div>
    <!-- End:Sidebar -->
    <!-- Begin:Main -->
    <div id="kt_app_main" class="app-main flex-column flex-row-fluid">
      <!-- Begin:Content Wrapper -->
      <div class="d-flex flex-column flex-column-fluid">
        <router-view></router-view>
      </div>
      <!-- End:Content Wrapper -->
    </div>
    <!-- End:Main -->
  </div>
</template>

<script>
import {defineComponent} from "vue"
import SidebarLogo from "./sidebar/logo.vue"
import SidebarMenu from "./sidebar/menu/index.vue"

export default defineComponent({
  name: "dashboard-wrapper",
  components: {SidebarLogo, SidebarMenu}
})
</script>
