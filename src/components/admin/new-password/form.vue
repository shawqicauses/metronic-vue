<!-- Done Reviewing -->
<template>
  <form
    id="kt_new_password_form"
    ref="form"
    action="#"
    class="form w-100"
    @submit.prevent="handleFormSubmission">
    <div class="text-start mb-10">
      <h1 class="text-dark mb-3 fs-3x" data-kt-translate="password-reset-title">
        Setup New Password
      </h1>
      <div class="text-gray-400 fw-semibold fs-6" data-kt-translate="password-reset-desc">
        Have you already reset your password?
      </div>
    </div>
    <div class="fv-row mb-10">
      <form-input
        id="email"
        v-model:formInputValue="user.email"
        label="Email"
        type="email"
        name="email"
        placeholder="Email"
        autocomplete="off" />
    </div>
    <div ref="formPasswordMeter" data-kt-password-meter="true" class="fv-row mb-10">
      <div class="mb-1">
        <div class="position-relative mb-3">
          <form-input
            id="password"
            ref="formPassword"
            v-model:formInputValue="user.password"
            label="Password"
            type="password"
            name="password"
            placeholder="Password"
            autocomplete="off"
            @handle-form-password-input="handleFormPasswordInput" />
          <span
            data-kt-password-meter-control="visibility"
            class="btn btn-sm btn-icon position-absolute translate-middle top-50 end-0 me-n2">
            <i class="bi bi-eye-slash fs-2"></i>
            <i class="bi bi-eye fs-2 d-none"></i>
          </span>
        </div>
        <div data-kt-password-meter-control="highlight" class="d-flex align-items-center mb-3">
          <div class="flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2" />
          <div class="flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2" />
          <div class="flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2" />
          <div class="flex-grow-1 bg-secondary bg-active-success rounded h-5px" />
        </div>
      </div>
      <div data-kt-translate="sign-up-hint" class="text-muted">
        Use 8 or more characters with a mix of letters, numbers and symbols.
      </div>
    </div>
    <div class="fv-row mb-10">
      <form-input
        id="confirm-password"
        v-model:formInputValue="user.passwordConfirmation"
        label="Confirm Password"
        type="password"
        name="confirm-password"
        placeholder="Confirm Password"
        autocomplete="off" />
    </div>
    <form-actions ref="formButton" button-id="kt_new_password_submit" />
  </form>
</template>

<script>
import {defineComponent, onMounted, ref} from "vue"
import {useRoute, useRouter} from "vue-router"
import {useStore} from "vuex"
import FormActions from "../uis/form/actions.vue"
import FormInput from "../uis/form/input.vue"

export default defineComponent({
  name: "new-password-form",
  components: {FormInput, FormActions},
  setup() {
    const router = useRouter()
    const route = useRoute()
    const {token} = route.params
    const store = useStore()
    const user = {
      email: null,
      password: null,
      passwordConfirmation: null
    }

    const elements = {
      form: ref(null),
      formPassword: ref(null),
      formPasswordMeter: ref(null),
      formButton: ref(null),
      formError: ref(null)
    }

    let passwordMeter
    let validator

    const validatePassword = function validatePassword() {
      return passwordMeter.getScore() === 100
    }

    const handleFormValidation = function handleFormValidation() {
      validator = FormValidation.formValidation(elements.form.value, {
        fields: {
          "password": {
            validators: {
              notEmpty: {message: "The password is required"},
              callback: {
                message: "Please enter a valid password",
                callback(input) {
                  if (input.value.length > 0) {
                    return validatePassword()
                  }
                }
              }
            }
          },
          "confirm-password": {
            validators: {
              notEmpty: {message: "The password confirmation is required"},
              identical: {
                message: "The password and its confirmation are not same",
                compare() {
                  return elements.formPassword.value.formInput.value
                }
              }
            }
          }
        },
        plugins: {
          trigger: new FormValidation.plugins.Trigger({
            event: {password: false}
          }),
          bootstrap: new FormValidation.plugins.Bootstrap5({
            rowSelector: ".fv-row",
            eleInvalidClass: "",
            eleValidClass: ""
          })
        }
      })
    }

    const handleFormSubmission = function handleFormSubmission() {
      validator.revalidateField("password")
      validator.validate().then((status) => {
        if (status.toLowerCase() === "valid") {
          elements.formButton.value.formButton.setAttribute("data-kt-indicator", "on")
          elements.formButton.value.formButton.disable = true
          elements.formButton.value.formButton.ariaDisabled = true

          store
            .dispatch("resetPassword", {
              token,
              email: user.email,
              password: user.password,
              password_confirmation: user.passwordConfirmation
            })
            .then(() => {
              Swal.fire({
                icon: "success",
                text: "You have successfully reset your password!",
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
                elements.formButton.value = error.response.data.message
              else elements.formButton.value = error.response.data.error

              Swal.fire({
                icon: "error",
                text: elements.formButton.value,
                confirmButtonText: "Okay. Got it!",
                buttonsStyling: false,
                customClass: {confirmButton: "btn btn-danger"}
              })
            })
            .finally(() => {
              elements.formButton.value.formButton.removeAttribute("data-kt-indicator")
              elements.formButton.value.formButton.disabled = false
              elements.formButton.value.formButton.ariaDisabled = false
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

    const handleFormPasswordInput = function handleFormPasswordInput(value) {
      if (value.length > 0) validator.updateFieldStatus("password", "NotValidated")
    }

    onMounted(() => {
      KTPasswordMeter.createInstances("[data-kt-password-meter]")
      passwordMeter = KTPasswordMeter.getInstance(elements.formPasswordMeter.value)
      handleFormValidation()
    })

    return {
      user,
      form: elements.form,
      formPassword: elements.formPassword,
      formPasswordMeter: elements.formPasswordMeter,
      formButton: elements.formButton,
      formError: elements.formError,
      passwordMeter,
      validator,
      handleFormValidation,
      handleFormSubmission,
      handleFormPasswordInput
    }
  }
})
</script>
