window.S3DEEP = window.S3DEEP || {};
window.S3DEEP["struct-c"] = [
{ html: `
<h3>Pourquoi les pointeurs ?</h3>
<p>Une variable est une case mémoire avec une <b>adresse</b>. Un pointeur est une variable qui stocke l'adresse d'une autre. Sans pointeurs, on ne peut ni modifier une variable dans une fonction, ni créer des structures dont la taille se décide à l'exécution (listes, piles, files).</p>
<h3>Code de base expliqué ligne par ligne</h3>
<pre><code>int x = 10;        // x : une case qui contient 10
int *p = &amp;x;       // p contient l'ADRESSE de x  (&amp; = "adresse de")
*p = 20;           // * = "valeur à l'adresse" : x vaut maintenant 20
printf("%d", x);   // affiche 20</code></pre>
<p>Retiens : <code>&amp;x</code> donne l'adresse, <code>*p</code> donne le contenu. Sur la déclaration, <code>int *p</code> veut dire « p est un pointeur vers un int ».</p>
<h3>Passage par adresse</h3>
<pre><code>void echange(int *a, int *b) {
    int tmp = *a;   // sauvegarde la valeur pointée par a
    *a = *b;        // copie la valeur de b dans la case de a
    *b = tmp;
}
echange(&amp;x, &amp;y);   // on passe les ADRESSES</code></pre>
<p>Sans les pointeurs, la fonction recevrait des copies et x, y resteraient inchangés.</p>
<h3>malloc et free</h3>
<pre><code>int *t = (int*) malloc(5 * sizeof(int)); // réserve 5 entiers dans le tas
if (t == NULL) { /* échec : plus de mémoire */ }
t[0] = 7;            // t se comporte comme un tableau
free(t);             // OBLIGATOIRE : rend la mémoire
t = NULL;            // évite d'utiliser un pointeur "mort"</code></pre>
<h3>Structures</h3>
<pre><code>typedef struct { char nom[30]; float note; } Etudiant;
Etudiant e = {"Ali", 14.5};
Etudiant *pe = &amp;e;
printf("%s", pe-&gt;nom);   // (*pe).nom s'écrit pe-&gt;nom</code></pre>
<div class="call warn"><b class="t">Erreurs fréquentes</b>Oublier <code>free</code> (fuite mémoire) ; utiliser un pointeur après <code>free</code> ; oublier de tester <code>NULL</code> ; écrire <code>*p</code> alors que <code>p</code> n'est pas initialisé.</div>`,
  videos: [{ t: "Les pointeurs en C expliqués", q: "pointeurs en C explication débutant" }, { t: "malloc et free en C", q: "malloc free langage C allocation dynamique" }] },

{ html: `
<h3>L'idée</h3>
<p>Un tableau est contigu et de taille fixe. Une <b>liste chaînée</b> est une suite de <b>cellules</b> éparpillées en mémoire, chacune contenant une donnée et l'<b>adresse de la suivante</b>. On garde seulement l'adresse de la première cellule (la tête). La dernière pointe sur <code>NULL</code>.</p>
<p>Schéma : <code>tête → [12|•] → [7|•] → [30|NULL]</code></p>
<h3>La cellule</h3>
<pre><code>typedef struct Cellule {
    int valeur;
    struct Cellule *suivant;   // pointeur vers la cellule suivante
} Cellule;
typedef Cellule *Liste;        // une liste = l'adresse de sa 1re cellule</code></pre>
<h3>Insertion en tête, pas à pas</h3>
<pre><code>Liste ajoutTete(Liste l, int v) {
    Cellule *c = malloc(sizeof(Cellule)); // 1) créer une cellule
    c-&gt;valeur = v;                        // 2) la remplir
    c-&gt;suivant = l;                       // 3) elle pointe sur l'ancienne tête
    return c;                             // 4) elle devient la nouvelle tête
}
l = ajoutTete(l, 5);</code></pre>
<p>L'ordre 3 puis 4 est essentiel : si tu changes la tête avant d'avoir relié, tu perds toute la liste.</p>
<h3>Parcours</h3>
<pre><code>void afficher(Liste l) {
    Cellule *p = l;          // p part de la tête
    while (p != NULL) {      // tant qu'il reste une cellule
        printf("%d -&gt; ", p-&gt;valeur);
        p = p-&gt;suivant;      // avance
    }
    printf("NULL\\n");
}</code></pre>
<h3>Insertion en fin et suppression</h3>
<pre><code>// fin : on parcourt jusqu'à la dernière cellule
Cellule *p = l;
while (p-&gt;suivant != NULL) p = p-&gt;suivant;
p-&gt;suivant = nouvelle;            // (cas liste vide à traiter à part)

// suppression de la tête
Liste supprTete(Liste l) {
    if (l == NULL) return NULL;
    Cellule *tmp = l;
    l = l-&gt;suivant;                 // la tête avance
    free(tmp);                      // on libère l'ancienne
    return l;
}</code></pre>
<div class="call"><b class="t">Complexité</b>Accès au k-ième : O(k). Ajout en tête : O(1). Ajout en fin : O(n) (sauf si on garde un pointeur sur la fin).</div>
<div class="call warn"><b class="t">Erreurs fréquentes</b>Déréférencer <code>NULL</code> (liste vide) ; perdre la tête de liste ; oublier de renvoyer la nouvelle tête.</div>`,
  videos: [{ t: "Listes chaînées en C", q: "liste chaînée en C tutoriel" }, { t: "Linked list animée", q: "linked list explained visualization" }] },

{ html: `
<h3>Le principe LIFO</h3>
<p>Comme une pile d'assiettes : on ajoute et on retire <b>uniquement au sommet</b>. Le dernier entré est le premier sorti (Last In, First Out). Trois opérations : <code>empile</code> (push), <code>depile</code> (pop), <code>sommet</code> (peek), avec le test <code>pileVide</code>.</p>
<h3>Version avec liste chaînée</h3>
<p>Le sommet est simplement la tête de la liste : empiler = insérer en tête, dépiler = supprimer la tête. Les deux sont en O(1).</p>
<pre><code>typedef struct Elt { int val; struct Elt *suiv; } Elt;
typedef Elt *Pile;

Pile empile(Pile p, int v) {
    Elt *e = malloc(sizeof(Elt));
    e-&gt;val = v;
    e-&gt;suiv = p;      // l'ancien sommet passe dessous
    return e;         // le nouvel élément est le sommet
}
Pile depile(Pile p, int *v) {
    if (p == NULL) return NULL;   // pile vide : rien à retirer
    *v = p-&gt;val;                  // on récupère la valeur par adresse
    Elt *t = p; p = p-&gt;suiv; free(t);
    return p;
}</code></pre>
<h3>Version tableau</h3>
<pre><code>#define MAX 100
typedef struct { int t[MAX]; int sommet; } Pile;  // sommet = -1 si vide
// empile : if (p-&gt;sommet &lt; MAX-1) p-&gt;t[++p-&gt;sommet] = v;
// depile : return p-&gt;t[p-&gt;sommet--];</code></pre>
<h3>À quoi ça sert ?</h3>
<ul><li>Vérifier le parenthésage d'une expression : on empile « ( », on dépile à chaque « ) ».</li><li>Annuler (Ctrl+Z), historique de navigation.</li><li>Appels de fonctions (la « pile d'appels »), évaluation d'expressions postfixées.</li></ul>
<div class="call warn"><b class="t">Piège</b>Dépiler une pile vide (underflow) ou empiler dans un tableau plein (overflow) : teste toujours avant.</div>`,
  videos: [{ t: "Structure de pile (stack)", q: "pile stack structure de données C LIFO" }, { t: "Parenthèses équilibrées avec une pile", q: "vérifier parenthèses avec une pile algorithme" }] },

{ html: `
<h3>Le principe FIFO</h3>
<p>Comme une file d'attente à la caisse : on entre par la <b>queue</b> et on sort par la <b>tête</b>. Premier entré, premier sorti (First In, First Out). Opérations : <code>enfile</code> (ajout en queue), <code>defile</code> (retrait en tête), <code>fileVide</code>.</p>
<h3>Version liste chaînée avec deux pointeurs</h3>
<pre><code>typedef struct Noeud { int val; struct Noeud *suiv; } Noeud;
typedef struct { Noeud *tete; Noeud *queue; } File;

void enfile(File *f, int v) {
    Noeud *n = malloc(sizeof(Noeud));
    n-&gt;val = v; n-&gt;suiv = NULL;      // le nouveau sera le dernier
    if (f-&gt;queue == NULL)            // file vide : tête = queue = n
        f-&gt;tete = f-&gt;queue = n;
    else {
        f-&gt;queue-&gt;suiv = n;          // l'ancien dernier pointe sur n
        f-&gt;queue = n;                // n devient la queue
    }
}
int defile(File *f) {
    Noeud *t = f-&gt;tete;
    int v = t-&gt;val;
    f-&gt;tete = t-&gt;suiv;
    if (f-&gt;tete == NULL) f-&gt;queue = NULL;  // file devenue vide
    free(t);
    return v;
}</code></pre>
<p>Garder un pointeur sur la queue rend l'ajout en O(1) : sans lui, il faudrait parcourir toute la liste.</p>
<h3>File circulaire (tableau)</h3>
<p>On utilise les indices modulo la taille : <code>queue = (queue + 1) % MAX</code>. Quand on atteint la fin du tableau, on revient au début : aucune place n'est gaspillée.</p>
<div class="call warn"><b class="t">Cas particuliers</b>Premier ajout dans une file vide, et dernier retrait (il faut remettre la queue à NULL). C'est là que se cachent la plupart des bugs.</div>
<div class="call"><b class="t">Note</b>Dans les TP, les noms peuvent être <code>empile/depile</code> même pour une file : c'est la même idée, seul l'endroit d'ajout change.</div>`,
  videos: [{ t: "Structure de file (queue)", q: "file queue structure de données FIFO en C" }, { t: "File circulaire", q: "circular queue explained array" }] },

{ html: `
<h3>Représenter un polynôme</h3>
<p>Un polynôme 5x³ + 2x − 7 est une suite de <b>monômes</b> (coefficient, exposant). On ne stocke que les termes non nuls, triés par exposant décroissant, dans une liste chaînée. C'est efficace pour les polynômes « creux » comme x¹⁰⁰ + 1.</p>
<pre><code>typedef struct Mon {
    float coef;
    int   exp;
    struct Mon *suiv;
} Mon;
typedef Mon *Poly;</code></pre>
<h3>Addition : fusion de deux listes triées</h3>
<p>On parcourt les deux listes en même temps, comme on fusionne deux paquets de cartes triés :</p>
<ul>
<li>exposants égaux → on additionne les coefficients (et on saute le terme si le résultat vaut 0) ;</li>
<li>exposant le plus grand → on le copie tel quel et on avance dans cette liste ;</li>
<li>quand une liste est finie, on recopie le reste de l'autre.</li>
</ul>
<pre><code>while (a != NULL &amp;&amp; b != NULL) {
    if (a-&gt;exp == b-&gt;exp)      { s = a-&gt;coef + b-&gt;coef; if (s != 0) ajoute(&amp;res, s, a-&gt;exp); a = a-&gt;suiv; b = b-&gt;suiv; }
    else if (a-&gt;exp &gt; b-&gt;exp) { ajoute(&amp;res, a-&gt;coef, a-&gt;exp); a = a-&gt;suiv; }
    else                       { ajoute(&amp;res, b-&gt;coef, b-&gt;exp); b = b-&gt;suiv; }
}
/* puis recopier ce qui reste de a ou de b */</code></pre>
<h3>Évaluation et dérivée</h3>
<p>Évaluation en x₀ : somme de <code>coef * pow(x0, exp)</code> en parcourant la liste. Dérivée : chaque terme devient (coef·exp, exp−1), on ignore les constantes (exp = 0).</p>
<div class="call"><b class="t">Méthode pour le TP</b>Écris d'abord <code>ajoute</code> (insertion triée ou en fin), teste-la, puis construis l'addition, la multiplication et la dérivée dessus.</div>`,
  videos: [{ t: "Polynômes avec listes chaînées", q: "polynôme liste chaînée C addition" }] }
];

