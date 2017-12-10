// -*- Mode: c++; tab-width: 2; indent-tabs-mode: nil; c-basic-offset: 2 -*-
//
// Copyright (C) 2014 Opera Software ASA.  All rights reserved.
//
// This file is an original work developed by Opera Software ASA


class Bragi {
  // A special element name. We don't create an element for a template that
  // starts with this element but instead merge it with its parent context.
  static get TEXT_NODE_NAME() { return '#text'; }
  static get NAMESPACES() { return {'svg': 'http://www.w3.org/2000/svg'}; }

  static createTemplate(tmpl, namespace = '') {
    const ELE_NAME = 0;
    const ATTRS = 1;
    const elementName = tmpl[ELE_NAME];
    let ele = null;
    let i = 0;
    if (typeof elementName === 'string' &&
        elementName !== Bragi.TEXT_NODE_NAME) {
      i++;
      if (elementName.includes(':')) {
        const pos = elementName.indexOf(':');
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
  };
}


DocumentFragment.prototype.appendTemplate =
    Element.prototype.appendTemplate = function(tmpl) {
      return this.appendChild(Bragi.createTemplate(tmpl));
    };

DocumentFragment.prototype.cleanAppendTemplate =
    Element.prototype.cleanAppendTemplate = function(tmpl) {
      this.textContent = '';
      return this.appendTemplate(tmpl);
    };

export default Bragi;
