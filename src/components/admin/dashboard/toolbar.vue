<!-- Done Reviewing: 29/01/2023 -->
<template>
  <div id="kt_app_toolbar" class="app-toolbar py-3 py-lg-6">
    <div id="kt_app_toolbar_container" class="app-container container-xxl d-flex flex-stack">
      <div class="page-title d-flex flex-column justify-content-center flex-wrap me-3">
        <h1
          class="page-heading d-flex text-dark fw-bold fs-3 flex-column justify-content-center my-0">
          {{ title }}
        </h1>
        <ul class="breadcrumb breadcrumb-separatorless fw-semibold fs-7 my-0 pt-1">
          <li class="breadcrumb-item text-muted">
            <router-link to="/" class="text-muted text-hover-primary">Home</router-link>
          </li>
          <li class="breadcrumb-item">
            <span class="bullet bg-gray-400 w-5px h-2px"></span>
          </li>
          <li class="breadcrumb-item text-muted">Step 01</li>
          <li class="breadcrumb-item">
            <span class="bullet bg-gray-400 w-5px h-2px"></span>
          </li>
          <li class="breadcrumb-item text-muted">Step 02</li>
        </ul>
      </div>
      <div class="d-flex align-items-center gap-2 gap-lg-3">
        <div class="m-0">
          <router-link
            to="#"
            data-kt-menu-trigger="click"
            data-kt-menu-placement="bottom-end"
            class="btn btn-sm btn-flex bg-body btn-color-gray-700 btn-active-color-primary fw-bold">
            <span class="svg-icon svg-icon-6 svg-icon-muted me-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="none">
                <path
                  d="M19.0759 3H4.72777C3.95892 3 3.47768 3.83148 3.86067 4.49814L8.56967 12.6949C9.17923 13.7559 9.5 14.9582 9.5 16.1819V19.5072C9.5 20.2189 10.2223 20.7028 10.8805 20.432L13.8805 19.1977C14.2553 19.0435 14.5 18.6783 14.5 18.273V13.8372C14.5 12.8089 14.8171 11.8056 15.408 10.964L19.8943 4.57465C20.3596 3.912 19.8856 3 19.0759 3Z"
                  fill="currentColor" />
              </svg>
            </span>
            Filter
          </router-link>
          <div
            id="kt_menu_unique_id"
            data-kt-menu="true"
            class="menu menu-sub menu-sub-dropdown w-250px w-md-300px">
            <div class="px-7 py-5">
              <div class="fs-5 text-dark fw-bold">Filter Options</div>
            </div>
            <div class="separator border-gray-200"></div>
            <div class="px-7 py-5">
              <div class="mb-10">
                <label for="status" class="form-label fw-semibold">Status:</label>
                <div>
                  <select
                    id="status"
                    data-kt-select2="true"
                    data-dropdown-parent="#kt_menu_unique_id"
                    data-allow-clear="true"
                    data-placeholder="Select Option"
                    class="form-select form-select-solid">
                    <option></option>
                    <option value="1">Approved</option>
                    <option value="2">Pending</option>
                    <option value="3">In Process</option>
                    <option value="4">Rejected</option>
                  </select>
                </div>
              </div>
              <div class="mb-10">
                <label for="member-type" class="form-label fw-semibold">Member Type:</label>
                <div class="d-flex">
                  <label
                    for="author"
                    class="form-check form-check-sm form-check-custom form-check-solid me-5">
                    <input
                      id="author"
                      v-model="data.author"
                      type="checkbox"
                      name="author-customer"
                      class="form-check-input" />
                    <span class="form-check-label">Author</span>
                  </label>
                  <label
                    for="customer"
                    class="form-check form-check-sm form-check-custom form-check-solid me-5">
                    <input
                      id="customer"
                      v-model="data.customer"
                      type="checkbox"
                      name="author-customer"
                      class="form-check-input" />
                    <span class="form-check-label">Customer</span>
                  </label>
                </div>
              </div>
              <div class="mb-10">
                <label for="notifications" class="form-label fw-semibold">Notifications:</label>
                <div
                  class="form-check form-switch form-switch-sm form-check-custom form-check-solid">
                  <input
                    id="notifications"
                    v-model="data.notifications"
                    type="checkbox"
                    name="notifications"
                    class="form-check-input" />
                </div>
              </div>
              <div class="d-flex justify-content-end">
                <button
                  type="button"
                  data-kt-menu-dismiss="true"
                  class="btn btn-sm btn-light btn-active-light-primary me-2">
                  Reset
                </button>
                <button type="submit" data-kt-menu-dismiss="true" class="btn btn-sm btn-primary">
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
        <router-link
          to="#"
          data-bs-target="#kt_modal_create_app"
          data-bs-toggle="modal"
          class="btn btn-sm fw-bold btn-primary">
          Create
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line
import {defineComponent, ref} from "vue"
export default defineComponent({
  name: "dashboard-toolbar",
  props: {
    title: {type: String, required: true},
    breadcrumbs: {type: Array, required: false, default: null}
  },
  setup() {
    const data = ref({author: false, customer: true, notifications: true})
    return {data}
  }
})
</script>
