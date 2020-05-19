// Written By Peter Hindes

// Here we define the class types and what they contain. If these change in the future they can be updated here easily.
const simpleSearchResultChildH3Title = "LC20lb DKV0Md";

const topStoriesMainDiv = "CBQQAA"; // Not a class. Data is in tag "data-hveid"
const childOfChildOfTopStoriesDiv = "e2BEnf U7izfe";

const childOfVideoDiv = "CBMQAA"; // Not a class. Data is in tag "data-hveid"
const childOfChildOfVideoDiv = "CMLaue fVRq4d mIKy0c";

const peopleAlsoAskMainDiv = "g kno-kp mnr-c g-blk";

const resultsContainerId = "rso"; // Not a class. Data is in an id tag

const movieOverviewAndReviewsID = "kp-wp-tab-overview"; // Not a class. Data is in an id tag
const avalibleOnClass = "qLLird"; // to check if we are showing a media such as a movie
const avalibleOnMasterNodeChild = "kp-blk EyBRub fm06If Wnoohf OJXvsb";

// Reorder them in a friendly way without breakes between result types
var targetMaster = document.getElementById(resultsContainerId);
function cloneToBottom(target) {
    //console.log(target.outerHTML);
    var cln = target.cloneNode(true);
    targetMaster.appendChild(cln);
    target.outerHTML = null;
}

// Clones the targets to the bottom of the search results list. Then deletes its origonal.
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



// Put movie avalible on section into the info card
if (document.getElementsByClassName( avalibleOnClass ).length ){
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


//parentElement.insertBefore(newElement, parentElement.children[2]);








// Section adds css in a debugable way.
function injectStyles(url) {
    var elem = document.createElement('link');
    elem.rel = 'stylesheet';
    elem.setAttribute('href', url);
    document.body.appendChild(elem);
}
injectStyles(chrome.extension.getURL('styles.css'));


// Collects all elements that were selectable when the script first ran
const keyboardfocusableElements = [...document.querySelectorAll( // credit: https://zellwk.com/blog/keyboard-focusable-elements/
    'a, button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'
)].filter(el => !el.hasAttribute('disabled'));

// This section makes everything that can be selected have a tabindex of 1000 so we have some room below the new default of 1000 to put the things we want first
for (var i = 0; i < keyboardfocusableElements.length; i++) {
    var element = keyboardfocusableElements[i];

    element.setAttribute("tabindex","1000");
}

// This section puts the "SIMPLE-SEARCH-RESULT" class on search resut links. These links are the parents of their titles which we fetch here by their class "LC20lb DKV0Md".
var results = document.getElementsByClassName("r");
for (var i = 0; i < results.length; i++) {
    //console.log (results.length);
    var result = results[i];
    var link = result.getElementsByTagName("A")[0];
    var title = link.getElementsByTagName("H3")[0];


    link.className = "SIMPLE-SEARCH-RESULT";
    
    //console.log ("Lets clone");
    var cln = title.cloneNode(true);
    link.appendChild(cln);


    title.setAttribute("target","_selected_large_text");

    // This puts simple search results before everything else
    /*element.parentNode.setAttribute("tabindex","999");
    if (i == 0) {
        element.parentNode.setAttribute("autofocus","true");
    }*/



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