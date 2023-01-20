<template>
  <div class="table-responsive">
    <table
      :class="[loading && 'overlay overlay-black']"
      class="table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer">
      <data-table-head-row
        :checkbox-enabled="checkboxEnabled"
        :checkbox-enabled-value="check"
        :sort-label="sortLabel"
        :sort-order="sortOrder"
        :header="header"
        @on-sort="onSort"
        @on-select="selectAll" />
      <data-table-body-row
        v-if="data.length !== 0"
        :header="header"
        :data="data"
        :checkbox-enabled="checkboxEnabled"
        :checkbox-label="checkboxLabel"
        :currently-selected-items="selectedItems"
        @on-select="itemsSelect">
        <template v-for="(slot, name) in $slots" #[name]="{row: item}">
          <slot :name="name" :row="item" />
        </template>
      </data-table-body-row>
      <template v-else>
        <tr class="odd">
          <td colspan="7" class="dataTables_empty">
            {{ emptyTableText }}
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
    emptyTableText: {type: String, required: false, default: "No Data Found"},
    loading: {type: Boolean, required: false, default: false}
  },
  emits: ["on-items-select", "on-sort"],
  setup(props, {emit}) {
    const selectedItems = ref([])
    const allSelectedItems = ref([])
    const check = ref(false)

    watch(
      () => props.data,
      () => {
        selectedItems.value = []
        allSelectedItems.value = []
        check.value = false

        props.data.forEach((item) => {
          if (item[props.checkboxLabel]) {
            allSelectedItems.value.push(item[props.checkboxLabel])
          }
        })
      }
    )

    const selectAll = function selectAll(checked) {
      check.value = checked
      if (checked) {
        selectedItems.value = [...new Set([...selectedItems.value, ...allSelectedItems.value])]
      } else {
        selectedItems.value = []
      }
    }

    const itemsSelect = function itemsSelect(value) {
      selectedItems.value = []
      value.forEach((item) => {
        if (!selectedItems.value.includes(item)) selectedItems.value.push(item)
      })
    }

    const onSort = function onSort(sort) {
      emit("on-sort", sort)
    }

    watch(
      () => [...selectedItems.value],
      (currentValue) => {
        if (currentValue) emit("on-items-select", currentValue)
      }
    )

    onMounted(() => {
      selectedItems.value = []
      allSelectedItems.value = []
      check.value = false

      props.data.forEach((item) => {
        if (item[props.checkboxLabel]) {
          allSelectedItems.value.push(item[props.checkboxLabel])
        }
      })
    })

    return {
      selectedItems,
      check,
      selectAll,
      itemsSelect,
      onSort
    }
  }
})
</script>
