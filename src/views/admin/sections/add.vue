<!-- Done Reviewing -->
<template>
  <toolbar :title="`Add ${section.charAt(0).toUpperCase() + section.slice(1)}`" />
  <div id="kt_app_content" class="app-content flex-column-fluid">
    <div id="kt_app_content_container" class="app-container container-xxl">
      <el-form :id="`add-${section}-form`" class="form d-flex flex-column flex-lg-row">
        <div class="d-flex flex-column gap-7 gap-lg-10 w-100 w-lg-300px mb-7 me-lg-10">
          <thumbnail
            :action="`https://kwctf.com/vue/laravel-vue-survey/public/api/medias/create`"
            :thumbnail="thumbnail"
            :note="`Set ${section} thumbnail image. Only .png and .jpg image files are accepted`"
            @before-upload="handleBeforeUpload"
            @on-success="handleOnSuccess" />
          <status ref="status" :default="parentDefault" />
          <div class="card card-flush py-4">
            <div class="card-header">
              <div class="card-title">
                <h2>{{ section.charAt(0).toUpperCase() + section.slice(1) }}</h2>
              </div>
            </div>
            <div class="card-body pt-0">
              <section-tree-select
                ref="parent"
                :label="false"
                :title="section"
                :prop="`category`"
                :items="sections"
                :note="`Add to ${section}`"
                :create="true"
                :button="{text: `Create a new ${section}`, path: '/'}" />
            </div>
          </div>
          <div class="card card-flush py-4">
            <div class="card-header">
              <div class="card-title">
                <h2>Tags</h2>
              </div>
            </div>
            <div class="card-body pt-0">
              <section-select
                ref="tags"
                :label="false"
                :title="`Tags`"
                :prop="`tags`"
                :items="[]"
                :note="`Add tags to ${section}`"
                :multiple="true"
                :filterable="true"
                :allow-create="true" />
            </div>
          </div>
        </div>
        <div class="d-flex flex-column flex-row-fluid gap-7 gap-lg-10">
          <languages-tabs v-slot="slot">
            <div class="card-body pt-0">
              <div class="mb-10 fv-row">
                <label :for="`${section}-name`" class="required form-label">
                  {{ section.charAt(0).toUpperCase() + section.slice(1) }} Name
                </label>
                <el-form-item class="mb-2">
                  <el-input
                    :id="`${section}-name`"
                    v-model="title[slot.language.id]"
                    type="text"
                    :name="`${section}-name`"
                    :placeholder="`${section.charAt(0).toUpperCase() + section.slice(1)} Name`" />
                </el-form-item>
                <div class="text-muted fs-7">
                  A {{ section }} name in
                  {{ slot.language.name.charAt(0).toUpperCase() + slot.language.name.slice(1) }} is
                  required and has to be unique
                </div>
              </div>
              <div class="fv-row">
                <label :for="`${section}-description`" class="form-label">
                  {{ section.charAt(0).toUpperCase() + section.slice(1) }} Description
                </label>
                <quill-editor
                  :id="`${section}-${slot.language.name}-description`"
                  :ref="setEditorsRefs"
                  :name="`${section}-description`"
                  :data-language-id="slot.language.id"
                  class="min-h-200px mb-2"></quill-editor>
                <div class="text-muted fs-7">
                  Set a description to {{ section }} for better visibility
                </div>
              </div>
            </div>
          </languages-tabs>
          <div class="card card-flush py-4">
            <div class="card-header">
              <div class="card-title">
                <h2>{{ section.charAt(0).toUpperCase() + section.slice(1) }} Name</h2>
              </div>
            </div>
            <div class="card-body pt-0">
              <div class="fv-row mb-2">
                <el-form-item prop="name">
                  <el-input
                    :id="`${section}-name`"
                    v-model="name"
                    type="text"
                    :name="`${section}-name`"
                    :placeholder="`${section.charAt(0).toUpperCase() + section.slice(1)} Name`" />
                </el-form-item>
                <div class="text-muted fs-7">
                  A {{ section }} name is required and has to be unique
                </div>
              </div>
            </div>
          </div>
          <div class="card card-flush py-4">
            <div class="card-header">
              <div class="card-title">
                <h2>Media</h2>
              </div>
            </div>
            <div class="card-body pt-0">
              <div class="fv-row mb-2">
                <el-upload drag multiple>
                  <el-icon class="fs-5x mb-4 text-gray-300">
                    <document-add />
                  </el-icon>
                  <div class="fs-5 fw-medium text-gray-700 mb-1">
                    Drop files here or click to upload
                  </div>
                  <div class="fs-7 fw-normal text-gray-500">Upload up to 10 files</div>
                  <template #tip>
                    <div class="text-muted fs-7 mt-2">Set {{ section }} media gallery</div>
                  </template>
                </el-upload>
              </div>
            </div>
          </div>
          <div class="d-flex justify-content-end">
            <a id="cancel" href="/" class="btn btn-light me-5">Cancel</a>
            <button
              id="submit"
              type="submit"
              class="btn btn-primary"
              @click.prevent="submit"
              @keypress.prevent="click">
              <span class="indicator-label">Save Changes</span>
              <span class="indicator-progress">
                Please wait ...
                <span class="spinner-border spinner-border-sm align-middle ms-2"></span>
              </span>
            </button>
          </div>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import Toolbar from "@/components/admin/dashboard/toolbar.vue"
