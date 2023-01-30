<!-- Done Reviewing: 30/01/2023 -->
<template>
  <div class="d-flex flex-column flex-lg-row flex-column-fluid">
    <auth-logo />
    <div class="d-flex flex-column flex-column-fluid flex-center p-10 w-lg-50">
      <div class="d-flex justify-content-between flex-column-fluid flex-column w-100 mw-450px">
        <router-view />
      </div>
    </div>
    <div
      class="d-none d-lg-flex flex-lg-row-fluid w-50 bgi-size-cover bgi-position-y-center bgi-position-x-start bgi-no-repeat"
      style="background-image: url(../../../../src/assets/media/auth/background.png)" />
  </div>
</template>

<script>
import {defineComponent, onMounted} from "vue"
import AuthLogo from "../../admin/auth/logo.vue"

export default defineComponent({
  name: "auth-layout",
  components: {AuthLogo},
  setup() {
    onMounted(() => {
      document.body.classList.remove("app-default")
      document.body.classList.add("app-blank")
    })
  }
})
</script>
