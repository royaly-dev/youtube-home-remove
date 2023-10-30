// content.js
const removeElement = (selector) => {
  const element = document.querySelector(selector);
  if (element) {
    element.remove();
  }
};

// Fonction pour observer et supprimer les éléments
const observeAndRemoveElements = () => {
  // Configuration de l'observer pour surveiller les modifications dans le DOM
  const observer = new MutationObserver((mutationsList, observer) => {
    for (let mutation of mutationsList) {
      // Pour chaque mutation, parcourez les éléments ajoutés
      for (let node of mutation.addedNodes) {
        if (node instanceof HTMLElement) {
          // Vérifiez si l'élément correspond à l'un des sélecteurs cibles
          if (node.matches("#shorts-container, ytd-rich-grid-renderer")) {
            // Supprimez l'élément cible
            node.remove()
          }
        }
      }
    }
  });

  // Commencez à observer les modifications dans le DOM
  observer.observe(document.body, { childList: true, subtree: true });
};

// Exécutez la fonction lorsque la page est entièrement chargée
window.addEventListener("load", () => {
  // Supprimez les éléments au chargement initial
  removeElement("#shorts-container");
  removeElement("ytd-rich-grid-renderer");

  // Commencez à observer et supprimer les éléments dynamiquement
  observeAndRemoveElements();
});
