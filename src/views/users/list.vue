<template>
  <!-- Begin:Toolbar -->
  <toolbar />
  <!-- End:Toolbar -->
  <!-- Begin:Content -->
  <div id="kt_app_content" class="app-content flex-column-fluid">
    <!-- Begin:Content Container -->
    <div id="kt_app_content_container" class="app-container container-xxl">
      <!-- Begin:Card -->
      <div class="card">
        <!-- Begin:Card Header -->
        <div class="card-header border-0 pt-6">
          <!-- Begin:Card Title -->
          <div class="card-title">
            <!-- Begin:Search -->
            <div class="d-flex align-items-center position-relative my-1">
              <!-- Begin:SVG Icon -->
              <span class="svg-icon svg-icon-1 position-absolute ms-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  fill="none">
                  <rect
                    x="17"
                    y="15"
                    rx="1"
                    width="8"
                    height="2"
                    transform="rotate(45 17 15)"
                    fill="currentColor"
                    opacity="0.5" />
                  <path
                    d="M11 19C6.55556 19 3 15.4444 3 11C3 6.55556 6.55556 3 11 3C15.4444 3 19 6.55556 19 11C19 15.4444 15.4444 19 11 19ZM11 5C7.53333 5 5 7.53333 5 11C5 14.4667 7.53333 17 11 17C14.4667 17 17 14.4667 17 11C17 7.53333 14.4667 5 11 5Z"
                    fill="currentColor" />
                </svg>
              </span>
              <!-- End:SVG Icon -->
              <label for="search-users" class="sr-only">Search Users</label>
              <input
                id="search-users"
                type="text"
                placeholder="Search Users"
                data-kt-user-table-filter="search"
                class="form-control form-control-solid w-250px ps-14" />
            </div>
            <!-- End:Search -->
          </div>
          <!-- End:Card Title -->
          <!-- Begin:Card Toolbar -->
          <div class="card-toolbar">
            <!-- Begin:Toolbar -->
            <div data-kt-user-table-toolbar="base" class="d-flex justify-content-end">
              <!-- Begin:Add User -->
              <button
                type="button"
                data-bs-target="#kt_modal_add_user"
                data-bs-toggle="modal"
                class="btn btn-primary">
                <!-- Begin:SVG Icon -->
                <span class="svg-icon svg-icon-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    fill="none">
                    <rect
                      x="11"
                      y="20"
                      rx="1"
                      width="16"
                      height="2"
                      transform="rotate(-90 11 20)"
                      fill="currentColor"
                      opacity="0.5" />
                    <rect x="4" y="11" rx="1" width="16" height="2" fill="currentColor" />
                  </svg>
                </span>
                <!-- End:SVG Icon -->
                Add User
              </button>
              <!-- End:Add User -->
            </div>
            <!-- End:Toolbar -->
            <!-- Begin:Modal -->
            <add-user-modal />
            <!-- End:Modal -->
          </div>
          <!-- End:Card Toolbar -->
        </div>
        <!-- End:Card Header -->
        <!-- Begin:Card Body -->
        <div class="card-body py-4"></div>
        <!-- End:Card Body -->
      </div>
      <!-- End:Card -->
    </div>
    <!-- End:Content Container -->
  </div>
  <!-- End:Content -->
</template>

<script>
import Toolbar from "@/components/admin/dashboard/toolbar.vue"
import AddUserModal from "@/components/admin/modals/forms/add-user-modal.vue"
import {defineComponent} from "vue"

export default defineComponent({
  name: "users-list",
  components: {Toolbar, AddUserModal}
})
</script>
