<!-- Done Reviewing: 29/01/2023 -->
<template>
  <div
    data-kt-drawer="true"
    data-kt-drawer-name="app-header-menu"
    data-kt-drawer-toggle="#kt_app_header_menu_toggle"
    data-kt-drawer-activate="{default: true, lg: false}"
    data-kt-drawer-width="250px"
    data-kt-drawer-direction="end"
    data-kt-drawer-overlay="true"
    data-kt-swapper="true"
    data-kt-swapper-mode="{default: 'append', lg: 'prepend'}"
    data-kt-swapper-parent="{default: '#kt_app_body', lg: '#kt_app_header_wrapper'}"
    class="app-header-menu app-header-mobile-drawer align-items-stretch"></div>
</template>

<script>
// eslint-disable-next-line
import {defineComponent} from "vue"
export default defineComponent({name: "header-menu"})
</script>
