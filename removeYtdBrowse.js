// removeYtdBrowse.js
const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (mutation.addedNodes) {
        mutation.addedNodes.forEach(node => {
          if (node.nodeName === 'YTD-BROWSE') {
            node.remove();
          }
        });
      }
    });
  });
  
  observer.observe(document.body, { childList: true, subtree: true });
  