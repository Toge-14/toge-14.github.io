S3.addModule({
  id: "web2", folder: "web2", short: "Programmation Web 2", name: "Programmation Web 2 (PHP)", icon: "🌐", color: "#6366f1",
  prof: "Faculté des Sciences, Kénitra · Filière IA",
  summary: "Web dynamique, XAMPP, bases de PHP, structures de contrôle, tableaux et fonctions, formulaires et fichiers, sessions et cookies.",
  docs: [
    { kind: "Cours", title: "Chapitre 1 — Introduction au Web dynamique", file: "Chapitre1_Introduction_au_Web_dynamique.pdf" },
    { kind: "Cours", title: "Chapitre 2 — Les bases du langage PHP", file: "Chapitre2_Les_Base_du_langage_PHP.pdf" },
    { kind: "Cours", title: "Chapitre 3 — Les structures de contrôle", file: "Chapitre3_Les_structures_de_controle_en_PHP.pdf" },
    { kind: "Cours", title: "Chapitre 4 — Tableaux et fonctions", file: "Chapitre4_Les_tableaux_et_fonctions_en_PHP.pdf" },
    { kind: "Cours", title: "Chapitre 5 — Formulaires et fichiers", file: "Chapitre5_formulaires_et_fichiers_en_PHP.pdf" },
    { kind: "Cours", title: "Chapitre 6 — Sessions et cookies", file: "Chapitre6_Gestion_Sessions_et_Cookies.pdf" },
    { kind: "TD/TP", title: "Série 1 — Premiers pas en PHP", file: "S-rie_1.pdf" },
    { kind: "Corrigé", title: "Série 1 — Solution", file: "S-rie_1_solution.pdf" },
    { kind: "TD/TP", title: "Série 2 — Variables, types, opérateurs, conditions", file: "Serie2.pdf" },
    { kind: "Corrigé", title: "Série 2 — Solution", file: "Serie2_solution.pdf" },
    { kind: "Livre", title: "Livre PHP 8 (gros fichier)", file: "Livre_PHP-8.pdf" },
    { kind: "TD", title: "Série 3 — Solution (contrôle, tableaux, fonctions)", file: "Serie3_solution.pdf" },
    { kind: "TD", title: "Série 4 — Formulaires, fichiers, sessions, MySQL (PDO)", file: "Serie4.pdf" }
  ],
  lessons: [
    { title: "Web dynamique et environnement XAMPP", pdf: ["Chapitre1_Introduction_au_Web_dynamique.pdf", "S-rie_1.pdf"], html: `
<div class="call"><b class="t">À retenir</b>Une page <b>statique</b> (HTML) est servie telle quelle. Une page <b>dynamique</b> est générée par un script exécuté <b>côté serveur</b> ; le navigateur ne reçoit que du HTML.</div>
<h3>Cycle d'une requête</h3>
<ol>
<li>Le navigateur envoie une requête HTTP (<code>GET</code>/<code>POST</code>) au serveur Web.</li>
<li>Apache trouve le fichier ; si c'est un script PHP, il le passe à l'interpréteur.</li>
<li>PHP exécute le code (accès à MySQL si besoin) et produit du HTML.</li>
<li>Apache renvoie ce HTML au client.</li>
</ol>
<h3>XAMPP</h3>
<p>Distribution gratuite qui regroupe <b>Apache</b>, <b>MariaDB/MySQL</b>, <b>PHP</b> et <b>Perl</b>. Place tes scripts dans <code>htdocs</code> et ouvre <code>http://localhost/mon_script.php</code>. On peut aussi exécuter un script en ligne de commande : <code>php script.php</code>.</p>` },
    { title: "Bases du langage PHP", pdf: ["Chapitre2_Les_Base_du_langage_PHP.pdf", "Serie2.pdf", "Serie2_solution.pdf"], html: `
<h3>Syntaxe</h3>
<pre><code>&lt;?php
$nom = "Anas";          // variable, commence par $
const PI = 3.14;        // constante
echo "Bonjour $nom";    // guillemets doubles : interpolation
echo 'Bonjour $nom';    // guillemets simples : texte brut
?&gt;</code></pre>
<h3>Types</h3>
<table><tr><th>Type</th><th>Exemple</th></tr>
<tr><td>int</td><td><code>42</code></td></tr>
<tr><td>float</td><td><code>3.14</code></td></tr>
<tr><td>string</td><td><code>"texte"</code></td></tr>
<tr><td>bool</td><td><code>true</code>, <code>false</code></td></tr>
<tr><td>array</td><td><code>[1, 2, 3]</code></td></tr>
<tr><td>null</td><td><code>null</code></td></tr></table>
<p>PHP est à <b>typage dynamique</b> : <code>gettype($x)</code> et <code>var_dump($x)</code> donnent le type.</p>
<h3>Opérateurs</h3>
<ul>
<li>Arithmétiques : <code>+ - * / % **</code> ; concaténation : <code>.</code> (point, pas +).</li>
<li>Comparaison : <code>==</code> (valeur) et <code>===</code> (valeur et type) ; <code>!=</code>, <code>!==</code>, <code>&lt;=&gt;</code>.</li>
<li>Logiques : <code>&amp;&amp;</code>, <code>||</code>, <code>!</code>.</li>
</ul>
<div class="call warn"><b class="t">Piège</b><code>"5" == 5</code> est vrai mais <code>"5" === 5</code> est faux. Préfère <code>===</code>.</div>` },
    { title: "Structures de contrôle", pdf: ["Chapitre3_Les_structures_de_controle_en_PHP.pdf", "Serie2.pdf"], html: `
<pre><code>if ($note &gt;= 10) {
    echo "Admis";
} elseif ($note &gt;= 8) {
    echo "Rattrapage";
} else {
    echo "Ajourné";
}

switch ($jour) {
    case 1: echo "Lundi"; break;
    default: echo "Autre";
}

for ($i = 1; $i &lt;= 5; $i++) { echo $i; }
while ($i &gt; 0) { $i--; }
do { $i++; } while ($i &lt; 3);
foreach ($tab as $cle =&gt; $val) { echo "$cle = $val"; }</code></pre>
<p><code>break</code> quitte la boucle, <code>continue</code> passe à l'itération suivante. L'opérateur ternaire : <code>$r = ($a &gt; $b) ? $a : $b;</code>.</p>` },
    { title: "Tableaux et fonctions", pdf: ["Chapitre4_Les_tableaux_et_fonctions_en_PHP.pdf"], html: `
<h3>Tableaux</h3>
<pre><code>$notes = [12, 15, 9];                       // indexé
$etu   = ["nom" =&gt; "Ali", "age" =&gt; 20];     // associatif
$notes[] = 17;                               // ajout
echo count($notes);                          // taille</code></pre>
<table><tr><th>Fonction</th><th>Rôle</th></tr>
<tr><td><code>count</code></td><td>Nombre d'éléments</td></tr>
<tr><td><code>sort</code>, <code>rsort</code>, <code>asort</code>, <code>ksort</code></td><td>Tris (valeurs, ordre inverse, par valeur, par clé)</td></tr>
<tr><td><code>in_array</code>, <code>array_key_exists</code></td><td>Recherche</td></tr>
<tr><td><code>array_push</code>, <code>array_pop</code></td><td>Ajouter/retirer en fin</td></tr>
<tr><td><code>array_sum</code>, <code>array_merge</code></td><td>Somme, fusion</td></tr></table>
<h3>Fonctions</h3>
<pre><code>function aire(float $l, float $h = 1): float {
    return $l * $h;
}
echo aire(3, 4);   // 12</code></pre>
<p>Portée : une variable déclarée hors fonction n'est pas visible dedans, sauf avec <code>global</code>. Passage par valeur par défaut ; par référence avec <code>&amp;$x</code>.</p>` },
    { title: "Formulaires et fichiers", pdf: ["Chapitre5_formulaires_et_fichiers_en_PHP.pdf"], html: `
<h3>Récupérer un formulaire</h3>
<pre><code>&lt;form method="post" action="traite.php"&gt;
  &lt;input type="text" name="nom"&gt;
  &lt;input type="submit"&gt;
&lt;/form&gt;

// traite.php
$nom = htmlspecialchars($_POST["nom"] ?? "");
echo "Bonjour $nom";</code></pre>
<table><tr><th>Superglobale</th><th>Contenu</th></tr>
<tr><td><code>$_GET</code></td><td>Paramètres de l'URL (visibles)</td></tr>
<tr><td><code>$_POST</code></td><td>Données du formulaire (corps de la requête)</td></tr>
<tr><td><code>$_FILES</code></td><td>Fichiers envoyés</td></tr>
<tr><td><code>$_SERVER</code></td><td>Infos serveur/requête</td></tr></table>
<div class="call warn"><b class="t">Sécurité</b>Ne fais jamais confiance aux données utilisateur : valide avec <code>isset</code>/<code>empty</code> et échappe avec <code>htmlspecialchars()</code> avant d'afficher (protège contre XSS).</div>
<h3>Fichiers</h3>
<p><code>fopen($f, "r|w|a")</code>, <code>fgets</code>, <code>fwrite</code>, <code>fclose</code> ; ou en bref <code>file_get_contents</code> et <code>file_put_contents</code>. Upload : <code>move_uploaded_file($_FILES["f"]["tmp_name"], $dest)</code>.</p>` },
    { title: "Sessions et cookies", pdf: ["Chapitre6_Gestion_Sessions_et_Cookies.pdf"], html: `
<p>HTTP est <b>sans état</b> : le serveur oublie le visiteur entre deux requêtes. Cookies et sessions permettent de se souvenir de lui.</p>
<table><tr><th></th><th>Cookie</th><th>Session</th></tr>
<tr><td>Stockage</td><td>Navigateur du client</td><td>Serveur (le client n'a que l'identifiant PHPSESSID)</td></tr>
<tr><td>Sécurité</td><td>Modifiable par l'utilisateur</td><td>Plus sûr</td></tr>
<tr><td>Création</td><td><code>setcookie("nom","val",time()+3600)</code></td><td><code>session_start()</code></td></tr>
<tr><td>Lecture</td><td><code>$_COOKIE["nom"]</code></td><td><code>$_SESSION["cle"]</code></td></tr></table>
<pre><code>&lt;?php
session_start();            // AVANT tout affichage
$_SESSION["user"] = "Ali";
// ... autre page :
echo $_SESSION["user"];
session_destroy();          // déconnexion</code></pre>
<div class="call warn"><b class="t">Piège</b><code>session_start()</code> et <code>setcookie()</code> doivent être appelés <b>avant</b> toute sortie HTML ou echo, sinon : « headers already sent ».</div>` },
    { title: "Série 4 : fichiers, sessions et MySQL avec PDO", pdf: ["Serie4.pdf", "Serie3_solution.pdf"], html: `
<div class="call"><b class="t">Au programme de la Série 4</b>Ex. 1 : formulaire qui enregistre des étudiants dans un fichier. Ex. 2 : authentification avec sessions. Ex. 3 : CRUD sur une table MySQL avec PDO.</div>
<h3>Ex. 1 — Formulaire et fichier texte</h3>
<pre><code>&lt;?php
if (isset($_POST['enregistrer'])) {
    $nom = trim($_POST['nom'] ?? '');
    $cne = trim($_POST['cne'] ?? '');
    if ($nom === '' || $cne === '') {
        echo "Champs obligatoires manquants";
    } else {
        $f = fopen('etudiants.txt', 'a');          // 'a' = mode ajout
        fwrite($f, $nom . ';' . $cne . PHP_EOL);   // un étudiant par ligne
        fclose($f);
        echo "Étudiant enregistré";
    }
}
?&gt;</code></pre>
<ul>
<li>Mode <b>'a'</b> : ajoute à la fin sans effacer ; <b>'w'</b> : écrase ; <b>'r'</b> : lecture.</li>
<li>Le bouton « Réinitialiser » est un simple <code>&lt;input type="reset"&gt;</code> côté HTML.</li>
</ul>
<h3>Ex. 2 — Sessions : login, page protégée, déconnexion</h3>
<pre><code>// login.php
session_start();
if ($_POST['login'] === 'user' &amp;&amp; $_POST['mdp'] === '1234') {
    $_SESSION['connecte'] = true;
    header('Location: session.php'); exit;
}

// session.php (page protégée)
session_start();
if (empty($_SESSION['connecte'])) { header('Location: login.php'); exit; }

// deconnexion.php
session_start();
session_destroy();
header('Location: login.php'); exit;</code></pre>
<p>Toujours appeler <b>session_start()</b> avant toute sortie HTML, et <b>exit</b> après <code>header()</code>.</p>
<h3>Ex. 3 — CRUD avec PDO</h3>
<pre><code>-- SQL (phpMyAdmin)
CREATE DATABASE mydbExercice3;
CREATE TABLE etudiant (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(100),
  email VARCHAR(100)
);

// db.php
$pdo = new PDO('mysql:host=localhost;dbname=mydbExercice3;charset=utf8mb4',
               'root', '', [PDO::ATTR_ERRMODE =&gt; PDO::ERRMODE_EXCEPTION]);

// create.php
$st = $pdo-&gt;prepare('INSERT INTO etudiant (nom, email) VALUES (?, ?)');
$st-&gt;execute([$_POST['nom'], $_POST['email']]);

// index.php  (Read)
$liste = $pdo-&gt;query('SELECT * FROM etudiant')-&gt;fetchAll(PDO::FETCH_ASSOC);

// edit.php   (Update)
$st = $pdo-&gt;prepare('UPDATE etudiant SET nom = ?, email = ? WHERE id = ?');
$st-&gt;execute([$nom, $email, $id]);

// delete.php (Delete)
$st = $pdo-&gt;prepare('DELETE FROM etudiant WHERE id = ?');
$st-&gt;execute([$id]);</code></pre>
<ul>
<li>Les <b>requêtes préparées</b> (<code>?</code> ou <code>:nom</code>) protègent contre l'injection SQL.</li>
<li>Structure de l'application : <b>db.php</b> (connexion), <b>header.php</b> (menu Accueil / Créer), <b>index.php</b> (liste), <b>create.php</b>, <b>edit.php</b>, <b>delete.php</b> (avec confirmation).</li>
</ul>
<h3>Rappel Série 3 (solutions)</h3>
<p>Factorielle avec une boucle <code>for</code> ; convertisseur DH ↔ Euro avec des fonctions et trois boutons (<code>name="action"</code> avec une valeur par bouton) ; surface du cercle avec <code>$_GET</code> ; moyennes d'étudiants avec <code>foreach</code>, <code>array_sum</code>, <code>count</code> et tri avec <code>arsort</code>.</p>` }
  ],
  quiz: [
    { q: "Où s'exécute un script PHP ?", o: ["Dans le navigateur", "Sur le serveur", "Dans la base de données", "Sur le DNS"], a: 1, e: "PHP s'exécute côté serveur ; le client reçoit du HTML." },
    { q: "Que signifie le « X » de XAMPP ?", o: ["XML", "Multiplateforme", "XSS", "Extension"], a: 1, e: "X = cross-platform, puis Apache, MariaDB, PHP, Perl." },
    { q: "Comment déclare-t-on une variable en PHP ?", o: ["var x", "$x", "let x", "@x"], a: 1, e: "Toute variable commence par $." },
    { q: "Quel opérateur concatène deux chaînes ?", o: ["+", ".", "&", "||"], a: 1, e: "En PHP la concaténation est le point." },
    { q: "Que vaut <code>\"5\" === 5</code> ?", o: ["true", "false", "Erreur", "null"], a: 1, e: "=== compare aussi le type : string ≠ int." },
    { q: "Quelle différence entre guillemets simples et doubles ?", o: ["Aucune", "Les doubles interprètent les variables", "Les simples interprètent les variables", "Les simples sont interdits"], a: 1, e: "\"Bonjour $nom\" remplace $nom ; 'Bonjour $nom' reste littéral." },
    { q: "Quelle boucle parcourt un tableau associatif clé/valeur ?", o: ["for", "while", "foreach ($t as $k => $v)", "do…while"], a: 2, e: "foreach est fait pour les tableaux." },
    { q: "Quelle fonction donne le nombre d'éléments d'un tableau ?", o: ["length()", "size()", "count()", "len()"], a: 2, e: "count($tab)." },
    { q: "Quelle superglobale contient les données d'un formulaire en POST ?", o: ["$_GET", "$_POST", "$_REQUESTS", "$_FORM"], a: 1, e: "$_POST ; $_GET pour les paramètres d'URL." },
    { q: "Quelle fonction protège l'affichage contre les injections HTML/XSS ?", o: ["strip()", "htmlspecialchars()", "trim()", "addslashes()"], a: 1, e: "Elle convertit &lt; &gt; &amp; \" en entités HTML." },
    { q: "Où est stockée une session PHP ?", o: ["Dans le cookie entièrement", "Sur le serveur (identifiant dans un cookie)", "Dans le HTML", "Dans le DNS"], a: 1, e: "Seul l'identifiant PHPSESSID est côté client." },
    { q: "Quand appeler <code>session_start()</code> ?", o: ["N'importe quand", "Avant toute sortie HTML", "À la fin du script", "Seulement en HTML"], a: 1, e: "Sinon : erreur « headers already sent »." },
    { q: "Quelle fonction crée un cookie ?", o: ["makecookie()", "setcookie()", "cookie()", "session_cookie()"], a: 1, e: "setcookie(nom, valeur, expiration)." },
    { q: "Quel mode de fopen ajoute des données à la fin d'un fichier sans l'effacer ?", o: ["'r'", "'w'", "'a'", "'x'"], a: 2, e: "'a' (append) écrit à la fin ; 'w' écrase le contenu existant." },
    { q: "Que faut-il appeler avant d'utiliser $_SESSION ?", o: ["session_open()", "session_start()", "start_session()", "header()"], a: 1, e: "session_start() doit être appelé avant toute sortie HTML." },
    { q: "Pourquoi utiliser des requêtes préparées avec PDO ?", o: ["Pour aller plus vite uniquement", "Pour se protéger de l'injection SQL", "Pour éviter d'ouvrir MySQL", "Pour chiffrer la base"], a: 1, e: "Les valeurs sont transmises séparément de la requête, donc non interprétées comme du SQL." },
    { q: "Que signifie CRUD ?", o: ["Create, Read, Update, Delete", "Copy, Run, Undo, Delete", "Connect, Read, Use, Disconnect", "Create, Reset, Update, Drop"], a: 0, e: "Les quatre opérations de base sur les données : créer, lire, modifier, supprimer." }
  ],
  exercises: [
    { q: "Déclarer quatre variables de types différents et afficher leur type.", a: "<pre><code>$a = 10; $b = 3.5; $c = \"PHP\"; $d = true;\nvar_dump($a, $b, $c, $d);\necho gettype($a);</code></pre>" },
    { q: "Afficher « Admis » si la moyenne ≥ 10, sinon « Ajourné ».", a: "<pre><code>$m = 12.5;\necho ($m >= 10) ? \"Admis\" : \"Ajourné\";</code></pre>" },
    { q: "Calculer la moyenne d'un tableau de notes.", a: "<pre><code>$n = [12, 15, 9];\necho array_sum($n) / count($n);</code></pre>" },
    { q: "Formulaire avec nom et affichage sécurisé.", a: "Formulaire <code>method=\"post\"</code> avec <code>name=\"nom\"</code>, puis <code>echo htmlspecialchars($_POST[\"nom\"]);</code> après vérification <code>isset($_POST[\"nom\"])</code>." },
    { q: "Série 4, ex. 2 : comment empêcher l'accès direct à session.php sans authentification ?", a: "Au début de session.php : session_start(); if (empty($_SESSION['connecte'])) { header('Location: login.php'); exit; }. Le login.php crée $_SESSION['connecte'] = true si user / 1234 sont corrects, et deconnexion.php appelle session_destroy() puis redirige vers login.php." },
    { q: "Série 4, ex. 3 : quelle requête SQL crée la table etudiant (id, nom, email) ?", a: "CREATE TABLE etudiant (id INT AUTO_INCREMENT PRIMARY KEY, nom VARCHAR(100), email VARCHAR(100)); dans la base mydbExercice3 (CREATE DATABASE mydbExercice3;)." }
  ],
  tips: [
    "Installe XAMPP et teste chaque exemple : PHP s'apprend en exécutant.",
    "Mets tes fichiers dans htdocs et ouvre-les via http://localhost, pas en double-cliquant.",
    "Utilise === par défaut et htmlspecialchars() sur toute donnée affichée.",
    "Les séries 1 et 2 ont leurs corrigés dans l'onglet PDF : essaie avant de regarder.",
    "Le Livre PHP 8 est un gros fichier (environ 58 Mo) : sers-t'en comme référence, pas comme lecture linéaire."
  ],
  terms: [
    { t: "Web dynamique", d: "Pages générées à la demande par un script serveur." },
    { t: "Apache", d: "Serveur Web qui reçoit les requêtes HTTP." },
    { t: "XAMPP", d: "Distribution Apache + MariaDB + PHP + Perl." },
    { t: "Typage dynamique", d: "Le type d'une variable est déterminé par sa valeur." },
    { t: "Superglobale", d: "Variable accessible partout ($_GET, $_POST, $_SESSION…)." },
    { t: "Tableau associatif", d: "Tableau dont les indices sont des clés textuelles." },
    { t: "GET / POST", d: "Méthodes HTTP d'envoi de données : dans l'URL / dans le corps." },
    { t: "XSS", d: "Injection de script via des données non échappées." },
    { t: "Cookie", d: "Petite donnée stockée par le navigateur." },
    { t: "Session", d: "Données conservées côté serveur pour un visiteur." },
    { t: "PDO", d: "Interface PHP pour accéder à une base de données (MySQL, etc.) avec des requêtes préparées." },
    { t: "CRUD", d: "Create, Read, Update, Delete : les quatre opérations de base sur une table." },
    { t: "Requête préparée", d: "Requête avec paramètres (? ou :nom), exécutée avec prepare() puis execute() ; protège de l'injection SQL." }
  ]
});
