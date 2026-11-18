window.S3DEEP = window.S3DEEP || {};
window.S3DEEP["uml"] = [
{ html: `
<h3>Pourquoi modéliser avant de coder ?</h3>
<p>Un modèle est une <b>maquette</b> du logiciel : on se met d'accord (équipe, client) sur ce qu'on construit avant d'écrire du code. Une erreur corrigée sur un schéma coûte beaucoup moins cher qu'une erreur corrigée dans un programme fini.</p>
<h3>Les concepts objet avec un exemple</h3>
<p>Prenons un étudiant. La <b>classe</b> <code>Etudiant</code> est le plan ; <code>ali</code> et <code>sara</code> sont deux <b>objets</b> (instances) construits d'après ce plan.</p>
<pre><code>Etudiant
- nom : String        // attribut (état), privé : encapsulation
- moyenne : double
+ getMoyenne() : double   // opération (comportement), publique
+ sInscrire(cours)</code></pre>
<ul>
<li><b>Encapsulation</b> : <code>moyenne</code> est privée ; on la lit via <code>getMoyenne()</code>. On protège ainsi les données.</li>
<li><b>Héritage</b> : <code>Doctorant</code> hérite d'<code>Etudiant</code> et ajoute <code>sujetThese</code>.</li>
<li><b>Polymorphisme</b> : <code>calculerBourse()</code> peut se comporter différemment pour un Etudiant et un Doctorant.</li>
</ul>
<h3>Même idée en code (Java)</h3>
<pre><code>class Etudiant {
    private String nom;
    public String getNom() { return nom; }
}
class Doctorant extends Etudiant {   // héritage
    private String sujetThese;
}</code></pre>
<div class="call"><b class="t">Retenir</b>Classe = modèle, objet = exemplaire. UML dessine ces classes ; le code les réalise.</div>`,
  videos: [{ t: "Introduction à UML (en français)", q: "introduction UML modélisation objet cours français" }, { t: "Programmation orientée objet : classe, objet, héritage", q: "POO classe objet héritage encapsulation explication" }] },

{ html: `
<h3>Lire un diagramme de cas d'utilisation</h3>
<p>Il répond à une seule question : <b>« qui fait quoi avec le système ? »</b>. On ne montre ni écrans ni code, seulement les services.</p>
<h3>Exemple pas à pas : distributeur (DAB)</h3>
<pre><code>Acteurs : Client, Banque (système externe)

Cas d'utilisation :
  Retirer de l'argent       (Client)
  Consulter le solde        (Client)
  S'authentifier            (inclus par les deux cas ci-dessus)
  Imprimer un reçu          (extension optionnelle du retrait)</code></pre>
<p>Dessin mental : le Client est à gauche, relié par des traits aux ellipses « Retirer » et « Consulter ». Ces deux ellipses ont une flèche pointillée <code>&laquo;include&raquo;</code> vers « S'authentifier ». « Imprimer un reçu » a une flèche <code>&laquo;extend&raquo;</code> vers « Retirer ».</p>
<h3>Include ou extend ? Le test simple</h3>
<ul>
<li>Peut-on faire le cas <b>sans</b> l'autre ? Non → <code>include</code> (obligatoire, et commun à plusieurs cas).</li>
<li>L'autre cas arrive-t-il seulement <b>parfois</b> ? Oui → <code>extend</code> (optionnel).</li>
</ul>
<h3>Méthode pour un exercice</h3>
<ol>
<li>Souligne les <b>acteurs</b> dans l'énoncé (personnes, systèmes externes).</li>
<li>Pour chaque acteur, liste ce qu'il veut faire : un verbe + un complément.</li>
<li>Repère les étapes répétées (→ include) et les options (→ extend).</li>
<li>Dessine le rectangle du système, place les acteurs dehors et les ellipses dedans.</li>
</ol>`,
  videos: [{ t: "Diagramme de cas d'utilisation expliqué", q: "diagramme de cas d'utilisation UML include extend exemple" }, { t: "Cas d'utilisation : exercice corrigé", q: "UML cas d'utilisation exercice corrigé distributeur" }] },

{ html: `
<h3>Du texte au diagramme de classes</h3>
<p>Énoncé : « Un adhérent peut emprunter plusieurs livres. Un livre est emprunté par au plus un adhérent à la fois. »</p>
<ol>
<li><b>Noms</b> → classes : <code>Adhérent</code>, <code>Livre</code>.</li>
<li><b>Verbe</b> → association : « emprunte ».</li>
<li><b>Quantités</b> → multiplicités : un adhérent a <code>0..*</code> livres ; un livre a <code>0..1</code> adhérent.</li>
</ol>
<pre><code>+-----------+ 0..1      emprunte      0..* +--------+
| Adhérent  |------------------------------| Livre  |
+-----------+                              +--------+</code></pre>
<p>Lecture : à côté de <i>Adhérent</i>, <code>0..1</code> répond à « combien d'adhérents pour un livre ? » ; à côté de <i>Livre</i>, <code>0..*</code> répond à « combien de livres pour un adhérent ? ». On lit la multiplicité du côté <b>opposé</b>.</p>
<h3>Correspondance avec le code Java</h3>
<pre><code>class Adherent {
    private String nom;
    private List&lt;Livre&gt; livres = new ArrayList&lt;&gt;();  // 0..*
}
class Livre {
    private String titre;
    private Adherent emprunteur;                     // 0..1
}</code></pre>
<h3>Agrégation, composition ou association ?</h3>
<ul>
<li>Une <b>Université</b> et ses <b>Départements</b> : si l'université disparaît, les départements disparaissent → composition (losange plein).</li>
<li>Une <b>Équipe</b> et ses <b>Joueurs</b> : un joueur existe sans l'équipe → agrégation (losange vide).</li>
<li>Doute ? Prends l'association simple, plus sûre.</li>
</ul>`,
  videos: [{ t: "Diagramme de classes UML pour débutants", q: "diagramme de classes UML tutoriel débutant association multiplicité" }, { t: "Agrégation vs composition", q: "UML agrégation composition différence explication" }] },

{ html: `
<h3>Lire un diagramme de séquence</h3>
<p>Les participants sont en haut, côte à côte. Chacun a une ligne verticale (sa « ligne de vie »). Les flèches horizontales, de haut en bas, sont les messages dans l'ordre où ils se produisent.</p>
<h3>Exemple : connexion à un site</h3>
<pre><code>Utilisateur        Interface         Serveur          BaseDeDonnées
    |--saisir(login,mdp)-->|               |                 |
    |                     |--verifier()--->|                 |
    |                     |                |--requete(user)->|
    |                     |                |<--resultat------|
    |                     |<--ok/echec-----|                 |
    |<--afficher page-----|                |                 |</code></pre>
<p>Chaque flèche correspond à une <b>opération</b> de la classe qui la reçoit. Si <code>Serveur</code> reçoit <code>verifier()</code>, la classe <code>Serveur</code> doit avoir cette méthode dans le diagramme de classes.</p>
<h3>Le fragment alt (si / sinon)</h3>
<pre><code>alt [mot de passe correct]
    Serveur --> Interface : ok
    Interface --> Utilisateur : afficherAccueil()
else [incorrect]
    Serveur --> Interface : echec
    Interface --> Utilisateur : afficherErreur()</code></pre>
<p>C'est l'équivalent graphique d'un <code>if … else</code> dans le code.</p>
<div class="call"><b class="t">Astuce</b>Écris d'abord le scénario en phrases numérotées (1. l'utilisateur saisit…, 2. l'interface vérifie…), puis transforme chaque phrase en flèche.</div>`,
  videos: [{ t: "Diagramme de séquence UML expliqué", q: "diagramme de séquence UML tutoriel exemple fragment alt loop" }] }
];

