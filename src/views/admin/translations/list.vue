<template>
  <!-- Begin:Toolbar -->
  <toolbar title="Translations Management" />
  <!-- End:Toolbar -->

  <!-- Begin:Content -->
  <div v-if="tableFooter.total == 0" id="kt_app_content" class="app-content flex-column-fluid">
    <!-- Begin:Content Container -->
    <div id="kt_app_content_container" class="app-container container-xxl">
      <!-- Begin:Card -->
      <div class="card">
        <div class="card-body p-0">
          <div class="card-px text-center py-20 my-10">
            <h2 class="fs-2x fw-bold mb-10">Welcome!</h2>
            <p class="text-gray-400 fs-5 fw-semibold mb-13">
              <span>
                There are no translations added yet.
                <br />
                Kickstart your CRM by adding a your first translation
              </span>
            </p>
            <button
              type="button"
              data-bs-target="#kt_modal_add_translation"
              data-bs-toggle="modal"
              class="btn btn-primary er fs-6 px-8 py-4">
              Add Translation
            </button>
          </div>
          <div class="text-center px-5">
            <img
              src="@/assets/media/illustrations/01.png"
              alt="Add Translations Illustration"
              class="mw-100 mh-300px" />
          </div>
        </div>
      </div>
      <!-- End:Card -->
    </div>
    <!-- End:Content Container -->
  </div>

  <div v-else id="kt_app_content" class="app-content flex-column-fluid">
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
              <label for="search-translations" class="sr-only">Search Translations</label>
              <input
                id="search-translations"
                type="text"
                placeholder="Search Translations"
                data-kt-translation-table-filter="search"
                class="form-control form-control-solid w-250px ps-14" />
            </div>
            <!-- End:Search -->
          </div>
          <!-- End:Card Title -->
          <!-- Begin:Card Toolbar -->
          <div class="card-toolbar">
            <!-- Begin:Toolbar -->
            <div data-kt-translation-table-toolbar="base" class="d-flex justify-content-end">
              <!-- Begin:Add Translation -->
              <button
                type="button"
                data-bs-target="#kt_modal_add_translation"
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
                Add Translation
              </button>
              <!-- End:Add Translation -->
            </div>
            <!-- End:Toolbar -->
            <!-- Begin:Modal -->
            <add-translation-modal />
            <!-- End:Modal -->
          </div>
          <!-- End:Card Toolbar -->
        </div>
        <!-- End:Card Header -->
        <!-- Begin:Card Body -->
        <div class="card-body py-4">
          <data-table
            :data="tableData"
            :footer="tableFooter"
            :header="tableHeader"
            :checkbox-enabled="true"
            :checkbox-label="id"
            :items-per-page-dropdown-enabled="true"
            @on-sort="onSort"
            @on-items-select="onItemsSelect">
            <template #main="{row: translation}">
              <span class="form-check form-check-custom form-check-solid">
                <input
                  class="form-check-input"
                  type="radio"
                  :checked="translation.main == 1 ? 'checked' : 'false'"
                  name="main"
                  @click="setMainLang(translation.id)"
                  value="1" />
              </span>
            </template>
            <template #title="{row: translation}">
              {{ translation.title }}
            </template>
            <template #label="{row: translation}">
              {{ translation.label.name }}
            </template>
            <template #language="{row: translation}">
              {{ translation.language.name }}
            </template>

            <template #actions="{row: translation}">
              <a
                href="#"
                class="btn btn-sm btn-light btn-active-light-primary"
                data-kt-menu-trigger="click"
                data-kt-menu-placement="bottom-end"
                data-kt-menu-flip="top-end">
                Actions
                <span class="svg-icon svg-icon-5 m-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    fill="none">
                    <path
                      d="M11.4343 12.7344L7.25 8.55005C6.83579 8.13583 6.16421 8.13584 5.75 8.55005C5.33579 8.96426 5.33579 9.63583 5.75 10.05L11.2929 15.5929C11.6834 15.9835 12.3166 15.9835 12.7071 15.5929L18.25 10.05C18.6642 9.63584 18.6642 8.96426 18.25 8.55005C17.8358 8.13584 17.1642 8.13584 16.75 8.55005L12.5657 12.7344C12.2533 13.0468 11.7467 13.0468 11.4343 12.7344Z"
                      fill="currentColor"></path>
                  </svg>
                </span>
              </a>
              <!-- Begin:Menu -->
              <div
                data-kt-menu="true"
                class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-semibold fs-7 w-125px py-4">
                <!-- Begin:Menu Item -->
                <div class="menu-item px-3">
                  <router-link to="/dashboard/translations/list" class="menu-link px-3">
                    View
                  </router-link>
                </div>
                <!-- End:Menu Item -->
                <!-- Begin:Menu Item -->
                <div class="menu-item px-3">
                  <a href="#" class="menu-link px-3" @click="deleteTranslation(translation.id)"
                    >Delete</a
                  >
                </div>
                <!-- End:Menu Item -->
              </div>
              <!-- End:Menu -->
            </template>
          </data-table>
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
import AddTranslationModal from "@/components/admin/modals/forms/add-translation-modal.vue"
import arraySort from "array-sort"
import {computed, defineComponent, provide, onBeforeMount, onMounted, ref} from "vue"
import {useStore} from "vuex"
import DataTable from "@/components/admin/data-table/index.vue"
import axiosClient from "@/plugins/axios"

