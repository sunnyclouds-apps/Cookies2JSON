chrome.runtime.sendMessage("Cookies2JSON", (res) => {
    const { domain, cookies } = res;
    
    let newChild = null;
    if (!cookies) {
        newChild = document.createElement("span");
        newChild.textContent = "Unable to extract cookies";
    } else {
        newChild = document.createElement("div");
        downloadLink = document.createElement("a");
        downloadLink.textContent = "Download";
        downloadLink.setAttribute("download", `${domain}.cookies.json`);
        let jsonText = JSON.stringify(cookies, null, 4);
        downloadLink.setAttribute(
            "href", 
            URL.createObjectURL(new Blob([jsonText], { type: "text/plain" }))
        );
        newChild.appendChild(downloadLink);
        let unorderedList = document.createElement("ul");
        for (const [key, value] of Object.entries(cookies)) {
            let listItem = document.createElement("li");
            listItem.textContent = `${key}: ${value}`;
            unorderedList.appendChild(listItem);
        }
        newChild.appendChild(unorderedList);
    }
    
    const main = document.getElementById("main");
    main.removeChild(document.querySelector(".loading"));
    main.appendChild(newChild);
});
