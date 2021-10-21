'use strict';
/* PhotoApp module
  This module is not dependent on DOM. Can be used with any other UI flow
*/
(function(PHOTOAPP){
  // Local variables

  /*
    A collection of stickers added to the library
    Structure of a sticker is 
    id : {
      srcString: 'source string for the image',
      name: 'name of sticker'
    }
  */
  var stickers = {};

  /*
    A collection of all the photos added to the library
    Structure of a photos is 
    id: {
      srcString: 'source string for the image',
      stickers: [{
        id: {
          srcString: 'source string for the sticker added on the image'
          stickerId: 'unique sticker id. This id is different from the sticker id above'
          left: 'position in px',
          top: 'position in px'
        }
      }]
    }
  */
  var photos = {};

  var nextPhotoId = 0;
  var nextLibStickerId = 0;
  var nextStickerOnPhotoId = 0;

  PHOTOAPP.photoAdded = false;
  PHOTOAPP.currentDraggedImage = null;

  PHOTOAPP.getnextPhotoId = function() {
    return nextPhotoId;
  };
  PHOTOAPP.getnextLibStickerId = function() {
    return nextLibStickerId;
  };
  PHOTOAPP.getnextStickerOnPhotoId = function() {
    return nextStickerOnPhotoId;
  }
  /* Checks whether the give fileobj is an image
     Returns a boolean value
  */
  PHOTOAPP.isFileAnImage = function(fileObj) {
    var imageType = false,
      matchString = /^image\//;
    if(fileObj && matchString.test(fileObj.type)) {
      imageType = true; 
    }
    return imageType;
  }
  /*
    Converts a file blob into image.
    This function returns a FileReader.
    Users can then use reader.onload function to get the image
  */
  PHOTOAPP.filesToImgElem = function(fileObj) {
    var reader;
    if(fileObj && PHOTOAPP.isFileAnImage(fileObj)) {
      reader = new FileReader();
      reader.readAsDataURL(fileObj);
    }
    return reader;
  }
  /*  
    Checks whether the local storage space is available
    This method assumes that the max localstorage space is 5 MB
  */
  PHOTOAPP.isLocalStorageSpaceAvailable = function(value) {
    var bytes = 1024 * 1024 * 5,
      str = '';
    value = value || '';
    bytes = 1024 * 1024 * 5;
    str = unescape(encodeURIComponent(JSON.stringify(localStorage)) + JSON.stringify(value));
    if(bytes - str.length > 0) {
      return true;
    } else {
      return false;
    }
  }
  /*
    Saves a key, value pair into the localStorage
    For full fledged application, this method can be modified to store into a DB
    and return a promise instead of a boolean now
  */
  PHOTOAPP.saveItem = function(key, value) {
    if(localStorage && PHOTOAPP.isLocalStorageSpaceAvailable(value)) {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } else {
      return false;
    }
  }
  /*
    Gets a saved item from localstorage based on the key
  */
  PHOTOAPP.getSavedItem = function(key) {
    if(localStorage && localStorage.getItem(key)) {
      return JSON.parse(localStorage.getItem(key));
    }
  }
  /*
    Adds a sticker to the library
    This method calls the saveItem above
  */
  PHOTOAPP.addLibSticker = function(srcString, name) {
    var id = nextLibStickerId;
    if(!stickers[id]) {
      stickers[id] = {};
      stickers[id].srcString = srcString;
      stickers[id].name = name;
      if(PHOTOAPP.saveItem('stickersLib', stickers) && PHOTOAPP.saveItem('stickersLibId', ++nextLibStickerId)) {
        return stickers[id];
      }
    }
    return false;
  }
  /*
    Deletes a sticker from the library based on the id
    This method returns a boolean
  */
  PHOTOAPP.deleteLibSticker = function(id) {
    id = id.toString();
    if(stickers[id]) {
      stickers[id] = undefined;
      if(PHOTOAPP.saveItem('stickersLib', stickers)) {
        return true;
      }
    }
    return false;
  }
  /*
    Updates a sticker in the library based on the id
  */
  PHOTOAPP.updateLibSticker = function(id, srcString, name) {
    id = id.toString();
    if(stickers[id]) {
      if(srcString) {
        stickers[id].srcString = srcString;
      }
      if(name) {
        stickers[id].name = name;
      }
      if(PHOTOAPP.saveItem('stickersLib', stickers)) {
        return stickers[id];
      }
    }
    return false;
  }
  /*
    This method returns an object containing the sticker 
    based on the id provided
  */
  PHOTOAPP.getLibSticker = function(id) {
    return stickers[id.toString()];
  }
  /*
    This method returns an object containing all the stickers in the library
  */
  PHOTOAPP.getAllLibStickers = function() {
    return stickers;
  }
  /*
    Adds a photo to the application
    Returns the created photo object if successful
    Return false if fails
  */
  PHOTOAPP.addPhoto = function(srcString) {
    var id = nextPhotoId;
    if(!photos[id]) {
      photos[id] = {};
      photos[id].srcString = srcString;
      photos[id].stickers = [];
      if(PHOTOAPP.saveItem('photos', photos) && PHOTOAPP.saveItem('photoId', ++nextPhotoId)) {
        PHOTOAPP.photoAdded = true;
        return photos[id];
      } 
    }
    return false;
  }
  /*
    Deletes a photo from the application
    Returns a boolean
  */
  PHOTOAPP.deletePhoto = function(id) {
    id = id.toString();
    if(photos[id]) {
      photos[id] = undefined;

      if(PHOTOAPP.saveItem('photos', photos)) {
        PHOTOAPP.photoAdded = false;
        return true;
      }
    }
    return false;
  }
  /*
    Updates a photo in the application based on the id
  */
  PHOTOAPP.updatePhoto = function(id, srcString) {
    id = id.toString();
    if(photos[id] && srcString) {
      photos[id].srcString = srcString;
      if(PHOTOAPP.saveItem('photos', photos)) {
        return photos[id];
      }
    }
    return false;
  }
  /*
    Returns an object which contains the photo in the application 
    based on the id
  */
  PHOTOAPP.getPhoto = function(id) {
    return photos[id.toString()];
  }
  /*
    Returns all the photos in the application based on the id
  */
  PHOTOAPP.getAllPhotos = function() {
    return photos;
  }
  /*
    Adds a sticker to the photo based on the photoid
    Returns the photo object if successful
    Returns false otherwise
  */
  PHOTOAPP.addStickerToPhoto = function(photoId, stickerString, left, top, zIndex) {
    if(photos[photoId.toString()]) {
      var stickerObj = {};
      stickerObj.stickerId = nextStickerOnPhotoId.toString();
      stickerObj.srcString = stickerString;
      stickerObj.left = left;
      stickerObj.top = top;
      stickerObj.zIndex = zIndex || 0;
      photos[photoId].stickers.push(stickerObj);
      if(PHOTOAPP.saveItem('photos', photos) && PHOTOAPP.saveItem('stickersOnPhotoId', ++nextStickerOnPhotoId)) {
        return photos[photoId];
      }
    }
    return false;
  }
  /*
    Updates a sticker to the photo based on the photoid and stickerid
    Returns the photo object if successful
    Returns false otherwise
  */
  PHOTOAPP.updateStickerInPhoto = function(photoId, stickerId, stickerString, left, top, zIndex) {
    photoId = photoId.toString();
    stickerId = stickerId.toString();
    if(photos[photoId] && photos[photoId].stickers.length) {
      var stickerArray = photos[photoId].stickers;
      for(var i = 0; i < stickerArray.length; i++) {
        if(stickerArray[i].stickerId === stickerId) {
          if(stickerString)
            stickerArray[i].srcString = stickerString;
          if(left)
            stickerArray[i].left = left;
          if(top)
            stickerArray[i].top = top;
          if(zIndex)
            stickerArray[i].zIndex = zIndex;
          if(PHOTOAPP.saveItem('photos', photos)) {
            return photos[photoId];
          }
        }
      }
    }
    return false;
  }
  /*
    Initialize this module
    Gets the sticker objects for library and photo objects from the local storage
    and initializes the respective private variables
  */
  PHOTOAPP.init = function() {
    stickers = PHOTOAPP.getSavedItem('stickersLib') || {};
    photos = PHOTOAPP.getSavedItem('photos') || {};
    nextPhotoId = PHOTOAPP.getSavedItem('photoId') || 0;
    nextLibStickerId = PHOTOAPP.getSavedItem('stickersLibId') || 0;
    nextStickerOnPhotoId = PHOTOAPP.getSavedItem('stickersOnPhotoId') || 0;
    if(Object.keys(photos).length > 0) {
      PHOTOAPP.photoAdded = true;
    }
  }
  PHOTOAPP.init();

})(window.PHOTOAPP = window.PHOTOAPP || {});
