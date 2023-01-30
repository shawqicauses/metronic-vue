<!-- Done Reviewing: 29/01/2023 -->
<template>
  <div class="table-responsive">
    <table
      :class="[loading && 'overlay overlay-black']"
      class="table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer">
      <data-table-head-row
        :header="header"
        :checkbox-enabled="checkboxEnabled"
        :checkbox-enabled-value="dataTableCheck"
        :sort-label="sortLabel"
        :sort-order="sortOrder"
        @on-sort="onSort"
        @on-items-head-select="onItemsHeadSelect" />
      <data-table-body-row
        v-if="data.length !== 0"
        :header="header"
        :data="data"
        :checkbox-enabled="checkboxEnabled"
        :checkbox-label="checkboxLabel"
        :items-selected-current="dataTableItemsSelected"
        @on-items-body-select="onItemsBodySelect">
        <template v-for="(slot, name) in $slots" #[name]="{row: item}">
          <slot :name="name" :row="item" />
        </template>
      </data-table-body-row>
      <template v-else>
        <tr class="odd">
          <td colspan="7" class="dataTables_empty">
            {{ dataTableEmptyText }}
          </td>
        </tr>
      </template>
      <loading v-if="loading" />
    </table>
  </div>
</template>

<script>
import {defineComponent, onMounted, ref, watch} from "vue"
import Loading from "../loading.vue"
import DataTableBodyRow from "./data-table-body-row.vue"
import DataTableHeadRow from "./data-table-head-row.vue"

export default defineComponent({
  name: "data-table-content",
  components: {DataTableHeadRow, DataTableBodyRow, Loading},
  props: {
    header: {type: Array, required: true},
    data: {type: Array, required: true},
    checkboxEnabled: {type: Boolean, required: false, default: true},
    checkboxLabel: {type: String, required: false, default: "id"},
    sortLabel: {type: String, required: false, default: null},
    sortOrder: {type: String, required: false, default: "ASC"},
    dataTableEmptyText: {type: String, required: false, default: "The Table Is Empty"},
    loading: {type: Boolean, required: false, default: false}
  },
  emits: ["on-sort", "on-items-select"],
  setup(props, {emit}) {
    const dataTableItemsSelected = ref([])
    const dataTableItemsSelectedCopy = ref([])
    const dataTableCheck = ref(false)

    watch(
      () => props.data,
      () => {
        dataTableItemsSelected.value = []
        dataTableItemsSelectedCopy.value = []
        dataTableCheck.value = false

        props.data.forEach((item) => {
          if (item[props.checkboxLabel]) {
            dataTableItemsSelectedCopy.value.push(item[props.checkboxLabel])
          }
        })
      }
    )

    watch(
      () => [...dataTableItemsSelected.value],
      (value) => {
        if (value) emit("on-items-select", value)
      }
    )

    const onSort = function onSort(sort) {
      emit("on-sort", sort)
    }

    const onItemsHeadSelect = function onItemsHeadSelect(checked) {
      dataTableCheck.value = checked
      if (checked)
        dataTableItemsSelected.value = [
          ...new Set([...dataTableItemsSelected.value, ...dataTableItemsSelectedCopy.value])
        ]
      else dataTableItemsSelected.value = []
    }

    const onItemsBodySelect = function onItemsBodySelect(value) {
      dataTableItemsSelected.value = []
      value.forEach((item) => {
        if (!dataTableItemsSelected.value.includes(item)) dataTableItemsSelected.value.push(item)
      })
    }

    onMounted(() => {
      dataTableItemsSelected.value = []
      dataTableItemsSelectedCopy.value = []
      dataTableCheck.value = false

      props.data.forEach((item) => {
        if (item[props.checkboxLabel]) {
          dataTableItemsSelectedCopy.value.push(item[props.checkboxLabel])
        }
      })
    })

    return {
      dataTableItemsSelected,
      dataTableCheck,
      onSort,
      onItemsHeadSelect,
      onItemsBodySelect
    }
  }
})
</script>
