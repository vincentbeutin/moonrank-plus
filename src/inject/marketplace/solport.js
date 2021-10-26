let magiceden =  function () {

    // magiceden name => moonrank name
    // add an entry if name is very different
    this.collections = {

        'apex-ducks' : 'apexducks'
    };

    this.getAddress = function (elem) {
        let link = elem.querySelector('.card-footer a').getAttribute('href');
        return link.substring(5);
    };

    this.getCollectionName = function () {
        let parts = window.location.pathname.split('/');
        let collection = parts[2]; // https://magiceden.io/marketplace/apexducks

        if (this.collections[collection]) { // name is different on moonrank
            collection = this.collections[collection];
        }
        else {
            collection = collection.replaceAll('-', '');
        }

        return collection;
    };

    this.addRank = function (elem, rank, url) {
        let span = document.createElement("a");
        span.href = url;
        span.target = '_blank';
        // span.innerHTML = '🏆 '+rank+'';
        span.innerHTML = '' +
            '<span style="color: #291560;">⍜ </span>' +
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
        elem.querySelectorAll('.card-footer div')[0].append(span);
    };

    this.createObserver = function() {
        let _this = this;
        // observer instance
        const observer = new MutationObserver(function(mutationsList, observer){
            for(const mutation of mutationsList) {

                if (mutation.type === 'childList') {
                    mutation.addedNodes.forEach(elem => {

                        if (Object.prototype.toString.call(elem) == '[object HTMLDivElement]') {
                            elem.querySelectorAll('.listing').forEach(elem => {
                                _this.grabRank(elem);
                            });
                        }

                    })
                }
            }
        });

        return observer;
    }
};

export default magiceden;