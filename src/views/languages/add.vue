<template>
  <!-- Begin:Toolbar -->
  <toolbar title="Getting Started" />
  <!-- End:Toolbar -->
  <!-- Begin:Modal -->
  <add-language-modal />
  <!-- End:Modal -->
  <!-- Begin:Content -->
  <div id="kt_app_content" class="app-content flex-column-fluid">
    <!-- Begin:Content Container -->
    <div id="kt_app_content_container" class="app-container container-xxl">
      <!-- Begin:Card -->
      <div class="card">
        <div class="card-body p-0">
          <div class="card-px text-center py-20 my-10">
            <h2 class="fs-2x fw-bold mb-10">Welcome!</h2>
            <p class="text-gray-400 fs-5 fw-semibold mb-13">
              <span>
                There are no languages added yet.
                <br />
                Kickstart your CRM by adding a your first language
              </span>
            </p>
            <button
              type="button"
              data-bs-target="#kt_modal_add_language"
              data-bs-toggle="modal"
              class="btn btn-primary er fs-6 px-8 py-4">
              Add Language
            </button>
          </div>
          <div class="text-center px-5">
            <img
              src="@/assets/media/illustrations/01.png"
              alt="Add Languages Illustration"
              class="mw-100 mh-300px" />
          </div>
        </div>
      </div>
      <!-- End:Card -->
    </div>
    <!-- End:Content Container -->
  </div>
  <!-- End:Content -->
</template>

<script>
import Toolbar from "@/components/admin/dashboard/toolbar.vue"
import AddLanguageModal from "@/components/admin/modals/forms/add-language-modal.vue"
import {defineComponent} from "vue"

export default defineComponent({
  name: "add-languages",
  components: {Toolbar, AddLanguageModal}
})
</script>
