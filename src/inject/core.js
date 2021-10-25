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
			if (mutation.type === 'childList'
				&& mutation.addedNodes[0]
				&& mutation.addedNodes[0].classList
				&& mutation.addedNodes[0].classList.contains(marketplace.config.elementNode.substring(1))) {
				console.log('A child node has been added or removed.');
				marketplace.grabRank(mutation.addedNodes[0]);
			}
		}
	});

	// start observing the target node for configured mutations
	observer.observe(
		document.querySelector(marketplace.config.listNode),
		{ childList: true, subtree: true,}
	);
})();