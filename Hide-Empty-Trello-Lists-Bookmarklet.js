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

    function displayEmptyLists(displayEnabled) {
        let lists = document.getElementById('board').querySelectorAll('div.js-list');

        for (let i = 0; i < lists.length; i++) {
            lists[i].style.display = (displayEnabled || hasVisibleCards(lists[i]) ? 'inline-block' : 'none');
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
