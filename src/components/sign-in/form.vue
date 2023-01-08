<template>
  <form
    id="kt_sign_in_form"
    ref="form"
    action="#"
    novalidate="false"
    class="form w-100"
    @submit.prevent="handleFormSubmission">
    <!-- Begin:Body -->
    <div class="card-body">
      <!-- Begin:Heading -->
      <div class="text-start mb-10">
        <!-- Begin:Title -->
        <h1 class="text-dark mb-3 fs-3x">Sign In</h1>
        <!-- End:Title -->
        <!-- Begin:Text -->
        <div class="text-gray-400 fw-semibold fs-6">Get un-limited access and earn money</div>
        <!-- End:Text -->
      </div>
      <!-- End:Heading -->
      <!-- Begin:Input Group -->
      <div class="fv-row mb-8">
        <!-- Begin:Email -->
        <form-input
          id="email"
          v-model:formInputValue="user.email"
          label="Email"
          type="email"
          name="email"
          placeholder="Email"
          autocomplete="off" />
        <!-- End:Email -->
      </div>
      <!-- End:Input Group -->
      <!-- Begin:Input Group -->
      <div class="fv-row mb-7">
        <form-input
          id="password"
          ref="formPassword"
          v-model:formInputValue="user.password"
          label="Password"
          type="password"
          name="password"
          placeholder="Password"
          autocomplete="off" />
      </div>
      <!-- End:Input Group -->
      <!-- Begin:Wrapper -->
      <div class="d-flex flex-stack flex-wrap gap-3 fs-base fw-semibold mb-10">
        <div></div>
        <!-- Begin:Link -->
        <a href="#" class="link-primary">Forgot Password?</a>
        <!-- End:Link -->
      </div>
      <!-- End:Wrapper -->
      <!-- Begin:Actions -->
      <form-actions ref="formButton" button-id="kt_sign_in_submit" />
      <!-- End:Actions -->
    </div>
    <!-- End:Body -->
  </form>
</template>

<script>
import {defineComponent, onMounted, ref} from "vue"
import {useRouter} from "vue-router"
import {useStore} from "vuex"
import FormActions from "../uis/form/actions.vue"
import FormInput from "../uis/form/input.vue"

export default defineComponent({
  name: "sign-in-form",
  components: {FormInput, FormActions},
  setup() {
    const router = useRouter()
    const store = useStore()
    const user = {email: null, password: null}
    const elements = {form: ref(null), formButton: ref(null), formError: ref(null)}
    let validator

    // Handle Form Validation
    const handleFormValidation = function handleFormValidation() {
      // Init Form Validator Rules
      validator = FormValidation.formValidation(elements.form.value, {
        fields: {
          email: {
            validators: {
              notEmpty: {message: "Email is required"},
              regexp: {
                regexp: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "The entered value is not a valid email address"
              }
            }
          },
          password: {
            validators: {
              notEmpty: {
                message: "The password is required"
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

    // Handle Form Submission
    const handleFormSubmission = function handleFormSubmission() {
      validator.validate().then((status) => {
        if (status.toLowerCase() === "valid") {
          // Show Loading Indication
          elements.formButton.value.formButton.setAttribute("data-kt-indicator", "on")
          // Disable Button (Avoid Multiple Click)
          elements.formButton.value.formButton.disable = true
          elements.formButton.value.formButton.ariaDisabled = true

          store
            .dispatch("signIn", user)
            .then((response) => {
              // Show Message Pop-Up
              Swal.fire({
                icon: "success",
                text: "You have successfully signed in!",
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

              // Show Error Pop-Up
              Swal.fire({
                icon: "error",
                text: elements.formError.value,
                confirmButtonText: "Okay. Got it!",
                buttonsStyling: false,
                customClass: {confirmButton: "btn btn-danger"}
              })
            })
            .finally(() => {
              // Hide Loading Indication
              elements.formButton.value.formButton.removeAttribute("data-kt-indicator")
              // Enable Button
              elements.formButton.value.formButton.disabled = false
              elements.formButton.value.formButton.ariaDisabled = false
            })
        } else {
          // Show Error Pop-Up
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
