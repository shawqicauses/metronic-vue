<template>
  <div class="app-sidebar-menu overflow-hidden flex-column-fluid">
    <!-- Begin:Menu Wrapper -->
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
      <!-- Begin:Menu -->
      <div
        id="#kt_app_sidebar_menu"
        data-kt-menu="true"
        data-kt-menu-expand="false"
        class="menu menu-column menu-rounded menu-sub-indention px-3">
        <!-- Begin:Menu Items -->
        <sidebar-menu-item
          v-for="item in navigation"
          :key="item.title"
          :title="item.title"
          :icon="item.icon"
          :children="item.children" />
        <!-- End:Menu Items -->
      </div>
      <!-- End:Menu -->
    </div>
    <!-- End:Menu Wrapper -->
  </div>
</template>

<script>
import {computed, defineComponent, onBeforeMount} from "vue"
import store from "../../../../../store"
import SidebarMenuItem from "./item.vue"

export default defineComponent({
  name: "sidebar-menu",
  components: {SidebarMenuItem},
  setup() {
    const navigation = computed(() => store.state.navigation)
    onBeforeMount(() => {
      navigation.value = store.dispatch("getAPINavigation")
    })

    return {navigation}
  }
})
</script>
