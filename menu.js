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

// ------------------------------------------------------------
// Défilement des partenaires dans la barre du haut.
// La liste écrite dans le HTML est recopiée autant de fois que
// nécessaire pour remplir le bandeau, puis dupliquée une dernière
// fois : le décalage de la moitié donne une boucle sans coupure.
// ------------------------------------------------------------
(function () {
  var piste = document.querySelector('.bp-piste');
  if (!piste) return;

  var origine = Array.prototype.slice.call(piste.children);
  if (!origine.length) return;

  var MINIMUM = 7;                       // nombre de ronds visés avant la boucle

  function monter() {
    piste.innerHTML = '';
    var serie = [];

    // on répète la liste jusqu'à atteindre le nombre voulu
    while (serie.length < MINIMUM) {
      origine.forEach(function (el) { serie.push(el.cloneNode(true)); });
    }

    // la série est écrite deux fois : c'est ce qui rend la boucle invisible
    serie.forEach(function (el) { piste.appendChild(el); });
    serie.forEach(function (el) { piste.appendChild(el.cloneNode(true)); });

    // vitesse constante quel que soit le nombre de logos
    piste.style.setProperty('--bp-duree', (serie.length * 4.5) + 's');
    piste.classList.add('anime');
  }

  monter();
})();
