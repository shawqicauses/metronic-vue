<!-- Done Reviewing: 30/01/2023 -->
<template>
  <div class="d-flex flex-stack py-2">
    <div class="me-2"></div>
    <div class="m-0">
      <span class="text-gray-400 fw-bold fs-5 me-2"> Not a member yet? </span>
      <router-link to="/auth/sign-up" class="link-primary fw-bold fs-5"> Sign Up </router-link>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line
import {defineComponent} from "vue"
export default defineComponent({name: "sign-in-header"})
</script>
