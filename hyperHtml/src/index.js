import hyperHTML from './hyperhtml.js';
import App from './App.js';

hyperHTML.bind(document.getElementById('root'))`${new App()}`;
window.__supportsNewJS__ = true;
