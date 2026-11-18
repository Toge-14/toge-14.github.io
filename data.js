/* S3 Guide — core data. Each module file in modules/ calls S3.addModule({...}). */
window.S3 = {
  title: "S3 Guide",
  programme: "Intelligence Artificielle · S3 · FSK Kénitra · 2026/2027",
  modules: [],
  addModule: function (m) { this.modules.push(m); },
  plan: [
    { t: "Jour 1 — Cartographier", items: [
      "Ouvre chaque module et lis les titres des leçons",
      "Repère les PDF de cours, de TD et de TP",
      "Note ce que tu ne comprends pas du tout" ] },
    { t: "Semaine 1 — Les bases", items: [
      "Struct C : rappels C, pointeurs, malloc/free",
      "Probabilités : espaces probabilisés, dénombrement, conditionnement",
      "Web 2 : bases de PHP (variables, tableaux, fonctions)",
      "UML : diagramme de cas d'utilisation" ] },
    { t: "Semaine 2 — Le cœur du cours", items: [
      "Struct C : listes chaînées (insertion, suppression, parcours)",
      "Probabilités : variables aléatoires discrètes, espérance, variance",
      "Système d'exploitation : processus, ordonnancement",
      "Recherche opérationnelle : modélisation en programmation linéaire" ] },
    { t: "Semaine 3 — Pratique", items: [
      "Refaire les TD et TP avec les corrections cachées",
      "Web 2 : formulaires, fichiers, sessions et cookies",
      "UML : diagrammes de classes et de séquence",
      "Probabilités : couples de v.a. et lois usuelles à densité" ] },
    { t: "Semaine 4 — Quiz et annales", items: [
      "Faire tous les quiz jusqu'à 100 %",
      "Refaire les annales de probabilités (normal et rattrapage)",
      "Relire les pièges et astuces de chaque module" ] },
    { t: "Mode examen", items: [
      "Dormir avant l'examen",
      "Relire uniquement les fiches « À retenir »",
      "Lire l'énoncé en entier, noter les unités et les hypothèses" ] }
  ]
};
