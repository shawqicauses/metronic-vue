<!-- Done Reviewing: 30/01/2023 -->
<template>
  <div class="d-flex flex-stack">
    <button :id="buttonId" ref="formButton" type="submit" class="btn btn-primary">
      <span class="indicator-label">Submit</span>
      <span class="indicator-progress">
        Please wait ...
        <span class="spinner-border spinner-border-sm align-middle ms-2" />
      </span>
    </button>
    <div class="d-flex align-items-center">
      <div class="text-gray-400 fw-semibold fs-6 me-6">Or</div>
      <a href="#" class="symbol symbol-circle symbol-45px w-45px me-3">
        <img
          src="../../../../../src/assets/media/brand-logos/google.svg"
          alt="Google Icon"
          class="p-4" />
      </a>
      <a href="#" class="symbol symbol-circle symbol-45px w-45px me-3">
        <img
          src="../../../../../src/assets/media/brand-logos/facebook.svg"
          alt="Facebook Icon"
          class="p-4" />
      </a>
      <a href="#" class="symbol symbol-circle symbol-45px w-45px">
        <img
          src="../../../../../src/assets/media/brand-logos/apple-black.svg"
          alt="Apple Icon"
          class="theme-light-show p-4" />
        <img
          src="../../../../../src/assets/media/brand-logos/apple-black-dark.svg"
          alt="Apple Dark Icon"
          class="theme-dark-show p-4" />
      </a>
    </div>
  </div>
</template>

<script>
import {defineComponent, ref} from "vue"

export default defineComponent({
  name: "form-button",
  props: {buttonId: {type: String, required: true}},
  setup(props, {expose}) {
    const formButton = ref(null)
    expose({formButton})
    return {formButton}
  }
})
</script>
