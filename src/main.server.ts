/***************************************************************************************************
 * Load `$localize` onto the global scope - used if i18n tags appear in Angular templates.
*/
import '@angular/localize/init';

import { enableProdMode } from '@angular/core';

import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

export { AppServerModule } from './app/app.server.module';
export { renderModule, renderModuleFactory } from '@angular/platform-server';
const domino = require('domino');
const fs = require('fs');
const path = require('path');

// Use the browser index.html as template for the mock window
const template = fs.readFileSync(path.join(__dirname, '..', 'browser', 'index.html')).toString();

// Shim for the global window and document objects.
const window = domino.createWindow(template);
global['window'] = window;
global['document'] = window.document;
