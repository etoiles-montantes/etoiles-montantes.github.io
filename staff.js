// Page Staff — un profil à la fois.
// Navigation : les deux petits ronds, les points de repère,
// les flèches du clavier, et le glissement du doigt sur téléphone.

(function () {
  var zone = document.querySelector('.staff');
  if (!zone) return;

  var profils = Array.prototype.slice.call(zone.querySelectorAll('.coach'));
  var cotes   = Array.prototype.slice.call(zone.querySelectorAll('.staff-cote'));
  var points  = zone.querySelector('.staff-points');
  if (profils.length < 2) return;

  var courant = 0;

  // récupère l'image et le nom d'un profil donné
  function infos(i) {
    var p = profils[i];
    var img = p.querySelector('.coach-photo img');
    var nom = p.querySelector('h3');
    return {
      src:  img ? img.getAttribute('src') : '',
      vide: p.querySelector('.coach-photo').classList.contains('vide'),
      nom:  nom ? nom.textContent : 'Profil ' + (i + 1)
    };
  }

  function afficher(i) {
    courant = (i + profils.length) % profils.length;   // boucle du dernier au premier

    profils.forEach(function (p, n) {
      p.classList.toggle('actif', n === courant);
    });

    // les petits ronds prennent la photo du voisin correspondant
    cotes.forEach(function (c) {
      var pas = parseInt(c.dataset.dir, 10);
      var v   = infos((courant + pas + profils.length) % profils.length);
      var vue = c.querySelector('.staff-cote-img');
      vue.style.backgroundImage = v.src ? 'url("' + v.src + '")' : 'none';
      vue.classList.toggle('vide', v.vide);
      c.setAttribute('aria-label', 'Voir ' + v.nom);
      c.setAttribute('title', v.nom);
    });

    if (points) {
      points.querySelectorAll('button').forEach(function (b, n) {
        b.setAttribute('aria-current', n === courant ? 'true' : 'false');
      });
    }
  }

  cotes.forEach(function (c) {
    c.addEventListener('click', function () {
      afficher(courant + parseInt(c.dataset.dir, 10));
    });
  });

  // un point de repère par profil, construit automatiquement
  if (points) {
    profils.forEach(function (p, n) {
      var b = document.createElement('button');
      b.setAttribute('aria-label', 'Voir ' + infos(n).nom);
      b.addEventListener('click', function () { afficher(n); });
      points.appendChild(b);
    });
  }

  // flèches gauche et droite du clavier
  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft')  afficher(courant - 1);
    if (e.key === 'ArrowRight') afficher(courant + 1);
  });

  // glissement du doigt : au moins 45 px, et plus horizontal que vertical
  // pour ne pas se déclencher pendant un défilement de la page
  var departX = 0, departY = 0;

  zone.addEventListener('touchstart', function (e) {
    departX = e.changedTouches[0].clientX;
    departY = e.changedTouches[0].clientY;
  }, { passive: true });

  zone.addEventListener('touchend', function (e) {
    var dx = e.changedTouches[0].clientX - departX;
    var dy = e.changedTouches[0].clientY - departY;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) {
      afficher(courant + (dx < 0 ? 1 : -1));          // vers la gauche = suivant
    }
  }, { passive: true });

  afficher(0);
})();
