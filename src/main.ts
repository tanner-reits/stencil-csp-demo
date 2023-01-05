import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import 'my-lib/dist/components/my-component';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

// Prior to application bootstrap, we'll proxy a request to our
// server instance to get a nonce value. That value will be
// supplied to the Stencil runtime to set the nonce attribute
// on all generated `script` and `style` tags.
fetch('nonce')
  .then((res) => res.json())
  .then(({ nonce }) => {
    console.log('FETCHED NONCE', nonce);
    return platformBrowserDynamic().bootstrapModule(AppModule);
  })
  .catch((err) => console.log(err));
