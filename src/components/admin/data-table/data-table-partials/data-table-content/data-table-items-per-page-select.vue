<template>
  <div
    class="col-sm-12 col-md-5 d-flex align-items-center justify-content-center justify-content-md-start">
    <label for="items-per-page">
      <select
        v-if="itemsPerPageDropdownEnabled"
        id="items-per-page"
        @click="onChangePerPage"
        v-model="itemsCountInTable"
        name="items-per-page"
        class="form-select form-select-sm form-select-solid">
        <option :value="10">10</option>
        <option :value="20">20</option>
        <option :value="30">30</option>
      </select>
    </label>
  </div>
</template>

<script>
import {computed, defineComponent, onMounted, inject, ref} from "vue"

export default defineComponent({
  name: "data-table-items-per-page-select",
  props: {
    itemsPerPage: {type: Number, default: 10},
    currentPage: {type: Number, required: true},
    itemsPerPageDropdownEnabled: {type: Boolean, required: false, default: true}
  },
  emits: ["update:itemsPerPage"],
  setup(props, {emit}) {
    const inputItemsPerPage = ref(10)

    const getRows = inject("getRows")

    const onChangePerPage = function onChangePerPage(event) {
      console.log("perPage>>>><<<<" + event.target.value)
      getRows("?page=" + props.currentPage + "&limit=" + event.target.value)
    }

    const itemsCountInTable = computed({
      get() {
        return props.itemsPerPage
      },
      set(value) {
        emit("update:itemsPerPage", value)
      }
    })

    onMounted(() => {
      inputItemsPerPage.value = 10
    })

    return {
      itemsCountInTable,
      onChangePerPage
    }
  }
})
</script>
