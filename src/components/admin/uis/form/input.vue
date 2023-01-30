<!-- Done Reviewing: 30/01/2023 -->
<template>
  <label :for="id" class="sr-only">{{ label }}</label>
  <input
    :id="id"
    ref="formInput"
    :type="type"
    :name="name"
    :placeholder="placeholder"
    :autocomplete="autocomplete"
    :value="formInputValue"
    class="form-control form-control-solid form-control-lg"
    @input="updateFormInputValue" />
</template>

<script>
import {defineComponent, ref} from "vue"

export default defineComponent({
  name: "form-input",
  props: {
    id: {type: String, required: true},
    label: {type: String, required: true},
    type: {type: String, required: true},
    name: {type: String, required: true},
    placeholder: {type: String, required: true},
    autocomplete: {type: String, required: true},
    formInputValue: {type: String, default: null}
  },
  emits: ["update:formInputValue", "handleFormPasswordInput"],
  setup(props, {emit, expose}) {
    const formInput = ref(null)
    const updateFormInputValue = function updateFormInputValue(event) {
      emit("update:formInputValue", event.target.value)
      if (event.target.name === "password") emit("handleFormPasswordInput", event.target.value)
    }

    expose({formInput})
    return {formInput, updateFormInputValue}
  }
})
</script>
