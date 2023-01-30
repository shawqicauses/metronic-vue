<!-- Done Reviewing: 29/01/2023 -->
<template>
  <div class="app-navbar flex-shrink-0">
    <navbar-user-menu />
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
