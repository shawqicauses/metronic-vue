<!-- Done Reviewing: 29/01/2023 -->
<template>
  <div
    class="col-sm-12 col-md-5 d-flex align-items-center justify-content-center justify-content-md-start">
    <label for="items-per-page">
      <select
        v-if="itemsPerPageDropdownEnabled"
        id="items-per-page"
        v-model="dataTableItemsPerPage"
        name="items-per-page"
        class="form-select form-select-sm form-select-solid"
        @click="onItemsPerPageChange">
        <option :value="5">5</option>
        <option :value="10">10</option>
        <option :value="20">20</option>
        <option :value="30">30</option>
      </select>
    </label>
  </div>
</template>

<script>
import {computed, defineComponent, inject, onMounted, ref} from "vue"

export default defineComponent({
  name: "data-table-items-per-page-select",
  props: {
    itemsPerPage: {type: Number, required: false, default: 10},
    itemsPerPageDropdownEnabled: {type: Boolean, required: false, default: true},
    pageCurrent: {type: Number, required: true}
  },
  emits: ["update:itemsPerPage"],
  setup(props, {emit}) {
    const getDataTableBodyRows = inject("getDataTableBodyRows")
    const dataTableItemsPerPageInput = ref(10)

    const dataTableItemsPerPage = computed({
      get() {
        return props.itemsPerPage
      },
      set(value) {
        emit("update:itemsPerPage", value)
      }
    })

    const onItemsPerPageChange = function onItemsPerPageChange(event) {
      const param = [
        "?",
        "page",
        "=",
        props.pageCurrent,
        "&",
        "limit",
        "=",
        event.target.value
      ].join("")
      getDataTableBodyRows(param)
    }

    onMounted(() => {
      dataTableItemsPerPageInput.value = 10
    })

    return {
      dataTableItemsPerPage,
      onItemsPerPageChange
    }
  }
})
</script>
