<!-- Done Reviewing: 29/01/2023 -->
<template>
  <div
    class="col-sm-12 col-md-7 d-flex align-items-center justify-content-center justify-content-md-end">
    <div class="dataTables_paginate paging_simple_numbers">
      <ul class="pagination">
        <li
          class="paginate_button page-item"
          :class="{disabled: isInFirstPage}"
          :style="{cursor: !isInFirstPage ? 'pointer' : 'auto'}">
          <a
            aria-label="first-link"
            class="page-link"
            @click="onClickFirstPage"
            @keypress="onClickFirstPage">
            <span class="svg-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="none">
                <path
                  d="M14.2657 11.4343L18.45 7.25C18.8642 6.83579 18.8642 6.16421 18.45 5.75C18.0358 5.33579 17.3642 5.33579 16.95 5.75L11.4071 11.2929C11.0166 11.6834 11.0166 12.3166 11.4071 12.7071L16.95 18.25C17.3642 18.6642 18.0358 18.6642 18.45 18.25C18.8642 17.8358 18.8642 17.1642 18.45 16.75L14.2657 12.5657C13.9533 12.2533 13.9533 11.7467 14.2657 11.4343Z"
                  fill="currentColor"
                  opacity="0.5"></path>
                <path
                  d="M8.2657 11.4343L12.45 7.25C12.8642 6.83579 12.8642 6.16421 12.45 5.75C12.0358 5.33579 11.3642 5.33579 10.95 5.75L5.40712 11.2929C5.01659 11.6834 5.01659 12.3166 5.40712 12.7071L10.95 18.25C11.3642 18.6642 12.0358 18.6642 12.45 18.25C12.8642 17.8358 12.8642 17.1642 12.45 16.75L8.2657 12.5657C7.95328 12.2533 7.95328 11.7467 8.2657 11.4343Z"
                  fill="currentColor"></path>
              </svg>
            </span>
          </a>
        </li>
        <li
          class="paginate_button page-item"
          :class="{disabled: isInFirstPage}"
          :style="{cursor: !isInFirstPage ? 'pointer' : 'auto'}">
          <a
            aria-label="previous-page"
            class="page-link"
            @click="onClickPreviousPage"
            @keypress="onClickPreviousPage">
            <span class="svg-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="none">
                <path
                  d="M11.2657 11.4343L15.45 7.25C15.8642 6.83579 15.8642 6.16421 15.45 5.75C15.0358 5.33579 14.3642 5.33579 13.95 5.75L8.40712 11.2929C8.01659 11.6834 8.01659 12.3166 8.40712 12.7071L13.95 18.25C14.3642 18.6642 15.0358 18.6642 15.45 18.25C15.8642 17.8358 15.8642 17.1642 15.45 16.75L11.2657 12.5657C10.9533 12.2533 10.9533 11.7467 11.2657 11.4343Z"
                  fill="currentColor"></path>
              </svg>
            </span>
          </a>
        </li>
        <li
          v-for="(page, index) in dataTablePages"
          :key="index"
          class="paginate_button page-item"
          :class="{active: isPageActive(page.name)}"
          :style="{cursor: !page.isDisabled ? 'pointer' : 'auto'}">
          <a class="page-link" @click="onClickPage(page.name)" @keypress="onClickPage(page.name)">
            {{ page.name }}
          </a>
        </li>
        <li
          class="paginate_button page-item"
          :class="{disabled: isInLastPage}"
          :style="{cursor: !isInLastPage ? 'pointer' : 'auto'}">
          <a
            aria-label="last-page"
            class="paginate_button page-link"
            @click="onClickNextPage"
            @keypress="onClickNextPage">
            <span class="svg-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="none">
                <path
                  d="M12.6343 12.5657L8.45001 16.75C8.0358 17.1642 8.0358 17.8358 8.45001 18.25C8.86423 18.6642 9.5358 18.6642 9.95001 18.25L15.4929 12.7071C15.8834 12.3166 15.8834 11.6834 15.4929 11.2929L9.95001 5.75C9.5358 5.33579 8.86423 5.33579 8.45001 5.75C8.0358 6.16421 8.0358 6.83579 8.45001 7.25L12.6343 11.4343C12.9467 11.7467 12.9467 12.2533 12.6343 12.5657Z"
                  fill="currentColor"></path>
              </svg>
            </span>
          </a>
        </li>
        <li
          class="paginate_button page-item"
          :class="{disabled: isInLastPage}"
          :style="{cursor: !isInLastPage ? 'pointer' : 'auto'}">
          <a
            aria-label="last-link"
            class="paginate_button page-link"
            @click="onClickLastPage"
            @keypress="onClickLastPage">
            <span class="svg-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="none">
                <path
                  d="M9.63433 11.4343L5.45001 7.25C5.0358 6.83579 5.0358 6.16421 5.45001 5.75C5.86423 5.33579 6.5358 5.33579 6.95001 5.75L12.4929 11.2929C12.8834 11.6834 12.8834 12.3166 12.4929 12.7071L6.95001 18.25C6.5358 18.6642 5.86423 18.6642 5.45001 18.25C5.0358 17.8358 5.0358 17.1642 5.45001 16.75L9.63433 12.5657C9.94675 12.2533 9.94675 11.7467 9.63433 11.4343Z"
                  fill="currentColor"
                  opacity="0.5"></path>
                <path
                  d="M15.6343 11.4343L11.45 7.25C11.0358 6.83579 11.0358 6.16421 11.45 5.75C11.8642 5.33579 12.5358 5.33579 12.95 5.75L18.4929 11.2929C18.8834 11.6834 18.8834 12.3166 18.4929 12.7071L12.95 18.25C12.5358 18.6642 11.8642 18.6642 11.45 18.25C11.0358 17.8358 11.0358 17.1642 11.45 16.75L15.6343 12.5657C15.9467 12.2533 15.9467 11.7467 15.6343 11.4343Z"
                  fill="currentColor"></path>
              </svg>
            </span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {computed, defineComponent, inject} from "vue"
