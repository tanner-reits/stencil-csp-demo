# Stencil CSP Nonce Demo

This repo is a very basic example of leveraging a Content Security Policy (CSP) within an Angular application implementing a Stencil
component library. The Angular app is served using an Express server which will apply the CSP header to each request.

## Getting Started

First off, be sure to run `npm install` before following as below steps.

### CSP Violation

1. Run `npm run start:server-error`
2. Open `localhost:3333/home`. Notice the console logs for "generated nonce" and "fetched nonce" differ. This leads to additional console
   errors related to CSP violations on script/style tags. As a result the text "Hello, World! I'm Stencil" color is white instead of red.

### CSP Adherence

1. Run `npm run start:server-valid`
2. Open `localhost:3333/home`. Notice the console log for "generated nonce" and "fetched nonce" are now the same. As a result, we see fewer
   console errors related to CSP violations (those that do appear are related to some generated Angular code). Now, the "Hello, World! I'm Stencil"
   text color is red as expected!

## Points of Interest

So, what is different between the two implementations that triggers the CSP violations?

The only thing different is the nonce value we're giving to our Angular application before bootstrap. In `server-error.ts` we expose and endpoint (`/nonce`)
that always returns a static string, rather than the actual nonce value our server generates. When our Angular application fetches this value
and provides it to the Stencil runtime, all the script/style tags Stencil generates won't have the correct nonce attribute value.

In `server-valid.ts`, we expose the same endpoint, but this time is returns the cryptographically secure nonce the server generated.

The fetch of the nonce value happens in Angular's entry point file (`src/main.ts`). The value is then passed to Stencil using the `setNonce` helper method.

## Caveats

Be aware, this is an overly simplified example to showcase what happens during a CSP violation and how Stencil can correctly handle nonce CSP policies.
As such, several steps were taken to make this demo simple to use and understand:

1. The Angular distribution code is committed with this repo because manual modifications were made to the `index.html` file to avoid CSP violations in the
   generated entry code. If the Angular code is built again, these changes will be overwritten and nothing will appear in the browser when running the demos.
2. The Express servers in the demos generate a single nonce value at startup. **This is not a recommended pattern for production code**. A nonce should be unique per page view. Otherwise, it's benefits are negated and the nonce can be easily compromised to allow malicious code to execute in the browser.
