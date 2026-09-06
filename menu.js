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
    document.body.classList.add("menu-ouvert");       // décale le contenu vers la droite
    var premier = tiroir.querySelector('a');
    if (premier) premier.focus();
  }

  function fermer() {
    tiroir.classList.remove('ouvert');
    if (voile) voile.classList.remove('ouvert');
    bouton.setAttribute('aria-expanded', 'false');
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

  // un clic sur un lien du menu le referme
  tiroir.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () { tiroir.classList.remove('ouvert'); });
  });
})();
