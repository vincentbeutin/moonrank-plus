let magiceden =  function () {

    this.getAddress = function (elem) {
        let link = elem.querySelector('a').getAttribute('href');
        return link.substring(14);
    };

    this.getCollectionName = function () {
        let parts = window.location.pathname.split('/');
        let collection = parts[2]; // https://magiceden.io/marketplace/apexducks

        if(!collection) {  // https://magiceden.io/marketplace?collection_symbol=apexducks
            const urlParams = new URLSearchParams(window.location.search);
            collection = urlParams.get('collection_symbol');
        }

        return collection;
    };

    this.resolveCollectionName = function (name) {
        return name.replaceAll('_', '');
    };

    this.addRank = function (elem, rank, url) {
        let span = document.createElement("a");
        span.href = url;
        span.target = '_blank';
        // span.innerHTML = '🏆 '+rank+'';
        span.innerHTML = '' +
            '<span style="color: rgb(247, 220, 90)">⍜ </span>' +
            '<span>' +
            rank
        '</span>'
        ;
        span.classList.add('rank');
        span.style.marginLeft = '10px';
        span.style.verticalAlign = 'bottom';
        if (rank < 200) {
            span.style.color = 'var(--bs-teal)';
        } else if(rank < 500) {
            span.style.color = 'var(--bs-warning)';
        } else {
            span.style.color = 'var(--light-grey2)';
        }

        let caption = elem.children[1];
        caption.querySelector('.card__price').append(span);
    };

    this.createObserver = function() {
        let _this = this;
        // observer instance
        const observer = new MutationObserver(function(mutationsList, observer){
            for(const mutation of mutationsList) {
                if (mutation.type === 'childList'
                    && mutation.addedNodes[0]
                    && mutation.addedNodes[0].classList
                    && mutation.addedNodes[0].classList.contains(_this.config.elementNode.substring(1))) {
                    _this.grabRank(mutation.addedNodes[0]);
                }
            }
        });

        return observer;
    }
};

export default magiceden;