import App from './app.js'
window.addEventListener('load', () => {
  const app = new App();
  app.render(document.body);
  window.__supportsNewJS__ = true;
});
