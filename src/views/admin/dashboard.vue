<template>
  <!-- Begin:Page -->
  <div id="kt_app_page" class="app-page flex-column flex-column-fluid">
    <!-- Begin:Header -->
    <dashboard-header />
    <!-- End:Header -->
    <!-- Begin:Wrapper -->
    <dashboard-wrapper />
    <!-- End:Wrapper -->
  </div>
  <!-- End:Page -->
</template>

<script>
import {defineComponent, onMounted} from "vue"
import DashboardHeader from "../../components/admin/dashboard/header/index.vue"
import DashboardWrapper from "../../components/admin/dashboard/wrapper.vue"

export default defineComponent({
  name: "my-dashboard",
  components: {
    DashboardHeader,
    DashboardWrapper
  },
  setup() {
    onMounted(() => {
      document.body.classList.remove("app-blank")
      document.body.classList.add("app-default")
      KTUtil.onDOMContentLoaded(() => {
        KTComponents.init()
        KTThemeMode.init()
        KTThemeModeUser.init()
        KTAppSidebar.init()
      })
    })
  }
})
</script>
