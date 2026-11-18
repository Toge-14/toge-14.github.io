S3.addModule({
  id: "struct-c", folder: "struct-c", short: "Struct. de données C", name: "Structures de données en C", icon: "🧱", color: "#f97316",
  prof: "A. El Makrani · Département d'Informatique, FSK",
  summary: "Rappels de C (structures, pointeurs, malloc), puis implémentation des types abstraits : listes chaînées, piles (LIFO) et files (FIFO).",
  docs: [
    { kind: "Cours", title: "Chapitre 0 — Rappels du langage C", file: "Chapitre_Rappels_C.pdf" },
    { kind: "Cours", title: "Chapitre 2 — Les listes chaînées", file: "Chapitre_2_Listes_chainees.pdf" },
    { kind: "Cours", title: "Chapitre 3 — Les piles", file: "Chapitre3_Piles.pdf" },
    { kind: "Cours", title: "Chapitre 4 — Les files", file: "Chapitre_4_les_Files.pdf" },
    { kind: "TP", title: "TP0 — Rappels de C", file: "TP0_Rappels_C.pdf" },
    { kind: "Correction", title: "Correction TP0 — Rappels de C", file: "Correction_TP0_Rappels_C.pdf" },
    { kind: "TD", title: "TD2 — Listes chaînées", file: "TD2_Listes_chainees.pdf" },
    { kind: "Correction", title: "Correction TD2 — Listes chaînées", file: "Correction_TD2_Listes_chainees.pdf" },
    { kind: "TP", title: "Série TP N°2 — Polynômes (listes)", file: "S-rie_de_Travaux_Pratiques_N2_polynome.pdf" },
    { kind: "Correction", title: "Série TP N°2.2 — avec solution", file: "S-rie_de_Travaux_Pratiques_N2.2_avec_solution.pdf" },
    { kind: "TP", title: "Série TP N°4 — Piles", file: "Serie_TP4_Piles.pdf" },
    { kind: "TP", title: "Série TP N°5 — Files", file: "S-rie_de_Travaux_Pratiques_N5_File.pdf" }
  ],
  lessons: [
    { title: "Rappels de C : types composés, pointeurs, malloc", pdf: ["Chapitre_Rappels_C.pdf", "TP0_Rappels_C.pdf", "Correction_TP0_Rappels_C.pdf"], html: `
<div class="call"><b class="t">À retenir</b>Un pointeur est une variable qui contient une <b>adresse</b>. Avec <code>malloc</code>, la mémoire vient du tas (heap) : c'est à toi de la libérer avec <code>free</code>.</div>
<h3>Types composés</h3>
<ul>
<li><b>Tableau</b> : éléments de même type, contigus en mémoire, indices de 0 à N−1. On ne peut ni affecter ni comparer deux tableaux d'un coup.</li>
<li><b>Structure</b> (<code>struct</code>) : champs de types différents. <b>Union</b> : champs qui partagent la même zone. <b>Énumération</b> : constantes nommées.</li>
<li><code>typedef</code> donne un nom court à un type : <code>typedef struct Noeud Noeud;</code></li>
</ul>
<pre><code>#define N 10
int tab[N];
for (int i = 0; i &lt; N; i++) tab[i] = i * i;</code></pre>
<h3>Pointeurs</h3>
<table><tr><th>Écriture</th><th>Signification</th></tr>
<tr><td><code>int *p;</code></td><td>p est un pointeur vers un int</td></tr>
<tr><td><code>p = &amp;x;</code></td><td>p reçoit l'adresse de x</td></tr>
<tr><td><code>*p</code></td><td>la valeur pointée (déréférencement)</td></tr>
<tr><td><code>p-&gt;champ</code></td><td>équivaut à <code>(*p).champ</code> pour une structure</td></tr>
<tr><td><code>p + 1</code></td><td>avance de <code>sizeof(*p)</code> octets, pas d'un octet</td></tr></table>
<h3>Allocation dynamique</h3>
<table><tr><th>Fonction</th><th>Rôle</th></tr>
<tr><td><code>malloc(n)</code></td><td>réserve n octets, contenu non initialisé, renvoie NULL en cas d'échec</td></tr>
<tr><td><code>calloc(k, t)</code></td><td>réserve k×t octets mis à zéro</td></tr>
<tr><td><code>realloc(p, n)</code></td><td>change la taille d'un bloc</td></tr>
<tr><td><code>free(p)</code></td><td>libère le bloc</td></tr></table>
<pre><code>int *t = (int *)malloc(5 * sizeof(int));
if (t == NULL) { printf("Erreur memoire\\n"); exit(1); }
/* ... utilisation ... */
free(t);</code></pre>
<div class="call warn"><b class="t">Erreurs classiques</b>Oublier <code>free</code> (fuite mémoire), utiliser un pointeur après <code>free</code>, déréférencer NULL, écrire hors du tableau, oublier de tester le résultat de <code>malloc</code>.</div>` },

    { title: "Les listes chaînées", pdf: ["Chapitre_2_Listes_chainees.pdf", "TD2_Listes_chainees.pdf", "Correction_TD2_Listes_chainees.pdf"], html: `
<div class="call"><b class="t">À retenir</b>Une liste chaînée est une suite de <b>maillons</b>. Chaque maillon contient une donnée et l'adresse du suivant. Le dernier pointe sur <code>NULL</code>.</div>
<h3>Types de listes</h3>
<ul>
<li><b>Dynamique</b> : le suivant est un pointeur (alloué avec <code>malloc</code>). <b>Statique</b> : le suivant est un indice de tableau.</li>
<li><b>Simple</b> (un sens), <b>doublement chaînée</b> (suivant et précédent), <b>circulaire</b> (le dernier revient au premier).</li>
</ul>
<h3>Le maillon</h3>
<pre><code>typedef struct Maillon {
    int val;
    struct Maillon *suiv;
} Maillon;

Maillon *nouveau(int v) {
    Maillon *m = (Maillon *)malloc(sizeof(Maillon));
    if (m == NULL) exit(1);
    m-&gt;val = v;
    m-&gt;suiv = NULL;
    return m;
}</code></pre>
<h3>Insertion en tête (coût constant)</h3>
<pre><code>void insererTete(Maillon **tete, int v) {
    Maillon *m = nouveau(v);
    m-&gt;suiv = *tete;
    *tete = m;
}</code></pre>
<p>On passe <code>Maillon **</code> car la fonction doit pouvoir modifier la tête de la liste.</p>
<h3>Parcours, recherche, comptage</h3>
<pre><code>int compter(Maillon *tete) {
    int n = 0;
    for (Maillon *c = tete; c != NULL; c = c-&gt;suiv) n++;
    return n;
}</code></pre>
<h3>Suppression en tête</h3>
<pre><code>void supprimerTete(Maillon **tete) {
    if (*tete == NULL) return;
    Maillon *aSupprimer = *tete;
    *tete = (*tete)-&gt;suiv;
    free(aSupprimer);
}</code></pre>
<table><tr><th>Opération</th><th>Complexité</th></tr>
<tr><td>Insertion / suppression en tête</td><td>O(1)</td></tr>
<tr><td>Insertion en queue (sans pointeur de queue)</td><td>O(n)</td></tr>
<tr><td>Recherche d'un élément</td><td>O(n)</td></tr>
<tr><td>Accès au k-ième</td><td>O(k)</td></tr></table>
<div class="call warn"><b class="t">Cas particuliers à toujours traiter</b>Liste vide, un seul élément, insertion/suppression en tête, en queue, et élément absent.</div>` },

    { title: "Les piles (LIFO)", pdf: ["Chapitre3_Piles.pdf", "Serie_TP4_Piles.pdf"], html: `
<div class="call"><b class="t">À retenir</b>Pile = <b>LIFO</b> (Last In, First Out) : le dernier entré est le premier sorti. On n'agit qu'au <b>sommet</b> : <code>push</code> (empiler) et <code>pop</code> (dépiler).</div>
<h3>À quoi ça sert</h3>
<ul><li>Pile d'appels des fonctions et de la récursivité (ex. <code>factorielle(3)</code>)</li><li>Vérification des parenthèses, évaluation d'expressions</li><li>Annuler (Ctrl+Z), page précédente d'un navigateur</li></ul>
<h3>Représentation dynamique</h3>
<p>Une pile est une liste simplifiée qui n'accepte les entrées-sorties qu'en tête. Une structure de contrôle garde le sommet et la taille.</p>
<pre><code>typedef struct elemEntier { int n; struct elemEntier *suivant; } elemEntier;
typedef struct Pile { elemEntier *sommet; int taille; } Pile;

void initialisation(Pile *p) { p-&gt;sommet = NULL; p-&gt;taille = 0; }

void pushPile(Pile *pile, int valeur) {
    elemEntier *nouvel = (elemEntier *)malloc(sizeof(elemEntier));
    if (nouvel == NULL) exit(1);
    nouvel-&gt;n = valeur;
    nouvel-&gt;suivant = pile-&gt;sommet;   /* au-dessus du sommet */
    pile-&gt;sommet = nouvel;
    pile-&gt;taille++;
}

elemEntier *popPile(Pile *pile) {
    if (pile-&gt;taille == 0) return NULL;   /* pile vide */
    elemEntier *e = pile-&gt;sommet;
    pile-&gt;sommet = e-&gt;suivant;
    e-&gt;suivant = NULL;
    pile-&gt;taille--;
    return e;                             /* l'appelant fait free(e) */
}</code></pre>
<h3>Trace : push 5, push 8, push 3, pop</h3>
<table><tr><th>Opération</th><th>Pile (sommet à gauche)</th><th>taille</th></tr>
<tr><td>push 5</td><td>5</td><td>1</td></tr><tr><td>push 8</td><td>8 5</td><td>2</td></tr>
<tr><td>push 3</td><td>3 8 5</td><td>3</td></tr><tr><td>pop → 3</td><td>8 5</td><td>2</td></tr></table>
<div class="call warn"><b class="t">Mémoire</b><code>popPile</code> ne libère pas l'élément : c'est l'appelant qui doit faire <code>free</code>. Teste avec <code>valgrind</code>.</div>
<p>Une pile peut aussi être <b>statique</b> (tableau + indice <code>sommet</code>), avec une taille fixée au départ.</p>` },

    { title: "Les files (FIFO)", pdf: ["Chapitre_4_les_Files.pdf", "S-rie_de_Travaux_Pratiques_N5_File.pdf"], html: `
<div class="call"><b class="t">À retenir</b>File = <b>FIFO</b> (First In, First Out) : le premier entré est le premier sorti. On ajoute à la <b>fin</b>, on retire au <b>début</b>.</div>
<h3>Représentation avec deux pointeurs</h3>
<pre><code>typedef struct Noeud { int val; struct Noeud *suiv; } Noeud;
typedef struct File { Noeud *debut; Noeud *fin; int taille; } File;

File *alloue_file(void) {
    File *f = (File *)malloc(sizeof(File));
    if (f == NULL) exit(1);
    f-&gt;debut = f-&gt;fin = NULL; f-&gt;taille = 0;
    return f;
}
int est_vide(File *f) { return f-&gt;taille == 0; }

void enfile(int x, File *f) {          /* ajout en fin */
    Noeud *n = (Noeud *)malloc(sizeof(Noeud));
    n-&gt;val = x; n-&gt;suiv = NULL;
    if (est_vide(f)) f-&gt;debut = n; else f-&gt;fin-&gt;suiv = n;
    f-&gt;fin = n; f-&gt;taille++;
}

int defile(File *f) {                  /* retrait au début (file non vide) */
    Noeud *n = f-&gt;debut; int v = n-&gt;val;
    f-&gt;debut = n-&gt;suiv;
    if (f-&gt;debut == NULL) f-&gt;fin = NULL;
    free(n); f-&gt;taille--;
    return v;
}</code></pre>
<div class="call warn"><b class="t">Piège</b>Quand on retire le dernier élément, il faut aussi remettre <code>fin</code> à <code>NULL</code>. Beaucoup l'oublient.</div>
<h3>Pile ou file ?</h3>
<table><tr><th></th><th>Pile</th><th>File</th></tr>
<tr><td>Ordre</td><td>LIFO</td><td>FIFO</td></tr><tr><td>Ajout</td><td>au sommet</td><td>à la fin</td></tr>
<tr><td>Retrait</td><td>au sommet</td><td>au début</td></tr><tr><td>Exemple</td><td>Ctrl+Z, appels de fonctions</td><td>file d'attente, impression</td></tr></table>
<p>Le TP n°5 demande une simulation de file de clients en banque : 12, 5, 18, 7, 3 arrivent, on en sert deux, puis trois nouveaux arrivent, etc.</p>` },

    { title: "TP : polynômes avec listes chaînées", pdf: ["S-rie_de_Travaux_Pratiques_N2_polynome.pdf", "S-rie_de_Travaux_Pratiques_N2.2_avec_solution.pdf"], html: `
<p>Un polynôme à coefficients réels est une liste de monômes, triés par puissance décroissante.</p>
<pre><code>typedef struct Monome *Polynome;
typedef struct Monome { float coeff; int puiss; Polynome next; } Monome;</code></pre>
<p>Le polynôme <code>3X^7 + X^6 − 2X + 4</code> devient : (3,7) → (1,6) → (−2,1) → (4,0) → NULL.</p>
<h3>Ce que le TP demande</h3>
<ol>
<li>Expliquer <code>typedef struct Monome *Polynome;</code> : on manipule un polynôme par l'adresse de son premier monôme, ce qui allège les signatures.</li>
<li>Créer un monôme avec <code>creerMonome(coeff, puiss)</code>.</li>
<li>Insérer en gardant l'ordre décroissant des puissances, puis fusionner les monômes de même puissance (additionner les coefficients).</li>
<li>Afficher, puis effectuer des opérations sur les polynômes.</li>
</ol>
<div class="call"><b class="t">Méthode d'insertion triée</b>Parcours avec deux pointeurs (<code>prec</code>, <code>cour</code>) tant que <code>cour-&gt;puiss &gt; puiss</code>. Cas à gérer : insertion en tête, même puissance (on additionne), insertion au milieu ou en fin.</div>` }
  ],
  quiz: [
    { q: "Que vaut <code>sizeof(int)</code> et que fait <code>p + 1</code> si <code>p</code> est un <code>int *</code> ?", o: ["Avance d'un octet", "Avance de sizeof(int) octets", "Ajoute 1 à la valeur pointée", "Provoque une erreur"], a: 1, e: "L'arithmétique des pointeurs est exprimée en nombre d'éléments : p+1 pointe sur l'élément suivant." },
    { q: "Quelle instruction libère un bloc alloué par <code>malloc</code> ?", o: ["delete p;", "free(p);", "release(p);", "p = NULL;"], a: 1, e: "<code>free(p)</code> rend le bloc au système. Mettre p à NULL seul ne libère rien." },
    { q: "Que renvoie <code>malloc</code> si la mémoire est insuffisante ?", o: ["0 octet alloué", "NULL", "-1", "Le programme s'arrête automatiquement"], a: 1, e: "Il faut toujours tester <code>if (p == NULL)</code> après un malloc." },
    { q: "Dans une liste chaînée simple, que contient le champ <code>suiv</code> du dernier maillon ?", o: ["L'adresse du premier maillon", "NULL", "0 comme entier uniquement", "L'adresse du maillon précédent"], a: 1, e: "Le dernier maillon ne pointe sur rien : NULL. Pour une liste circulaire, il reviendrait au premier." },
    { q: "Pourquoi <code>insererTete</code> prend-elle un <code>Maillon **</code> ?", o: ["Pour aller plus vite", "Pour pouvoir modifier le pointeur de tête de l'appelant", "Parce que C l'exige", "Pour éviter malloc"], a: 1, e: "Le C passe tout par valeur : sans le double pointeur, la tête de l'appelant ne changerait pas." },
    { q: "Quelle est la complexité de l'insertion en tête d'une liste chaînée simple ?", o: ["O(1)", "O(n)", "O(log n)", "O(n²)"], a: 0, e: "Aucun parcours : on crée un maillon et on met à jour deux pointeurs." },
    { q: "Une pile suit la règle…", o: ["FIFO", "LIFO", "Aléatoire", "Triée"], a: 1, e: "Last In, First Out : le dernier empilé est le premier dépilé." },
    { q: "On empile 5, 8 puis 3, puis on dépile une fois. Que renvoie le pop ?", o: ["5", "8", "3", "La pile est vide"], a: 2, e: "Le sommet est le dernier élément empilé : 3." },
    { q: "Quelle structure utilise-t-on pour simuler une file d'attente à un guichet ?", o: ["Une pile", "Une file", "Un arbre", "Une union"], a: 1, e: "Les clients sont servis dans l'ordre d'arrivée : FIFO." },
    { q: "Dans <code>defile</code>, que faut-il faire quand on retire le dernier élément ?", o: ["Rien de spécial", "Remettre <code>fin</code> à NULL", "Doubler la taille", "Appeler malloc"], a: 1, e: "Sinon <code>fin</code> pointerait vers un maillon libéré (pointeur pendant)." },
    { q: "Quel outil détecte les fuites mémoire d'un programme C ?", o: ["gcc -Wall seulement", "valgrind", "make", "grep"], a: 1, e: "Le cours recommande de vérifier avec valgrind que chaque malloc a son free." }
  ],
  exercises: [
    { q: "Écris <code>int somme(Maillon *tete)</code> qui renvoie la somme des valeurs d'une liste.", a: "<pre><code>int somme(Maillon *tete) {\n    int s = 0;\n    for (Maillon *c = tete; c != NULL; c = c-&gt;suiv) s += c-&gt;val;\n    return s;\n}</code></pre>Cas liste vide : renvoie 0." },
    { q: "Écris <code>void insererQueue(Maillon **tete, int v)</code>.", a: "<pre><code>void insererQueue(Maillon **tete, int v) {\n    Maillon *m = nouveau(v);\n    if (*tete == NULL) { *tete = m; return; }\n    Maillon *c = *tete;\n    while (c-&gt;suiv != NULL) c = c-&gt;suiv;\n    c-&gt;suiv = m;\n}</code></pre>" },
    { q: "Écris <code>void viderListe(Maillon **tete)</code> sans fuite mémoire.", a: "<pre><code>void viderListe(Maillon **tete) {\n    while (*tete != NULL) {\n        Maillon *t = *tete;\n        *tete = t-&gt;suiv;\n        free(t);\n    }\n}</code></pre>On sauvegarde toujours le suivant avant de libérer." },
    { q: "Vérifie qu'une chaîne de parenthèses est bien parenthésée avec une pile.", a: "On parcourt la chaîne : à chaque <code>(</code> on empile ; à chaque <code>)</code> on dépile. Si on dépile sur une pile vide, c'est faux. À la fin, la pile doit être vide." },
    { q: "Écris <code>void detruit_file(File *f)</code>.", a: "<pre><code>void detruit_file(File *f) {\n    while (!est_vide(f)) defile(f);\n    free(f);\n}</code></pre>On libère tous les nœuds, puis la structure de contrôle." }
  ],
  tips: [
    "Dessine toujours les flèches (pointeurs) sur papier avant de coder une insertion ou une suppression.",
    "Dans un examen, écris d'abord le cas « liste vide » : c'est celui qui fait perdre des points.",
    "Ordre sûr pour insérer : d'abord <code>nouveau-&gt;suiv = ...</code>, puis seulement relier le précédent. Pour supprimer : sauvegarde le suivant avant <code>free</code>.",
    "Après chaque <code>malloc</code>, ajoute le <code>free</code> correspondant dans ta tête (ou dans une fonction <code>detruit</code>).",
    "Les corrections de TP0 et TD2 sont dans l'onglet PDF : refais l'exercice sans regarder, puis compare."
  ],
  terms: [
    { t: "Pointeur", d: "Variable qui contient l'adresse d'une autre variable." },
    { t: "malloc", d: "Fonction qui réserve un bloc de mémoire dans le tas et renvoie son adresse (ou NULL)." },
    { t: "free", d: "Libère un bloc de mémoire précédemment alloué dynamiquement." },
    { t: "Fuite mémoire", d: "Bloc alloué qui n'est jamais libéré." },
    { t: "Maillon", d: "Élément d'une liste chaînée : une donnée et l'adresse du suivant." },
    { t: "Chaînage", d: "Lien d'un élément vers le suivant par son adresse." },
    { t: "Liste doublement chaînée", d: "Liste où chaque élément connaît son suivant et son précédent." },
    { t: "Liste circulaire", d: "Liste dont le dernier élément pointe vers le premier." },
    { t: "LIFO", d: "Last In, First Out : dernier entré, premier sorti (pile)." },
    { t: "FIFO", d: "First In, First Out : premier entré, premier sorti (file)." },
    { t: "Sommet", d: "Dernier élément empilé d'une pile, seul accessible." },
    { t: "Structure de contrôle", d: "Structure qui garde les informations globales (tête, fin, taille) d'une liste, pile ou file." }
  ]
});
