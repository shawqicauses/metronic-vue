<template>
  <form
    id="kt_sign_up_form"
    ref="form"
    action="#"
    novalidate="false"
    class="form w-100"
    @submit.prevent="handleFormSubmission">
    <!-- Begin:Heading -->
    <div class="text-start mb-10">
      <!-- Begin:Title -->
      <h1 class="text-dark fs-3x mb-3">Create an account</h1>
      <!-- End:Title -->
      <!-- Begin:Text -->
      <div class="text-gray-400 fw-semibold fs-6">Get un-limited access and earn money</div>
      <!-- End:Text -->
    </div>
    <!-- End:Heading -->
    <!-- Begin:Input Group -->
    <div class="row fv-row mb-7">
      <!-- Begin:Col -->
      <div class="col-xl-6">
        <form-input
          id="first-name"
          v-model:formInputValue="user.firstName"
          label="First Name"
          type="text"
          name="first-name"
          placeholder="First Name"
          autocomplete="off" />
      </div>
      <!-- End:Col -->
      <!-- Begin:Col -->
      <div class="col-xl-6">
        <form-input
          id="last-name"
          v-model:formInputValue="user.lastName"
          label="Last Name"
          type="text"
          name="last-name"
          placeholder="Last Name"
          autocomplete="off" />
      </div>
      <!-- End:Col -->
    </div>
    <!-- End:Input Group -->
    <!-- Begin:Input Group -->
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
    <!-- End:Input Group -->
    <!-- Begin:Input Group -->
    <div ref="formPasswordMeter" data-kt-password-meter="true" class="fv-row mb-10">
      <!-- Begin:Wrapper -->
      <div class="mb-1">
        <!-- Begin:Input Wrapper -->
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
        <!-- End:Input Wrapper -->
        <!-- Begin:Meter -->
        <div data-kt-password-meter-control="highlight" class="d-flex align-items-center mb-3">
          <div class="flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2" />
          <div class="flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2" />
          <div class="flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2" />
          <div class="flex-grow-1 bg-secondary bg-active-success rounded h-5px" />
        </div>
        <!-- End:Meter -->
      </div>
      <!-- End:Wrapper -->
      <!-- Begin:Hint -->
      <div data-kt-translate="sign-up-hint" class="text-muted">
        Use 8 or more characters with a mix of letters, numbers and symbols.
      </div>
      <!-- End:Hint -->
    </div>
    <!-- End:Input Group -->
    <!-- Begin:Input Group -->
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
    <!-- End:Input Group -->
    <!-- Begin:Actions -->
    <form-actions ref="formButton" button-id="kt_sign_up_submit" />
    <!-- End:Actions -->
  </form>
</template>

<script>
import {defineComponent, onMounted, ref} from "vue"
import {useRouter} from "vue-router"
import {useStore} from "vuex"
import FormActions from "../uis/form/actions.vue"
import FormInput from "../uis/form/input.vue"

export default defineComponent({
  name: "sign-up-form",
  components: {FormInput, FormActions},
  setup() {
    const router = useRouter()
    const store = useStore()
    const user = {
      firstName: null,
      lastName: null,
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

    // Password Input Validation
    const validatePassword = function validatePassword() {
      return passwordMeter.getScore() === 100
    }

    // Handle Form Validation
    const handleFormValidation = function handleFormValidation() {
      // Init Form Validator Rules
      validator = FormValidation.formValidation(elements.form.value, {
        fields: {
          "first-name": {
            validators: {
              notEmpty: {
                message: "First name is required"
              }
            }
          },
          "last-name": {
            validators: {
              notEmpty: {
                message: "Last name is required"
              }
            }
          },
          "email": {
            validators: {
              notEmpty: {message: "Email is required"},
              regexp: {
                regexp: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "The entered value is not a valid email address"
              }
            }
          },
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
                message: "The password and its confirmation is not same",
                compare() {
                  return elements.formPassword.value.formInput.value
                }
              }
            }
          },
          "toc": {
            validators: {
              notEmpty: {
                message: "You must accept our terms and condition"
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
      validator.revalidateField("password")
      validator.validate().then((status) => {
        if (status.toLowerCase() === "valid") {
          // Show Loading Indication
          elements.formButton.value.formButton.setAttribute("data-kt-indicator", "on")
          // Disable Button (Avoid Multiple Click)
          elements.formButton.value.formButton.disable = true
          elements.formButton.value.formButton.ariaDisabled = true

          store
            .dispatch("signUp", {
              name: `${user.firstName} ${user.lastName}`,
              email: user.email,
              password: user.password,
              password_confirmation: user.passwordConfirmation
            })
            .then((response) => {
              // Show Message Pop-Up
              Swal.fire({
                icon: "success",
                text: "You have successfully signed up!",
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

              // Show Error Pop-Up
              Swal.fire({
                icon: "error",
                text: elements.formButton.value,
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
