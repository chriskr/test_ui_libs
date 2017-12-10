'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// -*- Mode: c++; tab-width: 2; indent-tabs-mode: nil; c-basic-offset: 2 -*-
//
// Copyright (C) 2014 Opera Software ASA.  All rights reserved.
//
// This file is an original work developed by Opera Software ASA


var Bragi = function () {
  function Bragi() {
    _classCallCheck(this, Bragi);
  }

  _createClass(Bragi, null, [{
    key: 'createTemplate',
    value: function createTemplate(tmpl) {
      var namespace = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

      var ELE_NAME = 0;
      var ATTRS = 1;
      var elementName = tmpl[ELE_NAME];
      var ele = null;
      var i = 0;
      if (typeof elementName === 'string' && elementName !== Bragi.TEXT_NODE_NAME) {
        i++;
        if (elementName.includes(':')) {
          var pos = elementName.indexOf(':');
          namespace = Bragi.NAMESPACES[elementName.slice(0, pos)];
          ele = document.createElementNS(namespace, elementName.slice(pos + 1));
        } else {
          ele = document.createElement(elementName);
        }
        if (Object.prototype.toString.call(tmpl[ATTRS]) === '[object Object]') {
          i++;
          var attrs = tmpl[ATTRS];
          if (attrs) {
            for (var prop in attrs) {
              if (typeof attrs[prop] === 'string') {
                ele.setAttribute(prop, attrs[prop]);
              }
            }
          }
        }
      } else {
        if (elementName === Bragi.TEXT_NODE_NAME) {
          i++;
        }
        ele = document.createDocumentFragment();
      }
      for (; i < tmpl.length; i++) {
        if (typeof tmpl[i] === 'string') {
          ele.appendChild(document.createTextNode(tmpl[i]));
        } else if (tmpl[i]) {
          ele.appendChild(this.createTemplate(tmpl[i]), namespace);
        }
      }
      return ele;
    }
  }, {
    key: 'TEXT_NODE_NAME',

    // A special element name. We don't create an element for a template that
    // starts with this element but instead merge it with its parent context.
    get: function get() {
      return '#text';
    }
  }, {
    key: 'NAMESPACES',
    get: function get() {
      return { 'svg': 'http://www.w3.org/2000/svg' };
    }
  }]);

  return Bragi;
}();

DocumentFragment.prototype.appendTemplate = Element.prototype.appendTemplate = function (tmpl) {
  return this.appendChild(Bragi.createTemplate(tmpl));
};

DocumentFragment.prototype.cleanAppendTemplate = Element.prototype.cleanAppendTemplate = function (tmpl) {
  this.textContent = '';
  return this.appendTemplate(tmpl);
};

exports.default = Bragi;