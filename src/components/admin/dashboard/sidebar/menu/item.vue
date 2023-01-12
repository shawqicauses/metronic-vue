<template>
  <!-- Begin:Menu Item -->
  <div data-kt-menu-trigger="click" class="menu-item menu-accordion">
    <!-- Begin:Menu Link -->
    <span class="menu-link">
      <span class="menu-icon">
        <!-- Begin:SVG Icon -->
        <span class="svg-icon svg-icon-2">
          <component :is="icon" />
        </span>
        <!-- End:SVG Icon -->
      </span>
      <span class="menu-title">{{ t(title) }}</span>
      <span class="menu-arrow"></span>
    </span>
    <!-- End:Menu Link -->
    <!-- Begin:Sub Menu -->
    <div v-if="children" class="menu-sub menu-sub-accordion">
      <!-- Begin:Menu Items -->
      <div v-for="child in children" :key="child.title" class="menu-item">
        <!-- Begin:Menu Link -->
        <router-link :to="`/dashboard/${child.link.replaceAll('.', '/')}`" class="menu-link">
          <span class="menu-bullet">
            <span class="bullet bullet-dot"></span>
          </span>
          <span class="menu-title">{{ t(child.title) }}</span>
        </router-link>
        <!-- End:Menu Link -->
      </div>
      <!-- End:Menu Items -->
    </div>
    <!-- End:Sub Menu -->
  </div>
  <!-- End:Menu Item -->
</template>

<script>
import {defineComponent} from "vue"
import {useI18n} from "vue-i18n"

export default defineComponent({
  name: "sidebar-menu-item",
  props: {
    title: {type: String, required: true},
    icon: {type: Object, required: true},
    children: {type: Array, required: false, default: null}
  },
  setup() {
    const {t} = useI18n({useScope: "global"})
    return {t}
  }
})
</script>
