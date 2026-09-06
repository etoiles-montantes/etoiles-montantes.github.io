// Menu latéral — ouverture, fermeture, accessibilité au clavier.
// Ce fichier est partagé par toutes les pages du site.

(function () {
  var bouton  = document.querySelector('.burger');
  var tiroir  = document.querySelector('.drawer');
  var voile   = document.querySelector('.drawer-voile');
  if (!bouton || !tiroir) return;

  function ouvrir() {
    tiroir.classList.add('ouvert');
    if (voile) voile.classList.add('ouvert');
    bouton.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';          // bloque le défilement derrière
    document.body.classList.add('menu-ouvert');       // masque le logo de la barre du haut
    var premier = tiroir.querySelector('a');
    if (premier) premier.focus();
  }

  function fermer() {
    tiroir.classList.remove('ouvert');
    if (voile) voile.classList.remove('ouvert');
    bouton.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    document.body.classList.remove('menu-ouvert');
    bouton.focus();
  }

  function basculer() {
    if (tiroir.classList.contains('ouvert')) { fermer(); } else { ouvrir(); }
  }

  bouton.addEventListener('click', basculer);
  if (voile) voile.addEventListener('click', fermer);

  // la touche Échap referme le menu
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && tiroir.classList.contains('ouvert')) fermer();
  });

  // le bouton de fermeture à l'intérieur du tiroir
  var croix = tiroir.querySelector('.drawer-fermer');
  if (croix) croix.addEventListener('click', fermer);
})();
