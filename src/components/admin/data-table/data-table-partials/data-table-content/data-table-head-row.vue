<!-- Done Reviewing: 29/01/2023 -->
<template>
  <thead>
    <tr class="text-start text-gray-400 fw-bold fs-7 text-uppercase gs-0">
      <th v-if="checkboxEnabled" :style="{width: '30px'}">
        <div class="form-check form-check-sm form-check-custom form-check-solid me-3">
          <label for="table-head-checkbox" class="sr-only">Checkbox</label>
          <input
            id="table-head-checkbox"
            v-model="dataTableChecked"
            type="checkbox"
            class="form-check-input"
            @change="onCheckboxChange" />
        </div>
      </th>
      <template v-for="(column, index) in header" :key="index">
        <th
          :class="{'text-end': index === header.length - 1}"
          :style="{
            width: 'auto',
            minWidth: column.columnWidth ? `${column.columnWidth}px` : '0',
            cursor: column.sortEnabled ? 'pointer' : 'auto'
          }"
          @click="onSort(column.columnLabel, column.sortEnabled)">
          {{ column.columnName }}
          <span
            v-if="dataTableColumn.label === column.columnLabel && column.sortEnabled"
            v-html="sortArrow">
          </span>
        </th>
      </template>
    </tr>
  </thead>
</template>

<script>
import {computed, defineComponent, ref, watch} from "vue"

export default defineComponent({
  name: "data-table-head-row",
  props: {
    header: {type: Array, required: true},
    checkboxEnabled: {type: Boolean, required: false, default: false},
    checkboxEnabledValue: {type: Boolean, required: false, default: false},
    sortLabel: {type: String, required: false, default: null},
    sortOrder: {type: String, required: false, default: "ASC"}
  },
  emits: ["on-sort", "on-items-head-select"],
  setup(props, {emit}) {
    const dataTableChecked = ref(false)
    const dataTableColumn = ref({label: props.sortLabel, order: props.sortOrder})

    watch(
      () => props.checkboxEnabledValue,
      (value) => {
        dataTableChecked.value = value
      }
    )

    const sortArrow = computed(() => {
      return dataTableColumn.value.order === "ASC".toLowerCase() ? "&#x2191;" : "&#x2193;"
    })

    const onSort = function onSort(label, sortEnabled) {
      if (sortEnabled) {
        if (dataTableColumn.value.label === label) {
          if (dataTableColumn.value.order === "ASC".toLowerCase())
            dataTableColumn.value.order = "DESC".toLowerCase()
          else if (dataTableColumn.value.order === "DESC".toLowerCase())
            dataTableColumn.value.order = "ASC".toLowerCase()
        } else {
          dataTableColumn.value.label = label
          dataTableColumn.value.order = "ASC".toLowerCase()
        }

        emit("on-sort", dataTableColumn.value)
      }
    }

    const onCheckboxChange = function onCheckboxChange() {
      emit("on-items-head-select", dataTableChecked.value)
    }

    return {
      dataTableChecked,
      dataTableColumn,
      sortArrow,
      onSort,
      onCheckboxChange
    }
  }
})
</script>
