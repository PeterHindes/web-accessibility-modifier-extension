// Written By Peter Hindes

// Get css root
let cssRoot = document.documentElement.style;

// Here we define the class types and what they contain. If these change in the future they can be updated here easily.
const simpleSearchResultChildH3Title = "LC20lb DKV0Md";

const topStoriesMainDiv = "CBQQAA"; // Not a class. Data is in tag "data-hveid"
const childOfChildOfTopStoriesDiv = "e2BEnf U7izfe";

const childOfVideoDiv = "CBMQAA"; // Not a class. Data is in tag "data-hveid"
const childOfChildOfVideoDiv = "CMLaue fVRq4d mIKy0c";

const peopleAlsoAskMainDiv = "g kno-kp mnr-c g-blk";

const resultsContainerId = "rso"; // Not a class. Data is in an id tag

const movieOverviewAndReviewsID = "kp-wp-tab-overview"; // Not a class. Data is in an id tag
//const avalibleOnClass = "qLLird"; // to check if we are showing a media such as a movie // THIS IS NOT UNIQUE TO THIS ELEMENT YOU MUST CHECK CONTENTS
const avalibleOnMasterNodeChild = "kp-blk EyBRub fm06If Wnoohf OJXvsb";

const imagesForMainDiv = "LnbJhc";

// Catch settings changes from the settings page.
var enableFontGrowLocal = true; // Default
function updateSettings() {
    console.log("Running Update");

    chrome.storage.sync.get(['enableFontGrow', 'fontsizfocsd', 'fontsiztype'], function(data) {
        enableFontGrowLocal = data.enableFontGrow;
        //console.log(data.enableFontGrow);
        if (data.enableFontGrow == true){ // If the grow setting is on
            // Enable tag for css
            var results = document.getElementsByClassName("r");
            for (var i = 0; i < results.length; i++) {
                var result = results[i];
                var link = result.getElementsByTagName("A")[0];
                var title = link.getElementsByTagName("H3")[0];
                var spacerTitle = link.getElementsByTagName("H3")[1]; // Second h3 (spacer )
                if (spacerTitle == undefined){
                    setupResult(i,results);
                    var spacerTitle = link.getElementsByTagName("H3")[1]; // Second h3 (spacer )
                    console.log("Unexpected un-setup result in page.");
                }
                title.setAttribute("target","_selected_large_text");
                spacerTitle.style.display = "show";
            }
            // Update in css
            cssRoot.setProperty('--font-siz-grown', 
                data.fontsizfocsd
                +
                data.fontsiztype
            );
            //console.log ("Set font in css to be: "+data.fontsizfocsd + data.fontsiztype);
        }else{ // Remove css target for text growing
            //disable grow
            // Disable tag for css and hide
            var results = document.getElementsByClassName("r");
            for (var i = 0; i < results.length; i++) {
                try {
                    var result = results[i];
                    var link = result.getElementsByTagName("A")[0];
                    var title = link.getElementsByTagName("H3")[0]; // Top h3 (origonal styled)
                    var spacerTitle = link.getElementsByTagName("H3")[1]; // Second h3 (spacer )
                    if (spacerTitle == undefined){
                        setupResult(i,results);
                        var spacerTitle = link.getElementsByTagName("H3")[1]; // Second h3 (spacer )
                        console.log("Unexpected un-setup result in page.");
                    }
                    title.removeAttribute("target");
                    spacerTitle.style.display = "none";
                } catch (error) {
                    
                }
            }
        }


    });
}
chrome.runtime.onMessage.addListener( // Entry point for a signal to update from the popup
    function (request, sender, sendResponse) {
        console.log ("Caught event");
        if (request.settingsUpdate == true){ // If the event asks for an update
            updateSettings();
        }
    }
);
//console.log("added listner");
// Run update on load
updateSettings();

// Reorder them in a friendly way without breakes between result types
var targetMaster = document.getElementById(resultsContainerId);
function cloneToBottom(target) {
    cloneTo(target,"bottom");
}
function cloneTo(target,location) {
    //console.log(target.outerHTML);
    var cln = target.cloneNode(true);
    if (location == "bottom"){
        targetMaster.appendChild(cln);
    } else if (typeof location == "number") {
        targetMaster.insertBefore(cln, targetMaster.childNodes[location]);
    }
    target.outerHTML = null;
}

// Clones the targets to the bottom of the search results list. Then deletes its origonal.  ////         This is bad code clean it up later
try {
    var topStoriesTarget = document.getElementsByClassName(childOfChildOfTopStoriesDiv)[0].parentNode.parentNode;
    //console.log("Top:");
    //console.log(topStoriesTarget.outerHTML);
    cloneToBottom(topStoriesTarget);
} catch (error) {        
}

