/* code rain background (lightweight, ~15 fps) */
(function () {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  var c = document.createElement("canvas"); c.id = "rain"; document.body.appendChild(c);
  var x = c.getContext("2d"), cols = [], size = 15, chars = "01{}[]();=>#$&|<>+-*/ifforwhilereturnint0x1FAI".split("");
  function fit() {
    c.width = innerWidth; c.height = innerHeight;
    var n = Math.ceil(c.width / size); cols = [];
    for (var i = 0; i < n; i++) cols.push(Math.random() * c.height / size);
  }
  fit(); addEventListener("resize", fit);
  var last = 0;
  function frame(t) {
    requestAnimationFrame(frame);
    if (document.hidden || t - last < 66) return; last = t;
    var light = document.documentElement.getAttribute("data-theme") === "light";
    x.fillStyle = light ? "rgba(243,241,232,.12)" : "rgba(7,11,9,.14)"; x.fillRect(0, 0, c.width, c.height);
    x.font = size + "px JetBrains Mono, monospace";
    for (var i = 0; i < cols.length; i++) {
      var ch = chars[(Math.random() * chars.length) | 0];
      x.fillStyle = light ? "rgba(10,125,60,.6)" : (Math.random() > .96 ? "#d7ffe6" : "rgba(57,255,136,.75)");
      x.fillText(ch, i * size, cols[i] * size);
      if (cols[i] * size > c.height && Math.random() > .975) cols[i] = 0;
      cols[i] += 1;
    }
  }
  requestAnimationFrame(frame);
})();
