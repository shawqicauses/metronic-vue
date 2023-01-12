import {Modal} from "bootstrap"

const hideModal = function hideModal(modalElement) {
  if (!modalElement) return
  const modal = Modal.getInstance(modalElement)
  modal.hide()
}

const removeModalBackdrop = function removeModalBackdrop() {
  if (document.querySelectorAll(".modal-backdrop.fade.show").length)
    document.querySelectorAll(".modal-backdrop.fade.show").forEach((element) => element.remove())
}

export {hideModal, removeModalBackdrop}
