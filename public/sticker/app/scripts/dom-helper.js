'use strict';
(function(DOMHELPER) {

  // This function is executed when the DOM is ready
  DOMHELPER.domReady = function(callback) {
    document.addEventListener('DOMContentLoaded', callback);
  }

  // Function to get an element by id
  DOMHELPER.getElemById = function(id) {
    if (id && id.trim()) {
      return document.getElementById(id);
    }
  }

  // Function to get elements by class name
  DOMHELPER.getElemsByClassName = function(className) {
    if (className && className.trim()) {
      return document.getElementsByClassName(className);
    }
  }

  // Function to create a DOM element
  DOMHELPER.createElement = function(elementName) {
    if(elementName && elementName.trim()) {
      return document.createElement(elementName);
    }
  }
  // Helper function to remove all child nodes of a DOM element
  DOMHELPER.removeChildNodes = function(node) {
    if (node) {
      while (node.firstChild) {
        node.removeChild(node.firstChild);
      }
    }
    return node;
  }

  // Helper frunction to enable the element
  DOMHELPER.enable = function(element) {
    if (element) {
      element.removeAttribute('disabled');
    }
  }

  // Helper frunction to disable the element
  DOMHELPER.disable = function(element) {
    if (element) {
      element.setAttribute('disabled', true);
    }
  }

})(window.DOMHELPER = window.DOMHELPER || {});
