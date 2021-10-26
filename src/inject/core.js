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
	marketplace.startObserver();
})();