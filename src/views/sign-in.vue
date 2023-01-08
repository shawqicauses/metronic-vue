<template>
  <!-- Begin:Header -->
  <sign-in-header />
  <!-- End:Header -->
  <!-- Begin:Body -->
  <div class="py-20">
    <!-- Begin:Form -->
    <sign-in-form />
    <!-- End:Form -->
  </div>
  <!-- End:Body -->
  <!-- Begin:Footer -->
  <form-footer />
  <!-- End:Footer -->
</template>

<script>
import {defineComponent, onMounted} from "vue"
import SignInForm from "../components/sign-in/form.vue"
import SignInHeader from "../components/sign-in/header.vue"
import FormFooter from "../components/uis/form/footer.vue"

export default defineComponent({
  name: "sign-in",
  components: {
    SignInHeader,
    SignInForm,
    FormFooter
  },
  setup() {
    onMounted(() => {
      KTUtil.onDOMContentLoaded(() => {
        KTComponents.init()
        KTThemeMode.init()
        KTThemeModeUser.init()
      })
    })
  }
})
</script>
