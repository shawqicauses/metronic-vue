<!-- Done Reviewing -->
<template>
  <form
    id="kt_password_reset_form"
    ref="form"
    action="#"
    class="form w-100"
    @submit.prevent="handleFormSubmission">
    <div class="text-start mb-10">
      <h1 class="text-dark mb-3 fs-3x" data-kt-translate="password-reset-title">
        Forgot Password?
      </h1>
      <div class="text-gray-400 fw-semibold fs-6" data-kt-translate="password-reset-desc">
        Enter your email to reset your password
      </div>
    </div>
    <div class="fv-row mb-8">
      <form-input
        id="email"
        v-model:formInputValue="user.email"
        label="Email"
        type="email"
        name="email"
        placeholder="Email"
        autocomplete="off" />
    </div>
    <div class="d-flex flex-stack">
      <div class="m-0">
        <button
          id="kt_password_reset_submit"
          ref="formButton"
          type="submit"
          class="btn btn-primary me-2">
          <span class="indicator-label">Submit</span>
          <span class="indicator-progress">
            Please wait ... <span class="spinner-border spinner-border-sm align-middle ms-2"></span>
          </span>
        </button>
        <router-link to="/auth/sign-in" class="btn btn-lg btn-light-primary fw-bold">
          Cancel
        </router-link>
      </div>
    </div>
  </form>
</template>

<script>
import {defineComponent, onMounted, ref} from "vue"
import {useRouter} from "vue-router"
import {useStore} from "vuex"
import FormInput from "../uis/form/input.vue"

export default defineComponent({
  name: "forgot-password-form",
  components: {FormInput},
  setup() {
    const router = useRouter()
    const store = useStore()
    const user = {email: null}
    const elements = {form: ref(null), formButton: ref(null), formError: ref(null)}
    let validator

    const handleFormValidation = function handleFormValidation() {
      validator = FormValidation.formValidation(elements.form.value, {
        fields: {
          email: {
            validators: {
              notEmpty: {message: "Email is required"},
              regexp: {
                regexp: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "The entered email is not a valid email address"
              }
            }
          }
        },
        plugins: {
          trigger: new FormValidation.plugins.Trigger(),
          bootstrap: new FormValidation.plugins.Bootstrap5({
            rowSelector: ".fv-row",
            eleInvalidClass: "",
            eleValidClass: ""
          })
        }
      })
    }

    const handleFormSubmission = function handleFormSubmission() {
      validator.validate().then((status) => {
        if (status.toLowerCase() === "valid") {
          elements.formButton.value.setAttribute("data-kt-indicator", "on")
          elements.formButton.value.disable = true
          elements.formButton.value.ariaDisabled = true

          store
            .dispatch("forgotPassword", user)
            .then(() => {
              Swal.fire({
                icon: "success",
                text: "We have sent to you an email!",
                confirmButtonText: "Okay. Thank you!",
                buttonsStyling: false,
                customClass: {confirmButton: "btn btn-primary"}
              }).then((result) => {
                if (result.isConfirmed) {
                  router.push({name: "root"})
                }
              })
            })
            .catch((error) => {
              if (error.response.data.message)
                elements.formError.value = error.response.data.message
              else elements.formError.value = error.response.data.error

              Swal.fire({
                icon: "error",
                text: elements.formError.value,
                confirmButtonText: "Okay. Got it!",
                buttonsStyling: false,
                customClass: {confirmButton: "btn btn-danger"}
              })
            })
            .finally(() => {
              elements.formButton.value.removeAttribute("data-kt-indicator")
              elements.formButton.value.disabled = false
              elements.formButton.value.ariaDisabled = false
            })
        } else {
          Swal.fire({
            icon: "error",
            text: "Sorry. Looks like there are some errors detected. Please try again.",
            confirmButtonText: "Okay. Got it!",
            buttonsStyling: false,
            customClass: {confirmButton: "btn btn-danger"}
          })
        }
      })
    }

    onMounted(() => handleFormValidation())
    return {
      user,
      form: elements.form,
      formButton: elements.formButton,
      formError: elements.formError,
      validator,
      handleFormValidation,
      handleFormSubmission
    }
  }
})
</script>
