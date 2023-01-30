<!-- Done Reviewing: 30/01/2023 -->
<template>
  <toolbar title="Translations Management" />
  <div id="kt_app_content" class="app-content flex-column-fluid">
    <div id="kt_app_content_container" class="app-container container-xxl">
      <div class="card">
        <template v-if="data.length === 0">
          <div class="card-body p-0">
            <div class="card-px text-center py-20 my-10">
              <h2 class="fs-2x fw-bold mb-10">Welcome!</h2>
              <p class="text-gray-400 fs-5 fw-semibold mb-13">
                <span>
                  There are no translations added yet.
                  <br />
                  Kickstart your dashboard by adding a your first translation
                </span>
              </p>
              <button type="button" class="btn btn-primary er fs-6 px-8 py-4" @click="showAddModal">
                Add Translation
              </button>
            </div>
            <div class="text-center px-5">
              <img
                src="@/assets/media/illustrations/01.png"
                alt="Add Translation Illustration"
                class="mw-100 mh-300px" />
            </div>
          </div>
        </template>
        <template v-else>
          <div class="card-header border-0 pt-6">
            <div class="card-title">
              <div class="d-flex align-items-center position-relative my-1">
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
                <label for="search-translations" class="sr-only">Search Translations</label>
                <input
                  id="search-translations"
                  type="text"
                  name="search-translations"
                  placeholder="Search Translations"
                  data-kt-translation-table-filter="search"
                  class="form-control form-control-solid w-250px ps-14" />
              </div>
            </div>
            <div class="card-toolbar">
              <div data-kt-translation-table-toolbar="base" class="d-flex justify-content-end">
                <button type="button" class="btn btn-primary" @click="showAddModal">
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
                  Add Translation
                </button>
              </div>
              <add-translation-modal
                ref="addTranslationModal"
                :id-current="idCurrent"
                :translation-current="translationCurrent" />
            </div>
          </div>
          <div class="card-body py-4">
            <data-table
              :data="data"
              :header="header"
              :checkbox-enabled="true"
              checkbox-label="id"
              :items-total="itemsTotal"
              :items-per-page-dropdown-enabled="true"
              @on-sort="onSort"
              @on-items-select="onItemsSelect">
              <template #title="{row: translation}">
                {{ translation.title.charAt(0).toUpperCase() + translation.title.slice(1) }}
              </template>
              <template #label="{row: translation}">
                {{ translation.label ? translation.label.name : "" }}
              </template>
              <template #language="{row: translation}">
                {{
                  translation.language.name.charAt(0).toUpperCase() +
                  translation.language.name.slice(1)
                }}
              </template>
              <template #actions="{row: translation}">
                <a
                  href="#"
                  data-kt-menu-trigger="click"
                  data-kt-menu-placement="bottom-end"
                  data-kt-menu-flip="top-end"
                  class="btn btn-sm btn-light btn-active-light-primary">
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
                <div
                  data-kt-menu="true"
                  class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-semibold fs-7 w-125px py-4">
                  <div class="menu-item px-3">
                    <a href="#" class="menu-link px-3" @click="showUpdateModal(translation.id)">
                      Update
                    </a>
                  </div>
                  <div class="menu-item px-3">
                    <a href="#" class="menu-link px-3" @click="deleteTranslation(translation.id)">
                      Delete
                    </a>
                  </div>
                </div>
              </template>
            </data-table>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import Toolbar from "@/components/admin/dashboard/toolbar.vue"
import DataTable from "@/components/admin/data-table/index.vue"
import AddTranslationModal from "@/components/admin/modals/forms/add-translation-modal.vue"
import axiosClient from "@/plugins/axios"
import arraySort from "array-sort"
import {defineComponent, onBeforeMount, onMounted, provide, ref} from "vue"
import {showModal} from "../../../core/helpers/dom"

export default defineComponent({
  name: "translations-list",
  components: {Toolbar, AddTranslationModal, DataTable},
  setup() {
    const header = ref([
      {columnName: "Translation Name", columnLabel: "title", sortEnabled: true, columnWidth: 230},
      {columnName: "Label", columnLabel: "label", sortEnabled: true, columnWidth: 175},
      {columnName: "Language", columnLabel: "language", sortEnabled: true, columnWidth: 175},
      {columnName: "Actions", columnLabel: "actions", sortEnabled: false, columnWidth: 175}
    ])

    const data = ref([])
    const itemsTotal = ref(0)
    const initTranslations = ref([])
    const idsSelected = ref([])
    const addTranslationModal = ref(null)
    const idCurrent = ref(null)
    const translationCurrent = ref({
      title: null,
      label: null,
      language: null
    })

    const getDataTableBodyRows = function getDataTableBodyRows(params = "") {
      axiosClient.get(`/translations${params}`).then((response) => {
        data.value = response.data.result.data
        itemsTotal.value = response.data.result.total
      })
    }

    const deleteTranslation = function deleteTranslation(id) {
      axiosClient.delete(`/translations/delete/${id}`).then(() => {
        getDataTableBodyRows()
      })
    }

    const deleteFewTranslations = function deleteFewTranslations() {
      idsSelected.value.forEach((item) => {
        deleteTranslation(item)
      })

      idsSelected.value.length = 0
    }

    const onSort = function onSort(sort) {
      const reverse = sort.order === "ASC".toLowerCase()
      if (sort.label) arraySort(data.value, sort.label, {reverse})
    }

    const onItemsSelect = function onItemsSelect(itemsSelected) {
      if (itemsSelected.length === 0) idsSelected.value = []
      else idsSelected.value = [...idsSelected.value, ...itemsSelected]
    }

    const showAddModal = function showAddModal() {
      idCurrent.value = null
      translationCurrent.value = {
        title: null,
        label: null,
        language: null
      }

      showModal(addTranslationModal.value.addTranslationModal.modal)
    }

    const showUpdateModal = function showUpdateModal(id) {
      idCurrent.value = id
      axiosClient.get(`/translations/show/${id}`).then((response) => {
        translationCurrent.value = response.data.result
        showModal(addTranslationModal.value.addTranslationModal.modal)
      })
    }

    provide("getDataTableBodyRows", getDataTableBodyRows)
    onBeforeMount(() => {
      data.value = []
      getDataTableBodyRows()
    })

    onMounted(() => {
      initTranslations.value.splice(0, data.value.length, ...data.value)
    })

    return {
      header,
      data,
      itemsTotal,
      idsSelected,
      addTranslationModal,
      idCurrent,
      translationCurrent,
      onSort,
      onItemsSelect,
      deleteTranslation,
      deleteFewTranslations,
      showAddModal,
      showUpdateModal
    }
  }
})
</script>
