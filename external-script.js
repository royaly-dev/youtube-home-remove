window.yes = async function() {
  chrome.storage.sync.set({ 'removetime': Date.now() });
  document.querySelectorAll("#dismissible").forEach((maped) => {
   if (maped?.querySelector("#rich-shelf-header-container")) {
       maped.remove()
   }
})
    document.querySelector("#alerteboxforyoutubedisabled").remove();
  };
  
  window.no = async function() {
    chrome.storage.sync.set({ 'removeYtdBrowse': true, 'removetime': Date.now() });
    location.href = location.href
  };