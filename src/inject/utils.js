const utils = {
    detectMarketplace: function () {
        let mp = null;

        switch (window.location.host) {
            case 'magiceden.io':
                mp = 'magiceden';
                break;
            case 'solanart.io':
                mp = 'solanart';
                break;
            default:
        }

        return mp;
    },

    fetchResource: function (input, init) {
        return new Promise((resolve, reject) => {
            chrome.runtime.sendMessage({input, init}, messageResponse => {
                const [response, error] = messageResponse;
                if (response === null) {
                    reject(error);
                } else {
                    // Use undefined on a 204 - No Content
                    const body = response.body ? new Blob([response.body]) : undefined;
                    resolve(new Response(body, {
                        status: response.status,
                        statusText: response.statusText,
                    }));
                }
            });
        });
    }
};

export default utils;

