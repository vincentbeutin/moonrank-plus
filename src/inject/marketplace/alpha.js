let magiceden =  function () {

    // magiceden name => moonrank name
    // add an entry if name is very different
    this.collections = {
        
        'apex-ducks' : 'apexducks'
    };

    this.getAddress = function (elem) {
        let link = elem.getAttribute('href');
        return link.substring(3);
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
        let span = document.createElement("div");

        span.innerHTML = '' +
            '<span style="color: rgb(247, 220, 90);">⍜ </span>' +
            '<span>' +rank +'</span>'
        ;
        span.classList.add('rank');
        span.style.background = '#00000052';
        span.style.color = '#fff';
        span.style.position = 'absolute';
        span.style.top = 'unset';
        span.style.left = 'unset';
        span.style.bottom = 0;
        span.style.right = 0;
        span.style.height = 'unset';
        span.style.width = 'unset';
        span.style.padding = '0px 7px';

        elem.querySelectorAll('div')[0].append(span);

        span.addEventListener("click", (e) => {
            e.preventDefault();
            window.open(url, '_blank');
        });
    };

    this.createObserver = function() {
        let _this = this;
        // observer instance
        const observer = new MutationObserver(function(mutationsList, observer){
            for(const mutation of mutationsList) {

                if (mutation.type === 'childList') {
                    mutation.addedNodes.forEach(elem => {
                        if (Object.prototype.toString.call(elem) == '[object HTMLAnchorElement]'
                            && elem.classList
                            &&  elem.classList.contains('group')) {
                            _this.grabRank(elem);
                        }

                    })
                }
            }
        });

        return observer;
    }
};

export default magiceden;