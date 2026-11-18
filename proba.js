S3.addModule({
  id: "proba", folder: "proba", short: "Probabilités & stat", name: "Probabilités et statistique", icon: "🎲", color: "#a855f7",
  prof: "Y. Omari · Faculté des Sciences, Kénitra",
  summary: "Espaces probabilisés, variables aléatoires discrètes, couples de variables aléatoires et variables à densité, avec les lois usuelles et les annales corrigées.",
  docs: [
    { kind: "Cours", title: "Chapitre 1 — Espaces probabilisés", file: "ProbaChap1_2_.pdf" },
    { kind: "Cours", title: "Chapitre 2 — Variables aléatoires discrètes", file: "Chap2_2_.pdf" },
    { kind: "Cours (slides)", title: "Chapitre 3 — Couples de v.a. discrètes", file: "PresChap3.pdf" },
    { kind: "Cours", title: "Chapitre 4 — Variables à densité", file: "Chap4_2_.pdf" },
    { kind: "Cours (slides)", title: "Chapitre 4 — Variables à densité (présentation)", file: "PresCont.pdf" },
    { kind: "Document", title: "Document du 26/09/2026", file: "DOC-20260926-WA0020_260926_123215.pdf" },
    { kind: "TD", title: "Série 1", file: "S-rie1_1_.pdf" },
    { kind: "TD", title: "Série 2", file: "S-rie2_2_.pdf" },
    { kind: "TD", title: "Série 4", file: "Serie4.pdf" },
    { kind: "Annale", title: "Examen — Session normale 2024/2025", file: "Exams__Normal2425.pdf" },
    { kind: "Annale", title: "Examen — Rattrapage 2024/2025", file: "Exams__Ratt2425.pdf" },
    { kind: "Annale", title: "Examen — Session normale 2025/2026 (avec correction)", file: "Exams__Normal2526.pdf" },
    { kind: "Annale", title: "Examen — Rattrapage 2025/2026", file: "Exams__Ratt2526.pdf" }
  ],
  lessons: [
    { title: "Espaces probabilisés, dénombrement, conditionnement", pdf: ["ProbaChap1_2_.pdf", "S-rie1_1_.pdf"], html: `
<div class="call"><b class="t">À retenir</b>Un espace probabilisé est un triplet (Ω, 𝒜, P) : l'univers Ω (toutes les issues), la tribu 𝒜 (les événements) et la probabilité P.</div>
<h3>Vocabulaire</h3>
<ul>
<li><b>Expérience aléatoire</b> : résultat dépendant du hasard. <b>Univers Ω</b> : ensemble des issues. <b>Événement</b> : partie de Ω.</li>
<li>Événement certain = Ω ; impossible = ∅ ; contraire de A = Ā ; « A et B » = A∩B ; « A ou B » = A∪B ; incompatibles si A∩B = ∅.</li>
</ul>
<h3>Propriétés d'une probabilité</h3>
<div class="math">P(Ω)=1 · P(Ā)=1−P(A) · P(A∪B)=P(A)+P(B)−P(A∩B)</div>
<p>Si les issues sont équiprobables : <b>P(A) = nombre de cas favorables / nombre de cas possibles</b>.</p>
<h3>Dénombrement</h3>
<table><tr><th>Situation</th><th>Formule</th></tr>
<tr><td>Arrangement avec répétition (p parmi n, ordre compte)</td><td>nᵖ</td></tr>
<tr><td>Arrangement sans répétition</td><td>Aₙᵖ = n!/(n−p)!</td></tr>
<tr><td>Combinaison sans répétition (ordre ne compte pas)</td><td>C(n,p) = n!/(p!(n−p)!)</td></tr></table>
<h3>Probabilité conditionnelle</h3>
<div class="math">P(A|B) = P(A∩B) / P(B)  (si P(B) &gt; 0)</div>
<ul>
<li><b>Formule des probabilités composées</b> : P(A∩B) = P(B)·P(A|B).</li>
<li><b>Probabilités totales</b> : si (Bᵢ) est un système complet, P(A) = Σ P(Bᵢ)·P(A|Bᵢ).</li>
<li><b>Bayes</b> : P(Bⱼ|A) = P(Bⱼ)·P(A|Bⱼ) / P(A).</li>
<li><b>Indépendance</b> : A et B indépendants ⇔ P(A∩B) = P(A)·P(B).</li>
</ul>
<div class="call warn"><b class="t">Piège</b>Incompatibles ≠ indépendants. Deux événements incompatibles de probabilité non nulle sont au contraire dépendants.</div>` },

    { title: "Variables aléatoires discrètes", pdf: ["Chap2_2_.pdf", "S-rie2_2_.pdf"], html: `
<div class="call"><b class="t">À retenir</b>Une v.a.r. discrète X prend un nombre fini ou dénombrable de valeurs. On donne sa <b>loi</b> : la liste des P(X = xᵢ), dont la somme vaut 1.</div>
<h3>Outils</h3>
<table><tr><th>Notion</th><th>Formule</th></tr>
<tr><td>Loi</td><td>pᵢ = P(X = xᵢ), Σ pᵢ = 1</td></tr>
<tr><td>Fonction de répartition</td><td>F(x) = P(X ≤ x) (croissante, en escalier)</td></tr>
<tr><td>Espérance</td><td>E(X) = Σ xᵢ pᵢ</td></tr>
<tr><td>Transfert</td><td>E(g(X)) = Σ g(xᵢ) pᵢ</td></tr>
<tr><td>Variance</td><td>V(X) = E(X²) − E(X)²</td></tr>
<tr><td>Écart-type</td><td>σ(X) = √V(X)</td></tr>
<tr><td>Linéarité</td><td>E(aX+b) = aE(X)+b ; V(aX+b) = a²V(X)</td></tr></table>
<h3>Lois usuelles</h3>
<table><tr><th>Loi</th><th>P(X = k)</th><th>E(X)</th><th>V(X)</th></tr>
<tr><td>Uniforme sur {1,…,n}</td><td>1/n</td><td>(n+1)/2</td><td>(n²−1)/12</td></tr>
<tr><td>Bernoulli(p)</td><td>P(1)=p, P(0)=q=1−p</td><td>p</td><td>pq</td></tr>
<tr><td>Binomiale(n,p)</td><td>C(n,k) pᵏ qⁿ⁻ᵏ, k=0..n</td><td>np</td><td>npq</td></tr>
<tr><td>Géométrique(p)</td><td>q^(k−1) p, k ≥ 1</td><td>1/p</td><td>q/p²</td></tr>
<tr><td>Poisson(λ)</td><td>e^(−λ) λᵏ / k!, k ≥ 0</td><td>λ</td><td>λ</td></tr></table>
<h3>Reconnaître la loi</h3>
<ul>
<li><b>Nombre de succès</b> en n essais indépendants de même probabilité p → <b>binomiale</b>.</li>
<li><b>Rang du premier succès</b> → <b>géométrique</b>.</li>
<li>Événements rares, comptage sur un intervalle → <b>Poisson</b>.</li>
</ul>
<div class="call"><b class="t">Astuce</b>Pour la géométrique, P(X ≤ k) = 1 − q<sup>k</sup> et P(X &gt; k) = q<sup>k</sup>. Pour un maximum T = max(Y,Z) de deux v.a. indépendantes : P(T ≤ k) = P(Y ≤ k)·P(Z ≤ k).</div>` },

    { title: "Couples de variables aléatoires discrètes", pdf: ["PresChap3.pdf", "Serie4.pdf"], html: `
<div class="call"><b class="t">À retenir</b>Le couple (X, Y) a une <b>loi conjointe</b> P(X = xᵢ, Y = yⱼ). Quand on te demande la loi d'un couple : écris X(Ω) et Y(Ω), puis toutes les valeurs P(X=xᵢ, Y=yⱼ), souvent dans un tableau.</div>
<h3>Lois marginales</h3>
<div class="math">P(X = xᵢ) = Σⱼ P(X = xᵢ, Y = yⱼ) · P(Y = yⱼ) = Σᵢ P(X = xᵢ, Y = yⱼ)</div>
<h3>Indépendance</h3>
<div class="math">X et Y indépendantes ⇔ pour tous i, j : P(X=xᵢ, Y=yⱼ) = P(X=xᵢ)·P(Y=yⱼ)</div>
<h3>Covariance et variance d'une somme</h3>
<table><tr><th>Notion</th><th>Formule</th></tr>
<tr><td>Espérance du produit</td><td>E(XY) = Σᵢⱼ xᵢ yⱼ P(X=xᵢ, Y=yⱼ)</td></tr>
<tr><td>Covariance</td><td>Cov(X,Y) = E(XY) − E(X)E(Y)</td></tr>
<tr><td>Variance d'une somme</td><td>V(X+Y) = V(X) + V(Y) + 2Cov(X,Y)</td></tr>
<tr><td>Si X, Y indépendantes</td><td>Cov = 0 et V(X+Y) = V(X)+V(Y)</td></tr>
<tr><td>Corrélation</td><td>ρ = Cov(X,Y) / (σ(X)σ(Y)), entre −1 et 1</td></tr></table>
<div class="call warn"><b class="t">Piège</b>Cov(X,Y) = 0 n'implique pas l'indépendance. L'inverse est vrai : indépendantes ⇒ covariance nulle.</div>
<p>La somme de deux binomiales indépendantes de même p, B(n,p) et B(m,p), suit B(n+m, p). La somme de deux Poisson indépendantes P(λ) et P(μ) suit P(λ+μ).</p>` },

    { title: "Variables aléatoires à densité", pdf: ["Chap4_2_.pdf", "PresCont.pdf"], html: `
<div class="call"><b class="t">À retenir</b>X a une densité f si f ≥ 0, f est continue sauf en un nombre fini de points, ∫ f = 1 sur ℝ, et F(x) = P(X ≤ x) = ∫₋∞ˣ f(t) dt. Alors P(X = a) = 0 pour tout a.</div>
<h3>Formules</h3>
<table><tr><th>Notion</th><th>Formule</th></tr>
<tr><td>Probabilité d'un intervalle</td><td>P(a ≤ X ≤ b) = ∫ₐᵇ f = F(b) − F(a)</td></tr>
<tr><td>Retrouver la densité</td><td>f = F′ là où F est dérivable</td></tr>
<tr><td>Espérance</td><td>E(X) = ∫ x f(x) dx</td></tr>
<tr><td>Variance</td><td>V(X) = E(X²) − E(X)², avec E(X²) = ∫ x² f(x) dx</td></tr></table>
<h3>Lois usuelles</h3>
<table><tr><th>Loi</th><th>Densité</th><th>E(X)</th><th>V(X)</th></tr>
<tr><td>Uniforme U[a,b]</td><td>1/(b−a) sur [a,b]</td><td>(a+b)/2</td><td>(b−a)²/12</td></tr>
<tr><td>Exponentielle E(λ)</td><td>λe^(−λx) pour x ≥ 0</td><td>1/λ</td><td>1/λ²</td></tr>
<tr><td>Normale N(m,σ²)</td><td>exp(−(x−m)²/(2σ²)) / (σ√(2π))</td><td>m</td><td>σ²</td></tr></table>
<h3>À savoir sur chaque loi</h3>
<ul>
<li><b>Exponentielle</b> : P(X &gt; x) = e^(−λx), et elle est <b>sans mémoire</b> : P(X &gt; s+t | X &gt; s) = P(X &gt; t).</li>
<li><b>Normale</b> : si X ~ N(m, σ²), alors Z = (X − m)/σ ~ N(0,1). On lit ensuite Φ dans la table. Φ(−x) = 1 − Φ(x).</li>
</ul>
<div class="call"><b class="t">Méthode pour une fonction de répartition</b>Découpe selon les intervalles de x, intègre la densité morceau par morceau, et vérifie que F tend vers 0 à gauche et vers 1 à droite.</div>` },

    { title: "Méthode pour les annales et exemple corrigé", pdf: ["Exams__Normal2526.pdf", "Exams__Normal2425.pdf", "Exams__Ratt2425.pdf", "Exams__Ratt2526.pdf"], html: `
<p>Les quatre annales sont dans l'onglet PDF. Celle de 2025/2026 contient la correction. Voici deux extraits résolus.</p>
<h3>Exercice type : urnes</h3>
<p>U₁ : 5 noires, 2 vertes, 1 rouge. U₂ : 2 noires, 1 verte. On tire 2 boules de U₁ et 1 de U₂, indépendamment. Card(Ω) = C(8,2) × 3 = 28 × 3 = 84.</p>
<table><tr><th>Événement</th><th>Calcul</th><th>Résultat</th></tr>
<tr><td>A : trois vertes</td><td>2 vertes de U₁ (1 façon) × verte de U₂ (1) = 1</td><td>1/84</td></tr>
<tr><td>B : exactement deux vertes</td><td>(2 vertes U₁ × non-verte U₂ : 1×2) + (1 verte U₁ × verte U₂ : 12×1) = 14</td><td>14/84 = 1/6</td></tr>
<tr><td>C : au moins une verte</td><td>1 − P(aucune verte) = 1 − (15×2)/84</td><td>9/14</td></tr>
<tr><td>D : au plus une verte</td><td>1 − P(≥ 2 vertes) = 1 − 15/84</td><td>23/28</td></tr></table>
<h3>Exercice type : deux Bernoulli indépendantes</h3>
<p>X ~ Bernoulli(2/3), Y ~ Bernoulli(3/4), indépendantes, S = X + Y.</p>
<ul>
<li>E(X) = 2/3, V(X) = 2/9 ; E(Y) = 3/4, V(Y) = 3/16 ; Cov(X,Y) = 0.</li>
<li>Loi de S : P(S=0) = 1/12, P(S=1) = 5/12, P(S=2) = 1/2.</li>
<li>E(S) = 17/12 et V(S) = 59/144. On les retrouve sans la loi de S : E(S) = E(X)+E(Y) et V(S) = V(X)+V(Y) car la covariance est nulle.</li>
</ul>
<div class="call"><b class="t">Conseil de rédaction</b>Écris toujours X(Ω), la loi complète, puis le calcul de E et V. Le barème donne des points à chaque étape.</div>` }
  ],
  quiz: [
    { q: "Si A et B sont deux événements, que vaut <code>P(A ∪ B)</code> ?", o: ["P(A) + P(B)", "P(A) + P(B) − P(A ∩ B)", "P(A)·P(B)", "P(A) − P(B)"], a: 1, e: "On retire l'intersection, comptée deux fois dans la somme." },
    { q: "Combien de façons de choisir 2 boules parmi 8 sans tenir compte de l'ordre ?", o: ["16", "56", "28", "64"], a: 2, e: "C(8,2) = 8×7/2 = 28." },
    { q: "Quelle formule donne <code>P(A|B)</code> ?", o: ["P(A∩B)/P(A)", "P(A∩B)/P(B)", "P(A)P(B)", "P(B|A)"], a: 1, e: "On restreint l'univers à B : on divise par P(B)." },
    { q: "Deux événements incompatibles de probabilité non nulle sont…", o: ["Toujours indépendants", "Jamais indépendants", "Parfois indépendants", "Égaux"], a: 1, e: "P(A∩B) = 0 alors que P(A)P(B) > 0 : ils ne sont donc pas indépendants." },
    { q: "Quelle est l'espérance d'une loi binomiale B(n, p) ?", o: ["p", "np", "npq", "n/p"], a: 1, e: "E = np et V = npq avec q = 1−p." },
    { q: "Le rang du premier succès dans une suite d'essais indépendants suit une loi…", o: ["Binomiale", "Géométrique", "De Poisson", "Uniforme"], a: 1, e: "P(X=k) = q^(k−1)·p, d'espérance 1/p." },
    { q: "Pour une loi de Poisson de paramètre λ, que valent E(X) et V(X) ?", o: ["E=λ, V=λ²", "E=λ, V=λ", "E=1/λ, V=1/λ²", "E=V=1"], a: 1, e: "Pour Poisson, l'espérance et la variance sont égales à λ." },
    { q: "Quelle formule est correcte pour la variance ?", o: ["V(X) = E(X²) + E(X)²", "V(X) = E(X²) − E(X)²", "V(X) = E(X) − E(X²)", "V(X) = E((X)²)·E(X)"], a: 1, e: "Formule de Koenig-Huygens : V(X) = E(X²) − (E(X))²." },
    { q: "Si X et Y sont indépendantes, que vaut Cov(X, Y) ?", o: ["1", "0", "E(XY)", "V(X)V(Y)"], a: 1, e: "L'indépendance donne E(XY) = E(X)E(Y), donc la covariance est nulle. La réciproque est fausse." },
    { q: "Pour une v.a. à densité X, que vaut P(X = 3) ?", o: ["f(3)", "F(3)", "0", "1"], a: 2, e: "Pour une variable à densité, la probabilité d'un point est nulle." },
    { q: "Quelle est l'espérance d'une loi exponentielle de paramètre λ ?", o: ["λ", "1/λ", "λ²", "1/λ²"], a: 1, e: "E = 1/λ et V = 1/λ²." },
    { q: "Si X ~ N(m, σ²), quelle variable suit N(0,1) ?", o: ["X − m", "(X − m)/σ", "X/σ", "(X − m)/σ²"], a: 1, e: "On centre (−m) puis on réduit (÷σ) : c'est la variable centrée réduite." },
    { q: "Y et Z indépendantes, T = max(Y, Z). Que vaut <code>P(T ≤ k)</code> ?", o: ["P(Y ≤ k) + P(Z ≤ k)", "P(Y ≤ k)·P(Z ≤ k)", "1 − P(Y ≤ k)", "P(Y ≤ k) − P(Z ≤ k)"], a: 1, e: "[T ≤ k] = [Y ≤ k] ∩ [Z ≤ k], et l'indépendance donne le produit." }
  ],
  exercises: [
    { q: "Une urne contient 3 boules rouges et 2 noires. On tire 2 boules sans remise. Probabilité d'avoir 2 rouges ?", a: "Card(Ω) = C(5,2) = 10. Cas favorables : C(3,2) = 3. Donc <b>P = 3/10</b>." },
    { q: "On lance 4 fois une pièce équilibrée. Loi du nombre X de piles, espérance et variance.", a: "X ~ B(4, 1/2). P(X=k) = C(4,k)/16. E(X) = np = 2 ; V(X) = npq = 4×½×½ = 1." },
    { q: "Un appel est en retard avec probabilité 1/3, indépendamment. Loi du rang Y du premier retard et P(Y ≤ k).", a: "Y suit une loi géométrique de paramètre 1/3 : P(Y=k) = (2/3)^(k−1)·(1/3). P(Y ≤ k) = 1 − (2/3)^k. E(Y) = 3." },
    { q: "f(x) = 2x sur [0,1], 0 ailleurs. Vérifier que c'est une densité, calculer E(X) et F.", a: "∫₀¹ 2x dx = 1 donc c'est une densité. E(X) = ∫₀¹ 2x² dx = 2/3. F(x) = 0 si x &lt; 0 ; x² si 0 ≤ x ≤ 1 ; 1 si x &gt; 1." },
    { q: "T = max(Y, Z) avec Y et Z indépendantes de même loi géométrique(1/3). Loi de T.", a: "P(T ≤ k) = (1 − (2/3)^k)². Alors P(T = k) = P(T ≤ k) − P(T ≤ k−1)." }
  ],
  tips: [
    "Avant tout calcul, identifie la loi : binomiale (nombre de succès), géométrique (rang du 1er succès), Poisson (événements rares).",
    "Vérifie toujours que la somme des probabilités fait 1 (ou que l'intégrale de la densité fait 1).",
    "Les formules de Koenig (V = E(X²) − E(X)²) et de linéarité font gagner beaucoup de temps.",
    "Fais les annales en conditions d'examen (1h30, calculatrice non programmable) puis compare avec la correction de 2025/2026.",
    "Pour les lois normales : toujours centrer et réduire avant d'utiliser la table."
  ],
  terms: [
    { t: "Univers", d: "Ensemble Ω de toutes les issues possibles d'une expérience aléatoire." },
    { t: "Événement", d: "Partie de l'univers ; il est réalisé si l'issue lui appartient." },
    { t: "Équiprobabilité", d: "Toutes les issues ont la même probabilité : P(A) = cas favorables / cas possibles." },
    { t: "Probabilité conditionnelle", d: "P(A|B) = P(A∩B)/P(B), probabilité de A sachant que B est réalisé." },
    { t: "Formule de Bayes", d: "P(Bⱼ|A) = P(Bⱼ)P(A|Bⱼ)/P(A) : inverse un conditionnement." },
    { t: "Variable aléatoire discrète", d: "Application qui prend un nombre fini ou dénombrable de valeurs." },
    { t: "Espérance", d: "Moyenne pondérée des valeurs : E(X) = Σ xᵢ P(X=xᵢ)." },
    { t: "Variance", d: "Mesure de dispersion : V(X) = E(X²) − E(X)²." },
    { t: "Loi binomiale", d: "Nombre de succès en n essais indépendants de probabilité p ; E = np, V = npq." },
    { t: "Loi géométrique", d: "Rang du premier succès ; P(X=k) = q^(k−1)p ; E = 1/p." },
    { t: "Loi de Poisson", d: "Loi des événements rares de paramètre λ ; E = V = λ." },
    { t: "Loi conjointe", d: "Loi du couple (X,Y) : les probabilités P(X=x, Y=y)." },
    { t: "Covariance", d: "Cov(X,Y) = E(XY) − E(X)E(Y) ; nulle si X et Y sont indépendantes." },
    { t: "Densité", d: "Fonction f ≥ 0 d'intégrale 1 telle que P(a ≤ X ≤ b) = ∫ f sur [a,b]." },
    { t: "Fonction de répartition", d: "F(x) = P(X ≤ x), croissante, de limite 0 en −∞ et 1 en +∞." },
    { t: "Loi exponentielle", d: "Densité λe^(−λx) sur ℝ₊ ; sans mémoire ; E = 1/λ." },
    { t: "Loi normale", d: "Loi en cloche N(m,σ²) ; on se ramène à N(0,1) par Z = (X−m)/σ." }
  ]
});
