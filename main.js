var excuses = [
    "Your computer needs to be restarted.",
    "There was atmospheric interference from a weather balloon.",
    "The sky is falling.",
    "Your ticket number is 1563.",
    "Sun spots.",
    "We think it might be a gremlin.",
    "There is a missing lego piece.",
    "Your computer has a flat tire.",
    "The Lizard people"
];

var freeExcuses = 10;

var TEXT_LOCK = false;

function swapText(element = null, startText = null, endText = "", prefix = "", postfix = "", oncomplete = null) {

    TEXT_LOCK = true;

    if (element == null) {
        throw "No swap text element provided!";
    }

    if (startText == null) {
        startText = element.innerHTML;
    }

    let steps = [];
    for (let i = 0; i < startText.length; i++) {
        steps.push(startText.substring(0, startText.length - i))
    }

    for (let i = 0; i <= endText.length; i++) {
        steps.push(endText.substring(0, i))
    }

    let callBack = function (fn, elm, next, pre, post, callback) {
        let newContent = pre + next[0] + post;
        elm.innerHTML = newContent;

        next.shift();

        if (next.length > 0) {
            let animationSpeed = ( 10);
            setTimeout(function () {
                fn(fn, elm, next, pre, post, callback)
            }, animationSpeed);
        } else {
            TEXT_LOCK = false;
        }
    };

    callBack(callBack, element, steps, prefix, postfix, oncomplete);
}

var overExcused = 0;

function findAnExcuse() {

    if (TEXT_LOCK) {
        return;
    }

    var excuseBox = document.getElementById("excuse");
    var excuseCount = document.getElementById("excuse-count");

    var newExcuse = "Missing excuse, sorry.";

    if (excuses.length > 0 && freeExcuses > 0) {
        var newExcuseIndex = Math.floor(Math.random() * excuses.length);
        newExcuse = excuses[newExcuseIndex];

        excuses.splice(newExcuseIndex, 1);

        freeExcuses--;
        excuseCount.innerHTML = "Excuses Remaining: " + freeExcuses;
    } else {
        switch (overExcused) {
            case 0:
                newExcuse = "I guess you will have to actually solve their problem.";
                excuseCount.innerHTML = "Excuses Remaining: 0";
                break;
            case 1:
                newExcuse = "I know you don't want to, just get it over with!";
                excuseCount.innerHTML = "Excuses Remaining: Stop clicking the button.";
                break;
            case 2:
                newExcuse = "You cant rely on me to solve all your problems.";
                break;
            case 3:
                newExcuse = "I dare you to click it again.";
                break;
            default:
                newExcuse = "Alright, that's it, no more Mr. nice website...";
                // do something mean here
                break;
        }
        overExcused++;
    }

    //excuseBox.innerHTML = newExcuse;
    swapText(
        excuseBox,
        "",
        newExcuse,
        "",
        "",
        null
    );
}