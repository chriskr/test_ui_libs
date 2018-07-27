import {html, render} from 'lit-html';
import App from './App.js';

render(html`${new App().render()}`, document.getElementById('root'));
window.__supportsNewJS__ = true;
