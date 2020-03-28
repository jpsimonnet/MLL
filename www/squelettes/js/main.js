$(document).ready(function() {

    // source : http://webaim.org/techniques/skipnav/ - deleted the yellowFade function
    // If there is a '#' in the URL (someone linking directly to a page with an anchor), highlight that section and set focus to it.
    // The tabindex attribute is removed AFTER the user navigates away from the element to help address a nasty VoiceOver bug.
    if (document.location.hash) {
        var myAnchor = document.location.hash;
        $(myAnchor).attr('tabindex', -1).on('blur focusout', function() {
            $(this).removeAttr('tabindex');
        }).focus();
    }

    /* This function looks for a change in the hash (activation of an in-page link) and sets focus to and
    highlights the target element. This is necessary because webkit does not set focus as it should. If
    the hash is empty (the user hit the back button after activating an in-page link) focus is set to body.	*/
    $(window).bind('hashchange', function() {
        var hash = "#" + window.location.hash.replace(/^#/, '');
        if (hash != "#") {
            $(hash).attr('tabindex', -1).on('blur focusout', function() {
                $(this).removeAttr('tabindex');
            }).focus();
        } else {
            $("#a11y").attr('tabindex', -1).on('blur focusout', function() {
                $(this).removeAttr('tabindex');
            }).focus();
        }
    });

    // If there's a 'fade' id (used for error identification), highlight it and set focus to it.
    if ($('#fade').length) {
        $('#fade').attr('tabindex', -1).on('blur focusout', function() {
            $(this).removeAttr('tabindex');
        }).focus();
    }

    // Flying Focus
    // source : https://github.com/NV/flying-focus/

    (function() {
        'use strict';

        var DURATION = 250;

        var ringElem = null;
        var movingId = 0;
        var prevFocused = null;
        var keyDownTime = 0;

        var win = window;
        var doc = document;
        var docElem = doc.documentElement;
        var body = doc.body;


        docElem.addEventListener('keydown', function(event) {
            var code = event.which;
            // Show animation only upon Tab or Arrow keys press.
            if (code === 9 || (code > 36 && code < 41)) {
                keyDownTime = Date.now();
            }
        }, false);


        docElem.addEventListener('focus', function(event) {
            var target = event.target;
            if (target.id === 'flying-focus') {
                return;
            }

            var isFirstFocus = false;
            if (!ringElem) {
                isFirstFocus = true;
                initialize();
            }

            var offset = offsetOf(target);
            ringElem.style.left = offset.left + 'px';
            ringElem.style.top = offset.top + 'px';
            ringElem.style.width = target.offsetWidth + 'px';
            ringElem.style.height = target.offsetHeight + 'px';

            if (isFirstFocus || !isJustPressed()) {
                return;
            }

            onEnd();
            target.classList.add('flying-focus_target');
            ringElem.classList.add('flying-focus_visible');
            prevFocused = target;
            movingId = setTimeout(onEnd, DURATION);
        }, true);


        docElem.addEventListener('blur', function() {
            onEnd();
        }, true);


        function initialize() {
            ringElem = doc.createElement('flying-focus'); // use uniq element name to decrease the chances of a conflict with website styles
            ringElem.id = 'flying-focus';
            ringElem.style.transitionDuration = ringElem.style.WebkitTransitionDuration = DURATION / 1000 + 's';
            body.appendChild(ringElem);
        }


        function onEnd() {
            if (!movingId) {
                return;
            }
            clearTimeout(movingId);
            movingId = 0;
            ringElem.classList.remove('flying-focus_visible');
            prevFocused.classList.remove('flying-focus_target');
            prevFocused = null;
        }


        function isJustPressed() {
            return Date.now() - keyDownTime < 42
        }


        function offsetOf(elem) {
            var rect = elem.getBoundingClientRect();
            var clientLeft = docElem.clientLeft || body.clientLeft;
            var clientTop = docElem.clientTop || body.clientTop;
            var scrollLeft = win.pageXOffset || docElem.scrollLeft || body.scrollLeft;
            var scrollTop = win.pageYOffset || docElem.scrollTop || body.scrollTop;
            var left = rect.left + scrollLeft - clientLeft;
            var top = rect.top + scrollTop - clientTop;
            return {
                top: top || 0,
                left: left || 0
            };
        }

    })();

});
