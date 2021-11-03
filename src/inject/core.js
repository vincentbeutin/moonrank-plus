import marketplaceFactory from './marketplace/factory.js';
import utils from './utils.js';

(function(){
	var getConfig = new Promise(function(resolve, reject){
		chrome.storage.sync.get(['mapping'], function(config){
			resolve(config);
		})
	});

	let mp = utils.detectMarketplace();

	let factory = new marketplaceFactory(mp);
	let marketplace = factory.createMarketplace();
	if (!marketplace.config.enabled) {
		return;
	}


	getConfig.then((config) => {
		marketplace.init(config);
		marketplace.startObserver();
	});

})();