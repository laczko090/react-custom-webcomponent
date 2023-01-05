import React from 'react';
import { createRoot, un } from 'react-dom/client';

import App from './App';

class MyTable extends HTMLElement {
  static get observedAttributes() {
    return ['title'];
  }

  constructor() {
    super();
    this._data = [];
  }

  get data() {
    return this._data;
  }

  set data(value) {
    this._data = value;
    this.render();
  }

  get title() {
    return this.getAttribute('title');
  }

  set title(value) {
    return this.setAttribute('title', value);
  }

  clear() {
    this.data = [];
  }

  mountPoint = document.createElement('div');
  root = createRoot(this.mountPoint);

  render() {
    if (this.shadowRoot) {
      const props = {
        data: this._data,
      };
      for (let i = 0; i < this.attributes.length; i++) {
        props[this.attributes[i].name] = this.attributes[i].value;
      }
      this.root.render(<App {...props} />);
    }
  }

  connectedCallback() {
    this.attachShadow({ mode: 'open' }).appendChild(this.mountPoint);
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  disconnectedCallback() {
    this.root.unmount();
  }
}

window.customElements.define('my-table', MyTable);
