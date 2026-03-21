"use strict";

const IMAGE_VIEWER_CONTAINER_ID = "image-viewer-container";
const IMAGE_VIEWER_IMAGE_ID = "image-viewer-img";
const IMAGE_VIEWER_CLOSE_BUTTON_ID = "image-viewer-close-btn";
const IMAGE_VIEWER_VIEW_BUTTON_CLASS = "image-viewer-view-btn";

/** @type {HTMLElement?} */
let imageViewerContainerElem = null;

document.addEventListener("DOMContentLoaded", initImageViewer);

/**
 * Initializes all image viewer elements. This probably shouldn't be called
 * manually.
 */
function initImageViewer() {
  // Container
  imageViewerContainerElem = document.getElementById(IMAGE_VIEWER_CONTAINER_ID);

  if(!imageViewerContainerElem) {
    return;
  }

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
  // TODO prevent scrolling of document
  imageViewerContainerElem.style.display = "initial";
}

/**
 * Hides the image viewer.
 */
function hideImageViewer() {
  imageViewerContainerElem.style.display = "";
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
  
  for(let attr of extImgElem.attributes) {
    switch(attr.name) {
      case "id":
      case "class":
      case "style":
        continue;
      default:
        ivImageElem.attributes.setNamedItem(attr.cloneNode());
    }
  }
}

/**
 * Handles a mouse click event for the image viewer container.
 * 
 * @param {MouseEVent} event The click event.
 */
function onImageViewerContainerClickEvent(event) {
  if(event.currentTarget === imageViewerContainerElem) {
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
