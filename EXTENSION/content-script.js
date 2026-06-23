console.log("Email writter");


const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
        const addedNodes =Array.from(mutation.addedNodes);
        const hasComposeElement = addedNodes.some(node => node.nodeType === Node.ELEMENT_NODE && (node.matches('.aDh, .btC ,[role="dialog"]')|| node.querySelector('.aDh, .btC ,[role="dialog"]')));
 
 
 
        if (hasComposeElement) {
            console.log("Compose element detected");
        }
    }
});

// Start observing the document for added nodes (e.g., Gmail compose windows)
observer.observe(document.body, { childList: true, subtree: true });