export default defineComponent({
  name: "translations-list",
  components: {Toolbar, AddTranslationModal, DataTable},
  setup() {
    const tableHeader = ref([
      {
        columnName: "Translation Title",
        columnLabel: "title",
        sortEnabled: true,
        columnWidth: 230
      },
      {
        columnName: "Label Name",
        columnLabel: "label",
        sortEnabled: true,
        columnWidth: 175
      },
      {
        columnName: "Language Name",
        columnLabel: "language",
        sortEnabled: true,
        columnWidth: 175
      },
      {
        columnName: "Actions",
        columnLabel: "actions",
        sortEnabled: true,
        columnWidth: 175
      }
    ])

    const store = useStore()

    onBeforeMount(() => {
      tableData.value = []
      tableFooter.value = {total: 0}
      getRows()
    })

    const tableData = ref()
    const tableFooter = ref()

    function getRows(queryString = "") {
      axiosClient.get(`/translations${queryString}`).then((response) => {
        //console.log(response.data)
        tableData.value = response.data.result.data
        tableFooter.value = response.data.result
        tableFooter.value.data = "translations"
        //console.log(tableData.value.length)
        //console.log("page>>>>>>>>>>>>>>>>>>" + page)
        console.log("tableFooter>>>>>>>>>>>>>>>>>>")
        console.log(tableFooter.value)
      })
    }

    provide("getRows", getRows)

    const initTranslations = ref([])
    const selectedIds = ref([])
    const search = ref(null)

    const deleteTranslation = function deleteTranslation(id) {
      axiosClient.delete(`/translations/delete/${id}`).then(() => {
        store.dispatch("getAPITranslations")
      })
    }

    const setMainLang = function setMainLang(id) {
      axiosClient.get(`/translations/main/${id}`).then(() => {
        store.dispatch("getAPITranslations")
      })
    }

    const deleteFewTranslations = function deleteFewTranslations() {
      selectedIds.value.forEach((item) => {
        deleteTranslation(item)
      })

      selectedIds.value.length = 0
    }

    const searchingFunction = function searchingFunction(object, value) {
      // eslint-disable-next-line
      for (let key in object) {
        if (!Number.isInteger(object[key]) && !(typeof object[key] === "object"))
          if (object[key].indexOf(value) !== -1) return true
      }

      return false
    }

    const searchItems = () => {
      tableData.value.splice(0, tableData.value.length, ...initTranslations.value)
      if (search.value !== "") {
        const results = []
        for (let column = 0; column < tableData.value.length; column += 1) {
          if (searchingFunction(tableData.value[column], search.value))
            results.push(tableData.value[column])
        }

        tableData.value.splice(0, tableData.value.length, ...results)
      }
    }

    const onSort = function onSort(sort) {
      const reverse = sort.order === "ASC".toLowerCase()
      if (sort.label) arraySort(tableData.value, sort.label, {reverse})
    }

    const onItemsSelect = function onItemsSelect(selectedItems) {
      if (selectedItems.length === 0) selectedIds.value = []
      else selectedIds.value = [...selectedIds.value, ...selectedItems]
    }

    onMounted(() => {
      initTranslations.value.splice(0, tableData.value.length, ...tableData.value)
    })

    return {
      tableHeader,
      tableData,
      tableFooter,
      selectedIds,
      search,
      onItemsSelect,
      setMainLang,
      deleteTranslation,
      deleteFewTranslations,
      searchItems,
      onSort
    }
  }
})
</script>
