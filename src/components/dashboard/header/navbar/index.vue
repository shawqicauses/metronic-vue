<template>
  <div class="app-navbar flex-shrink-0">
    <!-- Begin:User Menu -->
    <navbar-user-menu />
    <!-- End:User Menu -->
  </div>
</template>

<script>
import {defineComponent} from "vue"
import NavbarUserMenu from "./user-menu.vue"

export default defineComponent({
  name: "header-navbar",
  components: {NavbarUserMenu}
})
</script>
