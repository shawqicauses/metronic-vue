<!-- Done Reviewing: 29/01/2023 -->
<template>
  <tbody class="fw-semibold text-gray-600">
    <template v-for="(row, index) in data" :key="index">
      <tr>
        <td v-if="checkboxEnabled">
          <div class="form-check form-check-sm form-check-custom form-check-solid">
            <label :for="`${row[checkboxLabel]}-checkbox`" class="sr-only">Checkbox</label>
            <input
              :id="`${row[checkboxLabel]}-checkbox`"
              v-model="dataTableItemsSelected"
              type="checkbox"
              :value="row[checkboxLabel]"
              class="form-check-input"
              @change="onCheckboxChange" />
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
import {defineComponent, onMounted, ref, watch} from "vue"

export default defineComponent({
  name: "data-table-body-row",
  props: {
    header: {type: Array, required: true},
    data: {type: Array, required: true},
    checkboxEnabled: {type: Boolean, required: false, default: true},
    checkboxLabel: {type: String, required: false, default: "id"},
    itemsSelectedCurrent: {type: Array, required: false, default: () => []}
  },
  emits: ["on-items-body-select"],
  setup(props, {emit}) {
    const dataTableItemsSelected = ref([])
    watch(
      () => [...props.itemsSelectedCurrent],
      (value) => {
        if (props.itemsSelectedCurrent.length !== 0)
          dataTableItemsSelected.value = [...new Set([...dataTableItemsSelected.value, ...value])]
        else dataTableItemsSelected.value = []
      }
    )

    const onCheckboxChange = function onCheckboxChange() {
      emit("on-items-body-select", dataTableItemsSelected.value)
    }

    onMounted(() => {
      KTMenu.init()
    })

    return {
      dataTableItemsSelected,
      onCheckboxChange
    }
  }
})
</script>
