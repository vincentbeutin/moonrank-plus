let magiceden =  function () {

    // magiceden name => moonrank name
    // add an entry if name is very different
    this.collections = {
        "the_infamous_thugbirdz_derivative" : 'infamousthug',
        "angry_bunny_club" : 'angrybunnyclub',
        "degenerate_ape_academy" : 'degenapes',
        "skyline_nft" : 'skyline',
        "unirexcity" : 'unirex',
    };

    this.getAddress = function (elem) {
        let link = elem.querySelector('a').getAttribute('href');
        return link.substring(14);
    };

    this.getCollectionName = function () {
        let parts = window.location.pathname.split('/');
        let collection = parts[2];

        if (this.collections[parts[2]]) { // name is different on moonrank
            collection = this.collections[parts[2]];
        } else if(collection) { // https://magiceden.io/marketplace/apexducks
            collection = collection.replaceAll('_', '');
        } else { // https://magiceden.io/marketplace?collection_symbol=apexducks
            const urlParams = new URLSearchParams(window.location.search);
            collection = urlParams.get('collection_symbol');
        }

        return collection;
    };

    this.addRank = function (elem, rankElem) {
        let caption = elem.children[1];
        caption.querySelector('.card__price').append(rankElem);
    };
};

export default magiceden;