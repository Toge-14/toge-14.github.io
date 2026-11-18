S3.addModule({
  id: "ro", folder: "ro", short: "Rech. opérationnelle", name: "Recherche opérationnelle et optimisation", icon: "📈", color: "#0ea5e9",
  prof: "Pr. Kh. Benlhachmi & Kh. Louzaoui · Faculté des Sciences, Kénitra",
  summary: "Modélisation en programmation linéaire, résolution géométrique à 2 variables, forme standard et méthode du simplexe, dégénérescence.",
  docs: [
    { kind: "Cours", title: "Chapitre 1 — Programmation linéaire", file: "Chapitre_1_-_Programmation_lin-aire.pdf" },
    { kind: "TD", title: "Série 1 — Programmation linéaire", file: "s-rie_1.pdf" }
  ],
  lessons: [
    { title: "Modéliser un programme linéaire", pdf: ["Chapitre_1_-_Programmation_lin-aire.pdf"], html: `
<div class="call"><b class="t">Démarche</b>1) modéliser le problème (variables, contraintes, fonction économique) ; 2) identifier sa nature (maximisation, plus court chemin…) ; 3) choisir la méthode (simplexe, Dijkstra, Ford-Fulkerson) ; 4) résoudre puis décider.</div>
<h3>Les trois éléments d'un PL</h3>
<ul>
<li><b>Variables de décision</b> : les quantités inconnues (ex. x₁, x₂, x₃ = quantités fabriquées de P₁, P₂, P₃).</li>
<li><b>Contraintes</b> : inéquations linéaires (capacité, marché, matières premières), avec xᵢ ≥ 0.</li>
<li><b>Fonction économique Z</b> : la fonction linéaire à maximiser (profit) ou minimiser (coût).</li>
</ul>
<h3>Exemple du cours</h3>
<p>Machine de 45 h/semaine, profits 4, 12, 3 (×10 dh), rendements 50, 25, 75 unités/h, ventes max 1000, 500, 1500. Le temps de fabrication donne x₁/50 + x₂/25 + x₃/75 ≤ 45, soit après multiplication par 150 : <b>3x₁ + 6x₂ + 2x₃ ≤ 6750</b>.</p>
<div class="math">[max] Z = 4x₁ + 12x₂ + 3x₃ ; x₁ ≤ 1000, x₂ ≤ 500, x₃ ≤ 1500, 3x₁+6x₂+2x₃ ≤ 6750, xᵢ ≥ 0</div>
<div class="call warn"><b class="t">Piège</b>Uniformise les unités avant d'écrire une contrainte de temps (rendement en unités/heure : on divise la quantité par le rendement).</div>` },
    { title: "Méthode géométrique (2 variables)", pdf: ["Chapitre_1_-_Programmation_lin-aire.pdf", "s-rie_1.pdf"], html: `
<p>Pour deux variables, chaque contrainte est un demi-plan ; l'ensemble admissible est un <b>polygone convexe</b>.</p>
<h3>Procédure</h3>
<ol>
<li>Tracer les droites des contraintes et déterminer le polygone des solutions admissibles.</li>
<li>Tracer la droite de la fonction économique Z = 0 (passant par l'origine).</li>
<li>La déplacer parallèlement à elle-même, dans le sens où Z augmente (maximisation), tant qu'elle touche encore le polygone.</li>
<li>Le dernier contact (un sommet ou une arête) donne l'optimum.</li>
</ol>
<h3>Exemple du cours</h3>
<p>Avec x₁ ≤ 1000, x₂ ≤ 500, x₁ + 2x₂ ≤ 1750 et Z = 4x₁ + 12x₂, la droite optimale touche le polygone au point F : <b>x₁ = 750, x₂ = 500, Z* = 9000 (×10 dh) = 90 000 dh</b>.</p>
<div class="call"><b class="t">À retenir</b>L'optimum d'un PL, s'il existe, est atteint en un <b>sommet</b> du polyèdre admissible. Si la droite Z est parallèle à une arête, il y a une infinité de solutions optimales sur cette arête.</div>` },
    { title: "Forme standard et simplexe", pdf: ["Chapitre_1_-_Programmation_lin-aire.pdf", "s-rie_1.pdf"], html: `
<h3>Forme standard</h3>
<p>On transforme chaque inéquation ≤ en équation grâce à une <b>variable d'écart</b> positive : a₁x₁ + a₂x₂ ≤ b devient a₁x₁ + a₂x₂ + e₁ = b, avec e₁ ≥ 0.</p>
<h3>Algorithme des tableaux du simplexe (maximisation)</h3>
<ol>
<li>Base de départ : les variables d'écart ; solution de départ : xᵢ = 0.</li>
<li><b>Variable entrante</b> : coefficient le plus grand (le plus positif) dans la ligne de Z.</li>
<li><b>Variable sortante</b> : test du minimum du rapport (second membre / coefficient de la colonne pivot), uniquement pour des coefficients &gt; 0.</li>
<li>Pivoter (opérations sur les lignes) et recommencer.</li>
<li>Arrêt quand il n'y a plus de coefficient positif dans la ligne de Z.</li>
</ol>
<h3>Exercice 1 de la série 1</h3>
<p>Max Z = 30A + 20B avec A + B ≤ 20, 3A + B ≤ 30, A ≤ 7, A, B ≥ 0. Sommets : (0,20) Z = 400 ; (5,15) Z = 450 ; (7,9) Z = 390. <b>Optimum : A = 5, B = 15, Z = 450 dh.</b></p>
<div class="call warn"><b class="t">Dégénérescence</b>Une solution est dégénérée quand une variable de base vaut 0 (par exemple trois droites passent par un même sommet). Le simplexe peut alors faire des itérations sans améliorer Z : vérifie l'égalité des rapports lors du test du minimum. Les exercices 3 et 4 de la série traitent ces cas.</div>` }
  ],
  quiz: [
    { q: "Quels sont les trois éléments d'un programme linéaire ?", o: ["Graphe, arbre, chemin", "Variables, contraintes, fonction économique", "Matrice, vecteur, scalaire", "Entrée, sortie, algorithme"], a: 1, e: "On définit les inconnues, les contraintes linéaires et la fonction à optimiser." },
    { q: "L'optimum d'un PL (s'il existe) est atteint…", o: ["Au centre du domaine", "En un sommet du domaine admissible", "À l'origine toujours", "Sur un point quelconque"], a: 1, e: "Le domaine est un polyèdre convexe, et une fonction linéaire y atteint son extremum en un sommet." },
    { q: "À quoi sert une variable d'écart ?", o: ["Transformer une inéquation ≤ en équation", "Minimiser Z", "Supprimer une contrainte", "Rendre une variable négative"], a: 0, e: "a·x ≤ b devient a·x + e = b avec e ≥ 0." },
    { q: "Dans le simplexe (max), la variable entrante est choisie…", o: ["Avec le plus petit rapport", "Avec le coefficient le plus positif dans la ligne de Z", "Au hasard", "Avec le second membre le plus grand"], a: 1, e: "C'est la variable qui fait augmenter Z le plus vite par unité." },
    { q: "La variable sortante est déterminée par…", o: ["Le test du minimum des rapports b/a (a > 0)", "Le plus grand b", "La dernière ligne", "La variable d'écart la plus ancienne"], a: 0, e: "Le plus petit rapport garantit que la solution reste admissible." },
    { q: "Dans l'exemple du cours, quelle est la solution optimale du sous-problème à 2 variables ?", o: ["(1000, 0)", "(750, 500)", "(0, 500)", "(500, 750)"], a: 1, e: "Point F : x₁ = 750, x₂ = 500, Z* = 9000 (×10 dh)." },
    { q: "Quel est l'optimum de max 30A + 20B sous A+B ≤ 20, 3A+B ≤ 30, A ≤ 7 ?", o: ["(7, 9), Z = 390", "(5, 15), Z = 450", "(0, 20), Z = 400", "(10, 0), Z = 300"], a: 1, e: "On compare les sommets : le maximum est 450 en (5, 15)." },
    { q: "Quand l'algorithme du simplexe (max) s'arrête-t-il ?", o: ["Quand tous les rapports sont nuls", "Quand la ligne de Z n'a plus de coefficient positif", "Après 3 itérations", "Quand Z = 0"], a: 1, e: "Aucune variable hors base ne peut plus augmenter Z : on est à l'optimum." },
    { q: "Une solution de base dégénérée est une solution où…", o: ["Z est négatif", "Une variable de base vaut 0", "Il n'y a pas de contrainte", "Toutes les variables valent 1"], a: 1, e: "Plusieurs contraintes sont saturées au même sommet, ce qui peut causer des itérations sans gain." }
  ],
  exercises: [
    { q: "Modéliser : un atelier fabrique A (gain 30) et B (gain 20) avec 20 kg de M1/jour (A:1, B:1), 30 kg de M2 (A:3, B:1) et 7 kg de M3 (A:1).", a: "Variables : A, B ≥ 0. Max Z = 30A + 20B sous A+B ≤ 20, 3A+B ≤ 30, A ≤ 7." },
    { q: "Mettre sous forme standard : max Z = 4x₁+12x₂+3x₃ sous x₁ ≤ 1000, x₂ ≤ 500, x₃ ≤ 1500, 3x₁+6x₂+2x₃ ≤ 6750.", a: "x₁+e₁=1000, x₂+e₂=500, x₃+e₃=1500, 3x₁+6x₂+2x₃+e₄=6750, avec tous les e ≥ 0. Base de départ : (e₁,e₂,e₃,e₄)." },
    { q: "Premier pivot du simplexe sur l'exercice précédent ?", a: "Entrante : x₂ (coefficient 12). Rapports : 500/1 (ligne 2), 6750/6 = 1125 : le min est 500, donc e₂ sort. Après pivot x₂ = 500." }
  ],
  tips: [
    "Dessine toujours le polygone avant de résoudre : tu vérifies ton simplexe avec les sommets.",
    "Teste le sommet trouvé dans toutes les contraintes avant de conclure.",
    "Dans le tableau du simplexe, ne divise que par des coefficients strictement positifs.",
    "Les séries 3 et 4 portent sur la dégénérescence : repère les sommets où trois droites se coupent.",
    "Le dossier du cours est mince (1 chapitre + 1 série) : demande le chapitre sur les graphes à ton groupe pour compléter."
  ],
  terms: [
    { t: "Programme linéaire (PL)", d: "Problème d'optimisation d'une fonction linéaire sous contraintes linéaires." },
    { t: "Fonction économique", d: "Fonction Z à maximiser ou minimiser." },
    { t: "Solution admissible", d: "Point qui vérifie toutes les contraintes." },
    { t: "Solution optimale", d: "Solution admissible qui donne la meilleure valeur de Z." },
    { t: "Variable d'écart", d: "Variable positive qui transforme une inégalité en égalité." },
    { t: "Base", d: "Ensemble de variables non nulles (au plus) dans une solution de base." },
    { t: "Variable entrante / sortante", d: "Variable qui entre dans la base / en sort lors d'un pivot." },
    { t: "Pivot", d: "Coefficient autour duquel on fait les opérations sur les lignes du tableau." },
    { t: "Dégénérescence", d: "Solution de base où une variable de base est nulle." },
    { t: "Polyèdre convexe", d: "Domaine admissible d'un PL, sans creux." }
  ]
});
