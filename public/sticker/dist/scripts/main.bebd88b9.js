"use strict";!function(a){var b={},c={},d=0,e=0,f=0;a.photoAdded=!1,a.currentDraggedImage=null,a.getnextPhotoId=function(){return d},a.getnextLibStickerId=function(){return e},a.getnextStickerOnPhotoId=function(){return f},a.isFileAnImage=function(a){var b=!1,c=/^image\//;return a&&c.test(a.type)&&(b=!0),b},a.filesToImgElem=function(b){var c;return b&&a.isFileAnImage(b)&&(c=new FileReader,c.readAsDataURL(b)),c},a.isLocalStorageSpaceAvailable=function(a){var b=5242880,c="";return a=a||"",b=5242880,c=unescape(encodeURIComponent(JSON.stringify(localStorage))+JSON.stringify(a)),b-c.length>0?!0:!1},a.saveItem=function(b,c){return localStorage&&a.isLocalStorageSpaceAvailable(c)?(localStorage.setItem(b,JSON.stringify(c)),!0):!1},a.getSavedItem=function(a){return localStorage&&localStorage.getItem(a)?JSON.parse(localStorage.getItem(a)):void 0},a.addLibSticker=function(c,d){var f=e;return!b[f]&&(b[f]={},b[f].srcString=c,b[f].name=d,a.saveItem("stickersLib",b)&&a.saveItem("stickersLibId",++e))?b[f]:!1},a.deleteLibSticker=function(c){return c=c.toString(),b[c]&&(b[c]=void 0,a.saveItem("stickersLib",b))?!0:!1},a.updateLibSticker=function(c,d,e){return c=c.toString(),b[c]&&(d&&(b[c].srcString=d),e&&(b[c].name=e),a.saveItem("stickersLib",b))?b[c]:!1},a.getLibSticker=function(a){return b[a.toString()]},a.getAllLibStickers=function(){return b},a.addPhoto=function(b){var e=d;return!c[e]&&(c[e]={},c[e].srcString=b,c[e].stickers=[],a.saveItem("photos",c)&&a.saveItem("photoId",++d))?(a.photoAdded=!0,c[e]):!1},a.deletePhoto=function(b){return b=b.toString(),c[b]&&(c[b]=void 0,a.saveItem("photos",c))?(a.photoAdded=!1,!0):!1},a.updatePhoto=function(b,d){return b=b.toString(),c[b]&&d&&(c[b].srcString=d,a.saveItem("photos",c))?c[b]:!1},a.getPhoto=function(a){return c[a.toString()]},a.getAllPhotos=function(){return c},a.addStickerToPhoto=function(b,d,e,g,h){if(c[b.toString()]){var i={};if(i.stickerId=f.toString(),i.srcString=d,i.left=e,i.top=g,i.zIndex=h||0,c[b].stickers.push(i),a.saveItem("photos",c)&&a.saveItem("stickersOnPhotoId",++f))return c[b]}return!1},a.updateStickerInPhoto=function(b,d,e,f,g,h){if(b=b.toString(),d=d.toString(),c[b]&&c[b].stickers.length)for(var i=c[b].stickers,j=0;j<i.length;j++)if(i[j].stickerId===d&&(e&&(i[j].srcString=e),f&&(i[j].left=f),g&&(i[j].top=g),h&&(i[j].zIndex=h),a.saveItem("photos",c)))return c[b];return!1},a.init=function(){b=a.getSavedItem("stickersLib")||{},c=a.getSavedItem("photos")||{},d=a.getSavedItem("photoId")||0,e=a.getSavedItem("stickersLibId")||0,f=a.getSavedItem("stickersOnPhotoId")||0,Object.keys(c).length>0&&(a.photoAdded=!0)},a.init()}(window.PHOTOAPP=window.PHOTOAPP||{}),function(a){a.domReady=function(a){document.addEventListener("DOMContentLoaded",a)},a.getElemById=function(a){return a&&a.trim()?document.getElementById(a):void 0},a.getElemsByClassName=function(a){return a&&a.trim()?document.getElementsByClassName(a):void 0},a.createElement=function(a){return a&&a.trim()?document.createElement(a):void 0},a.removeChildNodes=function(a){if(a)for(;a.firstChild;)a.removeChild(a.firstChild);return a},a.enable=function(a){a&&a.removeAttribute("disabled")},a.disable=function(a){a&&a.setAttribute("disabled",!0)}}(window.DOMHELPER=window.DOMHELPER||{}),DOMHELPER.domReady(function(){function a(){var a,b,c,d,e,f=PHOTOAPP.getAllPhotos(),g=DOMHELPER.getElemById("main-image-template"),h=DOMHELPER.getElemById("photo-sticker-template"),i="",j="";if(f){for(a in f)if(f[a]){if(d=g.innerHTML,d=d.replace("{{id}}",a),d=d.replace("{{srcString}}",f[a].srcString),e=f[a].stickers,e.length>0)for(b=0;b<e.length;b++){i=h.innerHTML;for(c in e[b])i=i.replace("{{"+c+"}}",e[b][c]);j+=i}v.innerHTML=d+j,v.style.display="inline-block"}PHOTOAPP.photoAdded&&(DOMHELPER.disable(u),DOMHELPER.enable(t))}}function b(){var a,b,c,d=PHOTOAPP.getAllLibStickers(),e=DOMHELPER.getElemById("sticker-img-template"),f="";if(d){for(a in d)d[a]&&(b=y.innerHTML,b=b.replace("{{title}}",d[a].name),c=e.innerHTML,c=c.replace("{{id}}",a),c=c.replace("{{srcString}}",d[a].srcString),b=b.replace("{{stickerImg}}",c),f+=b);w.innerHTML+=f}}function c(){a(),b()}function d(a){var b,c=DOMHELPER.createElement("img"),d=a.files;1===d.length&&(DOMHELPER.disable(u),DOMHELPER.enable(t),e(),b=PHOTOAPP.filesToImgElem(d[0]),b.onload=function(a){c.dataset.photoId=l,c.src=a.target.result,c.classList.add("main-image"),v.appendChild(c),v.style.display="inline-block",PHOTOAPP.addPhoto(a.target.result)||alert(n),l=PHOTOAPP.getnextPhotoId()})}function e(){var a=DOMHELPER.getElemsByClassName("main-image");a&&a.length>0&&PHOTOAPP.deletePhoto(a[0].dataset.photoId),DOMHELPER.removeChildNodes(v)}function f(a,b){var c,d,e,f=DOMHELPER.createElement("div"),g=DOMHELPER.getElemById("sticker-img-template");c=PHOTOAPP.filesToImgElem(a.files[0]),c.onload=function(a){e=g.innerHTML,e=e.replace("{{srcString}}",a.target.result),e=e.replace("{{id}}",k),d=y.innerHTML,d=d.replace("{{stickerImg}}",e),d=d.replace("{{title}}",b),f.innerHTML=d,w.insertBefore(f.getElementsByClassName("sticker")[0],w.firstChild),z.style.display="none",PHOTOAPP.addLibSticker(a.target.result,b)||alert(n),k=PHOTOAPP.getnextLibStickerId()}}function g(a){var b;a.classList.contains("sticker-remove")&&(b=a.parentElement.getElementsByClassName("sticker-img")[0],a.parentElement.parentElement.removeChild(a.parentElement),PHOTOAPP.deleteLibSticker(b.dataset.stickerId))}function h(){var a,b=DOMHELPER.getElemsByClassName("main-image");return b&&b.length>0&&(a=b[0]),a}function i(a){var b={left:"0",top:"0",zIndex:"0"};return a.toElement.classList.contains("dropped-sticker")?(b.left=parseInt(a.toElement.style.left,10)+(a.offsetX-q)+"px",b.top=parseInt(a.toElement.style.top,10)+(a.offsetY-r)+"px",b.zIndex=(parseInt(getComputedStyle(a.toElement).getPropertyValue("z-index"))+1).toString()):(b.left=a.offsetX-q+"px",b.top=a.offsetY-r+"px"),b}function j(a){var b,c,d,e=h(),f=PHOTOAPP.currentDraggedImage.classList,g=DOMHELPER.getElemById("photo-sticker-template");f.contains("sticker-img")?(d=i(a),c=g.innerHTML,c=c.replace("{{srcString}}",PHOTOAPP.currentDraggedImage.src),c=c.replace("{{stickerId}}",m),c=c.replace("{{left}}",d.left),c=c.replace("{{top}}",d.top),c=c.replace("{{zIndex}}",d.zIndex),v.innerHTML+=c,PHOTOAPP.addStickerToPhoto(e.dataset.photoId,PHOTOAPP.currentDraggedImage.src,d.left,d.top,d.zIndex)||alert(n),m=PHOTOAPP.getnextStickerOnPhotoId()):f.contains("dropped-sticker")&&(b=PHOTOAPP.currentDraggedImage,d=i(a),b.style.left=d.left,b.style.top=d.top,b.style.zIndex=d.zIndex,PHOTOAPP.updateStickerInPhoto(e.dataset.photoId,b.dataset.id,void 0,d.left,d.top,d.zIndex)||alert(n))}var k=PHOTOAPP.getnextLibStickerId(),l=PHOTOAPP.getnextPhotoId(),m=PHOTOAPP.getnextStickerOnPhotoId(),n="Local Storage limit exceed. Changes are not saved in Local Storage",o=150,p=150,q=o/2,r=p/2,s=DOMHELPER.getElemById("photo-upload"),t=DOMHELPER.getElemById("start-over"),u=DOMHELPER.getElemById("choose-photo-link"),v=DOMHELPER.getElemById("canvas-area"),w=DOMHELPER.getElemById("sticker-area"),x=DOMHELPER.getElemById("add-sticker"),y=DOMHELPER.getElemById("sticker-template"),z=DOMHELPER.getElemById("sticker-modal"),A=DOMHELPER.getElemById("sticker-form"),B=DOMHELPER.getElemById("sticker-input"),C=DOMHELPER.getElemById("sticker-upload"),D=DOMHELPER.getElemById("choose-sticker-link"),E=DOMHELPER.getElemById("sticker-sumbit");s.addEventListener("change",function(){d(this)}),u.addEventListener("click",function(){s.click()}),t.addEventListener("click",function(){e(),DOMHELPER.enable(u),DOMHELPER.disable(this),v.style.display="none"}),A.addEventListener("submit",function(a){var b,c,d=DOMHELPER.getElemById("error-name"),e=DOMHELPER.getElemById("error-file");return a.preventDefault(),b=C.files,(c=B.value.trim())?b&&0!==b.length?void f(C,c):void(e.style.display="block"):void(d.style.display="block")}),C.addEventListener("change",function(a){var b=DOMHELPER.getElemById("sticker-name-cont"),c=DOMHELPER.getElemById("selected-sticker-name"),d=DOMHELPER.getElemById("error-file");d.style.display="none",b.style.display="block",c.innerHTML=this.files[0].name,B.value.trim()&&DOMHELPER.enable(E),a.preventDefault()}),D.addEventListener("click",function(){C.click()}),w.addEventListener("click",function(a){g(a.target)}),x.addEventListener("click",function(){var a=DOMHELPER.getElemById("error-name"),b=DOMHELPER.getElemById("error-file"),c=DOMHELPER.getElemById("sticker-name-cont");A.reset(),B.value="",z.style.display="block",a.style.display=b.style.display="none",c.style.display="none",DOMHELPER.disable(E)}),z.addEventListener("click",function(a){a.target===this&&(z.style.display="none")}),B.addEventListener("keyup",function(){var a=DOMHELPER.getElemById("error-name");this.value.trim()?(a.style.display="none",C.files.length&&DOMHELPER.enable(E)):(a.style.display="block",DOMHELPER.disable(E))}),document.addEventListener("dragstart",function(a){var b=a.target.classList;PHOTOAPP.photoAdded&&(b.contains("sticker-img")||b.contains("dropped-sticker"))&&(PHOTOAPP.currentDraggedImage=a.target)}),v.addEventListener("drop",function(a){PHOTOAPP.photoAdded&&(a.preventDefault(),PHOTOAPP.currentDraggedImage&&j(a),PHOTOAPP.currentDraggedImage=null)}),c()});