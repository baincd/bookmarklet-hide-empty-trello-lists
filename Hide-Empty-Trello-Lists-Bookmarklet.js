/* 
 * After making changes, run `./update-doc.sh` to update the documentation (docs/index.html)
 * 
 * Note: Do not use double-quotes anywhere within this script
 */
javascript: (function () {
    function hasVisibleCards(list) {
        let listCards = list.querySelectorAll('a.list-card');
        for (let i = 0; i < listCards.length; i++) {
            if (!listCards[i].classList.contains('hide')) {
                return true;
            }
        }
        return false;
    }

    function isResizeElement(el) {
        return (el && el.classList && el.classList.contains('resize-element'));
    }

    function displayEmptyLists(displayEmptyListsEnabled) {
        let lists = document.getElementById('board').querySelectorAll('div.js-list');

        for (let i = 0; i < lists.length; i++) {
            const list = lists[i];
            const listSibling = list.nextSibling;
            const displayValue = (displayEmptyListsEnabled || hasVisibleCards(lists[i]) ? 'inline-block' : 'none');

            list.style.display = displayValue;

            /* Resize Element may be added by Trello Super Powers browser extension */
            if (isResizeElement(listSibling)) {
                listSibling.style.display = displayValue;
            }
        }
    };

    if (window.HIDE_EMPTY_TRELLO_LISTS_BOOKMARKLET_INTERVAL === undefined) {
        displayEmptyLists(false);
        window.HIDE_EMPTY_TRELLO_LISTS_BOOKMARKLET_INTERVAL = setInterval(displayEmptyLists, 500);
    } else {
        clearInterval(window.HIDE_EMPTY_TRELLO_LISTS_BOOKMARKLET_INTERVAL);
        window.HIDE_EMPTY_TRELLO_LISTS_BOOKMARKLET_INTERVAL = undefined;
        displayEmptyLists(true);
    }

})();