window.S3DEEP["se"] = [
{ html: `
<h3>Les couches expliquées simplement</h3>
<p>Imagine un restaurant : le client (<b>toi</b>) parle au serveur (le <b>shell</b>), qui transmet la commande à la cuisine (le <b>noyau</b>), qui utilise le matériel (four, frigo = <b>disque, mémoire, processeur</b>). Tu ne vas jamais directement en cuisine.</p>
<h3>Ce que fait le noyau</h3>
<ul>
<li><b>Processus</b> : décide quel programme utilise le processeur et pendant combien de temps.</li>
<li><b>Mémoire</b> : donne à chaque programme sa zone et empêche les interférences.</li>
<li><b>Fichiers</b> : lit et écrit sur le disque.</li>
<li><b>Périphériques</b> : clavier, écran, disque, via des pilotes.</li>
</ul>
<h3>L'arborescence : se déplacer</h3>
<pre><code>pwd                 # où suis-je ? ex. /home/anas
cd /etc             # chemin ABSOLU (commence par /)
cd ..               # remonter d'un niveau
cd projets/tp1      # chemin RELATIF au répertoire courant
cd ~                # retour au répertoire personnel
ls -la              # contenu, avec fichiers cachés (.nom) et détails</code></pre>
<p>La sortie de <code>ls -l</code> : <code>-rwxr-xr-x 1 anas etu 120 nov 18 script.sh</code>. Le premier caractère est le type (<code>-</code> fichier, <code>d</code> répertoire) ; puis les droits ; puis propriétaire, groupe, taille, date, nom.</p>
<div class="call"><b class="t">Retenir</b>« Tout est fichier » : même ton clavier ou ton disque apparaissent comme des fichiers dans <code>/dev</code>.</div>`,
  videos: [{ t: "Introduction à Linux/Unix en français", q: "introduction Unix Linux architecture noyau shell cours français" }, { t: "Arborescence Linux et navigation", q: "arborescence Linux cd ls pwd chemin absolu relatif débutant" }] },

{ html: `
<h3>Un exemple de séance complète</h3>
<pre><code>mkdir tp1                  # crée le dossier tp1
cd tp1
echo "bonjour" &gt; a.txt      # crée a.txt avec le mot bonjour
cp a.txt b.txt             # copie a.txt vers b.txt
mv b.txt c.txt             # renomme b.txt en c.txt
cat a.txt c.txt            # affiche les deux fichiers
ls -l                      # liste avec détails
rm c.txt                   # supprime (sans corbeille !)</code></pre>
<h3>Les droits : comprendre chmod</h3>
<p>Trois groupes (propriétaire, groupe, autres) × trois droits : r=4, w=2, x=1. On additionne.</p>
<pre><code>rwx = 4+2+1 = 7
r-x = 4+0+1 = 5
r-- = 4

chmod 754 f   →  propriétaire rwx, groupe r-x, autres r--
chmod +x script.sh   # ajoute l'exécution pour tous</code></pre>
<h3>grep, sort, wc : les filtres</h3>
<pre><code>grep "erreur" log.txt         # lignes contenant "erreur"
grep -i "erreur" log.txt      # sans tenir compte de la casse
grep -n "erreur" log.txt      # avec numéro de ligne
sort noms.txt | uniq          # trie puis enlève les doublons
wc -l noms.txt                # nombre de lignes</code></pre>
<h3>Processus</h3>
<pre><code>sleep 100 &amp;      # lance en arrière-plan, affiche son PID
ps                # liste mes processus
kill 1234         # termine le processus de PID 1234
kill -9 1234      # force l'arrêt si le précédent ne suffit pas</code></pre>
<div class="call warn"><b class="t">Danger</b>Il n'y a pas d'annulation : <code>rm</code> supprime définitivement, et <code>&gt;</code> écrase un fichier existant sans prévenir.</div>`,
  videos: [{ t: "Commandes Linux essentielles", q: "commandes Linux de base ls cp mv rm mkdir cat grep tutoriel français" }, { t: "chmod et les droits expliqués", q: "Linux chmod droits rwx expliqué débutant" }] },

{ html: `
<h3>Les trois flux standards</h3>
<p>Chaque commande a une <b>entrée</b> (stdin, clavier par défaut), une <b>sortie</b> (stdout, écran) et une sortie d'<b>erreurs</b> (stderr, écran aussi). Les redirections changent ces destinations.</p>
<pre><code>ls &gt; liste.txt           # stdout → fichier (écrase)
ls &gt;&gt; liste.txt          # stdout → fichier (ajoute à la fin)
sort &lt; noms.txt          # stdin ← fichier
cmd 2&gt; erreurs.txt       # stderr → fichier
cmd &gt; out.txt 2&gt;&amp;1      # les deux dans out.txt</code></pre>
<h3>Le pipe : une chaîne de montage</h3>
<pre><code>cat notes.txt | sort | uniq | wc -l</code></pre>
<p>Étape par étape : <code>cat</code> lit le fichier, <code>sort</code> trie les lignes, <code>uniq</code> supprime les doublons voisins (d'où le tri avant), <code>wc -l</code> compte. Résultat : le nombre de lignes différentes.</p>
<h3>Joker et enchaînements</h3>
<pre><code>ls *.txt              # tous les fichiers finissant par .txt
ls TP?.pdf            # TP1.pdf, TP2.pdf… (un seul caractère)
mkdir d &amp;&amp; cd d       # cd seulement si mkdir a réussi
cmd1 || cmd2          # cmd2 seulement si cmd1 a échoué
cmd1 ; cmd2           # toujours les deux, l'un après l'autre</code></pre>
<div class="call warn"><b class="t">Piège</b><code>sort f &gt; f</code> vide le fichier : le shell ouvre f en écriture (et l'efface) avant que sort ne le lise. Utilise un fichier de sortie différent.</div>`,
  videos: [{ t: "Redirections et pipes en shell", q: "shell Linux redirection pipe stdin stdout stderr expliqué" }] },

{ html: `
<h3>Ton premier script, ligne par ligne</h3>
<pre><code>#!/bin/bash                  # shebang : indique quel interpréteur utiliser
nom="Anas"                   # variable, SANS espaces autour du =
echo "Bonjour $nom"          # $nom est remplacé par sa valeur
read age                     # attend une saisie, la met dans age
echo "Dans 1 an : $((age+1))"  # calcul arithmétique</code></pre>
<p>Pour l'exécuter : <code>chmod +x s.sh</code> puis <code>./s.sh</code>.</p>
<h3>Les arguments : $1, $2, $#</h3>
<pre><code>#!/bin/bash
echo "Script : $0"
echo "Nombre d'arguments : $#"
echo "Premier : $1, second : $2"
echo "Tous : $*"</code></pre>
<p>Lancé avec <code>./s.sh a b c</code> : <code>$#</code> vaut 3, <code>$1</code> vaut a, <code>$*</code> vaut « a b c ».</p>
<h3>Les tests : le détail qui fait échouer</h3>
<pre><code>[ $a -eq $b ]     # espaces OBLIGATOIRES après [ et avant ]
[ "$s" = "oui" ]  # = pour les chaînes, guillemets autour de la variable
[ -f "$1" ]       # le fichier existe ?
echo $?           # 0 = vrai/succès, autre = faux/échec</code></pre>
<div class="call warn"><b class="t">Erreur fréquente</b><code>[$a -eq $b]</code> sans espaces provoque « command not found », car <code>[</code> est une commande et doit être séparée de ses arguments.</div>`,
  videos: [{ t: "Script Bash pour débutants", q: "script bash débutant variables arguments tutoriel français" }, { t: "Tests et conditions en bash", q: "bash if test [ ] -eq -f chaînes nombres fichiers explication" }] },

{ html: `
<h3>Un script complet qui utilise tout</h3>
<pre><code>#!/bin/bash
# Usage : ./info.sh fichier
if [ $# -ne 1 ]; then
    echo "Usage : $0 fichier"
    exit 1
fi

if [ -d "$1" ]; then
    echo "$1 est un répertoire"
    n=$(ls "$1" | wc -l)           # $( ) capture la sortie
    echo "Il contient $n éléments"
elif [ -f "$1" ]; then
    echo "$1 est un fichier de $(wc -l &lt; "$1") lignes"
else
    echo "$1 n'existe pas"
fi</code></pre>
<p><b>Lecture :</b> on vérifie d'abord qu'un argument est donné (<code>$# -ne 1</code>), sinon on affiche l'usage et on quitte avec <code>exit 1</code> (code d'erreur). Ensuite on teste le type de l'argument.</p>
<h3>Boucle for sur des fichiers</h3>
<pre><code>for f in *.txt
do
    echo "Traitement de $f"
    cp "$f" "$f.bak"       # sauvegarde
done</code></pre>
<h3>Boucle while : un compteur</h3>
<pre><code>i=1
while [ $i -le 3 ]
do
    echo "Tour $i"
    i=$((i+1))             # sans cette ligne : boucle infinie !
done</code></pre>
<h3>case : un menu</h3>
<pre><code>echo "1) liste  2) date  q) quitter"
read choix
case $choix in
    1) ls ;;
    2) date ;;
    q) exit 0 ;;
    *) echo "choix invalide" ;;
esac</code></pre>
<div class="call"><b class="t">Retenir</b><code>if</code> se ferme par <code>fi</code>, <code>case</code> par <code>esac</code>, les boucles par <code>done</code>. Chaque cas de <code>case</code> se termine par <code>;;</code>.</div>`,
  videos: [{ t: "Boucles et if en bash", q: "bash boucle for while if case tutoriel exemple français" }, { t: "Écrire des scripts shell complets", q: "script shell Linux exercices corrigés menu case while" }] }
];

