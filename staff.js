// Page Staff — affichage d'un profil à la fois, navigation par flèches.

(function () {
  var zone = document.querySelector('.staff');
  if (!zone) return;

  var profils = Array.prototype.slice.call(zone.querySelectorAll('.coach'));
  var fleches = zone.querySelectorAll('.staff-fleche');
  var points  = document.querySelector('.staff-points');
  if (profils.length < 2) return;

  var courant = 0;

  function afficher(i) {
    courant = (i + profils.length) % profils.length;   // boucle du dernier au premier
    profils.forEach(function (p, n) {
      p.classList.toggle('actif', n === courant);
    });
    if (points) {
      points.querySelectorAll('button').forEach(function (b, n) {
        b.setAttribute('aria-current', n === courant ? 'true' : 'false');
      });
    }
  }

  fleches.forEach(function (f) {
    f.addEventListener('click', function () {
      afficher(courant + parseInt(f.dataset.dir, 10));
    });
  });

  // un point de repère par profil, construit automatiquement
  if (points) {
    profils.forEach(function (p, n) {
      var b = document.createElement('button');
      var nom = p.querySelector('h3');
      b.setAttribute('aria-label', 'Voir ' + (nom ? nom.textContent : 'le profil ' + (n + 1)));
      b.addEventListener('click', function () { afficher(n); });
      points.appendChild(b);
    });
  }

  // navigation au clavier avec les flèches gauche et droite
  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft')  afficher(courant - 1);
    if (e.key === 'ArrowRight') afficher(courant + 1);
  });

  afficher(0);
})();
