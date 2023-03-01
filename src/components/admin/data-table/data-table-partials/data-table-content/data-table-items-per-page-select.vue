<!-- Done Reviewing: 29/01/2023 -->
<template>
  <div
    class="col-sm-12 col-md-5 d-flex align-items-center justify-content-center justify-content-md-start">
    <label for="items-per-page">
      <el-select
        v-if="itemsPerPageDropdownEnabled"
        id="items-per-page"
        v-model="dataTableItemsPerPage"
        name="items-per-page">
        <el-option :value="5" :label="5" />
        <el-option :value="10" :label="10" />
        <el-option :value="20" :label="20" />
        <el-option :value="30" :label="30" />
      </el-select>
    </label>
  </div>
</template>

<script>
import {computed, defineComponent, onMounted, ref} from "vue"

export default defineComponent({
  name: "data-table-items-per-page-select",
  props: {
    itemsPerPage: {type: Number, required: false, default: 10},
    itemsPerPageDropdownEnabled: {type: Boolean, required: false, default: true},
    pageCurrent: {type: Number, required: true}
  },
  emits: ["update:itemsPerPage"],
  setup(props, {emit}) {
    const dataTableItemsPerPageInput = ref(10)
    const dataTableItemsPerPage = computed({
      get() {
        return props.itemsPerPage
      },
      set(value) {
        emit("update:itemsPerPage", value)
      }
    })

    onMounted(() => {
      dataTableItemsPerPageInput.value = 10
    })

    return {dataTableItemsPerPage}
  }
})
</script>
