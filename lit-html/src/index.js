import {html, render} from './lit-html.js';
import App from './App.js';

console.log(App)

render(html`${new App().render()}`, document.getElementById('root'));
