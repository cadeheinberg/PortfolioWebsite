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
    var navButtons = document.getElementsByClassName('nav-link')
    for (var i = 0; i < navButtons.length; i++) {
        var button = navButtons[i]
        button.addEventListener('click', navButtonClick)
    }

    // Set up event delegation
    // adds event listener to the entire content-area (under the navbar)
    document.getElementById('content-area').addEventListener('click', function (event) {
        var targetElement = event.target;

        // Traverse up from the target until you find an element with the 'post-read-more-svg' class or until you run out of elements
        while (targetElement != null && !targetElement.classList.contains('post-read-more-svg')) {
            targetElement = targetElement.parentElement;
        }

        // If an element with 'post-read-more-svg' was found, call readMoreClick\
        //When you manually call readMoreClick, you are not in a standard event handler 
        //that automatically receives an event object. So, you create a new object 
        //that mimics the structure of a typical event object:
        //currentTarget is set to targetElement because you want readMoreClick to 
        //behave as if it were directly attached to targetElement. currentTarget
        if (targetElement != null && targetElement.classList.contains('post-read-more-svg')) {
            readMoreClick({ currentTarget: targetElement });
        }
    });

    // Initially load the 'projects' page content if necessary
    switchPage('projects', document.getElementById('projects'));
}

function switchPage(pageName, a_btn) {
    const contentArea = document.getElementById('content-area');
    contentArea.style.opacity = 0;

    fetch(`${pageName}.html`)
        .then(response => response.text())
        .then(html => {
            if (document.getElementsByClassName('nav-active')[0] != null) {
                document.getElementsByClassName('nav-active')[0].classList.remove('nav-active')
            }
            a_btn.classList.add('nav-active')
            // After a short delay, update the content and fade it in
            setTimeout(() => {
                contentArea.innerHTML = html;
                contentArea.style.opacity = 1; // This will trigger the CSS transition
                window.scrollTo(0, 0);
            }, 200); // Adjust time as needed to match or prepare for the CSS effect
        })
        .catch(error => {
            console.error('Error loading the page: ', error);
            contentArea.innerHTML = "<p>Error loading the page.</p>";
            contentArea.style.opacity = 1;
        });
}

function navButtonClick(event) {
    var a_btn = event.currentTarget;
    var pageName = a_btn.id
    if (pageName != null) {
        switchPage(pageName, a_btn)
    }
}

function readMoreClick(event) {
    // when you use target is gets the actual thing clicked
    // when you use currentTarget you get the element which has attached the event handler
    var svg_btn = event.currentTarget;
    var post = svg_btn.parentElement;
    var more_text = post.getElementsByClassName('post-content-hide')[0];
    var more_dots = post.getElementsByClassName('read-more-dots')[0]
    if (more_text.style.maxHeight && more_text.style.maxHeight !== "0px") {
        // hide read more
        more_dots.style.display = "inline"
        more_text.style.maxHeight = "0px";
        svg_btn.classList.toggle('post-read-more-svg-rotated');
    } else {
        // expand read more
        // Set a max-height that's greater than the height of the content
        more_dots.style.display = "none"
        more_text.style.maxHeight = more_text.scrollHeight + "px";
        svg_btn.classList.toggle('post-read-more-svg-rotated');
    }
}