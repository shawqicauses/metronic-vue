<template>
  <!-- Begin:Toolbar -->
  <toolbar />
  <!-- End:Toolbar -->
</template>

<script>
import {defineComponent} from "vue"
import Toolbar from "../../components/admin/dashboard/toolbar.vue"

export default defineComponent({name: "users-list", components: {Toolbar}})
</script>
