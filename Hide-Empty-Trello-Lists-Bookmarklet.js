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

    function toggleListVisibility() {
        let lists = document.getElementById('board').querySelectorAll('div.js-list');

        for (let i = 0; i < lists.length; i++) {
            lists[i].style.display = (hasVisibleCards(lists[i]) ? 'inline-block' : 'none');
        }
    };

    toggleListVisibility();

    setInterval(toggleListVisibility, 500);

})();
