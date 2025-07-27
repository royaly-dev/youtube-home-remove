window.yes = async function() {
  document.querySelectorAll("#dismissible").forEach((maped) => {
   if (maped?.querySelector("#rich-shelf-header-container")) {
       maped.remove()
   }
})
    document.querySelector("#alerteboxforyoutubedisabled").remove();
  };
  
  window.no = async function() {
    console.log("remove")
    chrome.storage.sync.set({ 'removeYtdBrowse': true });
    console.log("restart")
    location.href = location.href
  };