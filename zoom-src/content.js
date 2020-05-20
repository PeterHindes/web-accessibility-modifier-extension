console.log(window.visualViewport.scale);
//window.visualViewport.scale = 2;

// Section adds css in a debugable way.
function injectStyles(url) {
    var elem = document.createElement('link');
    elem.rel = 'stylesheet';
    elem.setAttribute('href', url);
    document.body.appendChild(elem);
}
injectStyles(chrome.extension.getURL('styles.css'));