import LanguagesTabs from "@/components/admin/languages-tabs.vue"
import SectionSelect from "@/components/admin/section-select.vue"
import SectionTreeSelect from "@/components/admin/section-tree-select.vue"
import Status from "@/components/admin/status.vue"
import Thumbnail from "@/components/admin/thumbnail.vue"
import {DocumentAdd} from "@element-plus/icons-vue"
import {QuillEditor} from "@vueup/vue-quill"
import {ElMessage as Message} from "element-plus"
import {defineComponent, onBeforeMount, onMounted, ref} from "vue"
import {useRoute} from "vue-router"
import {useStore} from "vuex"
import axiosClient from "../../../plugins/axios"

export default defineComponent({
  name: "add-sections",
  components: {
    Toolbar,
    Thumbnail,
    Status,
    LanguagesTabs,
    SectionTreeSelect,
    SectionSelect,
    QuillEditor,
    DocumentAdd
  },
  setup() {
    const route = useRoute()
    const store = useStore()
    const {section, id} = route.params
    const sections = ref(null)

    const thumbnail = ref(null)
    const name = ref(null)
    const title = ref({})
    const description = ref({})
    const status = ref(null)
    const parent = ref(null)
    const parentDefault = ref(null)
    const tags = ref([])
    const editors = ref([])

    const setEditorsRefs = function setEditorsRefs(editor) {
      if (editor && editor.getEditor()) {
        const editorId = editor.getEditor().getAttribute("data-language-id")
        editors.value.push({id: editorId, editor})
      }
    }

    const submit = function submit() {
      const createDescriptions = function createDescriptions() {
        editors.value.forEach((editor) => {
          description.value[editor.id] = editor.editor.getHTML()
        })
      }

      const createLanguages = function createLanguages(...args) {
        const {languages} = store.state
        const languagesArray = []

        languages.forEach((language) => {
          languagesArray.push({
            [["lang", "id"].join("")]: Number(language.id)
          })
        })

        args.forEach((arg) => {
          // eslint-disable-next-line
          for (const key in arg.values) {
            languagesArray.forEach((language) => {
              if (Number(key) === language[["lang", "id"].join("")]) {
                // eslint-disable-next-line
                language[arg.key] = arg.values[key]
              }
            })
          }
        })

        return languagesArray
      }

      createDescriptions()
      createLanguages(
        {key: "title", values: title.value},
        {key: "description", values: description.value}
      )

      axiosClient.post(id ? `/${section}/update/${id}` : `/${section}/create`, {
        name: name.value,
        [["parent", "id"].join("_")]: parent.value.value.value || 0,
        status: status.value.status,
        langs: createLanguages(
          {key: "title", values: title.value},
          {key: "description", values: description.value}
        )
      })
    }

    const handleOnSuccess = (response, file) => {
      thumbnail.value = URL.createObjectURL(file.raw)
    }

    const handleBeforeUpload = (file) => {
      if (file.type !== "image/jpeg") {
        Message.error("Avatar picture must be JPG format!")
        return false
      }

      if (file.size / 1024 / 1024 > 2) {
        Message.error("Avatar picture size can not exceed 2 MB!")
        return false
      }

      return true
    }

    onBeforeMount(() => {
      if (id) {
        axiosClient.get(`/${section}/show/${id}`).then((response) => {
          const {languages} = store.state
          const data = response.data.result

          name.value = data.name
          parentDefault.value = data[["parent", "id"].join("_")]

          languages.forEach((language) => {
            data.langs.forEach((lang) => {
              if (Number(language.id) === Number(lang[["lang", "id"].join("")])) {
                title.value[language.id] = lang.title
                editors.value.forEach((editor) => {
                  if (Number(language.id) === Number(editor.id)) {
                    editor.editor.setHTML(lang.description)
                  }
                })
              }
            })
          })
        })
      }
    })

    onMounted(() => {
      axiosClient.get(`/${section}`).then((response) => {
        sections.value = response.data.result.data
      })
    })

    return {
      section,
      sections,
      thumbnail,
      name,
      title,
      description,
      status,
      parent,
      parentDefault,
      tags,
      setEditorsRefs,
      handleOnSuccess,
      handleBeforeUpload,
      submit
    }
  }
})
</script>
