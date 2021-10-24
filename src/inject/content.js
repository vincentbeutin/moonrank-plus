'use strict';

chrome.extension.sendMessage({}, function(response) {
    var readyStateCheckInterval = setInterval(function() {
        if (document.readyState === "complete") {
            clearInterval(readyStateCheckInterval);

            (async () => {
                const src = chrome.extension.getURL('src/inject/core.js');
                const contentScript = await import(src);
            })();
        }
    }, 10);
});