"use strict";

const IMAGE_VIEWER_MODAL_ID = "image-viewer-modal";
const IMAGE_VIEWER_CONTAINER_ID = "image-viewer-container";
const IMAGE_VIEWER_IMAGE_ID = "image-viewer-img";
const IMAGE_VIEWER_CLOSE_BUTTON_ID = "image-viewer-close-btn";
const IMAGE_VIEWER_EXPANDABLE_CLASS = "image-viewer-expandable";

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

  imageViewerModalElem.addEventListener("toggle", onImageViewerModalToggleEvent);

  // Container
  imageViewerContainerElem = document.getElementById(IMAGE_VIEWER_CONTAINER_ID);
  imageViewerContainerElem.addEventListener("click", onImageViewerContainerClickEvent);

  // Close button
  let closeBtn = document.getElementById(IMAGE_VIEWER_CLOSE_BUTTON_ID);
  closeBtn.addEventListener("click", onImageViewerCloseButtonClickEvent);

  // Expandables
  let exps = document.getElementsByClassName(IMAGE_VIEWER_EXPANDABLE_CLASS);

  for(let i = 0; i < exps.length; i++) {
    exps[i].addEventListener("click", onImageViewerExpandableClickEvent);
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
  ivImageElem.src = ""; // Clear image during loading

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
 * @param {MouseEvent} event The click event.
 */
function onImageViewerContainerClickEvent(event) {
  if(event.target === event.currentTarget) {
    hideImageViewer();
  }
}

/**
 * Handles a mouse click event for the image close button.
 * 
 * @param {MouseEvent} event The click event.
 */
function onImageViewerCloseButtonClickEvent(event) {
  hideImageViewer();
}

/**
 * Handles a mouse click event for an expandable image.
 * 
 * @param {MouseEvent} event The click event.
 */
function onImageViewerExpandableClickEvent(event) {
  let imgElem = getImageViewerImageForExpandable(event.currentTarget);
  setImageViewerImage(imgElem);
  showImageViewer();
}

/**
 * Finds the appropriate image for a given expandable image.
 * 
 * @param {HTMLElement} exp The expandable image.
 * @returns {HTMLImageElement?} The image for the given expandable image, or
 * null if no such image could be found.
 */
function getImageViewerImageForExpandable(exp) {
  return document.getElementById(exp.dataset.imageViewerFullImageId);
}
