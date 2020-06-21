// Saves options to chrome.storage
function save_options() {
    const type = document.querySelector('input[name="langRadio"]:checked').value;
    const symbolize = document.getElementById('symbolize').checked;
    chrome.storage.sync.set({
        favoritePath: type,
        symbolizeNames: symbolize
    }, function () {
        // Update status to let user know options were saved.
        const status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function () {
            status.textContent = '';
        }, 750);
    });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
    // Use default value color = 'red' and likesColor = true.
    chrome.storage.sync.get({
        favoritePath: 'langRubyDig',
        symbolizeNames: true
    }, function (items) {
        document.getElementById(items.favoritePath).checked = true;
        document.getElementById('symbolize').checked = items.symbolizeNames;
        changeLabels();
    });
}

function changeLabels() {
    if (document.getElementById('symbolize').checked) {
        document.getElementById('langRubyDig').labels[0].getElementsByTagName('small')[0].innerHTML = 'json.dig(:formatter, 1)';
        document.getElementById('langRubyBrc').labels[0].getElementsByTagName('small')[0].innerHTML = 'json[:formatter][1]';
    } else {
        document.getElementById('langRubyDig').labels[0].getElementsByTagName('small')[0].innerHTML = 'json.dig("formatter", 1)';
        document.getElementById('langRubyBrc').labels[0].getElementsByTagName('small')[0].innerHTML = 'json["formatter"][1]';
    }
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
document.getElementById('symbolize').addEventListener('change', changeLabels);

