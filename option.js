const removeYtdBrowseCheckbox = document.getElementById("removeYtdBrowse");
const text = document.querySelector('#save')
const textPerso = document.querySelector('#text')

chrome.storage.sync.get(['removeYtdBrowse', 'msg'], (result) => {
    if (result.removeYtdBrowse === true) {
        removeYtdBrowseCheckbox.checked="true"
    } else if (result.removeYtdBrowse === false) {
        removeYtdBrowseCheckbox.checked="flase"
    }
    textPerso.value = result.msg
  removeYtdBrowseCheckbox.checked = result.removeYtdBrowse;
});

text.addEventListener('click', () => {
    chrome.storage.sync.set({ 'msg': textPerso.value })
})

removeYtdBrowseCheckbox.addEventListener("change", () => {
    if (removeYtdBrowseCheckbox.checked === true) {
        chrome.storage.sync.set({ 'removeYtdBrowse': true });
    } else if (removeYtdBrowseCheckbox.checked === false) {
        chrome.storage.sync.set({ 'removeYtdBrowse': false, 'removetime': Date.now() });
    }
});
