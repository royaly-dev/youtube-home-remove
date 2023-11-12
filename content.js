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
          // Utilisez directement l'ID pour obtenir l'élément
          const secondaryElement = document.getElementById("secondary");
          const primaryElement = document.querySelector("ytd-rich-grid-renderer");
          const shortElement = document.getElementById("shorts-container");
          if (secondaryElement) {
            secondaryElement.remove();
            const video = document.querySelector('video')
            const videoc = document.querySelector('ytd-watch-flexy')
            if (video) {
              video.style.borderRadius = '10px'
              videoc.style.overflowY = 'hidden'
            }
          }
          if (primaryElement) {
            primaryElement.remove();
          }
          if (shortElement) {
            shortElement.remove();
          }
        }
      }
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
};




window.addEventListener("DOMContentLoaded", () => {
  chrome.storage.sync.get(['removeYtdBrowse', 'msg'], (result) => {
    if (result.removeYtdBrowse === true) {
      observeAndRemoveElements()
      const t = document.createElement('h1');
      t.style.textAlign = "center";
      t.style.width = "100%";
      t.style.color = "#fff";
      t.style.fontSize = '40px';
      t.innerHTML = `${result.msg}`;
      const y = document.querySelector('ytd-two-column-browse-results-renderer');
      console.log(y)
      y.append(t);
    } else if (result.removeYtdBrowse === false) {

    }
  });
});
