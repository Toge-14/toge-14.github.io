S3.addModule({
  id: "se", folder: "se", short: "Système d'exploitation", name: "Système d'exploitation 1 (Unix)", icon: "🐧", color: "#22c55e",
  prof: "Faculté des Sciences, Kénitra · Filière IA",
  summary: "Architecture d'Unix, arborescence, commandes essentielles, redirections et pipes, puis programmation shell : variables, tests, if/case, boucles.",
  docs: [
    { kind: "Cours", title: "Partie I — Introduction et architecture d'Unix", file: "SE-Part_I.pdf" },
    { kind: "Cours", title: "Partie II — Les commandes Unix", file: "SE-Part_II.pdf" },
    { kind: "Cours", title: "Partie III — Introduction à la programmation shell", file: "SE-Part_III.pdf" },
    { kind: "Cours", title: "Partie IV — Variables, opérations, tests", file: "Support_de_cours_-Part4.pdf" },
    { kind: "Cours", title: "Partie V — Conditions et boucles", file: "Support_de_cours-_Part_5.pdf" },
    { kind: "Notes", title: "Notes de cours", file: "Notes_de_cours.pdf" },
    { kind: "Notes", title: "Notes 3", file: "Notes_3.pptx.pdf" },
    { kind: "TP", title: "TP 1", file: "TP1.pdf" },
    { kind: "TP", title: "TP 2", file: "TP2.pdf" },
    { kind: "TP", title: "TP 2 — Partie II", file: "TP2-Part_II.pdf" },
    { kind: "TP", title: "TP 2 — Partie II (version 2)", file: "TP2-Part_II_1_.pdf" },
    { kind: "TP", title: "TP 2 — Partie III", file: "TP2-Part_III.pdf" },
    { kind: "TP", title: "TP 3 — Partie III", file: "TP3-Part_III.pdf" },
    { kind: "Projet", title: "Projet Unix 2018/2019", file: "Projet_Unix_2018_2019.pdf" },
    { kind: "TP", title: "TP 3 — Scripts shell, exercices 1 à 5 (photo)", file: "IMG_4208.jpeg.png" },
    { kind: "TP", title: "TP 3 — Scripts shell, exercices 6 à 9 (photo)", file: "IMG_4209.jpeg.png" }
  ],
  lessons: [
    { title: "Architecture d'Unix et arborescence", pdf: ["SE-Part_I.pdf"], html: `
<div class="call"><b class="t">À retenir</b>Unix est un système multi-utilisateurs, multitâche, portable, écrit en C. Il est organisé en couches : <b>matériel → noyau (kernel) → shell et appels système → applications</b>.</div>
<h3>Le noyau</h3>
<p>Il gère les processus, la mémoire, les fichiers et les périphériques. Les programmes l'appellent via les <b>appels système</b>. Le <b>shell</b> est l'interpréteur de commandes (sh, bash…) entre l'utilisateur et le noyau.</p>
<h3>Arborescence des fichiers</h3>
<table><tr><th>Répertoire</th><th>Contenu</th></tr>
<tr><td><code>/</code></td><td>Racine</td></tr>
<tr><td><code>/bin</code>, <code>/usr/bin</code></td><td>Commandes</td></tr>
<tr><td><code>/etc</code></td><td>Fichiers de configuration</td></tr>
<tr><td><code>/home</code></td><td>Répertoires des utilisateurs</td></tr>
<tr><td><code>/dev</code></td><td>Périphériques (vus comme des fichiers)</td></tr>
<tr><td><code>/tmp</code></td><td>Fichiers temporaires</td></tr></table>
<p>Principe : <b>tout est fichier</b>. Chemin absolu = depuis <code>/</code> ; chemin relatif = depuis le répertoire courant (<code>.</code> courant, <code>..</code> parent, <code>~</code> maison).</p>` },
    { title: "Commandes Unix essentielles", pdf: ["SE-Part_II.pdf", "TP1.pdf"], html: `
<h3>Syntaxe</h3>
<p><code>commande [options] [arguments]</code> — exemple : <code>ls -l /etc</code>.</p>
<h3>Fichiers et répertoires</h3>
<table><tr><th>Commande</th><th>Rôle</th></tr>
<tr><td><code>pwd</code>, <code>cd</code>, <code>ls -l -a</code></td><td>Se repérer, lister</td></tr>
<tr><td><code>mkdir</code>, <code>rmdir</code></td><td>Créer, supprimer un répertoire</td></tr>
<tr><td><code>cp</code>, <code>mv</code>, <code>rm</code> (<code>-r</code>)</td><td>Copier, déplacer/renommer, supprimer</td></tr>
<tr><td><code>cat</code>, <code>more</code>, <code>head</code>, <code>tail</code></td><td>Afficher un fichier</td></tr>
<tr><td><code>chmod</code></td><td>Droits (r=4, w=2, x=1) : <code>chmod 755 f</code></td></tr></table>
<h3>Filtres de texte</h3>
<table><tr><th>Commande</th><th>Rôle</th></tr>
<tr><td><code>grep motif f</code></td><td>Lignes contenant le motif</td></tr>
<tr><td><code>sort</code>, <code>uniq</code></td><td>Trier, supprimer les doublons</td></tr>
<tr><td><code>wc -l -w -c</code></td><td>Compter lignes, mots, caractères</td></tr>
<tr><td><code>cut -d: -f1</code></td><td>Extraire des champs</td></tr></table>
<h3>Processus</h3>
<p><code>ps</code> liste, <code>kill PID</code> termine, <code>&amp;</code> lance en arrière-plan, <code>jobs</code>, <code>fg</code>, <code>bg</code>.</p>
<div class="call warn"><b class="t">Danger</b><code>rm -r</code> ne demande pas de confirmation et n'a pas de corbeille. Vérifie avec <code>ls</code> avant.</div>` },
    { title: "Redirections, pipes, caractères spéciaux", pdf: ["SE-Part_III.pdf"], html: `
<h3>Redirections</h3>
<table><tr><th>Opérateur</th><th>Effet</th></tr>
<tr><td><code>cmd &gt; f</code></td><td>Sortie vers f (écrase)</td></tr>
<tr><td><code>cmd &gt;&gt; f</code></td><td>Sortie ajoutée à la fin de f</td></tr>
<tr><td><code>cmd &lt; f</code></td><td>Entrée lue depuis f</td></tr>
<tr><td><code>cmd 2&gt; f</code></td><td>Erreurs vers f</td></tr></table>
<h3>Pipe</h3>
<p><code>cmd1 | cmd2</code> envoie la sortie de cmd1 à l'entrée de cmd2. Exemple : <code>ls -l | wc -l</code>, <code>cat f | sort | uniq</code>.</p>
<h3>Caractères génériques</h3>
<p><code>*</code> toute chaîne, <code>?</code> un caractère, <code>[a-c]</code> un caractère de l'ensemble. Ex. <code>ls *.txt</code>.</p>
<h3>Chaînage</h3>
<p><code>;</code> séquence ; <code>&amp;&amp;</code> la suivante s'exécute si la précédente réussit ; <code>||</code> si elle échoue ; <code>&amp;</code> arrière-plan.</p>` },
    { title: "Variables, opérations et tests en shell", pdf: ["Support_de_cours_-Part4.pdf", "Support_de_cours-_Part_5.pdf"], html: `
<h3>Premier script</h3>
<pre><code>#!/bin/bash
# commentaire
echo "Bonjour"</code></pre>
<p>Rends-le exécutable : <code>chmod +x script.sh</code>, puis <code>./script.sh</code>.</p>
<h3>Variables</h3>
<ul>
<li>Affectation <b>sans espaces</b> : <code>nom=Anas</code> ; lecture : <code>$nom</code> ; saisie : <code>read nom</code>.</li>
<li>Prédéfinies : <code>$0</code> nom du script, <code>$1 … $9</code> arguments, <code>$#</code> nombre d'arguments, <code>$*</code> tous les arguments, <code>$?</code> code de retour, <code>$$</code> PID.</li>
<li>Opérations : <code>expr 2 + 3</code> ou <code>$((2+3))</code>.</li>
</ul>
<h3>Tests : <code>[ condition ]</code> (espaces obligatoires)</h3>
<table><tr><th>Type</th><th>Opérateurs</th></tr>
<tr><td>Chaînes</td><td><code>=</code> <code>!=</code> <code>-z</code> (vide) <code>-n</code> (non vide)</td></tr>
<tr><td>Nombres</td><td><code>-eq -ne -lt -le -gt -ge</code></td></tr>
<tr><td>Fichiers</td><td><code>-e</code> existe, <code>-f</code> fichier, <code>-d</code> répertoire, <code>-r -w -x</code> droits</td></tr></table>
<div class="call warn"><b class="t">Piège</b>Pour comparer des nombres on utilise <code>-eq</code>, <code>-lt</code>… ; avec <code>=</code> on compare des chaînes.</div>` },
    { title: "Structures de contrôle : if, case, boucles", pdf: ["Support_de_cours-_Part_5.pdf", "TP2.pdf"], html: `
<h3>if</h3>
<pre><code>if [ $# -ne 1 ]
then
  echo "Usage : $0 fichier"
elif [ -d "$1" ]
then
  echo "$1 est un répertoire"
else
  echo "autre"
fi</code></pre>
<p>Conditions combinées : <code>-a</code> (et), <code>-o</code> (ou), <code>!</code> (non), ou <code>&amp;&amp;</code> et <code>||</code> entre deux tests.</p>
<h3>case</h3>
<pre><code>case $reponse in
  o|O) echo "oui" ;;
  n|N) echo "non" ;;
  *)   echo "inconnu" ;;
esac</code></pre>
<h3>Boucles</h3>
<pre><code>while [ $i -le 5 ]
do
  echo $i
  i=$((i+1))
done

for f in *.txt
do
  echo "Fichier : $f"
done</code></pre>
<div class="call"><b class="t">Astuce</b>Une boucle <code>until</code> répète jusqu'à ce que la condition soit vraie (inverse de while). <code>break</code> et <code>continue</code> contrôlent la boucle.</div>` },
    { title: "TP 3 : scripts shell (exercices 1 à 9, corrigés)", pdf: ["IMG_4208.jpeg.png", "IMG_4209.jpeg.png"], html: `
<div class="call"><b class="t">Source</b>Énoncés lus sur les deux photos du TP 3 (Scripts en Shell Unix sh). Les corrigés ci-dessous sont des propositions : vérifie-les dans ton terminal.</div>
<h3>Ex. 1 — Premiers scripts</h3>
<pre><code>#!/bin/sh
# 1) date du jour, puis les utilisateurs connectés
date
who

# 2) demander le nom
echo "Quel est votre nom ?"
read nom
echo "Bonjour $nom, votre dossier personnel contient :"
ls $HOME</code></pre>
<h3>Ex. 2 — Interactivité (echo et read)</h3>
<pre><code>echo "Cher utilisateur quel est votre nom ?"
read nom
echo "Ravi de vous connaitre, $nom"
echo "Quel est votre prénom et votre âge ?"
read prenom age
echo "Vous avez $age ans $prenom $nom"</code></pre>
<h3>Ex. 3 — Arguments</h3>
<pre><code>echo "$# arguments :"
i=1
for a in "$@"
do
   echo " $i - $a"
   i=$((i+1))
done</code></pre>
<p><b>$#</b> : nombre d'arguments ; <b>$@</b> : tous les arguments ; <b>$1, $2…</b> : chaque argument.</p>
<h3>Ex. 4 — Opérations</h3>
<pre><code># 1) somme de deux chiffres
if [ $# -ne 2 ]; then echo "Usage : $0 a b"; exit 1; fi
echo $(($1 + $2))

# 2) nombre de caractères d'une chaîne
echo -n "$1" | wc -c               # nombre de caractères (ou, en sh moderne : la longueur avec # devant le nom du paramètre)</code></pre>
<h3>Ex. 5 — test et instruction conditionnelle</h3>
<pre><code>echo "Nom du fichier :"
read f
if [ -f "$f" ]; then
    cat "$f"                    # fichier ordinaire : afficher le contenu
elif [ -d "$f" ]; then
    ls "$f"                     # répertoire : lister (ou cd "$f")
else
    echo "$f n'existe pas"
fi</code></pre>
<h3>Ex. 6 — L'instruction case</h3>
<pre><code>echo "Voulez-vous supprimer le fichier $1 ? "
read rep
case $rep in
   oui|Oui|OUI|O) echo "Votre fichier est supprimé" ; rm "$1" ;;
   non|NON|N|n)   echo "Votre fichier n'a pas été supprimé" ;;
   *)             echo "Réponse incorrecte" ;;
esac</code></pre>
<h3>Ex. 7 — while et until</h3>
<pre><code># 1) mot de passe "ubuntu", 4 essais (version while)
essai=1
read mdp
while [ "$mdp" != "ubuntu" -a $essai -lt 4 ]
do
    essai=$((essai+1))
    echo "Mot de passe incorrect, réessayez :"
    read mdp
done
[ "$mdp" = "ubuntu" ] &amp;&amp; echo "Accès autorisé" || echo "Accès refusé"

# version until : même idée avec la condition inversée
until [ "$mdp" = "ubuntu" -o $essai -ge 4 ]
do ... done

# 2) minutes en secondes, avec test de l'argument
if [ $# -ne 1 ]; then echo "Donnez les minutes en argument"; exit 1; fi
echo "$1 minutes = $(($1 * 60)) secondes"</code></pre>
<h3>Ex. 8 — La boucle for</h3>
<pre><code># 1) compter de 1 à 10
for i in 1 2 3 4 5 6 7 8 9 10
do echo $i ; done

# 2) type de chaque fichier de un ou plusieurs répertoires
for rep in "$@"
do
  for f in $rep/*
  do
    if   [ -d "$f" ]; then echo "$f : répertoire"
    elif [ -f "$f" ]; then echo "$f : fichier ordinaire"
    elif [ -b "$f" ]; then echo "$f : mode bloc"
    elif [ -c "$f" ]; then echo "$f : mode caractère"
    fi
  done
done

# 3) chaînes (paramètres) présentes dans les fichiers d'un répertoire (boucles imbriquées)
rep=$1 ; shift
for chaine in "$@"
do
  for f in $rep/*
  do
    grep -q "$chaine" "$f" &amp;&amp; echo "$chaine apparaît dans $f"
  done
done</code></pre>
<h3>Ex. 9 — while et redirection des entrées/sorties</h3>
<pre><code># 1) numéroter les lignes d'un fichier
n=0
while read ligne
do
   n=$((n+1))
   echo "$n $ligne"
done &lt; "$1"

# 2) fichier de clients : nom prénom age
n=0
while read nom prenom age
do
   n=$((n+1))
   echo "Le client numéro $n est agé de $age et appelé $prenom $nom"
done &lt; "$1"</code></pre>
<p><b>done &lt; fichier</b> redirige l'entrée de toute la boucle : à chaque tour, <code>read</code> lit une ligne de plus.</p>` }
  ],
  quiz: [
    { q: "Quel composant gère processus, mémoire et fichiers ?", o: ["Le shell", "Le noyau", "L'interface graphique", "Le compilateur"], a: 1, e: "Le noyau (kernel) est au cœur du système." },
    { q: "Quel répertoire contient les fichiers de configuration ?", o: ["/bin", "/etc", "/dev", "/tmp"], a: 1, e: "/etc : configuration ; /dev : périphériques." },
    { q: "Quelle commande affiche le répertoire courant ?", o: ["ls", "cd", "pwd", "who"], a: 2, e: "pwd = print working directory." },
    { q: "Quelle commande compte les lignes d'un fichier ?", o: ["wc -l", "wc -w", "cat -n", "ls -l"], a: 0, e: "wc -l compte les lignes ; -w les mots ; -c les caractères." },
    { q: "Que fait <code>cmd &gt;&gt; f</code> ?", o: ["Écrase f", "Ajoute la sortie à la fin de f", "Lit f", "Redirige les erreurs"], a: 1, e: "&gt; écrase, &gt;&gt; ajoute." },
    { q: "Que fait <code>ls | wc -l</code> ?", o: ["Liste les fichiers", "Compte les fichiers listés", "Supprime les fichiers", "Trie les fichiers"], a: 1, e: "Le pipe envoie la sortie de ls à wc." },
    { q: "Quel droit correspond à <code>chmod 755</code> ?", o: ["rwxr-xr-x", "rw-r--r--", "rwxrwxrwx", "r-xr-xr-x"], a: 0, e: "7 = rwx (propriétaire), 5 = r-x (groupe), 5 = r-x (autres)." },
    { q: "Quelle variable contient le nombre d'arguments d'un script ?", o: ["$0", "$#", "$?", "$$"], a: 1, e: "$# : nombre d'arguments ; $? : code de retour ; $$ : PID." },
    { q: "Quelle affectation est correcte en shell ?", o: ["x = 5", "x=5", "$x=5", "set x = 5"], a: 1, e: "Aucun espace autour du =." },
    { q: "Comment tester si deux nombres sont égaux ?", o: ["[ $a = $b ]", "[ $a -eq $b ]", "[ $a == b ]", "if a=b"], a: 1, e: "-eq pour les nombres, = pour les chaînes." },
    { q: "Quel test vérifie qu'un fichier est un répertoire ?", o: ["-f", "-d", "-e", "-x"], a: 1, e: "-d directory ; -f fichier ordinaire ; -e existe." },
    { q: "Quelle ligne rend un script exécutable ?", o: ["chmod +x script.sh", "run script.sh", "exec -x script.sh", "chown script.sh"], a: 0, e: "chmod +x ajoute le droit d'exécution." },
    { q: "Dans un <code>case</code>, que signifie <code>*)</code> ?", o: ["Premier cas", "Cas par défaut", "Erreur", "Commentaire"], a: 1, e: "* correspond à toute valeur non traitée avant." },
    { q: "Que contient $# dans un script shell ?", o: ["Le nom du script", "Le nombre d'arguments", "Le code de retour", "Le PID"], a: 1, e: "$# = nombre d'arguments, $@ = tous les arguments, $0 = nom du script." },
    { q: "Comment lire un fichier ligne par ligne dans un script ?", o: ["for l in fichier", "while read ligne ; do ... done < fichier", "cat fichier > read", "read fichier"], a: 1, e: "La redirection done < fichier alimente read à chaque tour de boucle." },
    { q: "Quel test vérifie qu'un nom désigne un répertoire ?", o: ["[ -f nom ]", "[ -d nom ]", "[ -c nom ]", "[ -b nom ]"], a: 1, e: "-f : fichier ordinaire, -d : répertoire, -b : mode bloc, -c : mode caractère." }
  ],
  exercises: [
    { q: "Écrire un script qui affiche le nombre d'arguments et le premier.", a: "<pre><code>#!/bin/bash\necho \"Nombre : $#\"\necho \"Premier : $1\"</code></pre>" },
    { q: "Script qui teste si le fichier passé en argument existe.", a: "<pre><code>#!/bin/bash\nif [ -f \"$1\" ]\nthen echo \"existe\"\nelse echo \"absent\"\nfi</code></pre>" },
    { q: "Afficher les nombres de 1 à 5 avec while.", a: "<pre><code>i=1\nwhile [ $i -le 5 ]\ndo\n  echo $i\n  i=$((i+1))\ndone</code></pre>" },
    { q: "Compter les fichiers .txt du répertoire courant.", a: "<code>ls *.txt | wc -l</code>" }
  ],
  tips: [
    "Pratique directement dans un terminal Linux (WSL, machine virtuelle ou Ubuntu) : lire ne suffit pas.",
    "Pas d'espaces autour du = d'une affectation, mais des espaces dans [ condition ].",
    "Mets toujours les variables entre guillemets dans les tests : [ -f \"$1\" ].",
    "Teste tes scripts avec 0, 1 et plusieurs arguments.",
    "Consulte l'aide avec man commande (par ex. man grep)."
  ],
  terms: [
    { t: "Noyau (kernel)", d: "Cœur du système qui gère processus, mémoire, fichiers et périphériques." },
    { t: "Shell", d: "Interpréteur de commandes entre l'utilisateur et le noyau." },
    { t: "Appel système", d: "Service du noyau demandé par un programme." },
    { t: "Chemin absolu / relatif", d: "Chemin depuis la racine / depuis le répertoire courant." },
    { t: "Redirection", d: "Changement de l'entrée ou de la sortie standard d'une commande (&lt;, &gt;, &gt;&gt;)." },
    { t: "Pipe", d: "Opérateur | reliant la sortie d'une commande à l'entrée d'une autre." },
    { t: "Processus", d: "Programme en cours d'exécution, identifié par un PID." },
    { t: "Code de retour ($?)", d: "0 si la commande a réussi, une autre valeur sinon." },
    { t: "Droits (rwx)", d: "Lecture, écriture, exécution pour propriétaire, groupe et autres." },
    { t: "Script shell", d: "Fichier texte contenant une suite de commandes shell." }
  ]
});
