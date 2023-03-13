<!-- Done Reviewing -->
<template>
  <sign-up-header />
  <div class="py-20">
    <forgot-password-form />
  </div>
  <form-footer />
</template>

<script>
import {defineComponent, onMounted} from "vue"
import ForgotPasswordForm from "../../components/admin/forgot-password/form.vue"
import SignUpHeader from "../../components/admin/sign-up/header.vue"
import FormFooter from "../../components/admin/uis/form/footer.vue"

export default defineComponent({
  name: "forgot-password",
  components: {
    SignUpHeader,
    ForgotPasswordForm,
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
