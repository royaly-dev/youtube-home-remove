window.yes = async function() {
    document.querySelector("#alerteboxforyoutubedisabled").remove();
  };
  
  window.no = async function() {
    console.log("remove")
    chrome.storage.sync.set({ 'removeYtdBrowse': true });
    console.log("restart")
    location.href = location.href
  };