import createQueryString from "../../../../../core/helpers/query-string"

export default defineComponent({
  name: "data-table-pagination",
  props: {
    itemsTotal: {type: Number, required: true},
    itemsPerPage: {type: Number, required: true},
    pageTotal: {type: Number, required: true},
    pageCurrent: {type: Number, required: true},
    maxVisibleButtons: {type: Number, required: false, default: 5}
  },
  emits: ["on-page-change"],
  setup(props, {emit}) {
    const getDataTableBodyRows = inject("getDataTableBodyRows")
    const dataTableStartPage = computed(() => {
      if (
        props.pageTotal < props.maxVisibleButtons ||
        props.pageCurrent === 1 ||
        props.pageCurrent <= Math.floor(props.maxVisibleButtons / 2) ||
        (props.pageCurrent + 2 > props.pageTotal && props.pageTotal === props.maxVisibleButtons)
      ) {
        return 1
      }

      if (props.pageCurrent + 2 > props.pageTotal) {
        return props.pageTotal - props.maxVisibleButtons + 1
      }

      return props.pageCurrent - 2
    })

    const dataTableEndPage = computed(() => {
      return Math.min(dataTableStartPage.value + props.maxVisibleButtons - 1, props.pageTotal)
    })

    const dataTablePages = computed(() => {
      const range = []
      for (let index = dataTableStartPage.value; index <= dataTableEndPage.value; index += 1) {
        range.push({
          name: index,
          isDisabled: index === props.pageCurrent
        })
      }

      return range
    })

    const isInFirstPage = computed(() => {
      return props.pageCurrent === 1
    })

    const isInLastPage = computed(() => {
      return props.pageCurrent === props.pageTotal
    })

    const onClickFirstPage = function onClickFirstPage() {
      const queryString = createQueryString(1, props.itemsPerPage)
      getDataTableBodyRows(queryString)
      emit("on-page-change", 1)
    }

    const onClickPreviousPage = function onClickPreviousPage() {
      const queryString = createQueryString(props.pageCurrent - 1, props.itemsPerPage)
      getDataTableBodyRows(queryString)
      emit("on-page-change", props.pageCurrent - 1)
    }

    const onClickPage = function onClickPage(page) {
      const queryString = createQueryString(page, props.itemsPerPage)
      getDataTableBodyRows(queryString)
      emit("on-page-change", page)
    }

    const onClickNextPage = function onClickNextPage() {
      const queryString = createQueryString(props.pageCurrent + 1, props.itemsPerPage)
      getDataTableBodyRows(queryString)
      emit("on-page-change", props.pageCurrent + 1)
    }

    const onClickLastPage = function onClickLastPage() {
      const queryString = createQueryString(props.pageTotal, props.itemsPerPage)
      getDataTableBodyRows(queryString)
      emit("on-page-change", props.pageTotal)
    }

    const isPageActive = function isPageActive(page) {
      return props.pageCurrent === page
    }

    return {
      dataTableStartPage,
      dataTableEndPage,
      dataTablePages,
      isInFirstPage,
      isInLastPage,
      onClickFirstPage,
      onClickPreviousPage,
      onClickPage,
      onClickNextPage,
      onClickLastPage,
      isPageActive
    }
  }
})
</script>