window.S3DEEP["proba"] = [
{ html: `
<h3>Comprendre avant de calculer</h3>
<p>Une probabilité mesure la « chance » qu'un événement arrive, entre 0 (impossible) et 1 (certain). Quand toutes les issues sont équiprobables, on compte : <b>cas favorables ÷ cas possibles</b>. Tout le travail est donc de bien compter.</p>
<h3>Quel outil de dénombrement ?</h3>
<p>Pose-toi deux questions : <i>l'ordre compte-t-il ?</i> et <i>peut-on répéter ?</i></p>
<table><tr><th>Ordre ?</th><th>Répétition ?</th><th>Formule</th><th>Exemple</th></tr>
<tr><td>Oui</td><td>Oui</td><td>nᵖ</td><td>Codes à 4 chiffres : 10⁴</td></tr>
<tr><td>Oui</td><td>Non</td><td>n!/(n−p)!</td><td>Podium de 3 parmi 10 : 720</td></tr>
<tr><td>Non</td><td>Non</td><td>C(n,p)</td><td>Main de 5 cartes parmi 52</td></tr></table>
<h3>Exemple pas à pas</h3>
<p>Une urne a 3 rouges et 2 noires, on tire 2 boules d'un coup. P(2 rouges) ?</p>
<ol><li>Univers : choisir 2 boules parmi 5, sans ordre : C(5,2) = 10.</li><li>Favorables : 2 rouges parmi 3 : C(3,2) = 3.</li><li>Résultat : 3/10.</li></ol>
<h3>Conditionnement : un arbre aide toujours</h3>
<p>Pour des tirages successifs, dessine un arbre : on multiplie les probabilités le long d'une branche et on additionne les branches qui mènent à l'événement (probabilités totales). Bayes sert à « remonter » : connaissant le résultat, quelle était la cause ?</p>
<p><b>Exemple Bayes :</b> 1 % de malades, test positif à 95 % chez les malades et à 5 % chez les sains. P(malade | positif) = 0,01×0,95 / (0,01×0,95 + 0,99×0,05) ≈ 0,16. Peu intuitif, mais c'est le calcul.</p>
<div class="call warn"><b class="t">Erreurs fréquentes</b>Confondre P(A|B) et P(B|A) ; additionner des probabilités d'événements non incompatibles sans retirer l'intersection ; confondre « tirage avec remise » (indépendants) et « sans remise ».</div>`,
  videos: [{ t: "Probabilités conditionnelles", q: "probabilité conditionnelle et formule de Bayes cours" }, { t: "Dénombrement : arrangements et combinaisons", q: "dénombrement arrangement combinaison explication" }] },

{ html: `
<h3>Ce qu'est une variable aléatoire</h3>
<p>C'est une règle qui associe un <b>nombre</b> à chaque issue (ex. « nombre de piles sur 3 lancers »). Étudier sa <b>loi</b>, c'est dresser le tableau de ses valeurs et probabilités.</p>
<h3>Espérance et variance : le sens</h3>
<ul><li><b>E(X)</b> : la moyenne « à long terme » si on répétait l'expérience très souvent.</li><li><b>V(X)</b> : la dispersion moyenne autour de E(X) (au carré). σ = √V est dans la même unité que X.</li></ul>
<h3>Exemple complet : un dé</h3>
<p>X = résultat d'un dé équilibré. P(X=k) = 1/6.</p>
<div class="math">E(X) = (1+2+3+4+5+6)/6 = 3,5</div>
<div class="math">E(X²) = (1+4+9+16+25+36)/6 = 91/6 → V(X) = 91/6 − 3,5² ≈ 2,92</div>
<h3>Choisir la bonne loi</h3>
<table><tr><th>Question à se poser</th><th>Loi</th></tr>
<tr><td>Une seule épreuve succès/échec ?</td><td>Bernoulli(p)</td></tr>
<tr><td>Combien de succès en n essais indépendants ?</td><td>Binomiale(n,p)</td></tr>
<tr><td>À quel essai le premier succès ?</td><td>Géométrique(p)</td></tr>
<tr><td>Combien d'événements rares dans un intervalle ?</td><td>Poisson(λ)</td></tr></table>
<p><b>Exemple binomial :</b> 5 lancers d'une pièce, P(exactement 2 piles) = C(5,2)·(1/2)²·(1/2)³ = 10/32. On lit : C(5,2) façons de placer les 2 piles, chacune de probabilité p²q³.</p>
<div class="call warn"><b class="t">Erreurs fréquentes</b>Utiliser la binomiale quand les essais ne sont pas indépendants ; oublier que la géométrique commence à k = 1 ; calculer V(X) sans élever E(X) au carré.</div>`,
  videos: [{ t: "Variables aléatoires discrètes", q: "variable aléatoire discrète espérance variance cours" }, { t: "Loi binomiale, géométrique, Poisson", q: "loi binomiale loi de Poisson loi géométrique explication" }] },

{ html: `
<h3>L'idée d'un couple</h3>
<p>On étudie <b>deux</b> variables en même temps, par exemple X = nombre de piles et Y = résultat d'un dé. La loi conjointe est un tableau à double entrée : chaque case contient P(X = i, Y = j).</p>
<h3>Exemple de tableau</h3>
<table><tr><th>X \\ Y</th><th>0</th><th>1</th><th>P(X)</th></tr>
<tr><td>0</td><td>0,2</td><td>0,2</td><td>0,4</td></tr>
<tr><td>1</td><td>0,3</td><td>0,3</td><td>0,6</td></tr>
<tr><td>P(Y)</td><td>0,5</td><td>0,5</td><td>1</td></tr></table>
<ul><li>Les <b>marges</b> s'obtiennent en sommant les lignes (loi de X) et les colonnes (loi de Y).</li><li>Test d'indépendance : ici 0,2 = 0,4 × 0,5 ✓ ; 0,3 = 0,6 × 0,5 ✓ ; chaque case est le produit des marges, donc X et Y sont indépendantes.</li></ul>
<h3>Calcul de la covariance</h3>
<ol><li>E(X) = 0×0,4 + 1×0,6 = 0,6 ; E(Y) = 0,5.</li><li>E(XY) = somme de x·y·P : seule la case (1,1) compte : 1×1×0,3 = 0,3.</li><li>Cov = E(XY) − E(X)E(Y) = 0,3 − 0,3 = 0 ✓ (cohérent avec l'indépendance).</li></ol>
<p>Pour la somme : V(X+Y) = V(X) + V(Y) + 2Cov(X,Y), ce qui se simplifie quand Cov = 0.</p>
<div class="call warn"><b class="t">À éviter</b>Conclure à l'indépendance parce que Cov = 0. Il faut vérifier la condition sur <b>toutes</b> les cases du tableau (une seule case qui ne vérifie pas suffit à prouver la dépendance).</div>`,
  videos: [{ t: "Couples de variables aléatoires", q: "couple de variables aléatoires loi conjointe marginale covariance" }] },

{ html: `
<h3>Du discret au continu</h3>
<p>Quand X peut prendre n'importe quelle valeur d'un intervalle (durée, taille), on ne donne plus P(X = x) (toujours 0) mais une <b>densité</b> f : la probabilité d'un intervalle est l'<b>aire</b> sous la courbe.</p>
<h3>Exemple complet</h3>
<p>f(x) = 2x sur [0,1]. Vérifions :</p>
<ol>
<li>f ≥ 0 sur [0,1] ✓.</li>
<li>∫₀¹ 2x dx = [x²]₀¹ = 1 ✓ : c'est bien une densité.</li>
<li>P(X ≤ 1/2) = ∫₀^½ 2x dx = ¼.</li>
<li>E(X) = ∫₀¹ x·2x dx = [2x³/3]₀¹ = 2/3.</li>
<li>E(X²) = ∫₀¹ 2x³ dx = ½ donc V(X) = ½ − 4/9 = 1/18.</li>
</ol>
<h3>La fonction de répartition F</h3>
<p>F(x) = P(X ≤ x). Pour f = 2x : F(x) = 0 si x&lt;0 ; x² si 0≤x≤1 ; 1 si x&gt;1. On passe de F à f en dérivant.</p>
<h3>Loi exponentielle, en pratique</h3>
<p>Durée de vie d'une ampoule de moyenne 1000 h : λ = 1/1000. P(X &gt; 2000) = e^(−2) ≈ 0,135. Sans mémoire : une ampoule déjà vieille a la même chance de durer encore t heures qu'une neuve.</p>
<h3>Loi normale, en pratique</h3>
<p>Notes de moyenne 12 et d'écart-type 3 : P(X ≤ 15) = P(Z ≤ (15−12)/3) = Φ(1) ≈ 0,8413 (table de la loi N(0,1)).</p>
<div class="call warn"><b class="t">Erreurs fréquentes</b>Oublier de découper l'intégrale selon les intervalles ; oublier de vérifier ∫f = 1 ; oublier de centrer-réduire avant d'utiliser la table.</div>`,
  videos: [{ t: "Variables à densité", q: "variable aléatoire à densité cours fonction de répartition" }, { t: "Loi normale et table", q: "loi normale centrée réduite table utilisation" }, { t: "Loi exponentielle", q: "loi exponentielle sans mémoire explication" }] }
];

