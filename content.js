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
          if (node.id == "columns") {
            removeElement("#columns #secondary")
          }

          if (node.matches('ytd-rich-grid-renderer') && location.href === "https://www.youtube.com/") {
            removeElement('ytd-rich-grid-renderer')
            const y = document.querySelector('ytd-two-column-browse-results-renderer')
            const t = document.createElement('h1')
            t.style.textAlign = "center";
            t.style.width = "100%";
            t.style.color = "#fff";
            t.style.fontSize = '40px';
            chrome.storage.sync.get(['removeYtdBrowse', 'msg'], (result) => {
              t.innerHTML = `${result.msg}`
            })
            y.append(t)
          }
          if (node.matches("#shorts-container, ytd-rich-grid-renderer, ytd-watch-next-secondary-results-renderer #items,#columns #secondary") && location.href === "https://www.youtube.com/") {
            node.remove()
          }
        }
      }
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
};

window.addEventListener("load", async () => {
  const script = document.createElement("script")
  const src = await chrome.runtime.getURL("external-script.js")
  script.src = src
  document.querySelector("body").append(script);

  async function yes() {
    document.querySelector("#alerteboxforyoutubedisabled").remove()
  }
  async function no() {
    
  }

  chrome.storage.sync.get(['removeYtdBrowse', 'msg', 'removetime'], (result) => {
    if (result.removeYtdBrowse === true) {
      observeAndRemoveElements();
      if (document.querySelector("#shorts-container")) {
        removeElement("#shorts-container");
      }
      if (document.querySelector("ytd-watch-next-secondary-results-renderer #items")) {
        removeElement("ytd-watch-next-secondary-results-renderer #items");
      }
      if (document.querySelector("ytd-rich-grid-renderer") && location.href === "https://www.youtube.com/") {
        removeElement("ytd-rich-grid-renderer");
      }
      if (document.querySelector("#columns #secondary")) {
        removeElement("#columns #secondary")
      }
      const y = document.querySelector('ytd-two-column-browse-results-renderer')
      const t = document.createElement('h1')
      t.style.textAlign = "center";
      t.style.width = "100%";
      t.style.color = "#fff";
      t.style.fontSize = '40px';
      t.innerHTML = `${result.msg}`
      y.append(t)
    } else if (result.removeYtdBrowse === false) {
      if (result?.removetime && (Date.now() - result.removetime) > 1000 * 60 * 10) {
        chrome.storage.sync.set({ 'removeYtdBrowse': true });
        location.href = location.href;
      }
      const styled = document.createElement("style")
      styled.innerHTML = `
        /* CSS */
        .button-3 {
          appearance: none;
          background-color: #2ea44f;
          border: 1px solid rgba(27, 31, 35, .15);
          border-radius: 6px;
          box-shadow: rgba(27, 31, 35, .1) 0 1px 0;
          box-sizing: border-box;
          color: #fff;
          cursor: pointer;
          display: inline-block;
          font-family: -apple-system,system-ui,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji";
          font-size: 14px;
          font-weight: 600;
          line-height: 20px;
          padding: 6px 16px;
          position: relative;
          text-align: center;
          text-decoration: none;
          user-select: none;
          -webkit-user-select: none;
          touch-action: manipulation;
          vertical-align: middle;
          white-space: nowrap;
        }

        .button-3:focus:not(:focus-visible):not(.focus-visible) {
          box-shadow: none;
          outline: none;
        }

        .button-3:hover {
          background-color: #2c974b;
        }

        .button-3:focus {
          box-shadow: rgba(46, 164, 79, .4) 0 0 0 3px;
          outline: none;
        }

        .button-3:disabled {
          background-color: #94d3a2;
          border-color: rgba(27, 31, 35, .1);
          color: rgba(255, 255, 255, .8);
          cursor: default;
        }

        .button-3:active {
          background-color: #298e46;
          box-shadow: rgba(20, 70, 32, .2) 0 1px 0 inset;
        }
      `
      document.querySelector("head").append(styled)
      const newalertebox = document.createElement("div")
      newalertebox.id = "alerteboxforyoutubedisabled"
      newalertebox.style.width = "100vw"
      newalertebox.style.height = "calc(100vh - 50px)"
      newalertebox.style.marginTop = "50px"
      newalertebox.style.display = "flex"
      newalertebox.style.justifyContent = "center"
      newalertebox.style.alignItems = "center"
      newalertebox.style.position = "fixed"
      newalertebox.style.top = "0"
      newalertebox.style.bottom = "0"
      newalertebox.style.right = "0"
      newalertebox.style.left = "0"
      newalertebox.style.backgroundColor = "#000"
      newalertebox.style.zIndex = "10000"
      document.querySelector("body").append(newalertebox)
      const newbox = document.createElement("div")
      newbox.id = "alerteboxforyoutubedisabledbox"
      newbox.style.display = "flex"
      newbox.style.justifyContent = "center"
      newbox.style.alignItems = "center"
      newbox.style.flexDirection = "column"
      newbox.style.gap = "5px"
      newbox.innerHTML = `
      <h1 style="color: #fff;">Are you sur to acces youtube ?</h1>
      <button id="yesclickplease" onclick="yes()" class="button-3" role="button">YES</button>
      <button id="noclickplease" onclick="no()" style="background-color: red;" class="button-3" role="button">NO</button>
      `
      document.querySelector("#alerteboxforyoutubedisabled").append(newbox)
      const all = document.querySelector("#yesclickplease")
      const allno = document.querySelector("#noclickplease")

      all.onclick = (async () => {window.yes()})
      allno.onclick = (async () => {window.no()})

    }
});
});