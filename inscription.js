// Page Inscription — présélection de l'événement.
//
// Les boutons « S'inscrire » des cartes d'événements peuvent transmettre
// l'événement concerné dans l'adresse, sous la forme :
//     inscription?evenement=Stage%20U11%20Toussaint%202026
// Le script retrouve alors l'option correspondante et la sélectionne.
// Sans paramètre, ou si l'événement n'existe pas dans la liste,
// le formulaire s'ouvre normalement sur « Choisir… ».

(function () {
  var liste = document.getElementById('evenement');
  if (!liste) return;

  var demande = new URLSearchParams(window.location.search).get('evenement');
  if (!demande) return;

  // comparaison tolérante : accents, majuscules et espaces multiples ignorés
  function normaliser(t) {
    return t.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
            .toLowerCase().replace(/\s+/g, ' ').trim();
  }

  var cible = normaliser(demande);
  var options = Array.prototype.slice.call(liste.options);

  var trouvee = options.find(function (o) { return normaliser(o.text) === cible; })
             || options.find(function (o) { return o.value && normaliser(o.text).indexOf(cible) !== -1; });

  if (trouvee) liste.value = trouvee.value || trouvee.text;
})();
