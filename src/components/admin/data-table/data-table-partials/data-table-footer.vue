<template>
  <div class="row">
    <data-table-items-per-page-select
      v-model:itemsPerPage="itemsCountInTable"
      :items-per-page-dropdown-enabled="itemsPerPageDropdownEnabled" />
    <data-table-pagination
      v-if="pageCount > 1"
      :total="count"
      :total-pages="pageCount"
      :current-page="page"
      :per-page="itemsPerPage"
      @page-change="pageChange" />
  </div>
</template>

<script>
import {computed, defineComponent, onMounted, ref, watch} from "vue"
import DataTableItemsPerPageSelect from "./data-table-content/data-table-items-per-page-select.vue"
import DataTablePagination from "./data-table-content/data-table-pagination.vue"

export default defineComponent({
  name: "data-table-footer",
  components: {DataTableItemsPerPageSelect, DataTablePagination},
  props: {
    count: {type: Number, required: false, default: 5},
    itemsPerPage: {type: Number, default: 5},
    itemsPerPageDropdownEnabled: {type: Boolean, required: false, default: true}
  },
  emits: ["update:itemsPerPage", "page-change"],
  setup(props, {emit}) {
    const page = ref(1)
    const inputItemsPerPage = ref(5)

    watch(
      () => props.count,
      () => {
        page.value = 1
      }
    )

    watch(
      () => inputItemsPerPage.value,
      () => {
        page.value = 1
      }
    )

    const pageChange = function pageChange(newPage) {
      page.value = newPage
      emit("page-change", page.value)
    }

    const itemsCountInTable = computed({
      get() {
        return props.itemsPerPage
      },
      set(value) {
        inputItemsPerPage.value = value
        emit("update:itemsPerPage", value)
      }
    })

    const pageCount = computed(() => {
      return Math.ceil(props.count / itemsCountInTable.value)
    })

    onMounted(() => {
      inputItemsPerPage.value = props.itemsPerPage
    })

    return {
      page,
      pageCount,
      pageChange,
      itemsCountInTable,
      inputItemsPerPage
    }
  }
})
</script>
