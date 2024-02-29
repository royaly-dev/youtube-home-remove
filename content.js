const removeElement = (selector) => {
  const element = document.querySelector(selector);
  if (element) {
    element.remove();
  }
};

const observeAndRemoveElements = () => {
  const observer = new MutationObserver((mutationsList, observer) => {
    for (let mutation of mutationsList) {
      for (let node of mutation.addedNodes) {
        if (node instanceof HTMLElement) {
          if (node.matches("#shorts-container, ytd-rich-grid-renderer")) {
            node.remove()
          }
        }
      }
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
};

window.addEventListener("load", () => {
  chrome.storage.sync.get(['removeYtdBrowse', 'msg'], (result) => {
    if (result.removeYtdBrowse === true) {
      removeElement("#shorts-container");
      removeElement("ytd-rich-grid-renderer");
      const y = document.querySelector('ytd-two-column-browse-results-renderer')
      const t = document.createElement('h1')
      t.style.textAlign = "center";
      t.style.width = "100%";
      t.style.color = "#fff";
      t.style.fontSize = '40px';
      t.innerHTML = `${result.msg}`
      y.append(t)
      observeAndRemoveElements();
    } else if (result.removeYtdBrowse === false) {
        
    }
});
});
