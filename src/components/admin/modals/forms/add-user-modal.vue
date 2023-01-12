<template>
  <div
    id="kt_modal_add_user"
    ref="addUserModal"
    aria-hidden="true"
    tabindex="-1"
    class="modal fade">
    <!-- Begin:Modal Dialog -->
    <div class="modal-dialog modal-dialog-centered mw-650px">
      <!-- Begin:Modal Content -->
      <div class="modal-content">
        <!-- Begin:Modal Header -->
        <div id="kt_modal_add_user_header" class="modal-header">
          <!-- Begin:Modal Title -->
          <h2 class="fw-bold">Add User</h2>
          <!-- End:Modal Title -->
          <!-- Begin:Close -->
          <div
            id="kt_modal_add_user_close"
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
          id="kt_modal_add_user_form"
          ref="form"
          :model="user"
          :rules="rules"
          class="form"
          @submit.prevent="submit">
          <!-- Begin:Modal Body -->
          <div class="modal-body scroll-y mx-5 mx-xl-15 my-7">
            <!-- Begin:Scroll -->
            <div
              id="kt_modal_add_user_scroll"
              data-kt-scroll="true"
              data-kt-scroll-wrappers="#kt_modal_add_user_scroll"
              data-kt-scroll-dependencies="#kt_modal_add_user_header"
              data-kt-scroll-activate="{default: false, lg: true}"
              data-kt-scroll-max-height="auto"
              data-kt-scroll-offset="300px"
              class="d-flex flex-column scroll-y me-n7 pe-7">
              <!-- Begin:Input Group -->
              <div class="fv-row mb-7">
                <!-- Begin:Label -->
                <label for="user-avatar" class="d-block fw-semibold fs-6 mb-5">Avatar</label>
                <!-- End:Label -->
                <!-- Begin:Image Input -->
                <div
                  data-kt-image-input="true"
                  class="image-input image-input-outline image-input-placeholder">
                  <!-- Begin:Preview Existing Avatar -->
                  <div
                    class="image-input-wrapper w-125px h-125px"
                    :style="`background-image: url(../../../../../src/assets/media/avatars/${user.avatar})`" />
                  <!-- End:Preview Existing Avatar -->
                  <!-- Begin:Label -->
                  <label
                    for="user-avatar"
                    title="Change Avatar"
                    data-bs-toggle="tooltip"
                    data-kt-image-input-action="change"
                    class="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow">
                    <i class="bi bi-pencil-fill fs-7"></i>
                    <!-- Begin:Inputs -->
                    <input id="user-avatar" type="file" name="user-avatar" />
                    <input id="user-avatar-remove" type="hidden" name="user-avatar-remove" />
                    <!-- End:Inputs -->
                  </label>
                  <!-- End:Label -->
                  <!-- Begin:Cancel -->
                  <span
                    title="Cancel Avatar"
                    data-bs-toggle="tooltip"
                    data-kt-image-input-action="cancel"
                    class="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow">
                    <i class="bi bi-x fs-2"></i>
                  </span>
                  <!-- End:Cancel -->
                  <!-- Begin:Remove -->
                  <span
                    title="Remove Avatar"
                    data-bs-toggle="tooltip"
                    data-kt-image-input-action="remove"
                    class="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow">
                    <i class="bi bi-x fs-2"></i>
                  </span>
                  <!-- End:Remove -->
                </div>
                <!-- End:Image Input -->
                <!-- Begin:Hint -->
                <div class="form-text">Allowed file types: PNG, JPG and JPEG.</div>
                <!-- End:Hint -->
              </div>
              <!-- End:Input Group -->
              <!-- Begin:Input Group -->
              <div class="fv-row mb-7">
                <!-- Begin:Label -->
                <label for="user-name" class="required fw-semibold fs-6 mb-2">Name</label>
                <!-- End:Label -->
                <!-- Begin:Input -->
                <el-form-item prop="name">
                  <el-input
                    id="user-name"
                    v-model="user.name"
                    type="text"
                    name="user-name"
                    placeholder="Name" />
                </el-form-item>
                <!-- End:Input -->
              </div>
              <!-- End:Input Group -->
              <!-- Begin:Input Group -->
              <div class="fv-row mb-7">
                <!-- Begin:Label -->
                <label for="user-email" class="required fw-semibold fs-6 mb-2">Email</label>
                <!-- End:Label -->
                <!-- Begin:Input -->
                <el-form-item prop="email">
                  <el-input
                    id="user-email"
                    v-model="user.email"
                    type="email"
                    name="user-email"
                    placeholder="Email" />
                </el-form-item>
                <!-- End:Input -->
              </div>
              <!-- End:Input Group -->
              <!-- Begin:Input Group -->
              <div class="mb-7">
                <!-- Begin:Label -->
                <label for="user-role" class="required fw-semibold fs-6 mb-5">Role</label>
                <!-- End:Label -->
                <!-- Begin:Roles -->
                <!-- Begin:Input Row -->
                <div class="d-flex fv-row">
                  <!-- Begin:Radio -->
                  <div class="form-check form-check-custom form-check-solid">
                    <!-- Begin:Input -->
                    <input
                      id="kt_modal_update_role_option_0"
                      type="radio"
                      name="user-role"
                      checked
                      class="form-check-input me-3" />
                    <!-- End:Input -->
                    <!-- Begin:Label -->
                    <label for="kt_modal_update_role_option_0" class="form-check-label">
                      <div class="fw-bold text-gray-800">Administrator</div>
                      <div class="text-gray-600">
                        Best for business owners and company administrators
                      </div>
                    </label>
                    <!-- End:Label -->
                  </div>
                  <!-- End:Radio -->
                </div>
                <!-- End:Input Row -->
                <div class="separator separator-dashed my-5"></div>
                <!-- Begin:Input Row -->
                <div class="d-flex fv-row">
                  <!-- Begin:Radio -->
                  <div class="form-check form-check-custom form-check-solid">
                    <!-- Begin:Input -->
                    <input
                      id="kt_modal_update_role_option_1"
                      type="radio"
                      name="user-role"
                      class="form-check-input me-3" />
                    <!-- End:Input -->
                    <!-- Begin:Label -->
                    <label for="kt_modal_update_role_option_1" class="form-check-label">
                      <div class="fw-bold text-gray-800">Developer</div>
                      <div class="text-gray-600">
                        Best for developers or people primarily using the API
                      </div>
                    </label>
                    <!-- End:Label -->
                  </div>
                  <!-- End:Radio -->
                </div>
                <!-- End:Input Row -->
                <div class="separator separator-dashed my-5"></div>
                <!-- Begin:Input Row -->
                <div class="d-flex fv-row">
                  <!-- Begin:Radio -->
                  <div class="form-check form-check-custom form-check-solid">
                    <!-- Begin:Input -->
                    <input
                      id="kt_modal_update_role_option_2"
                      type="radio"
                      name="user-role"
                      class="form-check-input me-3" />
                    <!-- End:Input -->
                    <!-- Begin:Label -->
                    <label for="kt_modal_update_role_option_2" class="form-check-label">
                      <div class="fw-bold text-gray-800">Analyst</div>
                      <div class="text-gray-600">
                        Best for people who need full access to analytics data, but don't need to
                        update business settings
                      </div>
                    </label>
                    <!-- End:Label -->
                  </div>
                  <!-- End:Radio -->
                </div>
                <!-- End:Input Row -->
                <div class="separator separator-dashed my-5"></div>
                <!-- Begin:Input Row -->
                <div class="d-flex fv-row">
                  <!-- Begin:Radio -->
                  <div class="form-check form-check-custom form-check-solid">
                    <!-- Begin:Input -->
                    <input
                      id="kt_modal_update_role_option_3"
                      type="radio"
                      name="user-role"
                      class="form-check-input me-3" />
                    <!-- End:Input -->
                    <!-- Begin:Label -->
                    <label for="kt_modal_update_role_option_3" class="form-check-label">
                      <div class="fw-bold text-gray-800">Support</div>
                      <div class="text-gray-600">
                        Best for employees who regularly refund payments and respond to disputes
                      </div>
                    </label>
                    <!-- End:Label -->
                  </div>
                  <!-- End:Radio -->
                </div>
                <!-- End:Input Row -->
                <div class="separator separator-dashed my-5"></div>
                <!-- Begin:Input Row -->
                <div class="d-flex fv-row">
                  <!-- Begin:Radio -->
                  <div class="form-check form-check-custom form-check-solid">
                    <!-- Begin:Input -->
                    <input
                      id="kt_modal_update_role_option_4"
                      type="radio"
                      name="user-role"
                      class="form-check-input me-3" />
                    <!-- End:Input -->
                    <!-- Begin:Label -->
                    <label for="kt_modal_update_role_option_4" class="form-check-label">
                      <div class="fw-bold text-gray-800">Trial</div>
                      <div class="text-gray-600">
                        Best for people who need to preview content data, but don't need to make any
                        updates
                      </div>
                    </label>
                    <!-- End:Label -->
                  </div>
                  <!-- End:Radio -->
                </div>
                <!-- End:Input Row -->
                <!-- End:Roles -->
              </div>
              <!-- End:Input Group -->
            </div>
            <!-- End:Scroll -->
            <!-- Begin:Actions -->
            <div class="text-center pt-15">
              <button
                type="button"
                data-kt-users-modal-action="cancel"
                class="btn btn-light me-3"
                @click="discard">
                Discard
              </button>
              <button
                type="submit"
                data-kt-users-modal-action="submit"
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

