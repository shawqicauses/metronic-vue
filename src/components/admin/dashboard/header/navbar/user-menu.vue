<template>
  <div id="kt_header_user_menu_toggle" class="app-navbar-item ms-1 ms-md-3">
    <!-- Begin:Menu Wrapper -->
    <div
      data-kt-menu-attach="parent"
      data-kt-menu-trigger="{default: 'click', lg: 'hover'}"
      data-kt-menu-placement="bottom-end"
      class="cursor-pointer symbol symbol-30px symbol-md-40px">
      <img src="../../../../../../src/assets/media/avatars/image-06.jpg" alt="User Menu Toggle" />
    </div>
    <!-- Begin:User Account Menu -->
    <div
      data-kt-menu="true"
      class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg menu-state-color fw-semibold py-4 fs-6 w-275px">
      <!-- Begin:Menu Item -->
      <div class="menu-item px-3">
        <div class="menu-content d-flex align-items-center px-3">
          <!-- Begin:Avatar -->
          <div class="symbol symbol-50px me-5">
            <img alt="User" src="../../../../../../src/assets/media/avatars/image-06.jpg" />
          </div>
          <!-- End:Avatar -->
          <!-- Begin:User Name -->
          <div class="d-flex flex-column">
            <div class="fw-bold d-flex align-items-center fs-5">
              Max Smith
              <span class="badge badge-light-success fw-bold fs-8 px-2 py-1 ms-2">Pro</span>
            </div>
            <a href="#" class="fw-semibold text-muted text-hover-primary fs-7">max@kt.com</a>
          </div>
          <!-- End:User Name -->
        </div>
      </div>
      <!-- End:Menu Item -->
      <!-- Begin:Menu Separator -->
      <div class="separator my-2"></div>
      <!-- End:Menu Separator -->
      <!-- Begin:Menu Item -->
      <div class="menu-item px-5">
        <a href="#" class="menu-link px-5">My Profile</a>
      </div>
      <!-- End:Menu Item -->
      <!-- Begin:Menu Item -->
      <div class="menu-item px-5">
        <a href="#" class="menu-link px-5">
          <span class="menu-text">My Projects</span>
          <span class="menu-badge">
            <span class="badge badge-light-danger badge-circle fw-bold fs-7">3</span>
          </span>
        </a>
      </div>
      <!-- End:Menu Item -->
      <!-- Begin:Menu Item -->
      <div
        data-kt-menu-trigger="{default: 'click', lg: 'hover'}"
        data-kt-menu-placement="left-start"
        data-kt-menu-offset="-15px, 0"
        class="menu-item px-5">
        <a href="#" class="menu-link px-5">
          <span class="menu-title">My Subscription</span>
          <span class="menu-arrow"></span>
        </a>
        <!-- Begin:Menu Sub -->
        <div class="menu-sub menu-sub-dropdown w-175px py-4">
          <!-- Begin:Menu Item -->
          <div class="menu-item px-3">
            <a href="#" class="menu-link px-5">Referrals</a>
          </div>
          <!-- End:Menu Item -->
          <!-- Begin:Menu Item -->
          <div class="menu-item px-3">
            <a href="#" class="menu-link px-5">Billing</a>
          </div>
          <!-- End:Menu Item -->
          <!-- Begin:Menu Item -->
          <div class="menu-item px-3">
            <a href="#" class="menu-link px-5">Payments</a>
          </div>
          <!-- End:Menu Item -->
          <!-- Begin:Menu Item -->
          <div class="menu-item px-3">
            <a href="#" class="menu-link d-flex flex-stack px-5">
              Statements
              <i
                title="View Your Statements"
                data-bs-toggle="tooltip"
                class="fas fa-exclamation-circle ms-2 fs-7">
              </i>
            </a>
          </div>
          <!-- End:Menu Item -->
          <!-- Begin:Menu Separator -->
          <div class="separator my-2"></div>
          <!-- End:Menu Separator -->
          <!-- Begin:Menu Item -->
          <div class="menu-item px-3">
            <div class="menu-content px-3">
              <label class="form-check form-switch form-check-custom form-check-solid">
                <input
                  type="checkbox"
                  name="notifications"
                  value="1"
                  checked="checked"
                  class="form-check-input w-30px h-20px" />
                <span class="form-check-label text-muted fs-7">Notifications</span>
              </label>
            </div>
          </div>
          <!-- End:Menu Item -->
        </div>
        <!-- End:Menu Sub -->
      </div>
      <!-- End:Menu Item -->
      <!-- Begin:Menu Item -->
      <div class="menu-item px-5">
        <a href="#" class="menu-link px-5">My Statements</a>
      </div>
      <!-- End:Menu Item -->
      <!-- Begin:Menu Separator -->
      <div class="separator my-2"></div>
      <!-- End:Menu Separator -->
      <!-- Begin:Menu Item -->
      <navbar-languages-menu />
      <!-- End:Menu Item -->
      <!-- Begin:Menu Item -->
      <div class="menu-item px-5 my-1">
        <a href="#" class="menu-link px-5">Account Settings</a>
      </div>
      <!-- End:Menu Item -->
      <!-- Begin:Menu Item -->
      <div class="menu-item px-5" @click="signOut" @keypress="signOut">
        <a href="#" class="menu-link px-5">Sign Out</a>
      </div>
      <!-- End:Menu Item -->
    </div>
    <!-- End:User Account Menu -->
    <!-- End:Menu Wrapper -->
  </div>
</template>

<script>
import {defineComponent} from "vue"
import {useRouter} from "vue-router"
import {useStore} from "vuex"
import NavbarLanguagesMenu from "./languages-menu.vue"

export default defineComponent({
  name: "navbar-user-menu",
  components: {NavbarLanguagesMenu},
  setup() {
    const router = useRouter()
    const store = useStore()

    const signOut = function signOut() {
      store.dispatch("signOut").then(() => {
        router.push({name: "auth"})
      })
    }

    return {signOut}
  }
})
</script>