window.S3DEEP["web2"] = [
{ html: `
<h3>Ce qui se passe quand tu ouvres une page PHP</h3>
<p>Tu tapes <code>http://localhost/bonjour.php</code>. Ton navigateur demande la page à Apache ; Apache voit l'extension <code>.php</code>, confie le fichier à PHP ; PHP exécute le code et produit du texte HTML ; Apache renvoie ce HTML. <b>Le navigateur ne voit jamais ton code PHP</b>, seulement son résultat.</p>
<h3>Premier test avec XAMPP</h3>
<ol>
<li>Lance XAMPP Control Panel, clique <b>Start</b> sur Apache.</li>
<li>Crée le fichier <code>C:\\xampp\\htdocs\\bonjour.php</code> :</li>
</ol>
<pre><code>&lt;!DOCTYPE html&gt;
&lt;html&gt;&lt;body&gt;
  &lt;h1&gt;Ma page&lt;/h1&gt;
  &lt;?php
    echo "Il est " . date("H:i");
  ?&gt;
&lt;/body&gt;&lt;/html&gt;</code></pre>
<ol start="3"><li>Ouvre <code>http://localhost/bonjour.php</code>. Actualise : l'heure change, preuve que la page est générée à chaque requête.</li></ol>
<p>Alternative sans serveur : dans le terminal, <code>php bonjour.php</code> affiche directement le résultat.</p>
<div class="call warn"><b class="t">Erreur classique</b>Double-cliquer sur le fichier l'ouvre en <code>file://</code> : PHP n'est pas exécuté et tu vois le code brut. Passe toujours par <code>http://localhost</code>.</div>`,
  videos: [{ t: "Installer XAMPP et lancer un script PHP", q: "installer XAMPP premier script PHP localhost tutoriel" }, { t: "Comment fonctionne le web dynamique", q: "client serveur requête HTTP PHP MySQL web dynamique expliqué" }] },

{ html: `
<h3>Variables et types en pratique</h3>
<pre><code>&lt;?php
$age = 20;                 // int
$prix = 12.5;              // float
$nom = "Sara";             // string
$admis = true;             // bool

echo "Nom : $nom, age : $age\\n";   // guillemets doubles : $nom remplacé
echo 'Nom : $nom' . "\\n";          // guillemets simples : texte littéral
var_dump($age);                    // int(20) : type + valeur
echo gettype($prix);               // double
$age = "vingt";                    // PHP accepte : typage dynamique</code></pre>
<h3>Opérateurs, exemples chiffrés</h3>
<pre><code>echo 7 / 2;       // 3.5   (division réelle)
echo intdiv(7,2); // 3     (division entière)
echo 7 % 2;       // 1     (reste)
echo 2 ** 3;      // 8     (puissance)
echo "a" . "b";   // ab    (concaténation avec le point)
var_dump(5 == "5");   // true  : compare les valeurs
var_dump(5 === "5");  // false : compare aussi le type</code></pre>
<h3>Lire une saisie en ligne de commande</h3>
<pre><code>$x = readline("Entrez un nombre : ");
echo "Le double est " . ($x * 2);</code></pre>
<div class="call"><b class="t">Retenir</b>Une variable commence par <code>$</code> ; chaque instruction se termine par <code>;</code> ; le point <code>.</code> concatène (le + additionne).</div>`,
  videos: [{ t: "PHP : variables, types et opérateurs", q: "PHP variables types opérateurs tutoriel débutant français" }, { t: "== contre === en PHP", q: "PHP comparaison == === différence expliquée" }] },

{ html: `
<h3>Exemple : calculer une mention</h3>
<pre><code>$moy = 13.4;
if ($moy &gt;= 16) {
    $m = "Très bien";
} elseif ($moy &gt;= 14) {
    $m = "Bien";
} elseif ($moy &gt;= 12) {
    $m = "Assez bien";
} elseif ($moy &gt;= 10) {
    $m = "Passable";
} else {
    $m = "Ajourné";
}
echo $m;   // Assez bien</code></pre>
<p>PHP teste les conditions <b>dans l'ordre</b> et s'arrête à la première vraie : l'ordre décroissant est donc important.</p>
<h3>Table de multiplication avec for</h3>
<pre><code>for ($i = 1; $i &lt;= 10; $i++) {
    echo "7 x $i = " . (7 * $i) . "\\n";
}
// for(initialisation ; condition ; incrément)</code></pre>
<h3>switch : attention au break</h3>
<pre><code>switch ($jour) {
    case 1: echo "Lundi"; break;     // sans break, PHP continue au cas suivant !
    case 2: echo "Mardi"; break;
    default: echo "Autre jour";
}</code></pre>
<h3>foreach : parcourir un tableau</h3>
<pre><code>$notes = ["maths" =&gt; 14, "info" =&gt; 17];
foreach ($notes as $matiere =&gt; $note) {
    echo "$matiere : $note\\n";
}</code></pre>
<div class="call warn"><b class="t">Piège</b>Écrire <code>if ($a = 5)</code> (un seul =) affecte au lieu de comparer ; la condition est alors toujours vraie.</div>`,
  videos: [{ t: "Conditions et boucles en PHP", q: "PHP if else switch for while foreach tutoriel français" }] },

{ html: `
<h3>Tableaux : deux familles</h3>
<pre><code>$fruits = ["pomme", "poire"];            // indices 0, 1, 2…
$fruits[] = "kiwi";                      // ajoute en fin
echo $fruits[0];                         // pomme

$etu = ["nom" =&gt; "Ali", "age" =&gt; 20];   // clés texte
echo $etu["nom"];                        // Ali
$etu["ville"] = "Kénitra";               // ajoute une clé</code></pre>
<h3>Fonctions utiles avec résultat</h3>
<pre><code>$n = [12, 9, 15];
echo count($n);          // 3
echo array_sum($n);      // 36
sort($n);                // [9, 12, 15] : modifie le tableau
echo in_array(9, $n) ? "oui" : "non";   // oui
print_r($n);             // affichage lisible pour déboguer</code></pre>
<h3>Écrire ses propres fonctions</h3>
<pre><code>function moyenne(array $t): float {
    return array_sum($t) / count($t);   // return renvoie le résultat
}
echo moyenne([12, 9, 15]);              // 12

function saluer($nom = "invité") {      // valeur par défaut
    return "Bonjour $nom";
}
echo saluer();        // Bonjour invité
echo saluer("Sara");  // Bonjour Sara</code></pre>
<h3>Portée des variables</h3>
<pre><code>$x = 10;
function f() { echo $x; }       // ERREUR : $x inconnue dans f
function g() { global $x; echo $x; }  // OK, mais préfère passer en paramètre</code></pre>
<div class="call"><b class="t">Retenir</b>Une fonction reçoit ses données par paramètres et rend un résultat par <code>return</code> ; elle ne voit pas les variables extérieures.</div>`,
  videos: [{ t: "Tableaux PHP en détail", q: "PHP tableaux indexés associatifs fonctions array tutoriel" }, { t: "Fonctions PHP : paramètres et return", q: "PHP fonctions paramètres return portée variables tutoriel" }] },

{ html: `
<h3>Un formulaire complet en deux fichiers</h3>
<p><b>form.html</b></p>
<pre><code>&lt;form method="post" action="traite.php"&gt;
  Nom : &lt;input type="text" name="nom"&gt;
  Age : &lt;input type="number" name="age"&gt;
  &lt;button type="submit"&gt;Envoyer&lt;/button&gt;
&lt;/form&gt;</code></pre>
<p><b>traite.php</b></p>
<pre><code>&lt;?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $nom = trim($_POST["nom"] ?? "");      // ?? : valeur par défaut si absent
    $age = (int) ($_POST["age"] ?? 0);     // force un entier
    if ($nom === "" || $age &lt;= 0) {
        echo "Données invalides";
    } else {
        echo "Bonjour " . htmlspecialchars($nom) . ", " . $age . " ans";
    }
}</code></pre>
<p>L'attribut <code>name</code> de chaque champ devient la clé dans <code>$_POST</code>. Avec <code>method="get"</code>, les données apparaissent dans l'URL et se lisent dans <code>$_GET</code> : jamais pour un mot de passe.</p>
<h3>Pourquoi htmlspecialchars ?</h3>
<p>Si un visiteur écrit <code>&lt;script&gt;alert(1)&lt;/script&gt;</code> comme nom et que tu l'affiches tel quel, son script s'exécute chez les autres visiteurs (faille XSS). <code>htmlspecialchars</code> transforme les <code>&lt;</code> en texte inoffensif.</p>
<h3>Écrire et lire un fichier</h3>
<pre><code>file_put_contents("log.txt", "$nom\\n", FILE_APPEND);   // ajoute une ligne
$contenu = file_get_contents("log.txt");               // lit tout
foreach (file("log.txt") as $ligne) echo $ligne;       // ligne par ligne</code></pre>
<h3>Upload d'un fichier</h3>
<pre><code>// le formulaire doit avoir enctype="multipart/form-data"
move_uploaded_file($_FILES["photo"]["tmp_name"], "uploads/" . basename($_FILES["photo"]["name"]));</code></pre>`,
  videos: [{ t: "Formulaires PHP : GET, POST, validation", q: "PHP formulaire POST GET validation htmlspecialchars tutoriel" }, { t: "Upload de fichiers en PHP", q: "PHP upload fichier move_uploaded_file tutoriel" }] },

{ html: `
<h3>Le problème : HTTP oublie tout</h3>
<p>Chaque requête est indépendante : après ta connexion, la page suivante ne sait plus qui tu es. Sessions et cookies résolvent cela.</p>
<h3>Exemple de connexion avec session</h3>
<p><b>login.php</b></p>
<pre><code>&lt;?php
session_start();                     // 1re ligne, avant tout affichage
if ($_POST["login"] === "admin" &amp;&amp; $_POST["mdp"] === "1234") {
    $_SESSION["user"] = "admin";     // stocké côté serveur
    header("Location: profil.php");  // redirige
    exit;
}
echo "Identifiants incorrects";</code></pre>
<p><b>profil.php</b></p>
<pre><code>&lt;?php
session_start();
if (!isset($_SESSION["user"])) {     // pas connecté ?
    header("Location: login.html");
    exit;
}
echo "Bienvenue " . $_SESSION["user"];</code></pre>
<p><b>logout.php</b> : <code>session_start(); session_destroy(); header("Location: login.html");</code></p>
<h3>Comment ça marche vraiment</h3>
<p>PHP crée un identifiant aléatoire (<code>PHPSESSID</code>), le stocke dans un cookie du navigateur, et garde les données <code>$_SESSION</code> sur le serveur. À chaque requête, le navigateur renvoie l'identifiant et PHP retrouve les données.</p>
<h3>Un cookie simple</h3>
<pre><code>setcookie("theme", "sombre", time() + 3600*24*7);  // valable 7 jours
// à la requête suivante :
echo $_COOKIE["theme"] ?? "clair";</code></pre>
<div class="call warn"><b class="t">Sécurité</b>Ne stocke jamais de données sensibles dans un cookie (l'utilisateur peut le modifier). Dans un vrai projet, stocke les mots de passe hachés avec <code>password_hash()</code>, jamais en clair comme dans cet exemple pédagogique.</div>`,
  videos: [{ t: "Sessions PHP : système de connexion", q: "PHP session_start login logout système de connexion tutoriel" }, { t: "Cookies PHP expliqués", q: "PHP cookies setcookie $_COOKIE différence session" }] }
];

