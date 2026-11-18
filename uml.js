S3.addModule({
  id: "uml", folder: "uml", short: "Modélisation UML", name: "Modélisation objet UML", icon: "🧩", color: "#14b8a6",
  prof: "Faculté des Sciences, Kénitra · Filière IA",
  summary: "Concepts objet, diagrammes de cas d'utilisation, de classes et de séquence, avec les TD/TP 2026 (bibliothèque, réservation, DAB).",
  docs: [
    { kind: "Cours", title: "0 — Introduction à la conception orientée objet", file: "0-CCO-IntroJ.pdf" },
    { kind: "Cours", title: "1 — Diagrammes de cas d'utilisation", file: "1-CasUtilisationJ.pdf" },
    { kind: "Cours", title: "3 — Classes et associations", file: "3-Classes-et-associationsJ.pdf" },
    { kind: "Cours", title: "6 — Diagrammes de séquence", file: "6-DiagrammesSequenceJ.pdf" },
    { kind: "TD/TP", title: "TD-TP 1 (2026) — Cas d'utilisation", file: "TD-TP-1-2026.pdf" },
    { kind: "TD/TP", title: "TD-TP 2 (2026) — Diagrammes de classes", file: "TD-TP-2-2026.pdf" }
  ],
  lessons: [
    { title: "Introduction à l'approche objet", pdf: ["0-CCO-IntroJ.pdf"], html: `
<div class="call"><b class="t">À retenir</b>UML (Unified Modeling Language) est un langage graphique standard pour spécifier, visualiser et documenter un système. Ce n'est pas une méthode : c'est une notation.</div>
<h3>Concepts objet</h3>
<ul>
<li><b>Objet</b> : entité avec identité, état (attributs) et comportement (opérations).</li>
<li><b>Classe</b> : modèle décrivant un ensemble d'objets de même structure.</li>
<li><b>Encapsulation</b> : l'état est caché, accessible par les opérations. <b>Héritage</b> : une sous-classe réutilise et spécialise une classe. <b>Polymorphisme</b> : une même opération, plusieurs comportements.</li>
</ul>
<h3>Les diagrammes à connaître</h3>
<table><tr><th>Vue</th><th>Diagramme</th><th>Rôle</th></tr>
<tr><td>Fonctionnelle</td><td>Cas d'utilisation</td><td>Ce que le système doit faire pour ses acteurs</td></tr>
<tr><td>Statique</td><td>Classes</td><td>Structure : classes, attributs, relations</td></tr>
<tr><td>Dynamique</td><td>Séquence</td><td>Messages échangés dans le temps</td></tr></table>` },
    { title: "Diagrammes de cas d'utilisation", pdf: ["1-CasUtilisationJ.pdf", "TD-TP-1-2026.pdf"], html: `
<h3>Éléments</h3>
<ul>
<li><b>Acteur</b> : entité externe (humain, système) qui interagit avec le système ; il est dessiné hors du rectangle du système.</li>
<li><b>Cas d'utilisation</b> : un service rendu à un acteur, nommé par un verbe à l'infinitif (« Réserver une salle »), dans une ellipse.</li>
<li><b>Association</b> : trait entre acteur et cas.</li>
</ul>
<h3>Relations entre cas</h3>
<table><tr><th>Relation</th><th>Sens</th><th>Exemple</th></tr>
<tr><td>&laquo;include&raquo;</td><td>Le cas de base utilise toujours l'autre</td><td>Retirer de l'argent → S'authentifier</td></tr>
<tr><td>&laquo;extend&raquo;</td><td>Comportement optionnel ajouté sous condition</td><td>Retirer → Imprimer un reçu</td></tr>
<tr><td>Généralisation</td><td>Un acteur ou un cas spécialise un autre</td><td>Étudiant et Enseignant héritent d'Utilisateur</td></tr></table>
<div class="call warn"><b class="t">Piège</b>La flèche de &laquo;include&raquo; va du cas de base vers le cas inclus ; celle de &laquo;extend&raquo; va du cas optionnel vers le cas de base.</div>
<p>TD-TP 1 : réservation de salle/matériel, magasin, distributeur de billets (DAB), gestion de stock. Méthode : identifie les acteurs, liste les cas par acteur, puis cherche ce qui est commun (include) et optionnel (extend).</p>` },
    { title: "Diagrammes de classes et associations", pdf: ["3-Classes-et-associationsJ.pdf", "TD-TP-2-2026.pdf"], html: `
<h3>Une classe</h3>
<p>Trois compartiments : <b>Nom</b> / <b>attributs</b> / <b>opérations</b>. Visibilité : <code>+</code> public, <code>-</code> privé, <code>#</code> protégé.</p>
<h3>Relations</h3>
<table><tr><th>Relation</th><th>Signification</th><th>Notation</th></tr>
<tr><td>Association</td><td>Lien entre classes</td><td>Trait simple</td></tr>
<tr><td>Agrégation</td><td>« A un », les parties vivent sans le tout</td><td>Losange vide</td></tr>
<tr><td>Composition</td><td>Les parties meurent avec le tout</td><td>Losange plein</td></tr>
<tr><td>Héritage</td><td>« Est un »</td><td>Flèche à triangle vide</td></tr>
<tr><td>Dépendance</td><td>Utilisation ponctuelle</td><td>Flèche pointillée</td></tr></table>
<h3>Multiplicités</h3>
<p><code>1</code> exactement un · <code>0..1</code> optionnel · <code>*</code> ou <code>0..*</code> zéro ou plusieurs · <code>1..*</code> au moins un.</p>
<div class="call"><b class="t">Exemple : bibliothèque</b>Un <i>Adhérent</i> emprunte 0..* <i>Livres</i> ; un <i>Livre</i> a plusieurs <i>Exemplaires</i> (composition) ; un exemplaire est emprunté par 0..1 adhérent à la fois. Quand l'association porte des données (date d'emprunt), utilise une <b>classe d'association</b> <i>Emprunt</i>.</div>
<p>TD-TP 2 : bibliothèque, collèges/académie, réservation de vols. Lis les phrases du texte : les noms deviennent des classes, les verbes des associations, les « chaque… plusieurs… » des multiplicités.</p>` },
    { title: "Diagrammes de séquence", pdf: ["6-DiagrammesSequenceJ.pdf"], html: `
<p>Un diagramme de séquence montre, dans l'ordre chronologique, les <b>messages</b> échangés entre objets pour réaliser un scénario.</p>
<h3>Éléments</h3>
<ul>
<li><b>Ligne de vie</b> : trait vertical pointillé sous chaque participant ; le temps s'écoule de haut en bas.</li>
<li><b>Message synchrone</b> : flèche pleine (l'émetteur attend). <b>Asynchrone</b> : flèche ouverte. <b>Retour</b> : flèche pointillée.</li>
<li><b>Barre d'activation</b> : rectangle sur la ligne de vie pendant l'exécution.</li>
<li><b>Fragments combinés</b> : <code>alt</code> (choix si/sinon), <code>opt</code> (optionnel), <code>loop</code> (boucle).</li>
</ul>
<div class="call"><b class="t">Exemple DAB</b>Client → DAB : insérerCarte() ; DAB → Banque : vérifierCode(pin) ; fragment <code>alt</code> [code valide] : afficherMenu() / [sinon] : refuserCarte().</div>` }
  ],
  quiz: [
    { q: "UML est…", o: ["Une méthode de développement", "Un langage de modélisation graphique", "Un langage de programmation", "Un SGBD"], a: 1, e: "UML est une notation standard, pas une méthode." },
    { q: "Qu'est-ce qu'un acteur dans un diagramme de cas d'utilisation ?", o: ["Une classe interne", "Une entité externe qui interagit avec le système", "Une base de données", "Une méthode"], a: 1, e: "Il se situe hors du système." },
    { q: "Retirer de l'argent nécessite toujours de s'authentifier : quelle relation ?", o: ["extend", "include", "héritage", "dépendance"], a: 1, e: "Le comportement est obligatoire : &laquo;include&raquo;." },
    { q: "Imprimer un reçu (optionnel) lors d'un retrait : quelle relation ?", o: ["include", "extend", "composition", "agrégation"], a: 1, e: "Comportement optionnel ajouté sous condition : &laquo;extend&raquo;." },
    { q: "Quelle visibilité note-t-on par « - » ?", o: ["Public", "Privé", "Protégé", "Package"], a: 1, e: "+ public, - privé, # protégé." },
    { q: "Quelle relation indique que les parties disparaissent avec le tout ?", o: ["Agrégation", "Composition", "Association simple", "Dépendance"], a: 1, e: "Composition : losange plein." },
    { q: "Que signifie la multiplicité 0..* ?", o: ["Exactement un", "Zéro ou plusieurs", "Au moins un", "Zéro ou un"], a: 1, e: "L'astérisque désigne un nombre quelconque." },
    { q: "La relation d'héritage se lit…", o: ["« a un »", "« est un »", "« utilise »", "« contient »"], a: 1, e: "Un étudiant est un utilisateur." },
    { q: "Dans un diagramme de séquence, le temps s'écoule…", o: ["De gauche à droite", "De haut en bas", "De bas en haut", "Sans ordre"], a: 1, e: "Les lignes de vie sont verticales." },
    { q: "Quel fragment combiné représente un choix si/sinon ?", o: ["loop", "opt", "alt", "par"], a: 2, e: "alt = alternatives ; opt = un seul cas optionnel ; loop = répétition." },
    { q: "Quand utilise-t-on une classe d'association ?", o: ["Quand le lien porte ses propres attributs", "Pour l'héritage", "Pour un acteur", "Jamais"], a: 0, e: "Exemple : Emprunt(dateEmprunt, dateRetour) entre Adhérent et Livre." }
  ],
  exercises: [
    { q: "Cas d'utilisation : réservation de salle. Identifier acteurs et cas.", a: "Acteurs : Utilisateur, Responsable/Administrateur. Cas : Consulter disponibilités, Réserver une salle (include S'authentifier), Annuler une réservation, Valider ou refuser (Responsable), Gérer les salles (Administrateur)." },
    { q: "Diagramme de classes : bibliothèque (adhérents, livres, emprunts).", a: "Classes : Adhérent(nom, id), Livre(titre, isbn), Emprunt(dateEmprunt, dateRetour). Adhérent 1 — 0..* Emprunt ; Emprunt 0..* — 1 Livre (ou classe d'association Emprunt entre Adhérent et Livre)." },
    { q: "Séquence : retrait au DAB (carte valide).", a: "Client → DAB : insérerCarte ; DAB → Client : demanderCode ; Client → DAB : saisirCode ; DAB → Banque : vérifier ; Banque → DAB : ok ; Client → DAB : choisirMontant ; DAB → Banque : débiter ; DAB → Client : délivrerBillets ; DAB → Client : éjecterCarte." }
  ],
  tips: [
    "Pour un diagramme de classes : souligne les noms (classes), les verbes (associations), les nombres (multiplicités).",
    "Les cas d'utilisation décrivent le « quoi », jamais le « comment » (pas de détails techniques).",
    "N'abuse pas de include/extend : ils servent à factoriser ou à rendre optionnel, pas à découper.",
    "Installe Enterprise Architect avec les liens du dossier (.docx) pour les TP.",
    "Vérifie la cohérence : chaque message d'un séquence doit correspondre à une opération d'une classe."
  ],
  terms: [
    { t: "UML", d: "Langage de modélisation unifié, notation graphique standard." },
    { t: "Objet", d: "Instance d'une classe, avec identité, état et comportement." },
    { t: "Classe", d: "Modèle d'objets partageant attributs et opérations." },
    { t: "Encapsulation", d: "Masquage de l'état interne derrière des opérations." },
    { t: "Acteur", d: "Entité externe qui interagit avec le système." },
    { t: "Cas d'utilisation", d: "Service fonctionnel rendu à un acteur." },
    { t: "include / extend", d: "Inclusion obligatoire / extension optionnelle d'un cas." },
    { t: "Multiplicité", d: "Nombre d'instances qui peuvent participer à une association." },
    { t: "Agrégation / Composition", d: "Relations tout-parties, faible / forte (cycle de vie lié)." },
    { t: "Ligne de vie", d: "Axe vertical d'un participant dans un diagramme de séquence." },
    { t: "Fragment combiné", d: "Bloc alt, opt ou loop qui structure un séquence." }
  ]
});
