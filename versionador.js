const fs = require('fs');

const htmlPath = 'index.html';
let html = fs.readFileSync(htmlPath, 'utf8');

// Genera un número de versión basado en la fecha actual
const version = Date.now();

// Reemplaza versiones anteriores en CSS y JS
html = html.replace(/estilos\.css\\?v=\\d+/g, `estilos.css?v=${version}`);
html = html.replace(/script\.js\\?v=\\d+/g, `script.js?v=${version}`);

// Guarda el archivo actualizado
fs.writeFileSync(htmlPath, html);
console.log(`Versionado aplicado: v=${version}`);
