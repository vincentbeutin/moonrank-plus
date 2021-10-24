import marketplaceFactory from './marketplace/factory.js';
import utils from './utils.js';

(function(){
	let mp = utils.detectMarketplace();

	let factory = new marketplaceFactory(mp);
	let marketplace = factory.createMarketplace();
	if (!marketplace.config.enabled) {
		return;
	}
	marketplace.init();

	// observer instance
	const observer = new MutationObserver(function(mutationsList, observer){
		for(const mutation of mutationsList) {
			if (mutation.type === 'childList') {
				// console.log('A child node has been added or removed.');
				var newCard = mutation.addedNodes[0];
				if (newCard.classList.contains(marketplace.config.elementNode.substring(1))) {
					marketplace.grabRank(newCard);
				}
			}
		}
	});

	// start observing the target node for configured mutations
	observer.observe(
		document.querySelector(marketplace.config.listNode),
		{ childList: true}
	);
})();