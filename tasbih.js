(function () {
  var style = document.createElement("style");
  style.textContent =
    ".tb-sel{font-family:inherit;font-size:18px;font-weight:800;color:#1554A6;background:#fff url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%231554A6' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E\") no-repeat 16px center;border:none;border-radius:24px;padding:12px 22px 12px 40px;box-shadow:0 4px 16px rgba(21,84,166,.14);-webkit-appearance:none;appearance:none;max-width:100%;text-align:center;text-align-last:center;cursor:pointer}" +
    ".tb-targets{display:flex;justify-content:center;gap:8px;margin:16px 0 0;flex-wrap:wrap}" +
    ".tb-chip{font-family:inherit;font-size:14px;font-weight:700;color:#1554A6;background:#EAF3FF;border:none;border-radius:16px;padding:6px 16px;cursor:pointer}" +
    ".tb-chip.on{background:#1554A6;color:#fff}" +
    ".tb-ring{position:relative;width:min(300px,76vw);height:min(300px,76vw);margin:20px auto 10px;border-radius:50%;background:radial-gradient(circle at 50% 40%,#f4f9ff,#e3efff);box-shadow:0 10px 30px rgba(21,84,166,.14),inset 0 0 0 10px rgba(255,255,255,.7);cursor:pointer;user-select:none;-webkit-user-select:none;touch-action:manipulation;display:flex;align-items:center;justify-content:center;transition:transform .08s}" +
    ".tb-ring:active{transform:scale(.985)}" +
    ".tb-ring svg{position:absolute;top:0;left:0;width:100%;height:100%;transform:rotate(-90deg)}" +
    ".tb-ring .bg{fill:none;stroke:#cfe2fb;stroke-width:7}" +
    ".tb-ring .fg{fill:none;stroke:#2878D4;stroke-width:7;stroke-linecap:round;transition:stroke-dashoffset .25s ease,stroke .25s}" +
    ".tb-ring.done .fg{stroke:#2e8b57}" +
    ".tb-mid{position:relative;text-align:center}" +
    ".tb-num{font-size:74px;font-weight:800;line-height:1;color:#1554A6}" +
    ".tb-of{font-size:18px;font-weight:700;color:#173D48;margin-top:8px}" +
    ".tb-tip{font-size:13px;color:#687589;margin-top:2px;min-height:20px}" +
    ".tb-reset{display:block;width:min(300px,86%);margin:18px auto 0;border:none;border-radius:30px;padding:15px;background:linear-gradient(90deg,#2878D4,#1554A6);color:#fff;font-family:inherit;font-size:18px;font-weight:800;cursor:pointer;box-shadow:0 8px 20px rgba(21,84,166,.28)}" +
    ".tb-beads{width:100%;max-width:360px;display:block;margin:16px auto 0;opacity:.85;pointer-events:none}";
  document.head.appendChild(style);

  var adhkar = [
    "سبحان الله",
    "الحمد لله",
    "الله أكبر",
    "لا إله إلا الله",
    "أستغفر الله",
    "سبحان الله وبحمده",
    "لا حول ولا قوة إلا بالله",
    "اللهم صلِّ وسلم على نبينا محمد"
  ];
  var TARGETS = [33, 99, 100, 1000];
  var R = 46;
  var C = 2 * Math.PI * R;

  function toAr(n) {
    return String(n).replace(/\d/g, function (d) { return "٠١٢٣٤٥٦٧٨٩".charAt(d); });
  }

  function lsGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function lsSet(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }

  function beadsSvg() {
    function ring(cx, cy, r, n, fill) {
      var s = "";
      for (var i = 0; i < n; i++) {
        var a = (i / n) * 2 * Math.PI;
        s += '<circle cx="' + (cx + r * Math.cos(a)).toFixed(1) + '" cy="' + (cy + r * Math.sin(a)).toFixed(1) +
          '" r="9" fill="' + fill + '" stroke="rgba(40,120,212,.35)" stroke-width="1"/>';
      }
      return s;
    }
    return '<svg class="tb-beads" viewBox="0 0 360 150" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
      ring(135, 78, 52, 17, "rgba(190,215,248,.55)") +
      ring(225, 78, 52, 17, "rgba(120,170,232,.45)") +
      "</svg>";
  }

  window.showTasbih = function (target) {
    var counts = {};
    try { counts = JSON.parse(lsGet("tasbihCounts")) || {}; } catch (e) { counts = {}; }

    var current = lsGet("tasbihCurrent");
    if (adhkar.indexOf(current) < 0) current = adhkar[0];

    var goal = parseInt(lsGet("tasbihTarget"), 10);
    if (TARGETS.indexOf(goal) < 0) goal = 100;

    var opts = "";
    adhkar.forEach(function (d) { opts += '<option value="' + d + '">' + d + "</option>"; });
    var chips = "";
    TARGETS.forEach(function (t) { chips += '<button class="tb-chip" data-t="' + t + '">' + toAr(t) + "</button>"; });

    target.innerHTML =
      '<select class="tb-sel" id="tbSel" aria-label="اختر الذكر">' + opts + "</select>" +
      '<div class="tb-ring" id="tbRing" role="button" tabindex="0" aria-label="اضغط للتسبيح">' +
      '<svg viewBox="0 0 100 100"><circle class="bg" cx="50" cy="50" r="' + R + '"/>' +
      '<circle class="fg" id="tbFg" cx="50" cy="50" r="' + R + '" stroke-dasharray="' + C + '" stroke-dashoffset="' + C + '"/></svg>' +
      '<div class="tb-mid"><div class="tb-num" id="tbNum">٠</div>' +
      '<div class="tb-of" id="tbOf"></div><div class="tb-tip" id="tbTip">اضغط على الدائرة للتسبيح</div></div></div>' +
      '<div class="tb-targets" id="tbTargets">' + chips + "</div>" +
      '<button class="tb-reset" id="tbReset">إعادة تعيين</button>' +
      beadsSvg();

    var sel = document.getElementById("tbSel");
    var ring = document.getElementById("tbRing");
    var fg = document.getElementById("tbFg");
    var num = document.getElementById("tbNum");
    var of = document.getElementById("tbOf");
    var tip = document.getElementById("tbTip");
    var chipEls = document.querySelectorAll("#tbTargets .tb-chip");

    sel.value = current;

    function save() { lsSet("tasbihCounts", JSON.stringify(counts)); }

    function vib(p) { try { if (navigator.vibrate) navigator.vibrate(p); } catch (e) {} }

    function refresh() {
      var c = counts[current] || 0;
      num.textContent = toAr(c);
      of.textContent = "من " + toAr(goal);
      var p = Math.min(c / goal, 1);
      fg.setAttribute("stroke-dashoffset", String(C * (1 - p)));
      var done = c >= goal;
      ring.className = "tb-ring" + (done ? " done" : "");
      tip.textContent = done ? "ما شاء الله، أتممت العدد" : "اضغط على الدائرة للتسبيح";
      for (var i = 0; i < chipEls.length; i++) {
        chipEls[i].className = "tb-chip" + (parseInt(chipEls[i].getAttribute("data-t"), 10) === goal ? " on" : "");
      }
    }

    function tap() {
      var before = counts[current] || 0;
      counts[current] = before + 1;
      save();
      refresh();
      if (counts[current] === goal) vib([60, 40, 60]); else vib(12);
    }

    sel.addEventListener("change", function () {
      current = sel.value;
      lsSet("tasbihCurrent", current);
      refresh();
    });

    ring.addEventListener("click", tap);
    ring.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); tap(); }
    });

    for (var i = 0; i < chipEls.length; i++) {
      chipEls[i].addEventListener("click", function () {
        goal = parseInt(this.getAttribute("data-t"), 10);
        lsSet("tasbihTarget", String(goal));
        refresh();
      });
    }

    document.getElementById("tbReset").addEventListener("click", function () {
      counts[current] = 0;
      save();
      refresh();
    });

    refresh();
  };
})();
