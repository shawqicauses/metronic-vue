// Done Reviewing: 30/01/2023
import {Modal} from "bootstrap"

const hideModal = function hideModal(modalElement) {
  if (!modalElement) return
  const modal = Modal.getInstance(modalElement)
  modal.hide()
}

const showModal = function showModal(modalElement) {
  if (!modalElement) return
  const modal = Modal.getOrCreateInstance(modalElement)
  modal.show()
}

const removeModalBackdrop = function removeModalBackdrop() {
  if (document.querySelectorAll(".modal-backdrop.fade.show").length)
    document.querySelectorAll(".modal-backdrop.fade.show").forEach((element) => element.remove())
}

export {showModal, hideModal, removeModalBackdrop}
