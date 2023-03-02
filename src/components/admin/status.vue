<!-- Done Reviewing -->
<template>
  <div class="card card-flush py-4">
    <div class="card-header">
      <div class="card-title">
        <h2>Status</h2>
      </div>
      <div class="card-toolbar">
        <div id="add-status" :class="`rounded-circle w-15px h-15px ${color}`"></div>
      </div>
    </div>
    <div class="card-body pt-0">
      <label for="status" class="form-label sr-only">Select status</label>
      <el-form-item prop="status" class="mb-2">
        <el-select
          id="status"
          v-model="status"
          name="status"
          placeholder="Set status"
          @change="setColor">
          <el-option v-for="item in statuses" :key="item.id" :value="item.id" :label="item.name" />
        </el-select>
      </el-form-item>
      <div class="text-muted fs-7">Set status</div>
      <div v-if="status === 'scheduled'" class="mt-10">
        <label for="date-picker" class="form-label">Select publishing date and time</label>
        <el-form-item prop="date" class="mb-2">
          <el-date-picker
            id="date-picker"
            v-model="date"
            type="datetime"
            placeholder="Pick a date and time" />
        </el-form-item>
      </div>
    </div>
  </div>
</template>

<script>
import {defineComponent, ref, toRef, watch} from "vue"

export default defineComponent({
  name: "add-status",
  props: {default: {type: Number, required: false, default: null}},
  setup(props, {expose}) {
    const statuses = ref([
      {name: "Published", id: 0, color: "bg-success"},
      {name: "Draft", id: 1, color: "bg-info"},
      {name: "Scheduled", id: 2, color: "bg-warning"},
      {name: "In-Active", id: 3, color: "bg-danger"}
    ])

    const defaultRef = toRef(props, "default")
    const status = ref(null)
    const date = ref(null)
    const color = ref("bg-success")

    watch(
      () => defaultRef.value,
      (value) => {
        status.value = value
      }
    )

    const setColor = function setColor(value) {
      const selected = statuses.value.find((item) => Number(item.id) === Number(value))
      color.value = selected.color
    }

    expose({status, date})
    return {statuses, status, color, date, setColor}
  }
})
</script>
