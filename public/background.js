chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request !== "Cookies2JSON") return false;

    chrome.tabs.query(
        { currentWindow: true, active: true },
        (tabs) => {
            if (tabs.length === 0) {
                sendResponse({});
                return;
            }
            const target = tabs[0];

            const param = {
                url: target.url,
            };
            if (!/^http/.test(param.url)) {
                sendResponse({});
                return;
            }

            if (target.cookieStoreId) {
                param.storeId = target.cookieStoreId;
            }

            chrome.cookies.getAll(param, (cookies) => {
                sendResponse({
                    domain: new URL(param.url).hostname,
                    cookies: Object.assign(
                        {},
                        ...cookies.map((x) => {
                            let pair = { [x.name]: x.value };
                            return pair;
                        })
                    ),
                });
            });
        }
    );

    return true;
});
