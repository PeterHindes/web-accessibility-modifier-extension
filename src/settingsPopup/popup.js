// Setup refrences
var enableFontGrow = document.getElementById("enableFontGrow");
var fontsizfocsd = document.getElementById("fontsizfocsd");
var fontsiztype = document.getElementById("fontsiztype");

//for loading
chrome.storage.sync.get(['enableFontGrow', 'fontsizfocsd', 'fontsiztype'], function(data) {
    enableFontGrow.checked = data.enableFontGrow;
    fontsizfocsd.value = data.fontsizfocsd;
    fontsiztype.value = data.fontsiztype;
});
// Set defaults
if (fontsizfocsd.value == null){
    fontsizfocsd.value = "250";
}

//for Saving
// Setup Events To Be Triggered From Html Page
var inputs = document.querySelectorAll("input,select"); // Trigger on any change
for (var i = 0; i < inputs.length; i++) {
    input = inputs[i];
    //console.log(input);
    console.log("Add event to "+input);
    input.addEventListener("input", save);
}


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


// Not firing on type cange only number change and check