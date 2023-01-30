<!-- Done Reviewing: 30/01/2023 -->
<template>
  <modal-layout
    id="kt_modal_add_language"
    ref="addLanguageModal"
    header-id="kt_modal_add_language_header"
    close-id="kt_modal_add_language_close"
    title="Add Language"
    form-id="kt_modal_add_language_form"
    :form-model="language"
    :form-model-reset="modelReset"
    :form-rules="rules"
    scroll-id="kt_modal_add_language_scroll"
    @form-submit="submit">
    <div class="fv-row mb-7">
      <label for="language-name" class="required fw-semibold fs-6 mb-2">Name</label>
      <el-form-item prop="name" class="mb-0">
        <el-input
          id="language-name"
          v-model="language.name"
          type="text"
          name="language-name"
          placeholder="English" />
      </el-form-item>
    </div>
    <div class="fv-row mb-7">
      <label for="language-shortname" class="required fw-semibold fs-6 mb-2">Short Name</label>
      <el-form-item prop="shortname" class="mb-0">
        <el-input
          id="language-shortname"
          v-model="language.shortname"
          type="text"
          name="language-shortname"
          placeholder="EN" />
      </el-form-item>
    </div>
    <div class="fv-row mb-7">
      <label for="language-direction" class="required fw-semibold fs-6 mb-2">Direction</label>
      <el-form-item prop="direction" class="mb-0">
        <el-input
          id="language-direction"
          v-model="language.direction"
          type="text"
          name="language-direction"
          placeholder="LTR" />
      </el-form-item>
    </div>
    <div class="fv-row mb-7">
      <label for="language-direction-word" class="required fw-semibold fs-6 mb-2">
        Direction Word
      </label>
      <el-form-item prop="dirword" class="mb-0">
        <el-input
          id="language-direction-word"
          v-model="language.dirword"
          type="text"
          name="language-direction-word"
          placeholder="Left" />
      </el-form-item>
    </div>
    <div class="fv-row mb-7">
      <label for="language-icon" class="required fw-semibold fs-6 mb-2">Icon</label>
      <el-form-item prop="icon" class="mb-0">
        <el-input
          id="language-icon"
          v-model="language.icon"
          type="text"
          name="language-icon"
          placeholder="icon.svg" />
      </el-form-item>
    </div>
  </modal-layout>
</template>

<script>
import {hideModal, removeModalBackdrop} from "@/core/helpers/dom"
import Swal from "sweetalert2/dist/sweetalert2"
import {defineComponent, ref, toRef} from "vue"
import axiosClient from "../../../../plugins/axios"
import ModalLayout from "../../../layouts/admin/modal.vue"

export default defineComponent({
  name: "add-language-modal",
  components: {ModalLayout},
  props: {
    idCurrent: {type: Number, required: false, default: null},
    languageCurrent: {type: Object, require: false, default: null}
  },
  setup(props, {expose}) {
    const addLanguageModal = ref(null)
    const id = toRef(props, "idCurrent")
    const language = toRef(props, "languageCurrent")

    const rules = ref({
      name: [{required: true, trigger: "change", message: "Name is required"}],
      shortname: [{required: true, trigger: "change", message: "Short name is required"}],
      direction: [{required: true, trigger: "change", message: "Direction is required"}],
      dirword: [{required: true, trigger: "change", message: "Direction word is required"}],
      icon: [{required: true, trigger: "change", message: "Icon is required"}]
    })

    const submit = function submit() {
      if (!addLanguageModal.value.form) return
      addLanguageModal.value.form.validate((valid) => {
        if (valid) {
          addLanguageModal.value.loading = true
          axiosClient[id.value ? "put" : "post"](
            id.value ? `/languages/update/${id.value}` : "/languages/create",
            {
              name: language.value.name.toLowerCase(),
              shortname: language.value.shortname.toLowerCase(),
              direction: language.value.direction.toLowerCase(),
              dirword: language.value.dirword.toLowerCase(),
              icon: language.value.icon.toLowerCase(),
              main: 0,
              status: 1
            }
          )
            .then(() => {
              Swal.fire({
                icon: "success",
                text: "Language has successfully been added!",
                confirmButtonText: "Okay. Thank you!",
                buttonsStyling: false,
                customClass: {confirmButton: "btn btn-primary"}
              })

              hideModal(addLanguageModal.value.modal)
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
              addLanguageModal.value.loading = false
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
      language.value.name = null
      language.value.shortname = null
      language.value.direction = null
      language.value.dirword = null
      language.value.icon = null
    }

    expose({addLanguageModal})
    return {
      addLanguageModal,
      language,
      rules,
      modelReset,
      submit
    }
  }
})
</script>
