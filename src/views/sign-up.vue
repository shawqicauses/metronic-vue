<template>
  <!-- Begin:Header -->
  <sign-up-header />
  <!-- End:Header -->
  <!-- Begin:Body -->
  <div class="py-20">
    <!-- Begin:Form -->
    <sign-up-form />
    <!-- End:Form -->
  </div>
  <!-- End:Body -->
  <!-- Begin:Footer -->
  <form-footer />
  <!-- End:Footer -->
</template>

<script>
import {defineComponent, onMounted} from "vue"
import SignUpForm from "../components/sign-up/form.vue"
import SignUpHeader from "../components/sign-up/header.vue"
import FormFooter from "../components/uis/form/footer.vue"

export default defineComponent({
  name: "sign-up",
  components: {
    SignUpHeader,
    SignUpForm,
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
