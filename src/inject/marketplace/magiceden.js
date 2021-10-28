let magiceden =  function () {

    // magiceden name => moonrank name
    // add an entry if name is very different
    this.collections = {
        "the_infamous_thugbirdz_derivative" : 'infamousthug',
        "angry_bunny_club" : 'angrybunnyclub',
        "degenerate_ape_academy" : 'degenapes',
        "skyline_nft" : 'skyline',
        "unirexcity" : 'unirex',
        "lotus_gang_nft" : 'lotusgang',
        "solana_monkette_busines" : 'solanamonkettebusiness',
        "the_tower" : 'towerdao',
        "goblin_laboratory" : 'goblinbrain',
    };

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

        if (this.collections[collection]) { // name is different on moonrank
            collection = this.collections[collection];
        } else {
            collection = collection.replaceAll('_', '');
        }

        return collection;
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