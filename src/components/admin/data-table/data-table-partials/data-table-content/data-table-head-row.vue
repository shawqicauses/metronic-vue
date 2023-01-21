<template>
  <thead>
    <tr class="text-start text-gray-400 fw-bold fs-7 text-uppercase gs-0">
      <th v-if="checkboxEnabled" :style="{width: '30px'}">
        <div class="form-check form-check-sm form-check-custom form-check-solid me-3">
          <label for="table-head-checkbox" class="sr-only">Checkbox</label>
          <input
            id="table-head-checkbox"
            v-model="checked"
            type="checkbox"
            class="form-check-input"
            @change="selectAll" />
        </div>
      </th>
      <template v-for="(column, index) in header" :key="index">
        <th
          :class="{'text-end': index === header.length - 1}"
          :style="{
            minWidth: column.columnWidth ? `${column.columnWidth}px` : '0',
            width: 'auto',
            cursor: column.sortEnabled ? 'pointer' : 'auto'
          }"
          @click="onSort(column.columnLabel, column.sortEnabled)">
          {{ column.columnName }}
          <span
            v-if="columnLabelAndOrder.label === column.columnLabel && column.sortEnabled"
            v-html="sortArrow" />
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
  emits: ["on-select", "on-sort"],
  setup(props, {emit}) {
    const checked = ref(false)
    const columnLabelAndOrder = ref({
      label: props.sortLabel,
      order: props.sortOrder
    })

    watch(
      () => props.checkboxEnabledValue,
      (currentValue) => {
        checked.value = currentValue
      }
    )

    const selectAll = function selectAll() {
      emit("on-select", checked.value)
    }

    const onSort = function onSort(label, sortEnabled) {
      if (sortEnabled) {
        if (columnLabelAndOrder.value.label === label) {
          if (columnLabelAndOrder.value.order === "ASC".toLowerCase()) {
            columnLabelAndOrder.value.order = "DESC".toLowerCase()
          } else if (columnLabelAndOrder.value.order === "DESC".toLowerCase()) {
            columnLabelAndOrder.value.order = "ASC".toLowerCase()
          }
        } else {
          columnLabelAndOrder.value.order = "ASC".toLowerCase()
          columnLabelAndOrder.value.label = label
        }

        emit("on-sort", columnLabelAndOrder.value)
      }
    }

    const sortArrow = computed(() => {
      return columnLabelAndOrder.value.order === "ASC".toLowerCase() ? "&#x2191;" : "&#x2193;"
    })

    return {
      checked,
      columnLabelAndOrder,
      selectAll,
      onSort,
      sortArrow
    }
  }
})
</script>
