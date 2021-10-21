'use strict';
/*global PHOTOAPP, DOMHELPER*/
/*
  All the user interactions on the app is configured here
  This file is dependent on photo-app.js and dom-helper.js
*/
DOMHELPER.domReady(function() {
  // Store the Ids. This will be used while adding a photo or sticker
  var stickerId = PHOTOAPP.getnextLibStickerId();
  var photoId = PHOTOAPP.getnextPhotoId();
  var addedStickerId = PHOTOAPP.getnextStickerOnPhotoId();

  // Global error message when the storage exceeeds
  var STORAGE_ERR_MSG = 'Local Storage limit exceed. Changes are not saved in Local Storage';
  // Width and height of sticker images is constant in the application
  var STICKER_WIDTH = 150;
  var STICKER_HEIGHT = 150;
  var STICKER_WIDTH_HALF = STICKER_WIDTH / 2;
  var STICKER_HEIGHT_HALF = STICKER_HEIGHT / 2;

  // DOM elements related to photo upload
  var $photoUploadBtn = DOMHELPER.getElemById('photo-upload'),
    $startOver = DOMHELPER.getElemById('start-over'),
    $photoLink = DOMHELPER.getElemById('choose-photo-link'),
    $canvasArea = DOMHELPER.getElemById('canvas-area'),

    // DOM elements related to stickers
    $stickerArea = DOMHELPER.getElemById('sticker-area'),
    $addSticker = DOMHELPER.getElemById('add-sticker'),
    $stickerTemplate = DOMHELPER.getElemById('sticker-template'),

    // DOM elements related to Modal form for uplodaing stickers
    $stickerModal = DOMHELPER.getElemById('sticker-modal'),
    $stickerForm = DOMHELPER.getElemById('sticker-form'),
    $stickerInput = DOMHELPER.getElemById('sticker-input'),
    $stickerUploadBtn = DOMHELPER.getElemById('sticker-upload'),
    $stickerLink = DOMHELPER.getElemById('choose-sticker-link'),
    $stickerSubmit = DOMHELPER.getElemById('sticker-sumbit');

  // Function to initialize photos into application DOM from localStorage (if present)
  function initPhotos() {
    var i, j, k, imgTemplate, stickArray,
      photos = PHOTOAPP.getAllPhotos(),
      $mainImgTemplate = DOMHELPER.getElemById('main-image-template'),
      $photoStickerTemplate = DOMHELPER.getElemById('photo-sticker-template'),
      photoStickerTemplate = '',
      tempPhotoStickers = '';
    if (photos) {
      for (i in photos) {
        if (photos[i]) {

          // Get the template for main image and update its src and id
          imgTemplate = $mainImgTemplate.innerHTML;
          imgTemplate = imgTemplate.replace('{{id}}', i);
          imgTemplate = imgTemplate.replace('{{srcString}}', photos[i].srcString);
          stickArray = photos[i].stickers;

          // If there are stickers in photo, add those to the photo
          if (stickArray.length > 0) {
            for (j = 0; j < stickArray.length; j++) {
              photoStickerTemplate = $photoStickerTemplate.innerHTML;
              for (k in stickArray[j]) {
                photoStickerTemplate = photoStickerTemplate.replace('{{' + k + '}}', stickArray[j][k]);
              }

              // Add the stickers to the temp string so that we don't trigger browser repaint often
              tempPhotoStickers += photoStickerTemplate;
            }
          }

          // Update the main app area with the saved photos and stickers
          $canvasArea.innerHTML = imgTemplate + tempPhotoStickers;
          $canvasArea.style.display = 'inline-block';
        }
      }

      // If the photo is added, toggle the upload and startover buttons
      if (PHOTOAPP.photoAdded) {
        DOMHELPER.disable($photoLink);
        DOMHELPER.enable($startOver);
      }
    }
  }

  // Function to initialize the stickers in library from localStorage (if present)
  function initStickersLib() {
    var i, stickerTemplate, stickerImgTemplate,
      libStickers = PHOTOAPP.getAllLibStickers(),
      $stickerImgTemplate = DOMHELPER.getElemById('sticker-img-template'),
      tempStickers = '';
    if (libStickers) {
      for (i in libStickers) {
        if (libStickers[i]) {

          // Get the template for sticker and change the respective values in the template
          stickerTemplate = $stickerTemplate.innerHTML;
          stickerTemplate = stickerTemplate.replace('{{title}}', libStickers[i].name);
          stickerImgTemplate = $stickerImgTemplate.innerHTML;
          stickerImgTemplate = stickerImgTemplate.replace('{{id}}', i);
          stickerImgTemplate = stickerImgTemplate.replace('{{srcString}}', libStickers[i].srcString);
          stickerTemplate = stickerTemplate.replace('{{stickerImg}}', stickerImgTemplate);

          // Add the changed sticker template to temporary string, so that we don't trigger browser repaint often
          tempStickers += stickerTemplate;
        }
      }

      // Update the sticker area with the temporary string
      $stickerArea.innerHTML += tempStickers;
    }
  }

  // Initialize the Application DOM. This function calls initPhotos and initStickersLib
  function initApplicationDom() {
    initPhotos();
    initStickersLib();
  }

  // Function to add photo to the application DOM
  function addPhoto(inputElement) {
    var reader,
      img = DOMHELPER.createElement('img'),
      files = inputElement.files;

    if (files.length === 1) {

      DOMHELPER.disable($photoLink);
      DOMHELPER.enable($startOver);

      // If there are any photos already present remove it
      removeCurrentPhoto();

      reader = PHOTOAPP.filesToImgElem(files[0]);
      reader.onload = function(e) {

        // Prepare an image element. Set the src of the image element with the result
        img.dataset.photoId = photoId;
        img.src = e.target.result;
        img.classList.add('main-image');

        // Append the image element to DOM
        $canvasArea.appendChild(img);
        $canvasArea.style.display = 'inline-block';

        // Add the photo to application
        if (!PHOTOAPP.addPhoto(e.target.result)) {
          alert(STORAGE_ERR_MSG);
        }

        // Get the id for next photo
        photoId = PHOTOAPP.getnextPhotoId();
      }
    }
  }

  // Function to remove the photo from the application DOM
  // This function will be called when "Start Over" button is clicked
  function removeCurrentPhoto() {
    var oldImage = DOMHELPER.getElemsByClassName('main-image');

    if (oldImage && oldImage.length > 0) {
      PHOTOAPP.deletePhoto(oldImage[0].dataset.photoId);
    }
    DOMHELPER.removeChildNodes($canvasArea);
  }

  // Function to add sticker to the library
  function addStickerToLib(inputElement, title) {
    var reader, temp,
      $stickTemp = DOMHELPER.createElement('div'),
      $stickerImgTemplate = DOMHELPER.getElemById('sticker-img-template'),
      stickerImgTemplate;

    reader = PHOTOAPP.filesToImgElem(inputElement.files[0]);

    reader.onload = function(e) {

      // Prepare the sticker image from template and change the src of image with the result
      stickerImgTemplate = $stickerImgTemplate.innerHTML;
      stickerImgTemplate = stickerImgTemplate.replace('{{srcString}}', e.target.result);
      stickerImgTemplate = stickerImgTemplate.replace('{{id}}', stickerId);

      // Append the prepared sticker image to temp div
      temp = $stickerTemplate.innerHTML;
      temp = temp.replace('{{stickerImg}}', stickerImgTemplate);
      temp = temp.replace('{{title}}', title);
      $stickTemp.innerHTML = temp;

      // Insert the children of above temp div into the sticker area
      $stickerArea.insertBefore($stickTemp.getElementsByClassName('sticker')[0], $stickerArea.firstChild);

      // Close the popup
      $stickerModal.style.display = 'none';

      // Save the sticker
      if (!PHOTOAPP.addLibSticker(e.target.result, title)) {
        alert(STORAGE_ERR_MSG);
      }

      // Store the next sticker id
      stickerId = PHOTOAPP.getnextLibStickerId();
    }
  }

  // Function to remove stickers from library
  function removeStickerFromLib(stickerElement) {
    var stickerImg;

    if (stickerElement.classList.contains('sticker-remove')) {

      // Remove the sticker image from DOM
      stickerImg = stickerElement.parentElement.getElementsByClassName('sticker-img')[0];
      stickerElement.parentElement.parentElement.removeChild(stickerElement.parentElement);

      // Update the library
      PHOTOAPP.deleteLibSticker(stickerImg.dataset.stickerId);
    }
  }


  // This function returns the current photo in the DOM
  // This function is used while the user is trying to drop a sticker into the photo
  function getCurrentPhotoInCanvas() {
    var elem,
      list = DOMHELPER.getElemsByClassName('main-image');

    if (list && list.length > 0) {
      elem = list[0];
    }
    return elem;
  }

  // Helper functions to get positions for the dropped stickers
  function getPositionForSticker(event) {
    var obj = {
      left: '0',
      top: '0',
      zIndex: '0'
    }
    // If the sticker is dropped on another sticker, change the position relative to that sticker
    // and update z-index
    if (event.toElement.classList.contains('dropped-sticker')) {
      obj.left = parseInt(event.toElement.style.left, 10) + (event.offsetX - STICKER_WIDTH_HALF) + 'px';
      obj.top = parseInt(event.toElement.style.top, 10) + (event.offsetY - STICKER_HEIGHT_HALF) + 'px';
      obj.zIndex = (parseInt(getComputedStyle(event.toElement).getPropertyValue('z-index')) + 1).toString();
    } else {
      obj.left = (event.offsetX - STICKER_WIDTH_HALF) + 'px';
      obj.top = (event.offsetY - STICKER_HEIGHT_HALF) + 'px';
    }
    return obj;
  }

  // Function to add stickers on the photo
  function addStickerOnPhoto(event) {
    var img, droppedStickerTemplate, obj,
      photoElem = getCurrentPhotoInCanvas(),
      classList = PHOTOAPP.currentDraggedImage.classList,
      $droppedStickerTemplate = DOMHELPER.getElemById('photo-sticker-template');

    // This will be true when the image is dragged from the library and dropped in photo
    if (classList.contains('sticker-img')) {

      // If the image is directly dropped on already present sticker get the pos values from the already present sticker
      obj = getPositionForSticker(event)

      // Get the template of the sticker image that is to be dropped into the photo area
      // Update the values in the template with the image that is currently dragged
      droppedStickerTemplate = $droppedStickerTemplate.innerHTML;
      droppedStickerTemplate = droppedStickerTemplate.replace('{{srcString}}', PHOTOAPP.currentDraggedImage.src);
      droppedStickerTemplate = droppedStickerTemplate.replace('{{stickerId}}', addedStickerId);
      droppedStickerTemplate = droppedStickerTemplate.replace('{{left}}', obj.left);
      droppedStickerTemplate = droppedStickerTemplate.replace('{{top}}', obj.top);
      droppedStickerTemplate = droppedStickerTemplate.replace('{{zIndex}}', obj.zIndex);

      // Update the photo area to show the dropped sticker
      $canvasArea.innerHTML += droppedStickerTemplate;

      // Save te sticker and its position
      if (!PHOTOAPP.addStickerToPhoto(photoElem.dataset.photoId, PHOTOAPP.currentDraggedImage.src, obj.left, obj.top, obj.zIndex)) {
        alert(STORAGE_ERR_MSG);
      }
      // Get the next sticker id
      addedStickerId = PHOTOAPP.getnextStickerOnPhotoId();

    }
    // This will be true when the image already present inside photo is dragged and dropped within the photo area 
    else if (classList.contains('dropped-sticker')) {
      img = PHOTOAPP.currentDraggedImage;
      obj = getPositionForSticker(event);

      img.style.left = obj.left;
      img.style.top = obj.top;
      img.style.zIndex = obj.zIndex;

      // Save the changes
      if (!PHOTOAPP.updateStickerInPhoto(photoElem.dataset.photoId, img.dataset.id, undefined, obj.left, obj.top, obj.zIndex)) {
        alert(STORAGE_ERR_MSG);
      }
    }
  }

  // Event Listener for adding new photo 
  $photoUploadBtn.addEventListener('change', function() {
    addPhoto(this);
  });

  // This triggers the hidden input file selection control for uploading photo
  $photoLink.addEventListener('click', function() {
    $photoUploadBtn.click();
  });

  // Event listener for removing current photo
  $startOver.addEventListener('click', function() {
    removeCurrentPhoto();
    DOMHELPER.enable($photoLink);
    DOMHELPER.disable(this);
    $canvasArea.style.display = 'none';
  });


  // Event listener when a new sticker image is submitted from the popup
  // This function verifies the form and if the form is valid calls the addStickerToLib function
  $stickerForm.addEventListener('submit', function(e) {
    var files, title,
      $errorName = DOMHELPER.getElemById('error-name'),
      $errorFile = DOMHELPER.getElemById('error-file');

    e.preventDefault();
    files = $stickerUploadBtn.files;
    title = $stickerInput.value.trim();

    // If the user has not entered a name for sticker, show an error and return
    if (!title) {
      $errorName.style.display = 'block';
      return;
    }

    // If the user has not uploaded a file, show an error and return
    if (!files || files.length === 0) {
      $errorFile.style.display = 'block';
      return;
    }

    // If all the fields are valid, add the sticker image to library
    addStickerToLib($stickerUploadBtn, title);
  });

  // Event listener when a sticker image is uploaded in the add sticker popup
  // This function will not add the sticker img to library directly. It just verifies the uploaded image
  // This image will be uploaded to library only on form submit
  $stickerUploadBtn.addEventListener('change', function(e) {
    var $selectedSticker = DOMHELPER.getElemById('sticker-name-cont'),
      $name = DOMHELPER.getElemById('selected-sticker-name'),
      $errorFile = DOMHELPER.getElemById('error-file');
    $errorFile.style.display = 'none';
    $selectedSticker.style.display = 'block';
    $name.innerHTML = this.files[0].name;
    if ($stickerInput.value.trim()) {
      DOMHELPER.enable($stickerSubmit);
    }
    e.preventDefault();
  });

  // Triggering the add sticker file upload event listener
  $stickerLink.addEventListener('click', function() {
    $stickerUploadBtn.click();
  });

  // Event Listener for removing sticker images from Library
  $stickerArea.addEventListener('click', function(e) {
    removeStickerFromLib(e.target);
  });

  // Event listener to open the popup when add sticker button is clicked
  $addSticker.addEventListener('click', function() {
    var $errorName = DOMHELPER.getElemById('error-name'),
      $errorFile = DOMHELPER.getElemById('error-file'),
      $selectedSticker = DOMHELPER.getElemById('sticker-name-cont');

    $stickerForm.reset();
    $stickerInput.value = '';
    $stickerModal.style.display = 'block';
    $errorName.style.display = $errorFile.style.display = 'none';
    $selectedSticker.style.display = 'none';
    DOMHELPER.disable($stickerSubmit);
  });

  // Event listener for closing the popup when clicking anywhere outside the popup content
  $stickerModal.addEventListener('click', function(e) {
    if (e.target === this) {
      $stickerModal.style.display = 'none';
    }
  });

  // Event listener to show or hide error message when the user is entering a name for the sticker
  $stickerInput.addEventListener('keyup', function() {
    var $errorName = DOMHELPER.getElemById('error-name');
    if (!this.value.trim()) {
      $errorName.style.display = 'block';
      DOMHELPER.disable($stickerSubmit);
    } else {
      $errorName.style.display = 'none';
      if ($stickerUploadBtn.files.length) {
        DOMHELPER.enable($stickerSubmit);
      }
    }
  });

  // Event listener when a sticker image is dragged
  document.addEventListener('dragstart', function(event) {
    var classList = event.target.classList;

    // Drag only the images in ticker library or the sticker image already present inside the photo
    if (PHOTOAPP.photoAdded && (classList.contains('sticker-img') || classList.contains('dropped-sticker'))) {
      PHOTOAPP.currentDraggedImage = event.target;
    }
  });

  // Event listener when the user is dropping a sticker into the photo
  $canvasArea.addEventListener('drop', function(event) {
      // Add the sticker if there is any photo
    if (PHOTOAPP.photoAdded) {
      event.preventDefault();

      // Drop the image that is being currently dragged
      if (PHOTOAPP.currentDraggedImage) {
        addStickerOnPhoto(event);
      }

      PHOTOAPP.currentDraggedImage = null;
    }
  });

  // Initialize the DOM with stored photos and stickers
  initApplicationDom();

});
