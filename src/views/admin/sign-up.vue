<!-- Done Reviewing: 30/01/2023 -->
<template>
  <sign-up-header />
  <div class="py-20">
    <sign-up-form />
  </div>
  <form-footer />
</template>

<script>
import {defineComponent, onMounted} from "vue"
import SignUpForm from "../../components/admin/sign-up/form.vue"
import SignUpHeader from "../../components/admin/sign-up/header.vue"
import FormFooter from "../../components/admin/uis/form/footer.vue"

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
