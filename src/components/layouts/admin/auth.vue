<template>
  <!-- Begin:Authentication -->
  <div class="d-flex flex-column flex-lg-row flex-column-fluid">
    <!-- Begin:Logo -->
    <auth-logo />
    <!-- End:Logo -->
    <!-- Begin:Aside -->
    <div class="d-flex flex-column flex-column-fluid flex-center p-10 w-lg-50">
      <!-- Begin:Wrapper -->
      <div class="d-flex justify-content-between flex-column-fluid flex-column w-100 mw-450px">
        <!-- Begin:Router View -->
        <router-view />
        <!-- End:Router View -->
      </div>
      <!-- End:Wrapper -->
    </div>
    <!-- End:Aside -->
    <!-- Begin:Body -->
    <div
      style="background-image: url(../../../../src/assets/media/auth/background.png)"
      class="d-none d-lg-flex flex-lg-row-fluid w-50 bgi-size-cover bgi-position-y-center bgi-position-x-start bgi-no-repeat" />
    <!-- End:Body -->
  </div>
  <!-- End:Authentication -->
</template>

<script>
import {defineComponent, onMounted} from "vue"
import AuthLogo from "../../admin/auth/logo.vue"

export default defineComponent({
  name: "my-auth",
  components: {AuthLogo},
  setup() {
    onMounted(() => {
      document.body.classList.remove("app-default")
      document.body.classList.add("app-blank")
    })
  }
})
</script>
