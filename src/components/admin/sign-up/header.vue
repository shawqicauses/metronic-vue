<!-- Done Reviewing: 30/01/2023 -->
<template>
  <header class="d-flex flex-stack py-2">
    <div class="me-2">
      <router-link
        to="/auth/sign-in"
        aria-label="back-link"
        class="btn btn-icon bg-light rounded-circle">
        <span class="svg-icon svg-icon-2 svg-icon-gray-800">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            fill="currentColor">
            <path
              d="M9.60001 11H21C21.6 11 22 11.4 22 12C22 12.6 21.6 13 21 13H9.60001V11Z"
              fill="currentColor" />
            <path
              d="M9.6 20V4L2.3 11.3C1.9 11.7 1.9 12.3 2.3 12.7L9.6 20Z"
              fill="currentColor"
              opacity="0.5" />
          </svg>
        </span>
      </router-link>
    </div>
    <div class="m-0">
      <span class="text-gray-400 fw-bold fs-5 me-2">Already a member?</span>
      <router-link to="/auth/sign-in" class="link-primary fw-bold fs-5">Sign In</router-link>
    </div>
  </header>
</template>

<script>
// eslint-disable-next-line
import {defineComponent} from "vue"
export default defineComponent({name: "sign-up-header"})
</script>
