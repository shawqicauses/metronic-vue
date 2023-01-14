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
        <div class="card-body py-4">
          <Datatable
        @on-sort="sort"
        @on-items-select="onItemSelect"
        :data="tableData"
        :header="tableHeader"
        :enable-items-per-page-dropdown="true"
        :checkbox-enabled="true"
        checkbox-label="id"
      >
        <template v-slot:name="{ row: customer }">
          {{ customer.name }}
        </template>
        <template v-slot:email="{ row: customer }">
          <a href="#" class="text-gray-600 text-hover-primary mb-1">
            {{ customer.email }}
          </a>
        </template>
        <template v-slot:company="{ row: customer }">
          {{ customer.company }}
        </template>
        <template v-slot:paymentMethod="{ row: customer }">
          <img :src="customer.payment.icon" class="w-35px me-3" alt="" />{{
            customer.payment.ccnumber
          }}
        </template>
        <template v-slot:date="{ row: customer }">
          {{ customer.date }}
        </template>
        <template v-slot:actions="{ row: customer }">
          <a
            href="#"
            class="btn btn-sm btn-light btn-active-light-primary"
            data-kt-menu-trigger="click"
            data-kt-menu-placement="bottom-end"
            data-kt-menu-flip="top-end"
            >Actions
            <span class="svg-icon svg-icon-5 m-0">
              <inline-svg src="media/icons/duotune/arrows/arr072.svg" />
            </span>
          </a>
          <!--begin::Menu-->
          <div
            class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-semobold fs-7 w-125px py-4"
            data-kt-menu="true"
          >
            <!--begin::Menu item-->
            <div class="menu-item px-3">
              <router-link
                to="/apps/customers/customer-details"
                class="menu-link px-3"
                >View</router-link
              >
            </div>
            <!--end::Menu item-->
            <!--begin::Menu item-->
            <div class="menu-item px-3">
              <a @click="deleteCustomer(customer.id)" class="menu-link px-3"
                >Delete</a
              >
            </div>
            <!--end::Menu item-->
          </div>
          <!--end::Menu-->
        </template>
      </Datatable>
        </div>
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
import Datatable from "@/components/admin/kt-datatable/KTDataTable.vue";
import { Sort } from "@/components/admin/kt-datatable/table-partials/models";
import customers from "@/core/data/customers";
import { ICustomer } from "@/core/data/customers";

import {defineComponent, ref, onMounted} from "vue"

export default defineComponent({
  name: "users-list",
  components: {Toolbar, Datatable, AddUserModal},
  setup() {
    const tableHeader = ref([
      {
        columnName: "Customer Name",
        columnLabel: "name",
        sortEnabled: true,
        columnWidth: 175,
      },
      {
        columnName: "Email",
        columnLabel: "email",
        sortEnabled: true,
        columnWidth: 230,
      },
      {
        columnName: "Company",
        columnLabel: "company",
        sortEnabled: true,
        columnWidth: 175,
      },
      {
        columnName: "Payment Method",
        columnLabel: "paymentMethod",
        sortEnabled: true,
        columnWidth: 175,
      },
      {
        columnName: "Created Date",
        columnLabel: "date",
        sortEnabled: true,
        columnWidth: 225,
      },
      {
        columnName: "Actions",
        columnLabel: "actions",
        sortEnabled: false,
        columnWidth: 135,
      },
    ]);
    const selectedIds = ref([]);

    const tableData = ref(customers);
    const initCustomers = ref([]);

    onMounted(() => {
      initCustomers.value.splice(0, tableData.value.length, ...tableData.value);
    });

    const deleteFewCustomers = () => {
      selectedIds.value.forEach((item) => {
        deleteCustomer(item);
      });
      selectedIds.value.length = 0;
    };

    const deleteCustomer = (id) => {
      for (let i = 0; i < tableData.value.length; i++) {
        if (tableData.value[i].id === id) {
          tableData.value.splice(i, 1);
        }
      }
    };

    const search = ref("");
    const searchItems = () => {
      tableData.value.splice(0, tableData.value.length, ...initCustomers.value);
      if (search.value !== "") {
        let results = [];
        for (let j = 0; j < tableData.value.length; j++) {
          if (searchingFunc(tableData.value[j], search.value)) {
            results.push(tableData.value[j]);
          }
        }
        tableData.value.splice(0, tableData.value.length, ...results);
      }
    };

    const searchingFunc = (obj, value) => {
      for (let key in obj) {
        if (!Number.isInteger(obj[key]) && !(typeof obj[key] === "object")) {
          if (obj[key].indexOf(value) != -1) {
            return true;
          }
        }
      }
      return false;
    };

    const sort = (sort) => {
      const reverse = sort.order === "asc";
      if (sort.label) {
        arraySort(tableData.value, sort.label, { reverse });
      }
    };
    const onItemSelect = (selectedItems) => {
      if (selectedItems.length === 0) {
        selectedIds.value = [];
      } else {
        selectedIds.value = [...selectedIds.value, ...selectedItems];
      }
    };

    return {
      tableData,
      tableHeader,
      deleteCustomer,
      search,
      searchItems,
      selectedIds,
      deleteFewCustomers,
      sort,
      onItemSelect,
    };
  }
})
</script>
