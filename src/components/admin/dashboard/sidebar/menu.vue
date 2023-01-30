<!-- Done Reviewing: 29/01/2023 -->
<template>
  <div class="app-sidebar-menu overflow-hidden flex-column-fluid">
    <div
      id="kt_app_sidebar_menu_wrapper"
      data-kt-scroll="true"
      data-kt-scroll-wrappers="#kt_app_sidebar_menu"
      data-kt-scroll-dependencies="#kt_app_sidebar_logo, #kt_app_sidebar_footer"
      data-kt-scroll-activate="true"
      data-kt-scroll-height="auto"
      data-kt-scroll-offset="5px"
      data-kt-scroll-save-state="true"
      class="app-sidebar-wrapper hover-scroll-overlay-y my-5">
      <div
        id="#kt_app_sidebar_menu"
        data-kt-menu="true"
        data-kt-menu-expand="false"
        class="menu menu-column menu-rounded menu-sub-indention px-3">
        <sidebar-menu-item
          v-for="item in navigation"
          :key="item.title"
          :title="item.title"
          :icon="item.icon"
          :children="item.children" />
      </div>
    </div>
  </div>
</template>

<script>
import store from "@/store"
import {computed, defineComponent, onBeforeMount} from "vue"
import SidebarMenuItem from "./menu-item.vue"

export default defineComponent({
  name: "sidebar-menu",
  components: {SidebarMenuItem},
  setup() {
    const navigation = computed(() => store.state.navigation)
    onBeforeMount(() => {
      store.dispatch("getAPINavigation")
    })

    return {navigation}
  }
})
</script>
