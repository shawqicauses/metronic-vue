<!-- Done Reviewing: 29/01/2023 -->
<template>
  <div id="kt_app_wrapper" class="app-wrapper flex-column flex-row-fluid">
    <sidebar />
    <div id="kt_app_main" class="app-main flex-column flex-row-fluid">
      <div class="d-flex flex-column flex-column-fluid">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import {defineComponent} from "vue"
// eslint-disable-next-line
import Sidebar from "./sidebar/index.vue"
export default defineComponent({name: "dashboard-wrapper", components: {Sidebar}})
</script>
