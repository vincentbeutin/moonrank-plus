import magiceden from './magiceden.js';
import solanart from './solanart.js';
import utils from './../utils.js';

let factory =  function (mp) {

    let configs = {
        'magiceden': {
            enabled: true,
            name: 'magiceden',
            elementNode: '.grid-card__main',
            listNode: '.infinite-scroll-component .tw-flex',
        },
        'solanart': {
            enabled: false, // todo
        }
    };

    this.createMarketplace = function () {
        let marketplace;

        if (mp === "magiceden") {
            marketplace = new magiceden();
        } else if (mp === "solanart") {
            marketplace = new solanart();
        }

        marketplace.config = configs[mp];

        marketplace.init = function () {
            document.querySelectorAll(this.config.elementNode).forEach(elem => {
                this.grabRank(elem);
            });
        };

        marketplace.grabRank = function (elem) {

            // Stop if rank already display
            if (elem.querySelector('.rank')) {
                return;
            }

            let url = 'https://moonrank.app/collection/'+marketplace.getCollectionName()+'/'+marketplace.getAddress(elem);

            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "text/html");

            var myInit = {
                method: 'GET',
                header: myHeaders
            };

            utils.fetchResource(url, myInit)
                .then(function(response) {
                    return response.text();
                })
                .then(function(response) {
                    const parser = new DOMParser();
                    const htmlDocument = parser.parseFromString(response, "text/html");
                    const rank = htmlDocument.documentElement.querySelector('body > main > div > div.flex-grow > div > div:nth-child(1) > div > div.flex.flex-row.items-center.justify-between > div > span:nth-child(2)').innerHTML;
                    // const pieces = htmlDocument.documentElement.querySelector('body > div.h-screen.flex.sm\\:overflow-hidden.bg-gray-100 > div.flex.flex-col.w-0.flex-1.sm\\:overflow-hidden > section > div > div > h3').innerHTML;

                    let span = document.createElement("span");
                    span.innerHTML = '('+rank+')';
                    span.classList.add('rank');

                    if (rank < 200) {
                        span.style.color = 'red';
                    } else if(rank < 500) {
                        span.style.color = 'orange';
                    }

                    marketplace.addRank(elem, span)
                })
        };
        return marketplace;
    }
};

export default factory;