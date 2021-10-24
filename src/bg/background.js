// if you checked "fancy-settings" in extensionizr.com, uncomment this lines

// var settings = new Store("settings", {
//     "sample_setting": "This is how you use Store.js to remember values"
// });


//example of using a message handler from the inject scripts
// chrome.extension.onMessage.addListener(
//   function(request, sender, sendResponse) {
//   	chrome.pageAction.show(sender.tab.id);
//     sendResponse();
//   });

// background.js
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    fetch(request.input, request.init).then(function(response) {
        return response.text().then(function(text) {
            sendResponse([{
                body: text,
                status: response.status,
                statusText: response.statusText,
            }, null]);
        });
    }, function(error) {
        sendResponse([null, error]);
    });
    return true;
});