S3.addModule({
  id: "ro", folder: "ro", short: "Rech. opérationnelle", name: "Recherche opérationnelle et optimisation", icon: "📈", color: "#0ea5e9",
  prof: "Pr. Kh. Benlhachmi & Kh. Louzaoui · Faculté des Sciences, Kénitra",
  summary: "Modélisation en programmation linéaire, résolution géométrique à 2 variables, forme standard et méthode du simplexe, dégénérescence.",
  docs: [
    { kind: "Cours", title: "Chapitre 1 — Programmation linéaire", file: "Chapitre_1_-_Programmation_lin-aire.pdf" },
    { kind: "TD", title: "Série 1 — Programmation linéaire", file: "s-rie_1.pdf" },
    { kind: "Cours", title: "Chapitre 2 — Généralités sur les graphes", file: "Chapitre_2_Generalites_sur_les_graphes.pdf" },
    { kind: "TD", title: "Série 2 — Théorie des graphes (partie 1)", file: "Serie_2.pdf" },
    { kind: "TD", title: "Série 3 — Théorie des graphes (partie 2) : arbres, Prüfer, coloration", file: "Serie_3_Graphes_partie_2.pdf" }
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
    ,
    { title: "Graphes : définitions, degrés, propriétés", pdf: ["Chapitre_2_Generalites_sur_les_graphes.pdf", "Serie_2.pdf"], html: `
<div class="call"><b class="t">À retenir</b>Un graphe orienté G = (X, U) est formé d'un ensemble de <b>sommets</b> X et d'un ensemble d'<b>arcs</b> U ⊆ X², des couples ordonnés. Un graphe non orienté a des <b>arêtes</b> (paires non ordonnées).</div>
<h3>Vocabulaire</h3>
<ul>
<li>Arc u = (i, j) : <b>I(u) = i</b> extrémité initiale, <b>T(u) = j</b> extrémité terminale. Boucle si i = j.</li>
<li><b>Ordre</b> du graphe = nombre de sommets. Graphe <b>simple</b> = sans boucles ni arcs parallèles.</li>
<li>Successeurs Γ(i) = {j : (i,j) ∈ U} ; prédécesseurs Γ⁻¹(i) = {j : (j,i) ∈ U}.</li>
<li><b>Source</b> : degré entrant nul ; <b>puits</b> : degré sortant nul.</li>
</ul>
<h3>Degrés</h3>
<div class="math">d⁺(x) = nombre d'arcs qui sortent de x · d⁻(x) = nombre d'arcs qui arrivent en x · d(x) = d⁺(x) + d⁻(x)</div>
<ul>
<li><b>Σ d⁺(x) = Σ d⁻(x) = |U|</b> : chaque arc compte une fois sortant et une fois entrant.</li>
<li><b>Σ d(x) = 2|U|</b>, donc le nombre de sommets de degré impair est <b>pair</b>.</li>
</ul>
<h3>Propriétés d'un graphe (relation binaire)</h3>
<table><tr><th>Propriété</th><th>Condition</th></tr>
<tr><td>Réflexif</td><td>(i,i) ∈ U pour tout i</td></tr>
<tr><td>Symétrique</td><td>(i,j) ∈ U ⇒ (j,i) ∈ U</td></tr>
<tr><td>Antisymétrique</td><td>(i,j) ∈ U et (j,i) ∈ U ⇒ i = j</td></tr>
<tr><td>Fortement antisymétrique</td><td>(i,j) ∈ U ⇒ (j,i) ∉ U (donc aucune boucle)</td></tr>
<tr><td>Transitif</td><td>(i,j) ∈ U et (j,k) ∈ U ⇒ (i,k) ∈ U</td></tr></table>
<h3>Graphes particuliers</h3>
<ul>
<li><b>Complet Kₙ</b> : tous les sommets reliés deux à deux, avec n(n−1)/2 arêtes.</li>
<li><b>Régulier</b> : tous les sommets ont le même degré. <b>Biparti</b> : sommets en deux groupes, arêtes seulement entre les groupes.</li>
<li><b>Planaire</b> : dessinable sans croisement d'arêtes (K₃,₃, énigme des trois maisons, ne l'est pas).</li>
<li><b>Clique</b> : sous-graphe complet. <b>Distance</b> : longueur d'un plus court chemin ; <b>diamètre</b> : plus grande distance.</li>
</ul>` },
    { title: "Chaînes, chemins, cycles et circuits", pdf: ["Chapitre_2_Generalites_sur_les_graphes.pdf"], html: `
<table><tr><th>Objet</th><th>Orientation des arcs</th><th>Définition</th></tr>
<tr><td><b>Chaîne</b></td><td>indifférente</td><td>suite d'arcs consécutifs, chacun incident au suivant</td></tr>
<tr><td><b>Chemin</b></td><td>tous dans le même sens</td><td>chaîne dont les arcs sont orientés dans le sens du parcours</td></tr>
<tr><td><b>Cycle</b></td><td>indifférente</td><td>chaîne simple dont les extrémités coïncident</td></tr>
<tr><td><b>Circuit</b></td><td>même sens</td><td>chemin simple dont les extrémités coïncident</td></tr></table>
<ul>
<li><b>Simple</b> : aucun arc n'est utilisé plus d'une fois.</li>
<li><b>Élémentaire</b> : aucun sommet n'est rencontré deux fois. Une chaîne élémentaire est simple.</li>
<li>Longueur = nombre d'arcs.</li>
</ul>
<div class="call warn"><b class="t">Piège</b>Dans une chaîne on peut remonter un arc à contresens ; dans un chemin non. (a,d,f,e,d,c) n'est pas un cycle car un arc est répété.</div>
<p>Si x et y sont dans un même circuit, il existe un chemin de x à y et un chemin de y à x.</p>` },
    { title: "Représenter un graphe : matrices et listes", pdf: ["Chapitre_2_Generalites_sur_les_graphes.pdf", "Serie_2.pdf"], html: `
<h3>Matrice d'adjacence X (n × n)</h3>
<p><code>x[i][j] = 1</code> s'il existe un arc (i, j), 0 sinon. Non orienté : matrice <b>symétrique</b>. Un 1 sur la diagonale = une boucle.</p>
<div class="call"><b class="t">Astuce puissante</b>L'élément (i, j) de <b>Xᵏ</b> est le <b>nombre de chemins de longueur k</b> de i à j.</div>
<h3>Matrice d'incidence A (n × m), graphe orienté sans boucles</h3>
<ul>
<li><code>a[i][j] = +1</code> si l'arc j <b>sort</b> du sommet i, <code>−1</code> s'il <b>arrive</b> en i, 0 sinon.</li>
<li>Chaque colonne contient exactement un +1 et un −1 : 2m cases non nulles.</li>
<li>Pour lire un degré : d⁺(i) = nombre de +1 de la ligne i ; d⁻(i) = nombre de −1.</li>
</ul>
<h3>Listes d'adjacence</h3>
<p>Pour chaque sommet, la liste de ses successeurs : <code>1 : 2, 4, 6</code>. Économique en mémoire pour les graphes creux ; se code par des listes chaînées.</p>
<table><tr><th>Représentation</th><th>Mémoire</th><th>Test « (i,j) ∈ U ? »</th></tr>
<tr><td>Matrice d'adjacence</td><td>n²</td><td>immédiat</td></tr>
<tr><td>Matrice d'incidence</td><td>n × m</td><td>à chercher</td></tr>
<tr><td>Listes d'adjacence</td><td>n + m</td><td>parcours de la liste</td></tr></table>` },
    { title: "Connexité, forte connexité, graphe réduit", pdf: ["Chapitre_2_Generalites_sur_les_graphes.pdf", "Serie_2.pdf"], html: `
<ul>
<li><b>Connexe</b> : entre toute paire de sommets il existe une <b>chaîne</b>. La connexité est une relation d'équivalence ; ses classes sont les <b>composantes connexes</b>.</li>
<li><b>Fortement connexe</b> (orienté) : pour toute paire x, y il existe un <b>chemin de x à y et un chemin de y à x</b>. Les classes sont les <b>composantes fortement connexes</b> (CFC).</li>
<li><b>Point d'articulation</b> : sommet dont la suppression augmente le nombre de composantes. <b>Isthme</b> : arête avec la même propriété.</li>
</ul>
<h3>Graphe réduit G_r</h3>
<p>Chaque CFC devient un sommet ; il y a un arc de C₁ vers C₂ s'il existe au moins un arc de G d'un sommet de C₁ vers un sommet de C₂. Le graphe réduit n'a <b>aucun circuit</b>.</p>
<h3>Trouver la CFC d'un sommet S</h3>
<pre><code>X+  = ensemble des sommets ACCESSIBLES depuis S
X-  = ensemble des sommets qui PEUVENT ATTEINDRE S
CFC(S) = X+ ∩ X-</code></pre>
<p>Pour toutes les CFC : on prend un sommet, on calcule sa CFC, on l'enlève, et on recommence jusqu'à épuisement des sommets.</p>` },
    { title: "Arbres, codage de Prüfer et coloration", pdf: ["Serie_3_Graphes_partie_2.pdf"], html: `
<div class="call"><b class="t">Source</b>Cette leçon est rédigée à partir de la <b>Série 3</b> (théorie des graphes, partie 2). Le chapitre de cours correspondant n'est pas dans le Drive : ce qui suit rappelle les résultats classiques utilisés par la série.</div>
<h3>Arbre</h3>
<ul>
<li>Un <b>arbre</b> est un graphe <b>connexe sans cycle</b>. Pour n sommets, il a exactement <b>n − 1 arêtes</b>.</li>
<li>Un arbre (n ≥ 2) possède au moins <b>2 feuilles</b> (sommets de degré 1).</li>
<li>Il n'est <b>jamais régulier</b> dès que n ≥ 3 : il a une feuille (degré 1) et au moins un sommet de degré ≥ 2.</li>
<li>Formule de Cayley : il y a <b>n^(n−2)</b> arbres sur n sommets numérotés (et n^(n−1) arborescences, si on choisit en plus la racine).</li>
</ul>
<h3>Codage de Prüfer</h3>
<p>Il associe à un arbre à n sommets numérotés une suite de <b>n − 2</b> nombres.</p>
<pre><code>Répéter n-2 fois :
   1) prendre la feuille de plus petit numéro
   2) écrire le numéro de son voisin dans la suite
   3) supprimer cette feuille</code></pre>
<ul>
<li>Un sommet de degré d apparaît <b>d − 1 fois</b> dans le code : les feuilles n'y apparaissent jamais.</li>
<li>Décodage : n = (longueur du code) + 2, et deg(x) = (nombre d'apparitions de x) + 1.</li>
<li>Exemple : l'étoile à 100 sommets de centre 1 a pour code (1, 1, …, 1) avec <b>98</b> fois le nombre 1.</li>
</ul>
<h3>Coloration</h3>
<ul>
<li>Le <b>nombre chromatique χ(G)</b> est le plus petit nombre de couleurs pour colorier les sommets sans que deux voisins aient la même couleur.</li>
<li>Un <b>arbre</b> (n ≥ 2) est biparti : χ = 2. On colorie selon la parité de la distance à la racine.</li>
<li>χ(G) ≥ taille de la plus grande clique, et χ(G) ≤ Δ(G) + 1.</li>
<li>Un <b>stable</b> est un ensemble de sommets deux à deux non adjacents ; α(G) est la taille maximale d'un stable. On a <b>χ(G) + α(G) ≤ n + 1</b>.</li>
<li>Problème des « poissons / aquariums » (série, ex. 3) : un sommet par poisson, une arête si deux poissons ne cohabitent pas ; le nombre minimal d'aquariums est χ(G).</li>
</ul>
<h3>Arbre couvrant de poids minimal (ex. 15 : câbler un réseau)</h3>
<p>Deux méthodes classiques : <b>Kruskal</b> (trier les arêtes par poids croissant et ajouter celles qui ne créent pas de cycle) et <b>Prim</b> (partir d'un sommet et ajouter à chaque étape l'arête de poids minimum qui relie l'arbre à un nouveau sommet). Les deux donnent un arbre à n − 1 arêtes de poids minimal.</p>
<h3>Arbre binaire (ex. 14)</h3>
<p>Dans l'énoncé : une racine de degré 2, des nœuds de degré 3 et des feuilles. Avec N sommets, F feuilles et P sommets de degré 3, on a N = F + P + 1 et la somme des degrés F + 3P + 2 = 2(N − 1). On en déduit P = F − 2, N = 2F − 1 (donc N est <b>impair</b>), F = (N + 1)/2 et P = (N − 3)/2.</p>` }
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
    { q: "Une solution de base dégénérée est une solution où…", o: ["Z est négatif", "Une variable de base vaut 0", "Il n'y a pas de contrainte", "Toutes les variables valent 1"], a: 1, e: "Plusieurs contraintes sont saturées au même sommet, ce qui peut causer des itérations sans gain." },
    { q: "Dans un graphe orienté G = (X, U), que vaut Σ d⁺(x) ?", o: ["2|U|", "|U|", "|X|", "|X|²"], a: 1, e: "Chaque arc sort d'exactement un sommet : Σ d⁺ = Σ d⁻ = |U|." },
    { q: "Le nombre de sommets de degré impair dans un graphe est…", o: ["Toujours impair", "Toujours pair", "Toujours nul", "Égal à |U|"], a: 1, e: "Σ d(x) = 2|U| est pair, donc il y a un nombre pair de termes impairs." },
    { q: "Combien d'arêtes possède le graphe complet K₅ ?", o: ["5", "10", "20", "25"], a: 1, e: "n(n−1)/2 = 5×4/2 = 10." },
    { q: "Un sommet de degré sortant nul et de degré entrant non nul est…", o: ["Une source", "Un puits", "Une boucle", "Un isthme"], a: 1, e: "Source : d⁻ = 0. Puits : d⁺ = 0." },
    { q: "Dans la matrice d'incidence d'un graphe orienté, une colonne contient…", o: ["Un seul 1", "Un +1 et un −1", "Que des 0", "Deux +1"], a: 1, e: "L'arc sort d'un sommet (+1) et arrive en un autre (−1)." },
    { q: "L'élément (i, j) de la matrice X³ représente…", o: ["Le degré de i", "Le nombre de chemins de longueur 3 de i à j", "Un arc de i à j", "La distance de i à j"], a: 1, e: "La puissance k de la matrice d'adjacence compte les chemins de longueur k." },
    { q: "Un graphe est fortement connexe si…", o: ["Il existe une chaîne entre toute paire", "Il existe un chemin de x à y et de y à x pour toute paire", "Il n'a pas de circuit", "Il est complet"], a: 1, e: "La forte connexité exige des chemins dans les deux sens." },
    { q: "Comment obtient-on la composante fortement connexe de S ?", o: ["X⁺ ∪ X⁻", "X⁺ ∩ X⁻", "X⁺ − X⁻", "Seulement X⁺"], a: 1, e: "Sommets accessibles depuis S ET qui atteignent S." },
    { q: "Combien d'arêtes possède un arbre à n sommets ?", o: ["n", "n − 1", "n + 1", "n(n−1)/2"], a: 1, e: "Connexe et sans cycle : exactement n − 1 arêtes." },
    { q: "Quelle est la longueur du codage de Prüfer d'un arbre à n sommets ?", o: ["n", "n − 1", "n − 2", "n + 1"], a: 2, e: "On supprime n − 2 feuilles (il reste 2 sommets), donc le code a n − 2 termes." },
    { q: "Combien de fois un sommet de degré d apparaît-il dans le code de Prüfer ?", o: ["d", "d − 1", "d + 1", "Jamais"], a: 1, e: "Les feuilles (d = 1) n'apparaissent pas ; un sommet de degré d apparaît d − 1 fois." },
    { q: "Combien d'arbres existe-t-il sur n sommets numérotés (n ≥ 2) ?", o: ["n!", "2ⁿ", "n^(n−2)", "n^n"], a: 2, e: "Formule de Cayley, qui correspond à toutes les suites de n − 2 termes dans {1..n}." },
    { q: "Quel est le nombre chromatique d'un arbre à au moins 2 sommets ?", o: ["1", "2", "3", "n"], a: 1, e: "Un arbre est biparti : deux couleurs suffisent." }
  ],
  exercises: [
    { q: "Modéliser : un atelier fabrique A (gain 30) et B (gain 20) avec 20 kg de M1/jour (A:1, B:1), 30 kg de M2 (A:3, B:1) et 7 kg de M3 (A:1).", a: "Variables : A, B ≥ 0. Max Z = 30A + 20B sous A+B ≤ 20, 3A+B ≤ 30, A ≤ 7." },
    { q: "Mettre sous forme standard : max Z = 4x₁+12x₂+3x₃ sous x₁ ≤ 1000, x₂ ≤ 500, x₃ ≤ 1500, 3x₁+6x₂+2x₃ ≤ 6750.", a: "x₁+e₁=1000, x₂+e₂=500, x₃+e₃=1500, 3x₁+6x₂+2x₃+e₄=6750, avec tous les e ≥ 0. Base de départ : (e₁,e₂,e₃,e₄)." },
    { q: "Premier pivot du simplexe sur l'exercice précédent ?", a: "Entrante : x₂ (coefficient 12). Rapports : 500/1 (ligne 2), 6750/6 = 1125 : le min est 500, donc e₂ sort. Après pivot x₂ = 500." },
    { q: "Série 2, ex. 4 : montrer que Σ d⁺(x) = Σ d⁻(x) = |U|.", a: "Chaque arc u = (i, j) a une extrémité initiale i (compté dans d⁺(i)) et une extrémité terminale j (compté dans d⁻(j)). Il contribue donc exactement 1 à Σ d⁺ et 1 à Σ d⁻, d'où les deux sommes égales à |U|." },
    { q: "Série 2, ex. 5 : le nombre de sommets de degré impair est pair.", a: "Σ d(x) = 2|U| est pair. En séparant les degrés pairs et impairs, la somme des degrés impairs doit être paire, ce qui n'est possible que s'il y a un nombre pair de termes impairs." },
    { q: "Série 2, ex. 8 : nombre d'arêtes de Kₙ (trois méthodes).", a: "1) Choix de 2 sommets parmi n : C(n,2) = n(n−1)/2. 2) Lemme des poignées : chaque sommet a degré n−1, donc 2m = n(n−1). 3) Récurrence : K_{n+1} a n arêtes de plus que Kₙ, soit 1+2+…+(n−1) = n(n−1)/2." },
    { q: "Série 2, ex. 1 : G symétrique ⇔ pour tout x, Γ(x) = Γ⁻¹(x).", a: "Symétrique : (x,y) ∈ U ⇔ (y,x) ∈ U. Or y ∈ Γ(x) ⇔ (x,y) ∈ U et y ∈ Γ⁻¹(x) ⇔ (y,x) ∈ U. Les deux ensembles sont donc égaux pour tout x. Réciproque : si Γ(x) = Γ⁻¹(x) alors (x,y) ∈ U ⇒ y ∈ Γ⁻¹(x) ⇒ (y,x) ∈ U." },
    { q: "Série 2, ex. 11 : matrice d'adjacence du graphe cycle Cₙ.", a: "x[i][j] = 1 si j = i±1 (indices modulo n), 0 sinon. Matrice symétrique, avec 1 en position (1,n) et (n,1), des 0 sur la diagonale, chaque ligne contenant exactement deux 1 (graphe 2-régulier)." },
    { q: "Série 2, ex. 9 : les suites (1,1,3,3) et (2,2,3,3) sont-elles graphiques ?", a: "Test de Havel-Hakimi : on trie en ordre décroissant, on retire le plus grand degré d et on retranche 1 aux d degrés suivants. <b>(3,3,1,1)</b> → (2,0,0) → on retire 2 et on retranche 1 à 0 et 0 : −1, impossible, donc <b>non graphique</b>. <b>(3,3,2,2)</b> → (2,1,1) → (0,0) : toujours des degrés ≥ 0 jusqu'au bout, donc <b>graphique</b>. Condition préalable : la somme des degrés doit être paire." },
    { q: "Série 3, ex. 1 : A est la matrice d'incidence de G d'ordre 100 avec a₁ = 2⁹⁹ − 1 et aₖ = 2^(100−k). Quel est G ?", a: "Les lignes ont 99 bits, donc A est de taille 100 × 99 (100 sommets, 99 arêtes). La ligne a₁ est faite de 99 uns : le sommet 1 est incident à toutes les arêtes. Chaque ligne aₖ (k ≥ 2) a un seul 1, en colonne k − 1 : le sommet k est de degré 1. G est l'étoile K₁,₉₉ : d(1) = 99 et d(x) = 1 sinon. Son code de Prüfer est (1, 1, …, 1), 98 fois. Elle est biparti : χ = 2 (centre d'une couleur, les 99 feuilles de l'autre)." },
    { q: "Série 3, ex. 5 : un graphe simple d'ordre n a deux sommets de même degré.", a: "Les degrés sont dans {0, …, n−1}. Un sommet de degré 0 et un sommet de degré n−1 ne peuvent pas coexister (le second est lié à tous, donc le premier ne peut pas être isolé). Les n degrés sont donc pris parmi au plus n − 1 valeurs : principe des tiroirs, deux sommets ont le même degré." },
    { q: "Série 3, ex. 4 : montrer que χ(G) + α(G) ≤ n + 1.", a: "Soit S un stable de taille α(G). On colorie S avec une seule couleur et les n − α sommets restants avec au plus n − α couleurs distinctes. Donc χ(G) ≤ (n − α) + 1, c'est-à-dire χ + α ≤ n + 1." },
    { q: "Série 3, ex. 10 : un arbre à n ≥ 3 sommets n'est pas régulier.", a: "Un arbre a au moins une feuille (degré 1). S'il était régulier, tous les sommets auraient le degré 1, donc le graphe serait un ensemble de paires reliées : connexe seulement pour n = 2. Pour n ≥ 3, il existe un sommet de degré ≥ 2, donc l'arbre n'est pas régulier." },
    { q: "Série 3, ex. 9 : combien d'arbres à 4 sommets numérotés, et quels codes de Prüfer ?", a: "4^(4−2) = 16 arbres. Les codes sont tous les couples (a, b) de {1,2,3,4}² : 4 codes (c, c) pour les 4 étoiles de centre c, et 12 codes (a, b) avec a ≠ b pour les 12 chaînes." },
    { q: "Série 3, ex. 14 : arbre binaire d'ordre N, F feuilles, P sommets de degré 3.", a: "Racine de degré 2 : N = F + P + 1. Somme des degrés : F + 3P + 2 = 2(N − 1) = 2(F + P), d'où P = F − 2 puis N = 2F − 1 : N est impair (≥ 3), F = (N + 1)/2 et P = (N − 3)/2." },
    { q: "Série 3, ex. 3 : huit poissons A à H, une croix = ne peuvent pas cohabiter. Nombre minimum d'aquariums ?", a: "On fait un graphe : un sommet par poisson, une arête entre deux poissons incompatibles. Lecture du tableau : A–B, A–C, A–D, A–G, A–H, B–E, B–F, B–G, C–D, C–F, C–G, C–H, D–E, D–H, E–F, E–G. Les sommets A, C, D, H sont deux à deux reliés (A–C, A–D, A–H, C–D, C–H, D–H) : c'est une clique de taille 4, donc χ(G) ≥ 4. Coloration en 4 couleurs : {A, E}, {B, C}, {D, F, G}, {H} (aucune arête à l'intérieur d'un groupe). Donc χ(G) = 4 : il faut 4 aquariums au minimum." },
    { q: "Série 3, ex. 12 : code de Prüfer de l'arbre dont le sommet 1 est relié à tous les autres (2, 3, …, 100).", a: "C'est une étoile de centre 1 à 100 sommets. À chaque étape on supprime la plus petite feuille (2, puis 3, …) et on écrit son voisin, qui est toujours 1. Le code a n − 2 = 98 termes : (1, 1, …, 1), 98 fois." },
    { q: "Série 3, ex. 13 : représenter les arbres de codes S = {1111, 1111, 1111, 1×1106} ; S = {100, 1×96, 100} ; S = {1×98}, puis les colorier.", a: "Le nombre de sommets est longueur + 2, et deg(x) = nombre d'apparitions + 1. 1) Longueur 1109, donc n = 1111. Les feuilles sont 2 à 1110 : 2, 3, 4 sont attachées à 1111 ; 5 à 1110 (1106 feuilles) sont attachées à 1 ; à la fin, 1 et 1111 restent et sont reliés. Arbre à deux centres : deg(1) = 1107, deg(1111) = 4. Coloration : 1 et les feuilles de 1111 en couleur A, 1111 et les feuilles de 1 en couleur B. 2) Longueur 98, donc n = 100. Feuilles 2 à 99 : 2 est attaché à 100, 3 à 98 sont attachés à 1, puis 1 devient feuille et s'attache à 100 ; à la fin 99 et 100 sont reliés. deg(100) = 3 (voisins 2, 1, 99) et deg(1) = 97. Coloration : 100 et 3..98 en A ; 1, 2 et 99 en B. 3) Longueur 98, donc n = 100 : étoile de centre 1 avec les feuilles 2 à 100. Coloration : 1 en A, les 99 autres en B. Dans les trois cas χ = 2 (un arbre est biparti)." },
    { q: "Série 3, ex. 15 : réseau M1…M6 avec les distances M1–M2 : 5, M1–M5 : 4, M2–M5 : 6, M2–M4 : 4, M2–M3 : 2, M3–M4 : 3, M4–M5 : 2, M3–M6 : 5, M2–M6 : 7. Câbler à moindre coût avec deux méthodes.", a: "On cherche un arbre couvrant de poids minimal (5 arêtes pour 6 machines). Kruskal : on trie les arêtes (2, 2, 3, 4, 4, 5, 5, 6, 7) puis on garde celles qui ne créent pas de cycle : M2–M3 (2), M4–M5 (2), M3–M4 (3), M1–M5 (4), [M2–M4 (4) refusée : cycle], [M1–M2 (5) refusée : cycle], M3–M6 (5). Prim depuis M1 : M1–M5 (4), M5–M4 (2), M4–M3 (3), M3–M2 (2), M3–M6 (5). Les deux méthodes donnent le même arbre de coût minimal 2 + 2 + 3 + 4 + 5 = 16." }
  ],
  tips: [
    "Pour tout exercice de graphe, commence par écrire X, U, puis la matrice d'adjacence : le reste en découle.",
    "Vérifie la somme des degrés = 2|U| : c'est le meilleur contrôle d'une réponse.",
    "Chaîne = sans tenir compte du sens ; chemin = en suivant le sens des arcs.",
    "Dessine toujours le polygone avant de résoudre : tu vérifies ton simplexe avec les sommets.",
    "Teste le sommet trouvé dans toutes les contraintes avant de conclure.",
    "Dans le tableau du simplexe, ne divise que par des coefficients strictement positifs.",
    "Les séries 3 et 4 portent sur la dégénérescence : repère les sommets où trois droites se coupent.",
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
    { t: "Polyèdre convexe", d: "Domaine admissible d'un PL, sans creux." },
    { t: "Graphe orienté", d: "G = (X, U) : sommets X et arcs U, couples ordonnés de sommets." },
    { t: "Degré sortant / entrant", d: "d⁺(x) arcs qui partent de x ; d⁻(x) arcs qui arrivent en x." },
    { t: "Source / puits", d: "Sommet sans arc entrant / sans arc sortant." },
    { t: "Graphe complet Kₙ", d: "Tous les sommets reliés deux à deux : n(n−1)/2 arêtes." },
    { t: "Chaîne / chemin", d: "Suite d'arcs consécutifs sans tenir compte / en suivant le sens." },
    { t: "Cycle / circuit", d: "Chaîne / chemin simple dont les extrémités coïncident." },
    { t: "Matrice d'adjacence", d: "Matrice n × n avec 1 en (i,j) s'il existe un arc de i à j." },
    { t: "Matrice d'incidence", d: "Matrice n × m avec +1 (arc sortant), −1 (arc entrant), 0 ailleurs." },
    { t: "Composante fortement connexe", d: "Classe de sommets mutuellement accessibles par des chemins." },
    { t: "Graphe réduit", d: "Graphe dont les sommets sont les CFC, sans circuit." },
    { t: "Arbre", d: "Graphe connexe sans cycle ; n sommets, n − 1 arêtes." },
    { t: "Feuille", d: "Sommet de degré 1." },
    { t: "Codage de Prüfer", d: "Suite de n − 2 termes qui code un arbre à n sommets numérotés." },
    { t: "Formule de Cayley", d: "Il y a n^(n−2) arbres sur n sommets numérotés." },
    { t: "Nombre chromatique χ(G)", d: "Nombre minimum de couleurs pour colorier les sommets sans conflit." },
    { t: "Stable / α(G)", d: "Ensemble de sommets deux à deux non adjacents ; α(G) = taille maximale." },
    { t: "Kruskal / Prim", d: "Deux algorithmes pour l'arbre couvrant de poids minimal." }
  ]
});