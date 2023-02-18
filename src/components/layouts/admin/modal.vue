<!-- Done Reviewing: 30/01/2023 -->
<template>
  <div :id="id" ref="modal" aria-hidden="true" tabindex="-1" class="modal fade">
    <div class="modal-dialog modal-dialog-centered mw-650px">
      <div class="modal-content">
        <div :id="headerId" class="modal-header">
          <h2 class="fw-bold">{{ title }}</h2>
          <div
            :id="closeId"
            data-bs-dismiss="modal"
            class="btn btn-icon btn-sm btn-active-icon-primary">
            <span class="svg-icon svg-icon-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="none">
                <rect
                  x="6"
                  y="17"
                  rx="1"
                  width="16"
                  height="2"
                  transform="rotate(-45 6 17)"
                  fill="currentColor"
                  opacity="0.5" />
                <rect
                  x="7"
                  y="6"
                  rx="1"
                  width="16"
                  height="2"
                  transform="rotate(45 7 6)"
                  fill="currentColor" />
              </svg>
            </span>
          </div>
        </div>
        <el-form
          :id="formId"
          ref="form"
          :model="formModel"
          :rules="formRules"
          :validate-on-rule-change="false"
          class="form"
          @submit.prevent="formSubmit">
          <div class="modal-body scroll-y mx-5 mx-xl-15 my-7">
            <div
              :id="scrollId"
              data-kt-scroll="true"
              :data-kt-scroll-wrappers="`#${scrollId}`"
              :data-kt-scroll-dependencies="`#${headerId}`"
              data-kt-scroll-activate="{default: false, lg: true}"
              data-kt-scroll-max-height="auto"
              data-kt-scroll-offset="300px"
              class="d-flex flex-column scroll-y me-n7 pe-7">
              <slot />
            </div>
            <div class="text-center pt-15">
              <button type="button" class="btn btn-light me-3" @click="formDiscard">Discard</button>
              <button
                type="submit"
                :data-kt-indicator="loading ? 'on' : null"
                class="btn btn-primary">
                <span v-if="!loading" class="indicator-label">
                  Submit
                  <span class="svg-icon svg-icon-3 ms-2 me-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      fill="none">
                      <rect
                        x="18"
                        y="13"
                        rx="1"
                        width="13"
                        height="2"
                        transform="rotate(-180 18 13)"
                        fill="currentColor"
                        opacity="0.5" />
                      <path
                        d="M15.4343 12.5657L11.25 16.75C10.8358 17.1642 10.8358 17.8358 11.25 18.25C11.6642 18.6642 12.3358 18.6642 12.75 18.25L18.2929 12.7071C18.6834 12.3166 18.6834 11.6834 18.2929 11.2929L12.75 5.75C12.3358 5.33579 11.6642 5.33579 11.25 5.75C10.8358 6.16421 10.8358 6.83579 11.25 7.25L15.4343 11.4343C15.7467 11.7467 15.7467 12.2533 15.4343 12.5657Z"
                        fill="currentColor" />
                    </svg>
                  </span>
                </span>
                <span v-else class="indicator-progress">
                  Please wait ...
                  <span class="spinner-border spinner-border-sm align-middle ms-2"></span>
                </span>
              </button>
            </div>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import {hideModal, removeModalBackdrop} from "@/core/helpers/dom"
import {defineComponent, ref} from "vue"

export default defineComponent({
  name: "modal-layout",
  props: {
    id: {type: String, required: true},
    headerId: {type: String, required: true},
    closeId: {type: String, required: true},
    title: {type: String, required: true},
    formId: {type: String, required: true},
    formModel: {type: Object, required: true},
    formModelReset: {type: Function, required: true},
    formRules: {type: Object, required: true},
    scrollId: {type: String, required: true}
  },
  emits: ["form-submit"],
  setup(props, {emit, expose}) {
    const modal = ref(null)
    const form = ref(null)
    const loading = ref(null)

    const formSubmit = function formSubmit() {
      emit("form-submit")
    }

    const formDiscard = function formDiscard() {
      Swal.fire({
        icon: "warning",
        text: "Are you sure you would like to cancel?",
        showCancelButton: true,
        confirmButtonText: "Yes. Cancel it",
        cancelButtonText: "No, return!",
        buttonsStyling: false,
        customClass: {confirmButton: "btn btn-warning", cancelButton: "btn btn-active-light"}
      }).then((result) => {
        if (result.value) {
          props.formModelReset()
          hideModal(modal.value)
          removeModalBackdrop()
        } else if (result.dismiss === "cancel") {
          Swal.fire({
            icon: "warning",
            text: "Your form has not been canceled!",
            showCancelButton: false,
            confirmButtonText: "Okay. Got it",
            buttonsStyling: false,
            customClass: {confirmButton: "btn btn-warning"}
          })
        }
      })
    }

    expose({modal, form, loading})
    return {modal, form, loading, formSubmit, formDiscard}
  }
})
</script>
