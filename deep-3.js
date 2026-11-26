/* attach explainer videos to lessons: [module, lessonIndex, file, title] */
(function () {
  var M = [
    ["struct-c", 0, "pointeurs", "Pointeurs : adresse et valeur"],
    ["struct-c", 1, "liste", "Liste chaînée : insérer, parcourir, supprimer"],
    ["struct-c", 2, "pile", "La pile : empiler et dépiler (LIFO)"],
    ["struct-c", 3, "file", "La file : enfiler et défiler (FIFO)"],
    ["se", 1, "chmod", "chmod : calculer 755"],
    ["se", 2, "pipe", "Pipes Unix : cat | sort | uniq | wc"],
    ["web2", 0, "http", "Du navigateur à MySQL : le web dynamique"],
    ["web2", 5, "session", "Sessions et cookies PHP"],
    ["ro", 1, "simplexe", "Méthode géométrique en programmation linéaire"],
    ["ro", 6, "scc", "Composantes fortement connexes"],
    ["proba", 1, "binomiale", "Loi binomiale : la planche de Galton"],
    ["uml", 2, "classes", "Diagramme de classes"],
    ["uml", 3, "sequence", "Diagramme de séquence"],
    ["proba", 0, "bayes", "Probabilité conditionnelle et Bayes"],
    ["ro", 5, "matrice", "Matrice d'adjacence d'un graphe"],
    ["se", 2, "redirection", "Redirections : > >> < 2>"],
    ["se", 4, "boucle", "Boucles for et while en shell"],
    ["web2", 4, "formulaire", "Formulaires PHP : GET et POST"],
    ["uml", 1, "usecase", "Diagramme de cas d'utilisation"]
  ];
  var D = window.S3DEEP = window.S3DEEP || {};
  M.forEach(function (m) {
    D[m[0]] = D[m[0]] || []; D[m[0]][m[1]] = D[m[0]][m[1]] || { html: "" };
    var o = D[m[0]][m[1]], v = { src: "vid-" + m[2] + ".mp4", title: m[3] };
    o.video = o.video || v; (o.videoList = o.videoList || []).push(v);
  });
})();
