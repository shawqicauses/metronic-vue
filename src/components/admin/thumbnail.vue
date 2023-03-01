<!-- Done Reviewing -->
<template>
  <div class="card card-flush py-4">
    <div class="card-header">
      <div class="card-title">
        <h2>Thumbnail</h2>
      </div>
    </div>
    <div class="card-body text-center pt-0">
      <el-upload
        :action="action"
        :headers="{Authorization: `Bearer ${token}`}"
        :show-file-list="false"
        :before-upload="handleBeforeUpload"
        :on-success="handleOnSuccess"
        class="avatar-uploader mb-3">
        <img v-if="thumbnailRef" :src="thumbnailRef" alt="Uploaded File" class="avatar" />
        <el-icon v-else class="avatar-uploader-icon">
          <plus />
        </el-icon>
      </el-upload>
      <div class="text-muted fs-7">
        {{ note }}
      </div>
    </div>
  </div>
</template>

<script>
import {Plus} from "@element-plus/icons-vue"
import {computed, defineComponent, toRef} from "vue"
import {useStore} from "vuex"

export default defineComponent({
  name: "add-thumbnail",
  components: {Plus},
  props: {
    action: {type: String, required: true},
    thumbnail: {type: String, required: true},
    note: {type: String, required: true}
  },
  emits: ["on-success", "before-upload"],
  setup(props, {emit}) {
    const store = useStore()
    const token = computed(() => store.state.user.token)
    const thumbnailRef = toRef(props, "thumbnail")

    const handleOnSuccess = function handleOnSuccess(response, thumbnail) {
      emit("on-success", response, thumbnail)
    }

    const handleBeforeUpload = function handleBeforeUpload(thumbnail) {
      emit("before-upload", thumbnail)
    }

    return {
      token,
      thumbnailRef,
      handleOnSuccess,
      handleBeforeUpload
    }
  }
})
</script>

<style scoped>
.avatar-uploader .avatar {
  width: 100%;
  aspect-ratio: 1 / 1;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
  border: 0.0625rem dashed var(--el-border-color);
  border-radius: 0.25rem;
  transition: var(--el-transition-duration-fast);
  cursor: pointer;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 2rem;
  color: var(--el-border-color);
  width: 100%;
  height: 100%;
  text-align: center;
}
</style>
