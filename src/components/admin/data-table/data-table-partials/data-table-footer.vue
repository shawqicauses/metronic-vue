<template>
  <div class="row">
    <data-table-items-per-page-select
      v-model:itemsPerPage="itemsCountInTable"
      :current-page="page"
      :items-per-page-dropdown-enabled="itemsPerPageDropdownEnabled" />
    <data-table-pagination
      v-if="pageCount > 1"
      :total="count"
      :total-pages="pageCount"
      :current-page="page"
      :per-page="itemsPerPage"
      :paginationInfo="paginationData"
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
    footerData: {type: Object, required: true},
    itemsPerPageDropdownEnabled: {type: Boolean, required: false, default: true}
  },
  emits: ["update:itemsPerPage", "page-change"],
  setup(props, {emit}) {
    const page = ref(props.footerData.current_page)
    const inputItemsPerPage = ref(props.footerData.per_page)
    const paginationData = ref(props.footerData)

    console.log("count>>>>>>>>>>>>>>>>>>>" + props.count)
    //console.log("footerData>>>>>>>>>>>>>>>>>>>")
    //console.log(props.footerData)

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
      paginationData,
      itemsCountInTable,
      inputItemsPerPage
    }
  }
})
</script>