export default defineComponent({
  name: "add-user-modal",
  setup() {
    const elements = {form: ref(null), addUserModal: ref(null)}
    const user = ref({name: "Max Smith", email: "max@kt.com", avatar: "image-06.jpg"})
    const loading = ref(null)
    const rules = ref({
      name: [{required: true, trigger: "change", message: "User name is required"}],
      email: [{required: true, trigger: "change", message: "User email is required"}]
    })

    const submit = function submit() {
      if (!elements.form.value) return
      elements.form.value.validate((valid) => {
        if (valid) {
          loading.value = true
          setTimeout(() => {
            loading.value = false
            Swal.fire({
              icon: "success",
              text: "Form has been successfully submitted!",
              confirmButtonText: "Okay. Thank you!",
              buttonsStyling: false,
              customClass: {confirmButton: "btn btn-primary"}
            }).then(() => {
              hideModal(elements.addUserModal.value)
              removeModalBackdrop()
            })
          }, 2000)
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
          user.value.name = "Max Smith"
          user.value.email = "max@kt.com"
          user.value.avatar = "image-06.jpg"
          hideModal(elements.addUserModal.value)
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
      addUserModal: elements.addUserModal,
      user,
      loading,
      rules,
      submit,
      discard
    }
  }
})
</script>

<style>
.image-input-placeholder {
  background-image: url("@/assets/media/svg/files/blank-image.svg");
}

[data-theme="dark"] .image-input-placeholder {
  background-image: url("@/assets/media/svg/files/blank-image-dark.svg");
}
</style>
