/* S3 Guide — vanilla JS single-page app (hash routing, localStorage progress) */
(function () {
  "use strict";
  var S = window.S3, KEY = "s3guide.v1";
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var app = $("#app");

  /* ---------- state ---------- */
  var st = { lessons: {}, quiz: {}, plan: {}, theme: "" };
  try { var raw = localStorage.getItem(KEY); if (raw) st = Object.assign(st, JSON.parse(raw)); } catch (e) {}
  function save() { try { localStorage.setItem(KEY, JSON.stringify(st)); } catch (e) {} }
  function setTheme(t) {
    if (t) document.documentElement.setAttribute("data-theme", t); else document.documentElement.removeAttribute("data-theme");
  }
  setTheme(st.theme);

  /* ---------- helpers ---------- */
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function strip(h) { return String(h).replace(/<[^>]+>/g, " ").replace(/&[a-z]+;/g, " ").replace(/\s+/g, " ").trim(); }
  function norm(s) { return String(s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, ""); }
  function mod(id) { return S.modules.filter(function (m) { return m.id === id; })[0]; }
  function done(m) { var d = st.lessons[m.id] || {}; return m.lessons.filter(function (_, i) { return d[i]; }).length; }
  function pct(m) { return m.lessons.length ? Math.round(100 * done(m) / m.lessons.length) : 0; }
  function totalPct() {
    var n = 0, d = 0; S.modules.forEach(function (m) { n += m.lessons.length; d += done(m); });
    return n ? Math.round(100 * d / n) : 0;
  }
  var DRIVE = {"struct-c":"1XYdLTJeD6VGIYq-BRvmSgX2u1N45Y8Fc",proba:"1BWKHzCPVt6U6kPvQOO3YXxJMWiSJkdNp",web2:"1rKOzYOyjaaIjE1wnOo4amyrJ0IqAqSlz",ro:"1Jnms4Qp59ife_Wm0sCHayJX6KLzIE6IF",uml:"1zXvsYLVooThxa1fGqzCqbSosSLN1lF13",se:"1rWZ13GhRracw2kXiGXtULvOgeItU1zq7"};
  function pdfUrl(m, f) { return "https://drive.google.com/drive/folders/" + DRIVE[m.id]; }
  function allTerms() {
    var out = []; S.modules.forEach(function (m) { (m.terms || []).forEach(function (t) { out.push({ t: t.t, d: t.d, m: m }); }); });
    return out.sort(function (a, b) { return norm(a.t).localeCompare(norm(b.t)); });
  }
  function style(m) { return '--c:' + m.color; }

  /* ---------- sidebar ---------- */
  function renderSidebar(route) {
    var h = '<div class="lbl">Navigation</div>' +
      link("#/", "🏠", "Accueil", route[0] === "") +
      link("#/modules", "📚", "Tous les modules", route[0] === "modules") +
      link("#/plan", "🗓️", "Plan de révision", route[0] === "plan") +
      link("#/glossary", "🔤", "Glossaire", route[0] === "glossary") +
      link("#/search", "🔍", "Recherche", route[0] === "search") +
      '<div class="lbl">Modules</div>';
    S.modules.forEach(function (m) {
      h += '<a class="nav' + (route[0] === "m" && route[1] === m.id ? " active" : "") + '" style="' + style(m) + '" href="#/m/' + m.id + '"><span class="dot"></span>' + esc(m.icon) + " " + esc(m.short) + '<span class="pct">' + pct(m) + '%</span></a>';
    });
    h += '<div class="foot">La progression est enregistrée dans ce navigateur uniquement.<br><button class="btn small danger" id="resetBtn">Réinitialiser ma progression</button></div>';
    $("#sidebar").innerHTML = h;
    $("#resetBtn").onclick = function () {
      if (confirm("Effacer toute ta progression (leçons, quiz, plan) ?")) { st = { lessons: {}, quiz: {}, plan: {}, theme: st.theme }; save(); route_(); }
    };
    $$("a", $("#sidebar")).forEach(function (a) { a.addEventListener("click", closeDrawer); });
  }
  function link(href, ic, label, active) { return '<a class="nav' + (active ? " active" : "") + '" href="' + href + '">' + ic + " " + label + "</a>"; }
  function closeDrawer() { $("#sidebar").classList.remove("open"); $("#scrim").classList.remove("show"); }
  function openDrawer() { $("#sidebar").classList.add("open"); $("#scrim").classList.add("show"); }

  /* ---------- pages ---------- */
  function moduleCards() {
    return '<div class="grid">' + S.modules.map(function (m, i) {
      var p = pct(m), b = st.quiz[m.id] && st.quiz[m.id].best;
      return '<a class="mod-card" style="' + style(m) + ';--i:' + i + '" href="#/m/' + m.id + '"><div class="ic">' + esc(m.icon) + '</div><h3>' + esc(m.name) + '</h3>' +
        '<div class="meta">' + m.lessons.length + ' leçons · ' + m.docs.length + ' PDF · ' + m.quiz.length + ' questions</div>' +
        '<div class="bar"><i style="width:' + p + '%"></i></div><div class="sub"><span>' + (p ? p + " % appris" : "Pas commencé") + '</span><span>' + (b != null ? "Meilleur quiz : " + b + " %" : "") + '</span></div></a>';
    }).join("") + "</div>";
  }
  function pageHome() {
    var lessons = 0, docs = 0, qs = 0, terms = 0;
    S.modules.forEach(function (m) { lessons += m.lessons.length; docs += m.docs.length; qs += m.quiz.length; terms += (m.terms || []).length; });
    var res = [
      ["#/plan", "🗓️", "Plan de révision", "4 semaines + mode examen"],
      ["#/glossary", "🔤", "Glossaire", terms + " termes clés"],
      ["#/search", "🔍", "Recherche", "Dans tous les cours"],
      ["#/m/proba/docs", "📝", "Annales de probas", "Normal et rattrapage 24/25 et 25/26"]
    ];
    return '<section class="hero"><div><span class="pill">' + esc(S.programme) + '</span>' +
      '<h1>Tout le S3, <span class="grad-text">au même endroit</span> <span class="wave">📚</span></h1>' +
      '<p class="lead">Les cours, TD et TP en PDF, des résumés clairs, des quiz et un plan de révision. Pense à ouvrir le PDF original à côté pour les schémas et les démonstrations.</p>' +
      '<div class="btns"><a class="btn" href="#/modules">Explorer les modules →</a><button class="btn ghost" id="shareBtn">🔗 Partager</button></div></div>' +
      '<div><div class="ring" style="--p:' + totalPct() + '"><b>' + totalPct() + '%</b></div><small class="lead" style="display:block;text-align:center">appris</small></div></section>' +
      '<div class="stats"><div class="stat"><b>' + S.modules.length + '</b><span>modules</span></div><div class="stat"><b>' + lessons + '</b><span>leçons</span></div><div class="stat"><b>' + docs + '</b><span>PDF</span></div><div class="stat"><b>' + qs + '</b><span>questions de quiz</span></div><div class="stat"><b>' + terms + '</b><span>termes clés</span></div></div>' +
      '<h2 class="sec">📚 Choisis un module</h2>' + moduleCards() +
      '<h2 class="sec">🧰 Ressources</h2><div class="grid">' + res.map(function (r) {
        return '<a class="card" style="color:var(--text)" href="' + r[0] + '"><div style="font-size:26px">' + r[1] + '</div><b>' + r[2] + '</b><div class="lead" style="font-size:14px">' + r[3] + '</div></a>';
      }).join("") + '</div>' +
      '<p class="lead" style="margin-top:26px;font-size:13.5px">Guide non officiel, fait par des étudiants. Les PDF appartiennent à leurs enseignants ; en cas de doute, la version du professeur fait foi.</p>';
  }
  function pageModules() { return '<h1>📚 Tous les modules</h1><p class="lead">Six modules du semestre 3.</p>' + moduleCards(); }

  function tabsNav(m, tab) {
    var T = [["lessons", "📘 Leçons"], ["docs", "📄 PDF (" + m.docs.length + ")"], ["quiz", "🎯 Quiz"], ["exercises", "✍️ Exercices"], ["tips", "💡 Astuces"]];
    return '<nav class="tabs">' + T.map(function (t) { return '<a href="#/m/' + m.id + '/' + t[0] + '" class="' + (tab === t[0] ? "active" : "") + '">' + t[1] + "</a>"; }).join("") + "</nav>";
  }
  function pageModule(id, tab, idx) {
    var m = mod(id); if (!m) return pageNotFound();
    tab = tab || "lessons";
    var h = '<div style="' + style(m) + '"><header class="mhead" data-ic="' + esc(m.icon) + '"><a class="back" href="#/modules">← Tous les modules</a><h1>' + esc(m.icon) + " " + esc(m.name) + "</h1><p>" + esc(m.summary) + "</p></header>" +
      '<div class="metarow"><div class="m"><small>Enseignant</small>' + esc(m.prof || "—") + '</div><div class="m"><small>Progression</small>' + done(m) + " / " + m.lessons.length + ' leçons<div class="bar" style="margin-top:6px"><i style="width:' + pct(m) + '%"></i></div></div></div>' +
      tabsNav(m, tab);
    if (tab === "lessons") h += tabLessons(m);
    else if (tab === "docs") h += tabDocs(m);
    else if (tab === "quiz") h += tabQuiz(m);
    else if (tab === "exercises") h += tabExercises(m);
    else h += tabTips(m);
    return h + "</div>";
  }
  function deepBlock(m, i) {
    var D = (window.S3DEEP || {})[m.id]; D = D && D[i]; if (!D) return "";
    var vids = (D.videos || []).map(function (v) {
      return '<a class="vid" target="_blank" rel="noopener" href="https://www.youtube.com/results?search_query=' + encodeURIComponent(v.q) + '"><span>▶</span><b>' + esc(v.t) + '</b><small>Rechercher sur YouTube</small></a>';
    }).join("");
    var vid = (D.videoList || (D.video ? [D.video] : [])).map(function (v) { return '<figure class="reel"><video controls playsinline preload="metadata" src="' + v.src + '"></video><figcaption>🎬 ' + esc(v.title) + " · ~25 s · avec son</figcaption></figure>"; }).join("");
    return '<details class="deep"><summary>🔍 Expliquer en détail' + (D.video ? ' <span class="vbadge">🎬 ' + (D.videoList && D.videoList.length > 1 ? D.videoList.length + ' vidéos' : 'vidéo') + '</span>' : "") + '<span class="chev">›</span></summary><div class="deepbody">' + vid + '<div class="prose">' + D.html + "</div>" +
      (vids ? '<div class="vids"><b>🎬 Vidéos pour comprendre</b>' + vids + "</div>" : "") + "</div></details>";
  }
  function tabLessons(m) {
    var d = st.lessons[m.id] || {};
    return m.lessons.map(function (l, i) {
      var pdfs = (l.pdf || []).map(function (f) {
        return '<a class="btn small ghost" target="_blank" rel="noopener" href="' + esc(pdfUrl(m, f)) + '">📄 ' + esc(f.replace(/\.pdf$/i, "")) + " ↗</a>";
      }).join("");
      return '<details class="lesson' + (d[i] ? " done" : "") + '" id="l' + i + '" data-i="' + i + '"><summary><span class="num">' + (d[i] ? "✔" : i + 1) + "</span>" + esc(l.title) + '<span class="chev">›</span></summary><div class="body">' +
        '<label class="learned"><input type="checkbox" data-learn="' + i + '"' + (d[i] ? " checked" : "") + '> J\'ai appris cette leçon</label>' +
        '<div class="prose">' + l.html + "</div>" + deepBlock(m, i) + (pdfs ? '<div class="pdf-links"><b>PDF source :</b> ' + pdfs + "</div>" : "") + "</div></details>";
    }).join("");
  }
  function tabDocs(m) {
    return '<p class="lead">Les PDF sont dans le dossier Google Drive de la matière (cherche le nom du fichier).</p><div class="docs">' + m.docs.map(function (dc) {
      return '<div class="doc"><span class="k">' + esc(dc.kind) + "</span><strong>" + esc(dc.title) + '</strong><div class="row"><a class="btn small" target="_blank" rel="noopener" href="' + esc(pdfUrl(m, dc.file)) + '">Ouvrir sur Drive ↗</a></div></div>';
    }).join("") + "</div>";
  }
  var quizState = {};
  function tabQuiz(m) {
    var q = quizState[m.id] = { ans: {}, right: 0 };
    var best = st.quiz[m.id] && st.quiz[m.id].best;
    return '<div class="score" id="score">Score : <b id="sc">0</b> / ' + m.quiz.length + '<span class="grow"></span><span class="pill">Meilleur : ' + (best != null ? best + " %" : "—") + '</span></div>' +
      m.quiz.map(function (qq, i) {
        return '<div class="qcard" data-q="' + i + '"><div class="qn">Question ' + (i + 1) + "</div><h4>" + qq.q + "</h4>" + qq.o.map(function (o, j) {
          return '<button class="opt" data-q="' + i + '" data-o="' + j + '">' + o + "</button>";
        }).join("") + '<div class="exp" hidden></div></div>';
      }).join("") + '<div id="qend"></div>';
  }
  function tabExercises(m) {
    if (!m.exercises || !m.exercises.length) return '<p class="lead">Pas d\'exercices pour ce module : utilise les TD et TP dans l\'onglet PDF.</p>';
    return m.exercises.map(function (e, i) {
      return '<details class="ex"><summary>Exercice ' + (i + 1) + ' — ' + e.q + '</summary><div class="ans prose"><b>Corrigé type :</b>' + e.a + "</div></details>";
    }).join("");
  }
  function tabTips(m) {
    return (m.tips || []).map(function (t) { return '<div class="card" style="margin-bottom:10px">' + t + "</div>"; }).join("") || '<p class="lead">Pas encore d\'astuces.</p>';
  }

  function pagePlan() {
    return '<h1>🗓️ Plan de révision</h1><p class="lead">Coche ce que tu as fait. Ta progression reste dans ce navigateur.</p>' + S.plan.map(function (ph, pi) {
      return '<div class="card phase"><h3>' + esc(ph.t) + "</h3>" + ph.items.map(function (it, ii) {
        var k = pi + "-" + ii, on = st.plan[k];
        return '<label class="check' + (on ? " done" : "") + '"><input type="checkbox" data-plan="' + k + '"' + (on ? " checked" : "") + "><span>" + esc(it) + "</span></label>";
      }).join("") + "</div>";
    }).join("");
  }
  function pageGlossary(q, mid) {
    var terms = allTerms();
    var h = '<h1>🔤 Glossaire</h1><div class="filters"><input id="gq" type="search" placeholder="Filtrer les termes…" value="' + esc(q || "") + '" aria-label="Filtrer les termes"><select id="gm" aria-label="Module"><option value="">Tous les modules</option>' +
      S.modules.map(function (m) { return '<option value="' + m.id + '"' + (mid === m.id ? " selected" : "") + ">" + esc(m.short) + "</option>"; }).join("") + '</select></div><div id="glist">' + glossaryList(terms, q, mid) + "</div>";
    return h;
  }
  function glossaryList(terms, q, mid) {
    var nq = norm(q || "");
    var r = terms.filter(function (t) { return (!mid || t.m.id === mid) && (!nq || norm(t.t + " " + t.d).indexOf(nq) >= 0); });
    if (!r.length) return '<p class="lead">Aucun terme trouvé.</p>';
    return r.map(function (t) { return '<div class="term" style="' + style(t.m) + '"><b>' + esc(t.t) + '</b><span class="mn">' + esc(t.m.icon + " " + t.m.short) + "</span><div>" + esc(t.d) + "</div></div>"; }).join("");
  }
  function pageSearch(q) {
    return '<h1>🔍 Recherche</h1><input id="sq" class="bigsearch" type="search" placeholder="Rechercher dans les leçons, termes et PDF…" value="' + esc(q || "") + '" aria-label="Recherche"><div id="sres" style="margin-top:16px">' + searchResults(q) + "</div>";
  }
  function snippet(text, nq) {
    var i = norm(text).indexOf(nq); if (i < 0) return esc(text.slice(0, 140));
    var a = Math.max(0, i - 50), b = Math.min(text.length, i + nq.length + 90);
    var s = text.slice(a, b);
    return (a ? "…" : "") + esc(s.slice(0, i - a)) + "<mark>" + esc(s.slice(i - a, i - a + nq.length)) + "</mark>" + esc(s.slice(i - a + nq.length)) + (b < text.length ? "…" : "");
  }
  function searchResults(q) {
    var nq = norm((q || "").trim()); if (nq.length < 2) return '<p class="lead">Tape au moins 2 lettres.</p>';
    var L = [], T = [], D = [];
    S.modules.forEach(function (m) {
      m.lessons.forEach(function (l, i) {
        var txt = strip(l.html); if (norm(l.title + " " + txt).indexOf(nq) >= 0) L.push('<a class="hit" href="#/m/' + m.id + "/lessons/" + i + '"><b>' + esc(l.title) + "</b> <small>" + esc(m.icon + " " + m.short) + "</small><br>" + snippet(txt, nq) + "</a>");
      });
      (m.terms || []).forEach(function (t) { if (norm(t.t + " " + t.d).indexOf(nq) >= 0) T.push('<div class="term" style="' + style(m) + '"><b>' + esc(t.t) + '</b><span class="mn">' + esc(m.short) + "</span><div>" + esc(t.d) + "</div></div>"); });
      m.docs.forEach(function (d) { if (norm(d.title).indexOf(nq) >= 0) D.push('<a class="hit" href="#/m/' + m.id + '/docs"><b>📄 ' + esc(d.title) + "</b> <small>" + esc(m.short) + "</small></a>"); });
    });
    return (L.length ? "<h3>Leçons (" + L.length + ")</h3>" + L.join("") : "") + (T.length ? "<h3>Glossaire (" + T.length + ")</h3>" + T.join("") : "") + (D.length ? "<h3>PDF (" + D.length + ")</h3>" + D.join("") : "") || '<p class="lead">Rien trouvé.</p>';
  }
  function pageNotFound() { return '<div class="card"><h1>Page introuvable 🤔</h1><a class="btn" href="#/">Retour à l\'accueil</a></div>'; }

  /* ---------- router ---------- */
  function route_() {
    var hash = location.hash.replace(/^#\/?/, ""), r = hash.split("/").map(decodeURIComponent);
    var html;
    if (r[0] === "" ) html = pageHome();
    else if (r[0] === "modules") html = pageModules();
    else if (r[0] === "m") html = pageModule(r[1], r[2], r[3]);
    else if (r[0] === "plan") html = pagePlan();
    else if (r[0] === "glossary") html = pageGlossary();
    else if (r[0] === "search") html = pageSearch(r[1]);
    else html = pageNotFound();
    app.innerHTML = html;
    renderSidebar(r);
    $$(".tabbar a").forEach(function (a) { a.classList.toggle("active", a.getAttribute("data-nav") === (r[0] === "" ? "home" : r[0])); });
    document.title = r[0] === "m" && mod(r[1]) ? mod(r[1]).name + " — S3 Guide" : "S3 Guide — IA · FSK Kénitra";
    bind(r);
    window.scrollTo(0, 0);
    if (r[0] === "m" && (r[2] || "lessons") === "lessons" && r[3] != null) {
      var d = $("#l" + r[3]); if (d) { d.open = true; setTimeout(function () { d.scrollIntoView({ block: "start" }); }, 60); }
    }
  }

  function bind(r) {
    var sb = $("#shareBtn");
    if (sb) sb.onclick = function () {
      var url = location.href.split("#")[0], data = { title: "S3 Guide", text: "Guide de révision S3 (IA)", url: url };
      if (navigator.share) navigator.share(data).catch(function () {});
      else if (navigator.clipboard) navigator.clipboard.writeText(url).then(function () { alert("Lien copié !"); }, function () { prompt("Copie le lien :", url); });
      else prompt("Copie le lien :", url);
    };
    $$("[data-pdf]").forEach(function (b) { b.onclick = function () { openViewer(b.getAttribute("data-pdf"), b.getAttribute("data-title")); }; });
    $$("[data-learn]").forEach(function (c) {
      c.onchange = function () {
        var m = mod(r[1]), i = c.getAttribute("data-learn"); st.lessons[m.id] = st.lessons[m.id] || {};
        st.lessons[m.id][i] = c.checked; save();
        var det = c.closest("details"); det.classList.toggle("done", c.checked); $(".num", det).textContent = c.checked ? "✔" : Number(i) + 1;
        renderSidebar(r);
      };
    });
    $$("[data-plan]").forEach(function (c) {
      c.onchange = function () { st.plan[c.getAttribute("data-plan")] = c.checked; save(); c.closest(".check").classList.toggle("done", c.checked); };
    });
    $$(".opt").forEach(function (b) {
      b.onclick = function () { answer(r[1], Number(b.getAttribute("data-q")), Number(b.getAttribute("data-o"))); };
    });
    var gq = $("#gq"), gm = $("#gm");
    if (gq) { var f = function () { $("#glist").innerHTML = glossaryList(allTerms(), gq.value, gm.value); }; gq.oninput = f; gm.onchange = f; }
    var sq = $("#sq");
    if (sq) sq.oninput = function () { history.replaceState(null, "", "#/search/" + encodeURIComponent(sq.value)); $("#sres").innerHTML = searchResults(sq.value); };
  }

  function answer(mid, qi, oi) {
    var m = mod(mid), qs = quizState[mid]; if (!qs || qs.ans[qi] != null) return;
    var q = m.quiz[qi], card = $('.qcard[data-q="' + qi + '"]');
    qs.ans[qi] = oi; if (oi === q.a) qs.right++;
    $$(".opt", card).forEach(function (b, j) { b.disabled = true; if (j === q.a) b.classList.add("right"); else if (j === oi) b.classList.add("wrong"); });
    var ex = $(".exp", card); ex.hidden = false; ex.innerHTML = (oi === q.a ? "✅ <b>Correct.</b> " : "❌ <b>Pas tout à fait.</b> ") + q.e;
    $("#sc").textContent = qs.right;
    if (Object.keys(qs.ans).length === m.quiz.length) {
      var p = Math.round(100 * qs.right / m.quiz.length), prev = st.quiz[m.id] && st.quiz[m.id].best;
      if (prev == null || p > prev) { st.quiz[m.id] = { best: p }; save(); }
      $("#qend").innerHTML = '<div class="call ' + (p === 100 ? "ok" : "") + '"><b class="t">' + p + " % — " + (p === 100 ? "parfait ! 🎉" : p >= 70 ? "bien, refais-le pour viser 100 %" : "relis les leçons puis réessaie") + '</b><button class="btn small" id="retry">Recommencer</button></div>';
      $("#retry").onclick = route_; renderSidebar(["m", mid]);
    }
  }

  /* ---------- viewer ---------- */
  function openViewer(url, title) {
    $("#viewerTitle").textContent = title || "Document"; $("#viewerFrame").src = url; $("#viewerOpen").href = url; $("#viewer").hidden = false; document.body.style.overflow = "hidden";
  }
  function closeViewer() { $("#viewer").hidden = true; $("#viewerFrame").src = "about:blank"; document.body.style.overflow = ""; }
  $("#viewerClose").onclick = closeViewer;
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") { closeViewer(); closeDrawer(); } });

  /* ---------- chrome ---------- */
  $("#themeBtn").onclick = function () {
    var dark = document.documentElement.getAttribute("data-theme") === "dark" || (!st.theme && window.matchMedia("(prefers-color-scheme: dark)").matches);
    st.theme = dark ? "light" : "dark"; setTheme(st.theme); save();
  };
  $("#menuBtn").onclick = openDrawer; $("#moreBtn").onclick = openDrawer; $("#scrim").onclick = closeDrawer;
  $("#globalSearch").addEventListener("input", function (e) { location.hash = "#/search/" + encodeURIComponent(e.target.value); });
  window.addEventListener("hashchange", route_);

  /* ---------- splash (once per session) ---------- */
  (function () {
    var seen = false; try { seen = sessionStorage.getItem("s3splash"); } catch (e) {}
    if (seen || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    var sp = document.createElement("div"); sp.className = "splash";
    var L = ['<span class="dim">$</span> <b>boot</b> s3-guide --filiere IA --semestre 3', '<span class="ok">[ ok ]</span> chargement des modules ........ 6/6', '<span class="ok">[ ok ]</span> cours · quiz · glossaire · PDF', '<span class="ok">[ ok ]</span> indexation de la recherche', '<span class="dim">$</span> <b>ready</b> <span class="cur"></span>'];
    sp.innerHTML = '<div class="term">' + L.map(function (l, i) { return '<div style="--i:' + i + '">' + l + "</div>"; }).join("") + "</div>";
    document.body.appendChild(sp);
    function out() { sp.classList.add("out"); setTimeout(function () { sp.remove(); }, 600); try { sessionStorage.setItem("s3splash", "1"); } catch (e) {} }
    sp.onclick = out; setTimeout(out, 1400);
  })();

  route_();
})();
