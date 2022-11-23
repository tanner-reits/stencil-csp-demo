import * as express from 'express';
import { randomBytes } from 'crypto';

const app = express();
const port = 3333;

const appFolder = 'www';

// Generate CSP nonce
const nonce = randomBytes(16).toString('base64');
console.log('GENERATED NONCE', nonce);

// Set the view templating engine
app.engine('html', require('ejs').renderFile);
// Change the default "views" directory so express can find our HTML
app.set('views', appFolder);

// Apply the CSP header to the response
app.use(function (_, res, next) {
  res.setHeader(
    'Content-Security-Policy',
    `style-src 'nonce-${nonce}'; script-src 'nonce-${nonce}';`
  );
  next();
});

app.use('/', express.static(appFolder, {}));

// Default route, renders our SPA
app.get('/home', function (_, res) {
  res.render('index.html', { nonce });
});

// Exposed endpoint to get the generated nonce value
app.get('/nonce', function (_, res) {
  res.send({ nonce });
});

app.listen(port, () =>
  console.log(`server started at http://localhost:${port}/`)
);
