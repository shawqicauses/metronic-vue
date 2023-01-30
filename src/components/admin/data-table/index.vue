<!-- Done Reviewing: 29/01/2023 -->
<template>
  <div>
    <data-table-content
      :header="header"
      :data="dataTableDataCurrent"
      :checkbox-enabled="checkboxEnabled"
      :checkbox-label="checkboxLabel"
      :sort-label="sortLabel"
      :sort-order="sortOrder"
      :data-table-empty-text="dataTableEmptyText"
      :loading="loading"
      @on-sort="onSort"
      @on-items-select="onItemsSelect">
      <template v-for="(slot, name) in $slots" #[name]="{row: item}">
        <slot :name="name" :row="item" />
      </template>
    </data-table-content>
    <data-table-footer
      v-model:itemsPerPage="dataTableItemsPerPage"
      :items-total="dataTableItemsTotal"
      :items-per-page="dataTableItemsPerPage"
      :items-per-page-dropdown-enabled="itemsPerPageDropdownEnabled"
      :page-current="dataTablePageCurrent"
      @on-page-change="onPageChange" />
  </div>
</template>

<script>
import {computed, defineComponent, ref, watch} from "vue"
import DataTableContent from "./data-table-partials/data-table-content/index.vue"
import DataTableFooter from "./data-table-partials/data-table-footer.vue"

export default defineComponent({
  name: "data-table",
  components: {DataTableContent, DataTableFooter},
  props: {
    header: {type: Array, required: true},
    data: {type: Array, required: true},
    checkboxEnabled: {type: Boolean, required: false, default: false},
    checkboxLabel: {type: String, required: false, default: "id"},
    itemsTotal: {type: Number, required: false, default: 0},
    itemsPerPage: {type: Number, required: false, default: 10},
    itemsPerPageDropdownEnabled: {type: Boolean, required: false, default: true},
    sortLabel: {type: String, required: false, default: null},
    sortOrder: {type: String, required: false, default: "ASC"},
    dataTableEmptyText: {type: String, required: false, default: "The Table Is Empty"},
    loading: {type: Boolean, required: false, default: false}
  },
  emits: ["on-items-per-page-change", "on-sort", "on-items-select", "on-page-change"],
  setup(props, {emit}) {
    const dataTableItemsPerPage = ref(props.itemsPerPage)
    const dataTablePageCurrent = ref(1)

    watch(
      () => dataTableItemsPerPage.value,
      (value) => {
        dataTablePageCurrent.value = 1
        emit("on-items-per-page-change", value)
      }
    )

    const dataTableItemsTotal = computed(() => {
      if (props.itemsTotal) return props.itemsTotal
      if (props.data) {
        if (props.data.length <= dataTableItemsPerPage.value) return props.itemsTotal
        return props.data.length
      }

      return 0
    })

    const dataTableDataCurrent = computed(() => {
      if (props.data) {
        if (props.data.length <= dataTableItemsPerPage.value) return props.data
        const sliceFrom = (dataTablePageCurrent.value - 1) * dataTableItemsPerPage.value
        return props.data.slice(sliceFrom, sliceFrom + dataTableItemsPerPage.value)
      }

      return []
    })

    const onSort = function onSort(sort) {
      emit("on-sort", sort)
    }

    const onItemsSelect = function onItemsSelect(itemsSelected) {
      emit("on-items-select", itemsSelected)
    }

    const onPageChange = function onPageChange(page) {
      dataTablePageCurrent.value = page
      emit("on-page-change", page)
    }

    return {
      dataTableItemsTotal,
      dataTableItemsPerPage,
      dataTableDataCurrent,
      dataTablePageCurrent,
      onSort,
      onItemsSelect,
      onPageChange
    }
  }
})
</script>
