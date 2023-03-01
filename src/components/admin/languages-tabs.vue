<!-- Done Reviewing -->
<template>
  <ul
    class="nav nav-custom nav-tabs nav-line-tabs nav-line-tabs-2x border-0 fs-4 fw-semibold mb-n2">
    <li v-for="language in languages" :key="language.name" class="nav-item">
      <a
        :href="`#${language.name}`"
        :data-bs-toggle="`tab`"
        :class="{active: language.name === languages[0].name}"
        class="nav-link text-active-primary pb-4">
        {{ language.name.charAt(0).toUpperCase() + language.name.slice(1) }}
      </a>
    </li>
  </ul>
  <div class="tab-content">
    <div
      v-for="language in languages"
      :id="`${language.id}`"
      :key="language.id"
      :role="['tab', 'panel'].join('')"
      :class="{'show active': language.name === languages[0].name}"
      class="tab-pane fade">
      <div class="d-flex flex-column gap-7 gap-lg-10">
        <div class="card card-flush py-4">
          <div class="card-header">
            <div class="card-title">
              <h2>{{ language.name.charAt(0).toUpperCase() + language.name.slice(1) }}</h2>
            </div>
          </div>
          <slot :language="language"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {computed, defineComponent} from "vue"
import {useStore} from "vuex"

export default defineComponent({
  name: "add-languages-tabs",
  props: {},
  setup() {
    const store = useStore()
    const languages = computed(() => store.state.languages)
    return {languages}
  }
})
</script>