try {
    var videosTarget = document.getElementsByClassName(childOfChildOfVideoDiv)[0].parentNode.parentNode;
    //console.log("Vid:");
    //console.log(videosTarget.outerHTML);
    cloneToBottom(videosTarget);
} catch (error) {    
}

try {
    var peopleAlsoAskTarget = document.getElementsByClassName(peopleAlsoAskMainDiv)[0];
    //console.log("peeps:");
    //console.log(peopleAlsoAskTarget.outerHTML);
    cloneToBottom(peopleAlsoAskTarget);
} catch (error) {    
}

try {
    var imagesForTarget = document.getElementsByClassName(imagesForMainDiv)[0];
    //console.log("imagesfor:");
    //console.log(imagesForTarget.outerHTML);
    cloneTo(imagesForTarget,0);
} catch (error) {    
}



// Put movie avalible on section into the info card
if (document.getElementsByClassName( avalibleOnMasterNodeChild ).length){
    //console.log ("this is a movie");
    var avalibleOnElement = document.getElementsByClassName(avalibleOnMasterNodeChild)[0].parentNode;
    var movieOverviewAndReviewsElement = document.getElementById(movieOverviewAndReviewsID);

    //console.log(avalibleOnElement);
    //console.log(movieOverviewAndReviewsElement);

    var cln = avalibleOnElement.cloneNode(true);
    cln.setAttribute("id","avalibleOn"); // Give it info for css styles
    cln.childNodes[1].setAttribute("id","avalibleOnFeedback");
    movieOverviewAndReviewsElement.insertBefore(cln, movieOverviewAndReviewsElement.children[1]);
    avalibleOnElement.outerHTML = null;
}


// Section adds css in a debugable way.
function injectStyles(url) {
    var elem = document.createElement('link');
    elem.rel = 'stylesheet';
    elem.setAttribute('href', url);
    document.body.appendChild(elem);
}
injectStyles(chrome.extension.getURL('styles.css'));


/*/ Collects all elements that were selectable when the script first ran
const keyboardfocusableElements = [...document.querySelectorAll( // credit: https://zellwk.com/blog/keyboard-focusable-elements/
    'a, button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'
)].filter(el => !el.hasAttribute('disabled'));

// This section makes everything that can be selected have a tabindex of 1000 so we have some room below the new default of 1000 to put the things we want first
for (var i = 0; i < keyboardfocusableElements.length; i++) {
    var element = keyboardfocusableElements[i];

    element.setAttribute("tabindex","1000");
}*/

// This section puts the "SIMPLE-SEARCH-RESULT" class on search resut links. These links are the parents of their titles which we fetch here by their class "LC20lb DKV0Md".
function setupResult(i,results) {
    var result = results[i];
    var link = result.getElementsByTagName("A")[0];
    var title = link.getElementsByTagName("H3")[0];


    link.className = "SIMPLE-SEARCH-RESULT";
    
    //console.log ("Lets clone");
    var cln = title.cloneNode(true); // Duplicate all the titles (we do this because the css floats the growable link which gives it no size in the page. this keeps the description in place)
    link.appendChild(cln);


    title.setAttribute("target","_selected_large_text");

    // This puts simple search results before everything else
    /*element.parentNode.setAttribute("tabindex","999");
    if (i == 0) {
        element.parentNode.setAttribute("autofocus","true");
    }*/
}
var results = document.getElementsByClassName("r");
for (var i = 0; i < results.length; i++) {
    setupResult(i,results);
}

/*
var elements = document.getElementsByTagName("*");
for (var i = 0; i < elements.length; i++) {
    var element = elements[i];

    //console.log(element.tabindex = "1");

    if (element.className == "SIMPLE-SEARCH-RESULT"){
        
    }
}


//element.setAttribute    
/*
for (var j = 0; j < element.childNodes.length; j++) { // Works on children (tags not present here)
    var node = element.childNodes[j];

    if (node.nodeType === 3) {
        var text = node.nodeValue;
        var replacedText = text.replace(/cats/gi, 'dog haters');

        if (replacedText !== text) {
            element.replaceChild(document.createTextNode(replacedText), node);
        }
    }
}*/

/*



    element.parentNode.onfocus = function() { // Make font big when selected
        for (var j = 0; j < this.childNodes.length; j++) { // Works on children
            var node = this.childNodes[j];
            if (node.className == "LC20lb DKV0Md"){
                node.setAttribute("target","_selected_large_text");
            }
        }
    };

    element.parentNode.onblur = function() { // Make font small when selection ends
        for (var j = 0; j < this.childNodes.length; j++) { // Works on children
            var node = this.childNodes[j];
            if (node.className == "LC20lb DKV0Md"){
                node.setAttribute("target","_none");
            }
        }
    };
*/


//LC20lb DKV0Md