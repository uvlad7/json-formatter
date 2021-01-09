// // Listen for requests from devtools.js
// chrome.extension.onConnect.addListener(function (port) {
//
//     if (port.name !== 'devtools') {
//         console.log('JSON Formatter error - unknown port name ' + port.name, port);
//         return;
//     }
//
//     port.onMessage.addListener(function (msg) {
//         if (msg.type === 'SENDING TEXT') {
//
//         }
//     });
// });