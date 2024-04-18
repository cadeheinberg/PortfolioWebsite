if (document.readyState == 'loading') {
    //if it is still loading
    //we add an event listener so that as soon
    //as it is loaded ("DOMContentLoaded")
    //we run the function "ready"
    document.addEventListener('DOMContentLoaded', ready)
} else {
    //if the document is already loaded
    //then the html is good to go we are ready
    ready()
}

function ready() {
    var readMoreButtons = document.getElementsByClassName('post-read-more-svg')
    for (var i = 0; i < readMoreButtons.length; i++) {
        var button = readMoreButtons[i]
        button.addEventListener('click', readMoreClick)
    }
}

function readMoreClick(event) {
    // when you use target is gets the actual thing clicked
    // when you use currentTarget you get the element which has attached the event handler
    var svg_btn = event.currentTarget;
    var post = svg_btn.parentElement;
    var more_text = post.getElementsByClassName('post-content-hide')[0];
    if (more_text.style.maxHeight && more_text.style.maxHeight !== "0px") {
        // hide read more
        more_text.style.maxHeight = "0px";
        svg_btn.classList.toggle('post-read-more-svg-rotated');
    } else {
        // expand read more
        // Set a max-height that's greater than the height of the content
        more_text.style.maxHeight = more_text.scrollHeight + "px";
        svg_btn.classList.toggle('post-read-more-svg-rotated');
    }
}
