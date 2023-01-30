<!-- Done Reviewing: 30/01/2023 -->
<template>
  <div id="kt_app_page" class="app-page flex-column flex-column-fluid">
    <dashboard-header />
    <dashboard-wrapper />
  </div>
</template>

<script>
import {defineComponent, onMounted} from "vue"
import DashboardHeader from "../../admin/dashboard/header/index.vue"
import DashboardWrapper from "../../admin/dashboard/wrapper.vue"

export default defineComponent({
  name: "dashboard-layout",
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
        KTMenu.init()
      })
    })
  }
})
</script>
