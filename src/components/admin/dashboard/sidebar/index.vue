<template>
  <div
    id="kt_app_sidebar"
    data-kt-drawer="true"
    data-kt-drawer-name="app-sidebar"
    data-kt-drawer-toggle="#kt_app_sidebar_mobile_toggle"
    data-kt-drawer-activate="{default: true, lg: false}"
    data-kt-drawer-width="225px"
    data-kt-drawer-direction="start"
    data-kt-drawer-overlay="true"
    class="app-sidebar flex-column">
    <sidebar-logo />
    <sidebar-menu />
  </div>
</template>

<script>
import {defineComponent} from "vue"
import SidebarLogo from "./logo.vue"
import SidebarMenu from "./menu.vue"

export default defineComponent({
  name: "dashboard-sidebar",
  components: {SidebarLogo, SidebarMenu}
})
</script>
