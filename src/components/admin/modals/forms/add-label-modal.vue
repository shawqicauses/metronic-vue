<template>
  <div
    id="kt_modal_add_label"
    ref="addLabelModal"
    aria-hidden="true"
    tabindex="-1"
    class="modal fade">
    <!-- Begin:Modal Dialog -->
    <div class="modal-dialog modal-dialog-centered mw-650px">
      <!-- Begin:Modal Content -->
      <div class="modal-content">
        <!-- Begin:Modal Header -->
        <div id="kt_modal_add_label_header" class="modal-header">
          <!-- Begin:Modal Title -->
          <h2 class="fw-bold">Add Label</h2>
          <!-- End:Modal Title -->
          <!-- Begin:Close -->
          <div
            id="kt_modal_add_label_close"
            data-bs-dismiss="modal"
            class="btn btn-icon btn-sm btn-active-icon-primary">
            <!-- Begin:SVG Icon -->
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
            <!-- End:SVG Icon -->
          </div>
          <!-- End:Close -->
        </div>
        <!-- End:Modal Header -->
        <!-- Begin:Form -->
        <el-form
          id="kt_modal_add_label_form"
          ref="form"
          :model="label"
          :rules="rules"
          class="form"
          @submit.prevent="submit">
          <!-- Begin:Modal Body -->
          <div class="modal-body scroll-y mx-5 mx-xl-15 my-7">
            <!-- Begin:Scroll -->
            <div
              id="kt_modal_add_label_scroll"
              data-kt-scroll="true"
              data-kt-scroll-wrappers="#kt_modal_add_label_scroll"
              data-kt-scroll-dependencies="#kt_modal_add_label_header"
              data-kt-scroll-activate="{default: false, lg: true}"
              data-kt-scroll-max-height="auto"
              data-kt-scroll-offset="300px"
              class="d-flex flex-column scroll-y me-n7 pe-7">
              <!-- Begin:Input Group -->
              <div class="fv-row mb-7">
                <!-- Begin:Label -->
                <label for="label-name" class="required fw-semibold fs-6 mb-2"> Name </label>
                <!-- End:Label -->
                <!-- Begin:Input -->
                <el-form-item prop="name" class="mb-0">
                  <el-input
                    id="label-name"
                    v-model="label.name"
                    type="text"
                    name="label-name"
                    placeholder="Name" />
                </el-form-item>
                <!-- End:Input -->
              </div>
              <!-- End:Input Group -->
              <!-- Begin:Input Group -->
              <div class="fv-row mb-7">
                <!-- Begin:Label -->
                <label for="label-file" class="required fw-semibold fs-6 mb-2"> File </label>
                <!-- End:Label -->
                <!-- Begin:Input -->
                <el-form-item prop="file" class="mb-0">
                  <el-input
                    id="label-file"
                    v-model="label.file"
                    type="text"
                    name="label-file"
                    placeholder="File" />
                </el-form-item>
                <!-- End:Input -->
              </div>
              <!-- End:Input Group -->
              <!-- Begin:Input Group -->
              <div class="fv-row mb-7">
                <!-- Begin:Label -->
                <label for="label-title" class="required fw-semibold fs-6 mb-2"> Title </label>
                <!-- End:Label -->
                <!-- Begin:Input -->
                <el-form-item prop="title" class="mb-0">
                  <el-input
                    id="label-title"
                    v-model="label.title"
                    type="text"
                    name="label-title"
                    placeholder="Title" />
                </el-form-item>
                <!-- End:Input -->
              </div>
              <!-- End:Input Group -->
            </div>
            <!-- End:Scroll -->
            <!-- Begin:Actions -->
            <div class="text-center pt-15">
              <button
                type="button"
                data-kt-label-modal-action="cancel"
                class="btn btn-light me-3"
                @click="discard">
                Discard
              </button>
              <button
                type="submit"
                data-kt-label-modal-action="submit"
                :data-kt-indicator="loading ? 'on' : null"
                class="btn btn-primary">
                <span v-if="!loading" class="indicator-label">
                  Submit
                  <span class="svg-icon svg-icon-3 ms-2 me-0">
                    <!-- Begin:SVG Icon -->
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
                    <!-- End:SVG Icon -->
                  </span>
                </span>
                <span v-else class="indicator-progress">
                  Please wait ...
                  <span class="spinner-border spinner-border-sm align-middle ms-2"></span>
                </span>
              </button>
            </div>
            <!-- End:Actions -->
          </div>
          <!-- End:Modal Body -->
        </el-form>
        <!-- End:Form -->
      </div>
      <!-- End:Modal Content -->
    </div>
    <!-- End:Modal Dialog -->
  </div>
</template>

<script>
import {hideModal, removeModalBackdrop} from "@/core/helpers/dom"
import Swal from "sweetalert2/dist/sweetalert2"
import {defineComponent, ref} from "vue"
import axiosClient from "../../../../plugins/axios"

export default defineComponent({
  name: "add-label-modal",
  setup() {
    const elements = {form: ref(null), addLabelModal: ref(null)}
    const label = ref({
      name: null,
      file: null,
      title: null
    })

    const loading = ref(null)
    const rules = ref({
      name: [{required: true, trigger: "change", message: "Name is required"}],
      file: [{required: true, trigger: "change", message: "File is required"}],
      title: [{required: true, trigger: "change", message: "Title is required"}]
    })

    const submit = function submit() {
      if (!elements.form.value) return
      elements.form.value.validate((valid) => {
        if (valid) {
          loading.value = true
          axiosClient
            .post("/labels/create", {
              name: label.value.name.toLowerCase(),
              file: label.value.file.toLowerCase(),
              title: label.value.title.toLowerCase()
            })
            .then(() => {
              Swal.fire({
                icon: "success",
                text: "Label has successfully been added!",
                confirmButtonText: "Okay. Thank you!",
                buttonsStyling: false,
                customClass: {confirmButton: "btn btn-primary"}
              })

              hideModal(elements.addLabelModal.value)
              removeModalBackdrop()
            })
            .catch(() => {
              Swal.fire({
                icon: "error",
                text: "Sorry. Looks like there are some errors detected. Please try again.",
                confirmButtonText: "Okay. Got it!",
                buttonsStyling: false,
                customClass: {confirmButton: "btn btn-danger"}
              })
            })
            .finally(() => {
              loading.value = false
            })
        } else {
          Swal.fire({
            icon: "error",
            text: "Sorry. Looks like there are some errors detected. Please try again.",
            confirmButtonText: "Okay. Got it!",
            buttonsStyling: false,
            customClass: {confirmButton: "btn btn-danger"}
          })

          return false
        }
      })
    }

    const discard = function discard() {
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
          label.value.name = null
          label.value.file = null
          label.value.title = null
          hideModal(elements.addLabelModal.value)
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

    return {
      form: elements.form,
      addLabelModal: elements.addLabelModal,
      label,
      rules,
      loading,
      submit,
      discard
    }
  }
})
</script>
