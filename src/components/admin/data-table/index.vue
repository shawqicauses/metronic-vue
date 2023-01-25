<template>
  <div>
    <data-table-content
      :header="header"
      :footer="footer"
      :data="dataToDisplay"
      :checkbox-enabled="checkboxEnabled"
      :checkbox-label="checkboxLabel"
      :sort-label="sortLabel"
      :sort-order="sortOrder"
      :empty-table-text="emptyTableText"
      :loading="loading"
      @on-items-select="onItemsSelect"
      @on-sort="onSort">
      <template v-for="(slot, name) in $slots" #[name]="{row: item}">
        <slot :name="name" :row="item" />
      </template>
    </data-table-content>
    <data-table-footer
      v-model:itemsPerPage="itemsInTable"
      :items-per-page-dropdown-enabled="itemsPerPageDropdownEnabled"
      :count="totalItems"
      :footerData="footerData"
      @page-change="pageChange" />
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
    footer: {type: Object, required: true},
    data: {type: Array, required: true},
    checkboxEnabled: {type: Boolean, required: false, default: false},
    checkboxLabel: {type: String, required: false, default: "id"},
    total: {type: Number, required: false, default: 0},
    itemsPerPage: {type: Number, default: 10},
    itemsPerPageDropdownEnabled: {type: Boolean, required: true, default: true},
    sortLabel: {type: String, required: false, default: null},
    sortOrder: {type: String, required: false, default: "ASC"},
    emptyTableText: {type: String, required: false, default: "No Data Found"},
    loading: {type: Boolean, required: false, default: false}
  },
  emits: ["on-items-select", "on-items-per-page-change", "on-sort", "page-change"],
  setup(props, {emit}) {
    const currentPage = ref(1)
    const itemsInTable = ref(props.itemsPerPage)
    const footerData = ref(props.footer)

    //console.log("footer>>>>>>>>>>>>>>>>>>")
    console.log(props.footer)

    watch(
      () => itemsInTable.value,
      (value) => {
        currentPage.value = 1
        emit("on-items-per-page-change", value)
      }
    )

    const dataToDisplay = computed(() => {
      if (props.data) {
        if (props.data.length <= itemsInTable.value) return props.data
        const sliceFrom = (currentPage.value - 1) * itemsInTable.value
        return props.data.slice(sliceFrom, sliceFrom + itemsInTable.value)
      }

      return []
    })

    const totalItems = computed(() => {
      return props.footer.total
      if (props.data) {
        if (props.data.length <= itemsInTable.value) return props.total
        return props.data.length
      }

      return 0
    })

    const onItemsSelect = function onItemsSelect(itemsSelected) {
      emit("on-items-select", itemsSelected)
    }

    const onSort = function onSort(sort) {
      emit("on-sort", sort)
    }

    const pageChange = function pageChange(page) {
      currentPage.value = page
      emit("page-change", page)
    }

    return {
      dataToDisplay,
      totalItems,
      itemsInTable,
      footerData,
      onItemsSelect,
      onSort,
      pageChange
    }
  }
})
</script>
