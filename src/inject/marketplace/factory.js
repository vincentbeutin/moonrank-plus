import magiceden from './magiceden.js';
import solanart from './solanart.js';
import solport from './solport.js';
import alpha from './alpha.js';
import utils from './../utils.js';

let factory =  function (mp) {

    let configs = {
        'magiceden': {
            enabled: true,
            name: 'magiceden',
            elementNode: '.grid-card__main',
            excludedClass: '.skeleton',
            listNode: 'body',
        },
        'solanart': {
            enabled: false, // todo
        },
        'solport': {
            enabled: true,
            name: 'solport',
            elementNode: '.listing',
            excludedClass: false,
            listNode: 'body',
        },
        'alpha': {
            enabled: true,
            name: 'alpha',
            elementNode: 'main a.group',
            excludedClass: false,
            listNode: 'body',
        },
    };

    this.createMarketplace = function () {
        let marketplace;

        if (mp === "magiceden") {
            marketplace = new magiceden();
        } else if (mp === "solanart") {
            marketplace = new solanart();
        } else if (mp === "solport") {
            marketplace = new solport();
        } else if (mp === "alpha") {
            marketplace = new alpha();
        }

        marketplace.config = configs[mp];

        marketplace.init = function (config) {
            this.globalConfig = config;
            document.querySelectorAll(this.config.elementNode).forEach(elem => {
                this.grabRank(elem);
            });
        };

        marketplace.grabRank = function (elem) {



            if (this.config.excludedClass && elem.classList.contains(this.config.excludedClass.substring(1))) {
                return;
            }
            // Stop if rank already display
            if (elem.querySelector('.rank')) {
                return;
            }



            let collectionName = marketplace.getCollectionName();
            let name = null;
            this.globalConfig.mapping.forEach(function (item, key) {
                if (item.marketplace == collectionName) {
                    console.log(item.moonrank);
                    name = item.moonrank;
                }
            });

            console.log(name);

            if (!name) {
                name = marketplace.resolveCollectionName(collectionName)
            }

            let url = 'https://moonrank.app/collection/'+name+'/'+marketplace.getAddress(elem);
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

                    if (response.trim()  === '404 page not found') {
                        return;
                    }

                    const parser = new DOMParser();
                    const htmlDocument = parser.parseFromString(response, "text/html");
                    const rank = htmlDocument.documentElement.querySelector('body > main > div > div.flex-grow > div > div:nth-child(1) > div > div.flex.flex-row.items-center.justify-between > div > span:nth-child(2)').innerHTML;
                    // const pieces = htmlDocument.documentElement.querySelector('body > div.h-screen.flex.sm\\:overflow-hidden.bg-gray-100 > div.flex.flex-col.w-0.flex-1.sm\\:overflow-hidden > section > div > div > h3').innerHTML;

                    marketplace.addRank(elem, rank, url)
                })



        };



        marketplace.startObserver = function () {
            let observer = marketplace.createObserver();

            // start observing the target node for configured mutations
            observer.observe(
                document.querySelector(marketplace.config.listNode),
                { childList: true, subtree: true,}
            );
        }
        return marketplace;
    }
};

export default factory;