<template>
  <!-- Begin:Toolbar -->
  <toolbar />
  <!-- End:Toolbar -->
  <div class="card">
    <div class="card-header border-0 pt-6">
     
      <!--begin::Card toolbar-->
      <div class="card-toolbar">
        <!--begin::Toolbar-->
          <!--begin::Add customer-->
          <button
            type="button"
            class="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#kt_modal_add_customer"
          >
            <span class="svg-icon svg-icon-2">
              <inline-svg src="media/icons/duotune/arrows/arr075.svg" />
            </span>
            Add Customer
          </button>
          <!--end::Add customer-->
        </div>
        <!--end::Toolbar-->
        
       
      </div>
      <!--end::Card toolbar-->
    
  </div>

  <AddCustomerModal></AddCustomerModal>
</template>

<script>

import { defineComponent, ref, onMounted } from "vue";
import Toolbar from "@/components/admin/dashboard/toolbar.vue"
//import Datatable from "@/components/kt-datatable/KTDataTable.vue";
//import { Sort } from "@/components/kt-datatable//table-partials/models";
import AddCustomerModal from "@/components/admin/modals/forms/AddCustomerModal.vue";

export default defineComponent({
  name: "users-list",
  components: {
    Toolbar,
    AddCustomerModal,
  },
  setup() {



    onMounted(() => {

    });

    

    return {
      
    };
  },
});
</script>