window.S3DEEP["proba"] = (window.S3DEEP["proba"] || []).concat([{ html: `
<h3>Comment attaquer un exercice d'annale</h3>
<ol>
<li><b>Lis tout l'énoncé</b> et note ce qui est donné (nombres de boules, probabilités, lois).</li>
<li><b>Nomme la situation</b> : tirage simultané (combinaisons), tirages avec ou sans remise, nombre de succès (binomiale), premier succès (géométrique)…</li>
<li><b>Définis les événements</b> par des lettres, puis traduis la question (« au moins une » = contraire de « aucune »).</li>
<li><b>Calcule</b> en écrivant les cas favorables et les cas possibles.</li>
</ol>
<h3>Reprenons l'exemple des urnes pas à pas</h3>
<p>U₁ : 5 noires, 2 vertes, 1 rouge (8 boules). On tire 2 boules de U₁ : <code>C(8,2) = 8×7/2 = 28</code> tirages possibles. Pour « aucune verte », on choisit 2 boules parmi les 6 non vertes : <code>C(6,2) = 15</code>. Donc <code>P(aucune verte dans U₁) = 15/28</code>.</p>
<p>U₂ : 2 noires et 1 verte, on tire 1 boule : 3 issues, dont 2 non vertes. Les deux urnes sont indépendantes, donc on multiplie : <code>P(aucune verte) = (15/28) × (2/3) = 30/84</code>.</p>
<p>« Au moins une verte » est le contraire : <code>1 − 30/84 = 54/84 = 9/14</code>.</p>
<h3>Deux Bernoulli : lire la loi de la somme</h3>
<p>X ∈ {0,1} avec P(X=1)=2/3 ; Y ∈ {0,1} avec P(Y=1)=3/4. S = X+Y vaut 0 si les deux échouent, 2 si les deux réussissent, 1 sinon :</p>
<pre><code>P(S=0) = (1/3)(1/4)        = 1/12
P(S=2) = (2/3)(3/4)        = 6/12 = 1/2
P(S=1) = 1 − 1/12 − 6/12   = 5/12</code></pre>
<div class="call"><b class="t">Vérification</b>Les probabilités doivent sommer à 1 : 1/12 + 5/12 + 6/12 = 12/12. Fais-le toujours à la fin.</div>
<h3>Conseils de rédaction</h3>
<ul>
<li>Écris l'ensemble des valeurs possibles (X(Ω)) avant la loi.</li>
<li>Justifie chaque formule utilisée (indépendance, loi binomiale…).</li>
<li>Encadre le résultat final ; une fraction simplifiée est préférable à un décimal approché.</li>
</ul>`,
  videos: [{ t: "Dénombrement : combinaisons et tirages", q: "probabilités dénombrement combinaisons tirage urne exercice corrigé" }, { t: "Loi de probabilité d'une somme de variables", q: "loi de la somme de deux variables aléatoires discrètes exercice corrigé" }] }]);
