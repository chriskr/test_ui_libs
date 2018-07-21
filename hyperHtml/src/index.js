import hyperHTML from 'hyperhtml/esm';
import App from './App.js';

console.log('>>>', hyperHTML)

hyperHTML.bind(document.getElementById('root'))`${new App()}`;
window.__supportsNewJS__ = true;
