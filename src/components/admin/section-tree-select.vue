<!-- Done Reviewing -->
<template>
  <section-select
    ref="value"
    :label="label"
    :title="title"
    :prop="prop"
    :items="itemsRef"
    :note="note"
    :create="create"
    :button="button"
    :="attrs" />
</template>

<script>
import {defineComponent, ref, toRef} from "vue"
import SectionSelect from "./section-select.vue"

export default defineComponent({
  name: "add-section-tree-select",
  components: {SectionSelect},
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
