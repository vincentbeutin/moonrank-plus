import marketplaceFactory from './marketplace/factory.js';
import utils from './utils.js';

(function(){
	var getConfig = new Promise(function(resolve, reject){
		chrome.storage.sync.get({
			mapping: [
				{
					marketplace: 'the_infamous_thugbirdz_derivative',
					moonrank: 'infamousthug',
				},
				{
					marketplace: 'angry_bunny_club',
					moonrank: 'angrybunnyclub',
				},
				{
					marketplace: 'degenerate_ape_academy',
					moonrank: 'degenapes',
				},
				{
					marketplace: 'skyline_nft',
					moonrank: 'skyline',
				},
				{
					marketplace: 'unirexcity',
					moonrank: 'unirex',
				},
				{
					marketplace: 'lotus_gang_nft',
					moonrank: 'lotusgang',
				},
				{
					marketplace: 'solana_monkette_busines',
					moonrank: 'solanamonkettebusiness',
				},
				{
					marketplace: 'goblin_laboratory',
					moonrank: 'goblinbrain',
				},
			]
		}, function(config) {
			resolve(config);
		});
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