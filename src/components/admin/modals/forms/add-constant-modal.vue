<!-- Done Reviewing: 30/01/2023 -->
<template>
  <modal-layout
    id="kt_modal_add_constant"
    ref="addConstantModal"
    header-id="kt_modal_add_constant_header"
    close-id="kt_modal_add_constant_close"
    title="Add Constant"
    form-id="kt_modal_add_constant_form"
    :form-model="constant"
    :form-model-reset="modelReset"
    :form-rules="rules"
    scroll-id="kt_modal_add_constant_scroll"
    @form-submit="submit">
    <div class="fv-row mb-7">
      <label for="constant-name" class="required fw-semibold fs-6 mb-2">Name</label>
      <el-form-item prop="name" class="mb-0">
        <el-input
          id="constant-name"
          v-model="constant.name"
          type="text"
          name="constant-name"
          placeholder="English" />
      </el-form-item>
    </div>
    <div v-for="language in languages" :key="language.name" class="fv-row mb-7">
      <label :for="`language-${language.id}`" class="required fw-semibold fs-6 mb-2">
        {{ language.name.charAt(0).toUpperCase() + language.name.slice(1) }}
      </label>
      <el-form-item :prop="language.name" class="mb-0">
        <el-input
          :id="`language-${language.id}`"
          v-model="constant[language.name]"
          type="text"
          :name="`language-${language.id}`"
          :placeholder="`${
            language.name.charAt(0).toUpperCase() + language.name.slice(1)
          } Translation`" />
      </el-form-item>
    </div>
  </modal-layout>
</template>

<script>
import {hideModal, removeModalBackdrop} from "@/core/helpers/dom"
import Swal from "sweetalert2/dist/sweetalert2"
import {defineComponent, onBeforeUpdate, onUpdated, ref, toRef} from "vue"
import axiosClient from "../../../../plugins/axios"
import ModalLayout from "../../../layouts/admin/modal.vue"

export default defineComponent({
  name: "add-constant-modal",
  components: {ModalLayout},
  props: {
    idCurrent: {type: Number, required: false, default: null},
    constantName: {type: String, require: false, default: null},
    constantCurrent: {type: Object, require: false, default: null}
  },
  setup(props, {expose}) {
    const addConstantModal = ref(null)
    const id = toRef(props, "idCurrent")
    const constantName = toRef(props, "constantName")
    const constant = toRef(props, "constantCurrent")
    const rules = ref({name: [{required: true, trigger: "change", message: "Name is required"}]})

    const languages = ref([])
    onUpdated(() => {
      axiosClient.get("/locales/langs").then((response) => {
        languages.value = response.data.data
        languages.value.forEach((language) => {
          rules.value[language.name] = [
            {
              required: true,
              trigger: "change",
              message: `${language.name} is required`
            }
          ]
          if (id.value) {
            if (constant.value.trans) {
              constant.value.trans.forEach((translation) => {
                if (translation[["lang", "id"].join("")] === language.id)
                  constant.value[language.name] = translation.title
              })
            }
          }
        })
      })
    })

    onBeforeUpdate(() => {
      addConstantModal.value.form.resetFields()
    })

    const submit = function submit() {
      if (!addConstantModal.value.form) return
      addConstantModal.value.form.validate((valid) => {
        if (valid) {
          const createTranslations = function createTranslations() {
            const translations = []
            languages.value.forEach((language) => {
              if (constant.value[language.name]) {
                translations.push({
                  [["lang", "id"].join("")]: language.id,
                  title: constant.value[language.name]
                })
              }
            })

            return translations
          }

          addConstantModal.value.loading = true
          axiosClient[id.value ? "put" : "post"](
            id.value
              ? `/${constantName.value}/update/${id.value}`
              : `/${constantName.value}/create`,
            {name: constant.value.name, trans: createTranslations()}
          )
            .then(() => {
              Swal.fire({
                icon: "success",
                text: "Constant has successfully been added!",
                confirmButtonText: "Okay. Thank you!",
                buttonsStyling: false,
                customClass: {confirmButton: "btn btn-primary"}
              })

              hideModal(addConstantModal.value.modal)
              removeModalBackdrop()
            })
            .catch(() => {
              Swal.fire({
                icon: "error",
                text: "Sorry. Looks like there are some errors detected. Please try again.",
                confirmButtonText: "Okay. Got it!",
                buttonsStyling: false,
                customClass: {confirmButton: "btn btn-danger"}
              })
            })
            .finally(() => {
              addConstantModal.value.loading = false
            })
        } else {
          Swal.fire({
            icon: "error",
            text: "Sorry. Looks like there are some errors detected. Please try again.",
            confirmButtonText: "Okay. Got it!",
            buttonsStyling: false,
            customClass: {confirmButton: "btn btn-danger"}
          })

          return false
        }
      })
    }

    const modelReset = function modelReset() {
      Object.entries(constant.value).forEach(([key]) => {
        constant.value[key] = null
      })
    }

    expose({addConstantModal})
    return {
      addConstantModal,
      constant,
      rules,
      languages,
      modelReset,
      submit
    }
  }
})
</script>
