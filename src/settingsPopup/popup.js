// Setup refrences
var enableFontGrow = document.getElementById("enableFontGrow");
var fontsizfocsd = document.getElementById("fontsizfocsd");
var fontsiztype = document.getElementById("fontsiztype");

//for loading
function checkUndefined(dataChild,defaultVal,name) {
    if (dataChild == undefined){
        return defaultVal;
    } else {
        return dataChild;
    }
}
chrome.storage.sync.get(['enableFontGrow', 'fontsizfocsd', 'fontsiztype'], function(data) {
    enableFontGrow.checked = checkUndefined(data.enableFontGrow, true);
    fontsizfocsd.value = checkUndefined(data.fontsizfocsd, 250);
    fontsiztype.value = checkUndefined(data.fontsiztype, "%");

    // Resave incase of undefineds getting set
    chrome.storage.sync.set({
        enableFontGrow: enableFontGrow.checked,
        fontsizfocsd: fontsizfocsd.value,
        fontsiztype: fontsiztype.value
    });
});
// Set defaults
if (fontsizfocsd.value == undefined){
    fontsizfocsd.value = "250";
}

//for Saving
// Setup Events To Be Triggered From Html Page
var inputs = document.querySelectorAll("input,select"); // Trigger on any change
for (var i = 0; i < inputs.length; i++) {
    input = inputs[i];
    //console.log("Add event to "+input);
    input.addEventListener("input", save);
}
document.getElementById('resetSettings').addEventListener('click',reset)


function save(){ // function to be called on updates

    //console.log("Update sent");

    // Save data to be retrived
    chrome.storage.sync.set({
        enableFontGrow: enableFontGrow.checked,
        fontsizfocsd: fontsizfocsd.value,
        fontsiztype: fontsiztype.value
    });

    console.log("Saved these values to synced storage: " + enableFontGrow.checked + fontsizfocsd.value + fontsiztype.value);

    chrome.tabs.query({url: "*://www.google.com/search*"}, function(tabs) { // Fire update
        chrome.tabs.sendMessage(tabs[0].id, {
            settingsUpdate: true  // Tell them to update
        });
        console.log("Sent update blast to "+tabs);
    });


}

function reset() {
    chrome.storage.sync.clear(function() {
        var error = chrome.runtime.lastError;
        if (error) {
            console.error(error);
        }
    });
}
