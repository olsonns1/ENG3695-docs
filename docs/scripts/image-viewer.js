"use strict";

const IMAGE_VIEWER_MODAL_ID = "image-viewer-modal";
const IMAGE_VIEWER_CONTAINER_ID = "image-viewer-container";
const IMAGE_VIEWER_IMAGE_ID = "image-viewer-img";
const IMAGE_VIEWER_CLOSE_BUTTON_ID = "image-viewer-close-btn";
const IMAGE_VIEWER_VIEW_BUTTON_CLASS = "image-viewer-view-btn";

/** @type {HTMLDialogElement?} */
let imageViewerModalElem = null;
/** @type {HTMLElement?} */
let imageViewerContainerElem = null;

document.addEventListener("DOMContentLoaded", initImageViewer);

/**
 * Initializes all image viewer elements. This probably shouldn't be called
 * manually.
 */
function initImageViewer() {
  // Modal
  imageViewerModalElem = document.getElementById(IMAGE_VIEWER_MODAL_ID);

  if(!imageViewerModalElem) {
    return;
  }

  // TODO prevent scrolling of document
  // imageViewerModalElem.addEventListener("toggle", onImageViewerModalToggleEvent);

  // Container
  imageViewerContainerElem = document.getElementById(IMAGE_VIEWER_CONTAINER_ID);
  imageViewerContainerElem.addEventListener("click", onImageViewerContainerClickEvent);

  // Close button
  let closeBtn = document.getElementById(IMAGE_VIEWER_CLOSE_BUTTON_ID);
  closeBtn.addEventListener("click", onImageViewerCloseButtonClickEvent);

  // View buttons
  let viewBtns = document.getElementsByClassName(IMAGE_VIEWER_VIEW_BUTTON_CLASS);

  for(let i = 0; i < viewBtns.length; i++) {
    viewBtns[i].addEventListener("click", onImageViewerViewButtonClickEvent);
  }
}

/**
 * Shows the image viewer.
 */
function showImageViewer() {
  imageViewerModalElem.showModal();
}

/**
 * Hides the image viewer.
 */
function hideImageViewer() {
  imageViewerModalElem.close();
}

/**
 * Updates the image in the image viewer to a given image.
 * 
 * @param {HTMLImageElement} extImgElem The element of the image to show in the
 * image viewer.
 */
function setImageViewerImage(extImgElem) {
  /** @type {HTMLImageElement} */
  let ivImageElem = document.getElementById(IMAGE_VIEWER_IMAGE_ID);
  ivImageElem.alt = extImgElem.alt;
  ivImageElem.src = extImgElem.src;
  ivImageElem.title = extImgElem.alt; // Original title may be something like "click to view"
}

/**
 * Handles a toggle event for the image viewer modal.
 * 
 * @param {ToggleEvent} event The toggle event.
 */
function onImageViewerModalToggleEvent(event) {
  if(event.newState === "open") {
    onImageViewerModalOpen();
  } else if(event.newState === "closed") {
    onImageViewerModalClose();
  }
}

/**
 * Handles the opening of the image viewer modal.
 */
function onImageViewerModalOpen() {
  document.documentElement.style.overflow = "hidden";
  document.body.style.overflow = "hidden";
}

/**
 * Handles the closing of the image viewer modal.
 */
function onImageViewerModalClose() {
  document.documentElement.style.overflow = "";
  document.body.style.overflow = "";
}

/**
 * Handles a mouse click event for the image viewer container.
 * 
 * @param {MouseEVent} event The click event.
 */
function onImageViewerContainerClickEvent(event) {
  if(event.target === event.currentTarget) {
    hideImageViewer();
  }
}

/**
 * Handles a mouse click event for the image close button.
 * 
 * @param {MouseEVent} event The click event.
 */
function onImageViewerCloseButtonClickEvent(event) {
  hideImageViewer();
}

/**
 * Handles a mouse click event for an image view button.
 * 
 * @param {MouseEVent} event The click event.
 */
function onImageViewerViewButtonClickEvent(event) {
  let imgElem = getImageViewerImageForViewButton(event.currentTarget);
  setImageViewerImage(imgElem);
  showImageViewer();
}

/**
 * Finds the appropriate image for a given image view button.
 * 
 * @param {HTMLElement} btnElem The image view button.
 * @returns {HTMLImageElement?} The image for the given view button, or null if
 * no such image could be found.
 */
function getImageViewerImageForViewButton(btnElem) {
  let imgElem = btnElem;

  while(imgElem !== null && imgElem.tagName !== "IMG") {
    imgElem = imgElem.parentElement;
  }

  return imgElem;
}