window.S3DEEP["ro"] = [
{ html: `
<h3>Apprendre à modéliser, c'est 80 % du travail</h3>
<p>Un énoncé de RO se traduit toujours en trois étapes : <b>1)</b> Que décide-t-on ? → variables. <b>2)</b> Quelles limites ? → contraintes. <b>3)</b> Que veut-on optimiser ? → fonction Z.</p>
<h3>Exemple guidé</h3>
<p><i>« Un atelier fait des produits A (gain 30 dh) et B (gain 20 dh). Une unité de A utilise 1 kg de M1 et 3 kg de M2 ; une unité de B utilise 1 kg de M1 et 1 kg de M2. Stock : 20 kg de M1 et 30 kg de M2. »</i></p>
<ul>
<li>Variables : A, B = nombre d'unités fabriquées (≥ 0).</li>
<li>Contrainte M1 : 1·A + 1·B ≤ 20. Contrainte M2 : 3·A + 1·B ≤ 30.</li>
<li>Objectif : max Z = 30A + 20B.</li>
</ul>
<p>Astuce : fais un tableau « ressource × produit », puis lis-le ligne par ligne pour écrire chaque contrainte.</p>
<h3>Cas du temps de machine</h3>
<p>Si la machine produit 50 unités/h de P₁, une unité demande 1/50 h. La contrainte de temps est donc x₁/50 + x₂/25 + x₃/75 ≤ 45. On multiplie par le PPCM (150) pour éviter les fractions : 3x₁ + 6x₂ + 2x₃ ≤ 6750.</p>
<div class="call warn"><b class="t">Erreurs fréquentes</b>Mélanger les unités ; oublier xᵢ ≥ 0 ; écrire ≥ au lieu de ≤ pour une ressource limitée.</div>`,
  videos: [{ t: "Modéliser un programme linéaire", q: "modélisation programme linéaire recherche opérationnelle exemple" }] },

{ html: `
<h3>Résoudre un PL à 2 variables avec un crayon</h3>
<p>Étape 1 — <b>Tracer chaque contrainte</b> comme une droite (remplace ≤ par =). Trouve deux points, souvent les intersections avec les axes. Exemple : A + B = 20 passe par (20,0) et (0,20).</p>
<p>Étape 2 — <b>Choisir le bon côté</b> de chaque droite. Teste l'origine : 0 + 0 ≤ 20 est vrai, donc on garde le côté de l'origine.</p>
<p>Étape 3 — <b>Repérer le polygone</b> commun à toutes les contraintes (avec A, B ≥ 0), puis calculer ses sommets en résolvant l'intersection de deux droites.</p>
<p>Étape 4 — <b>Évaluer Z à chaque sommet</b> et garder le meilleur.</p>
<h3>Exemple : max 30A + 20B</h3>
<table><tr><th>Sommet</th><th>Obtenu par</th><th>Z</th></tr>
<tr><td>(0,0)</td><td>origine</td><td>0</td></tr>
<tr><td>(7,0)</td><td>A = 7 et B = 0</td><td>210</td></tr>
<tr><td>(7,9)</td><td>A = 7 et 3A+B = 30</td><td>390</td></tr>
<tr><td>(5,15)</td><td>A+B = 20 et 3A+B = 30</td><td><b>450</b></td></tr>
<tr><td>(0,20)</td><td>A = 0 et A+B = 20</td><td>400</td></tr></table>
<p>Calcul de (5,15) : en soustrayant A+B=20 de 3A+B=30, on obtient 2A = 10 donc A = 5 et B = 15.</p>
<h3>Variante visuelle</h3>
<p>Trace la droite Z = 0 (ici 30A + 20B = 0), puis translate-la parallèlement vers le haut tant qu'elle touche le polygone : le dernier point touché est l'optimum.</p>
<div class="call"><b class="t">Vérification</b>Remplace la solution dans toutes les contraintes : (5,15) → M1 : 20 ≤ 20 ✓, M2 : 30 ≤ 30 ✓, M3 : 5 ≤ 7 ✓.</div>`,
  videos: [{ t: "Méthode graphique en programmation linéaire", q: "programmation linéaire méthode graphique deux variables" }] },

{ html: `
<h3>Pourquoi le simplexe ?</h3>
<p>Au-delà de 2 variables on ne peut plus dessiner. Le simplexe parcourt les sommets du polyèdre, en passant à chaque étape à un sommet voisin <b>meilleur</b>, jusqu'à ne plus pouvoir s'améliorer.</p>
<h3>Exemple complet</h3>
<p>max Z = 3x + 2y ; x + y ≤ 4 ; x + 3y ≤ 6 ; x ≤ 3.</p>
<p><b>Forme standard</b> : x + y + e₁ = 4 ; x + 3y + e₂ = 6 ; x + e₃ = 3 ; Z − 3x − 2y = 0.</p>
<table><tr><th>Base</th><th>x</th><th>y</th><th>e₁</th><th>e₂</th><th>e₃</th><th>b</th></tr>
<tr><td>e₁</td><td>1</td><td>1</td><td>1</td><td>0</td><td>0</td><td>4</td></tr>
<tr><td>e₂</td><td>1</td><td>3</td><td>0</td><td>1</td><td>0</td><td>6</td></tr>
<tr><td>e₃</td><td>1</td><td>0</td><td>0</td><td>0</td><td>1</td><td>3</td></tr>
<tr><td>Z</td><td>−3</td><td>−2</td><td>0</td><td>0</td><td>0</td><td>0</td></tr></table>
<ol>
<li><b>Entrante</b> : x (le plus négatif dans la ligne Z, −3).</li>
<li><b>Sortante</b> : rapports 4/1, 6/1, 3/1 → minimum 3, donc e₃ sort. Pivot = 1 (ligne e₃).</li>
<li>Après pivot : x = 3 ; e₁ = 1 ; e₂ = 3 ; Z = 9. Ligne Z : y a encore −2, donc on continue.</li>
<li>Entrante y. Rapports : e₁ : 1/1 = 1 ; e₂ : 3/3 = 1 (égalité → <b>dégénérescence</b>). On prend e₁ : y = 1, x = 3, Z = 11.</li>
<li>Plus de négatif dans la ligne Z : <b>optimum x = 3, y = 1, Z = 11</b>.</li>
</ol>
<p>Vérification : 3 + 1 = 4 ✓, 3 + 3 = 6 ✓, 3 ≤ 3 ✓ ; Z = 9 + 2 = 11.</p>
<div class="call"><b class="t">Convention</b>Selon le cours, on écrit la ligne de Z avec des coefficients positifs (Z = 4x₁ + …) et on choisit le plus grand positif. Les deux écritures sont équivalentes : suis celle de ton prof.</div>
<div class="call warn"><b class="t">Erreurs fréquentes</b>Diviser par un coefficient négatif ou nul dans le test du rapport ; oublier de mettre à jour la ligne de Z après le pivot ; mal lire la solution (les variables hors base valent 0).</div>`,
  videos: [{ t: "Méthode du simplexe pas à pas", q: "méthode du simplexe tableau exemple détaillé" }, { t: "Dégénérescence du simplexe", q: "simplexe dégénérescence explication" }] }
];
