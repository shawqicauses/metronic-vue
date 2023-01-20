<template>
  <tbody class="fw-semibold text-gray-600">
    <template v-for="(row, index) in data" :key="index">
      <tr>
        <td v-if="checkboxEnabled">
          <div class="form-check form-check-sm form-check-custom form-check-solid">
            <label :for="`${row[checkboxLabel]}-checkbox`" class="sr-only">Checkbox</label>
            <input
              :id="`${row[checkboxLabel]}-checkbox`"
              v-model="selectedItems"
              type="checkbox"
              :value="row[checkboxLabel]"
              class="form-check-input"
              @change="onChange" />
          </div>
        </td>
        <template v-for="(properties, column) in header" :key="column">
          <td :class="{'text-end': column === header.length - 1}">
            <slot :name="`${properties.columnLabel}`" :row="row">
              {{ row[prop] }}
            </slot>
          </td>
        </template>
      </tr>
    </template>
  </tbody>
</template>

<script>
import {defineComponent, ref, watch} from "vue"

export default defineComponent({
  name: "data-table-body-row",
  props: {
    header: {type: Array, required: true},
    data: {type: Array, required: true},
    checkboxEnabled: {type: Boolean, required: false, default: true},
    checkboxLabel: {type: String, required: false, default: "id"},
    currentlySelectedItems: {type: Array, required: false, default: () => []}
  },
  emits: ["on-select"],
  setup(props, {emit}) {
    const selectedItems = ref([])

    watch(
      () => [...props.currentlySelectedItems],
      (currentValue) => {
        if (props.currentlySelectedItems.length !== 0) {
          selectedItems.value = [...new Set([...selectedItems.value, ...currentValue])]
        } else {
          selectedItems.value = []
        }
      }
    )

    const onChange = function onChange() {
      emit("on-select", selectedItems.value)
    }

    return {
      selectedItems,
      onChange
    }
  }
})
</script>
