<template>
  <div id="kt_app_toolbar" class="app-toolbar py-3 py-lg-6">
    <!-- Begin:Toolbar Container -->
    <div id="kt_app_toolbar_container" class="app-container container-xxl d-flex flex-stack">
      <!-- Begin:Page Title -->
      <div class="page-title d-flex flex-column justify-content-center flex-wrap me-3">
        <!-- Begin:Title -->
        <h1
          class="page-heading d-flex text-dark fw-bold fs-3 flex-column justify-content-center my-0">
          {{ title }}
        </h1>
        <!-- End:Title -->
        <!-- Begin:Breadcrumbs -->
        <ul class="breadcrumb breadcrumb-separatorless fw-semibold fs-7 my-0 pt-1">
          <!-- Begin:Item -->
          <li class="breadcrumb-item text-muted">
            <router-link to="/" class="text-muted text-hover-primary">Home</router-link>
          </li>
          <!-- End:Item -->
          <!-- Begin:Item -->
          <li class="breadcrumb-item">
            <span class="bullet bg-gray-400 w-5px h-2px"></span>
          </li>
          <!-- End:Item -->
          <!-- Begin:Item -->
          <li class="breadcrumb-item text-muted">Languages Management</li>
          <!-- End:Item -->
          <!-- Begin:Item -->
          <li class="breadcrumb-item">
            <span class="bullet bg-gray-400 w-5px h-2px"></span>
          </li>
          <!-- End:Item -->
          <!-- Begin:Item -->
          <li class="breadcrumb-item text-muted">Languages</li>
          <!-- End:Item -->
        </ul>
        <!-- End:Breadcrumbs -->
      </div>
      <!-- End:Page Title -->
      <!-- Begin:Actions -->
      <div class="d-flex align-items-center gap-2 gap-lg-3">
        <!-- Begin:Filter Menu -->
        <div class="m-0">
          <!-- Begin:Menu Toggle -->
          <a
            href="#"
            data-kt-menu-trigger="click"
            data-kt-menu-placement="bottom-end"
            class="btn btn-sm btn-flex bg-body btn-color-gray-700 btn-active-color-primary fw-bold">
            <!-- Begin:SVG Icon -->
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
            <!-- End:SVG Icon -->
            Filter
          </a>
          <!-- End:Menu Toggle -->
          <!-- Begin:Menu 01 -->
          <div
            id="kt_menu_63bc45a1e6d0a"
            data-kt-menu="true"
            class="menu menu-sub menu-sub-dropdown w-250px w-md-300px">
            <!-- Begin:Header -->
            <div class="px-7 py-5">
              <div class="fs-5 text-dark fw-bold">Filter Options</div>
            </div>
            <!-- End:Header -->
            <!-- Begin:Menu Separator -->
            <div class="separator border-gray-200"></div>
            <!-- End:Menu Separator -->
            <!-- Begin:Form -->
            <div class="px-7 py-5">
              <!-- Begin:Input Group -->
              <div class="mb-10">
                <!-- Begin:Label -->
                <label for="status" class="form-label fw-semibold">Status:</label>
                <!-- End:Label -->
                <!-- Begin:Input -->
                <div>
                  <select
                    id="status"
                    data-kt-select2="true"
                    data-dropdown-parent="#kt_menu_63bc45a1e6d0a"
                    data-placeholder="Select Option"
                    data-allow-clear="true"
                    class="form-select form-select-solid">
                    <option></option>
                    <option value="1">Approved</option>
                    <option value="2">Pending</option>
                    <option value="3">In Process</option>
                    <option value="4">Rejected</option>
                  </select>
                </div>
                <!-- End:Input -->
              </div>
              <!-- End:Input Group -->
              <!-- Begin:Input Group -->
              <div class="mb-10">
                <!-- Begin:Label -->
                <label for="member-type" class="form-label fw-semibold">Member Type:</label>
                <!-- End:Label -->
                <!-- Begin:Options -->
                <div class="d-flex">
                  <!-- Begin:Option -->
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
                  <!-- End:Option -->
                  <!-- Begin:Option -->
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
                  <!-- End:Option -->
                </div>
                <!-- End:Options -->
              </div>
              <!-- End:Input Group -->
              <!-- Begin:Input Group -->
              <div class="mb-10">
                <!-- Begin:Label -->
                <label for="notifications" class="form-label fw-semibold">Notifications:</label>
                <!-- End:Label -->
                <!-- Begin:Switch -->
                <div
                  class="form-check form-switch form-switch-sm form-check-custom form-check-solid">
                  <input
                    id="notifications"
                    v-model="data.notifications"
                    type="checkbox"
                    name="notifications"
                    class="form-check-input" />
                </div>
                <!-- End:Switch -->
              </div>
              <!-- End:Input Group -->
              <!-- Begin:Actions -->
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
              <!-- End:Actions -->
            </div>
            <!-- End:Form -->
          </div>
          <!-- End:Menu 01 -->
        </div>
        <!-- End:Filter Menu -->
        <!-- Begin:Primary Button -->
        <a
          href="#"
          data-bs-target="#kt_modal_create_app"
          data-bs-toggle="modal"
          class="btn btn-sm fw-bold btn-primary">
          Create
        </a>
        <!-- End:Primary Button -->
      </div>
      <!-- End:Actions -->
    </div>
    <!-- End:Toolbar Container -->
  </div>
</template>

<script>
import {defineComponent, ref} from "vue"

export default defineComponent({
  name: "dashboard-toolbar",
  props: {
    title: {type: String, required: true},
    breadcrumbs: {type: Array, required: true}
  },
  setup() {
    const data = ref({
      author: false,
      customer: true,
      notifications: true
    })

    return {data}
  }
})
</script>
