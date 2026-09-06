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

  // Le tiroir s'arrête au-dessus de la bande tricolore du bas :
  // quand on atteint le pied de page, elle occupe toute la largeur.
  var bande = document.querySelector('body > .stripes.stripes-flip');

  function caler() {
    if (!bande) return;
    var haut = bande.getBoundingClientRect().top;
    var visible = Math.max(0, window.innerHeight - haut);
    tiroir.style.bottom = visible + 'px';
  }

  if (bande) {
    caler();
    window.addEventListener('scroll', caler, { passive: true });
    window.addEventListener('resize', caler);
  }

  // la touche Échap referme le menu
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && tiroir.classList.contains('ouvert')) fermer();
  });

  // le bouton de fermeture, qui reprend la place du bouton d'ouverture
  var croix = tiroir.querySelector('.drawer-fermer');
  if (croix) croix.addEventListener('click', fermer);

  // un clic sur un lien du menu le referme
  tiroir.querySelectorAll('nav a').forEach(function (a) {
    a.addEventListener('click', function () { tiroir.classList.remove('ouvert'); });
  });
})();
