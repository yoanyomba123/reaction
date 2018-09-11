import { BrowserPolicy } from 'meteor/browser-policy-common';

BrowserPolicy.content.allowOriginForAll('https://js.stripe.com/');
BrowserPolicy.content.allowOriginForAll('https://checkout.stripe.com/');
BrowserPolicy.content.allowOriginForAll('https://tmc-post-content.s3.amazonaws.com/');
BrowserPolicy.content.allowOriginForAll('https://q.stripe.com/');
BrowserPolicy.content.allowOriginForAll('https://*.youtube.com/');
BrowserPolicy.content.allowOriginForAll('https://*.typekit.net/');
BrowserPolicy.content.allowOriginForAll('https://*.googleapis.com/');
