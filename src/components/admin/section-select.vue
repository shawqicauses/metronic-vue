<!-- Done Reviewing -->
<template>
  <label :for="`${prop}-select`" :class="{'sr-only': !label}" class="form-label">{{ title }}</label>
  <el-form-item :prop="prop" class="mb-2">
    <el-select
      :id="`${prop}-select`"
      v-model="value"
      :name="`${prop}-select`"
      placeholder="Select an option"
      :multiple="attrs.multiple"
      :filterable="attrs.filterable"
      :allow-create="attrs['allow-create']">
      <template v-if="itemsRef && itemsRef.length > 0">
        <el-option v-for="item in itemsRef" :key="item.id" :value="item.id" :label="item.name" />
      </template>
    </el-select>
  </el-form-item>
  <div class="text-muted fs-7" :class="{'mb-7': create}">{{ note }}</div>
  <router-link v-if="create" :to="button.path" class="btn btn-light-primary btn-sm">
    <span class="svg-icon svg-icon-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="24"
        height="24"
        fill="none">
        <rect
          x="11"
          y="18"
          rx="1"
          width="12"
          height="2"
          transform="rotate(-90 11 18)"
          fill="currentColor"
          opacity="0.5" />
        <rect x="6" y="11" rx="1" width="12" height="2" fill="currentColor" />
      </svg>
    </span>
    {{ button.text }}
  </router-link>
</template>

<script>
import {defineComponent, ref, toRef} from "vue"

export default defineComponent({
  name: "add-section-select",
  props: {
    label: {type: Boolean, required: false, default: false},
    title: {type: String, required: true},
    prop: {type: String, required: true},
    items: {type: Array, required: true},
    note: {type: String, required: true},
    create: {type: Boolean, required: false, default: false},
    button: {type: Object, required: false, default: () => {}}
  },
  setup(props, {attrs, expose}) {
    const itemsRef = toRef(props, "items")
    const value = ref(null)
    expose({value})
    return {attrs, itemsRef, value}
  }
})
</script>
