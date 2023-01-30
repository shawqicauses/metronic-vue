<!-- Done Reviewing: 30/01/2023 -->
<template>
  <sign-in-header />
  <div class="py-20">
    <sign-in-form />
  </div>
  <form-footer />
</template>

<script>
import {defineComponent, onMounted} from "vue"
import SignInForm from "../../components/admin/sign-in/form.vue"
import SignInHeader from "../../components/admin/sign-in/header.vue"
import FormFooter from "../../components/admin/uis/form/footer.vue"

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
