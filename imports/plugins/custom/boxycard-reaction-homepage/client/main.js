import './main.html';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();
WebFontConfig = {
  google: { families: ['Open Sans:300,400,500,600,700,800', 'Roboto:300,400,500,600', 'futura-pt:300,400,500,600,700,800', 'Helvetica Neue:300,400,500,600,700,800', 'Arial: 300,400,500,600,700,800', 'sans-serif: 300,400,500,600,700,800', 'aktiv-grotesk-std:300,400,500,600,700,800', 'Aktiv Grotesk: 300,400,500,600,700,800'] },
};
(function() {
var wf = document.createElement('script');
wf.src = 'https://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
wf.type = 'text/javascript';
wf.async = 'true';
var s = document.getElementsByTagName('script')[0];
s.parentNode.insertBefore(wf, s);
})();
