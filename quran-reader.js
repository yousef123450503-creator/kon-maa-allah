(function () {
  var L = window.QURAN_LIB;
  if (!L) return;
  var SURAHS = L.SURAHS, BISMILLAH = L.BISMILLAH, TOTAL = L.TOTAL, BM_IN = L.BM_IN, BM_OUT = L.BM_OUT;
  var toAr = L.toAr, toNumber = L.toNumber, stripBismillah = L.stripBismillah;
  var lsSet = L.lsSet, lsJSON = L.lsJSON, getJSON = L.getJSON, API = L.API;

  var style = document.createElement("style");
  style.textContent =
    ".qr-top{display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:10px}" +
    ".qr-btn{border:none;background:#fff;color:#1554A6;font-family:inherit;font-size:14px;font-weight:700;border-radius:14px;padding:9px 16px;box-shadow:0 3px 10px rgba(21,84,166,.12);cursor:pointer;display:inline-flex;align-items:center;gap:6px}" +
    ".qr-btn.on{background:#1554A6;color:#fff}" +
    ".qr-btn svg{width:18px;height:18px}" +
    ".qr-stage{position:relative;overflow:hidden;touch-action:pan-y;user-select:none;-webkit-user-select:none;margin:0 auto}" +
    ".qr-panel{position:absolute;top:0;left:0;width:100%;height:100%;will-change:transform}" +
    ".mp{height:100%;min-width:0;display:flex;background:repeating-linear-gradient(135deg,#7cc4e6 0 4px,#bfe6f5 4px 8px);border:1.5px solid #1b5f8a;padding:6px;box-shadow:0 8px 24px rgba(21,84,166,.16)}" +
    ".mp-in{flex:1;min-height:0;min-width:0;display:flex;flex-direction:column;background:#fff;border:1.5px solid #1b5f8a;padding:5px 8px 3px}" +
    ".mp-head{flex:none;display:flex;justify-content:space-between;align-items:center;height:28px;margin-bottom:3px}" +
    ".mp-tag{border:1.3px solid #2b7aa8;background:#eef8fc;color:#164a73;font-family:'Tajawal',sans-serif;font-size:12px;font-weight:700;padding:1px 12px;border-radius:5px;min-width:78px;text-align:center}" +
    ".mp-body{flex:1;min-height:0;min-width:0;overflow:hidden;color:#111;direction:rtl;display:flex;flex-direction:column;font-family:'Amiri Quran','Amiri',serif}" +
    ".mp-body.fit{font-family:'Amiri Quran','Amiri',serif}" +
    ".mp-line{flex:none;display:flex;align-items:center;white-space:nowrap;direction:rtl}" +
    ".mp-line .w{flex:none;line-height:1.1}" +
    ".mp-line .no{flex:none;display:inline-flex;align-items:center;justify-content:center;width:1.4em;height:1.4em;border:1.2px solid #2a7bb0;border-radius:50%;font-size:.55em;font-family:'Tajawal',sans-serif;font-weight:700;color:#164a73;background:#f2fafe}" +
    ".mp-ban{flex:none;display:flex;align-items:center;justify-content:center;color:#164a73;background:linear-gradient(180deg,#eef8fc,#d8eef8);border:1.4px solid #2b7aa8;border-radius:6px;box-shadow:inset 0 0 0 2px #fff,inset 0 0 0 3px #8fc6e0;font-weight:700}" +
    ".mp-ban .sn{font-family:'surahnames';font-size:1.25em;line-height:1}" +
    ".mp-bsm{flex:none;display:flex;align-items:center;justify-content:center;white-space:nowrap}" +
    ".mp-seg{margin:0;text-align:justify;text-align-last:justify}" +
    ".mp-seg.end{text-align-last:center}" +
    ".mp-sparse .mp-seg{text-align:center;text-align-last:center}" +
    ".mp-no{display:inline-flex;align-items:center;justify-content:center;width:1.5em;height:1.5em;border:1.3px solid #2a7bb0;border-radius:50%;color:#164a73;font-size:.52em;font-family:'Tajawal',sans-serif;font-weight:700;margin:0 .3em;vertical-align:middle;line-height:1;background:#f2fafe}" +
    ".nw{white-space:nowrap}" +
    ".mp-foot{flex:none;display:flex;justify-content:center;align-items:center;height:30px;margin-top:2px}" +
    ".mp-num{min-width:44px;text-align:center;padding:2px 12px;border:1.3px solid #2b7aa8;background:#eef8fc;color:#164a73;font-family:'Tajawal',sans-serif;font-size:14px;font-weight:800;border-radius:12px}" +
    ".mp-load{display:flex;align-items:center;justify-content:center;height:100%;font-family:'Tajawal',sans-serif;font-size:15px;color:#687589;text-align:center;line-height:2;padding:0 14px}" +
    ".qr-retry{margin-top:8px;border:none;background:#1554A6;color:#fff;border-radius:14px;padding:9px 20px;font-family:inherit;font-size:15px;font-weight:700;cursor:pointer}" +
    ".qr-hint{text-align:center;font-size:12px;color:#687589;margin-top:8px}" +
    ".qr-credit{text-align:center;font-size:10.5px;color:#9aa8bd;margin-top:2px}";
  document.head.appendChild(style);

  // خط أسماء السور (من شبكة Quran Foundation)
  var sf = document.createElement("style");
  sf.textContent =
    "@font-face{font-family:'surahnames';src:url('https://verses.quran.foundation/fonts/quran/surah-names/v1/sura_names.woff2') format('woff2'),url('https://verses.quran.foundation/fonts/quran/surah-names/v1/sura_names.ttf') format('truetype');font-display:block}";
  document.head.appendChild(sf);

  var QCF_URL = "https://verses.quran.foundation/fonts/quran/hafs/v2/woff2/p";
  var LAYOUT_URLS = [
    "https://cdn.jsdelivr.net/gh/zonetecde/mushaf-layout@main/mushaf/page-",
    "https://raw.githubusercontent.com/zonetecde/mushaf-layout/refs/heads/main/mushaf/page-"
  ];

  var cache = {};
  function getPage(n) {
    if (cache[n]) return Promise.resolve(cache[n]);
    return getJSON(API + "/page/" + n + "/quran-uthmani").then(function (j) {
      cache[n] = j.data;
      return j.data;
    });
  }

  window.QURAN_READER = function (ctx) {
      var target = ctx.target;
      var page = ctx.getPage();
      target.onclick = null;
      target.innerHTML =
        '<div class="qr-top">' +
        '<button class="qr-btn" id="qrIdx">☰ الفهرس</button>' +
        '<button class="qr-btn" id="qrPill">صفحة 1</button>' +
        '<button class="qr-btn" id="qrBm" aria-label="حفظ الصفحة"></button>' +
        '</div>' +
        '<div class="qr-stage" id="qrStage"></div>' +
        '<div class="qr-hint" id="qrHint"></div>' +
        '<div class="qr-credit">خطوط المصحف: مجمع الملك فهد لطباعة المصحف الشريف، عبر Quran Foundation</div>';

      var stage = document.getElementById("qrStage");
      var qPill = document.getElementById("qrPill");
      var qBm = document.getElementById("qrBm");
      var qHint = document.getElementById("qrHint");
      var W = 0, H = 0;
      var panels = [];
      var cur = null, nxt = null, prv = null;

      var JUZ = ["الأول", "الثاني", "الثالث", "الرابع", "الخامس", "السادس", "السابع", "الثامن", "التاسع", "العاشر",
        "الحادي عشر", "الثاني عشر", "الثالث عشر", "الرابع عشر", "الخامس عشر", "السادس عشر", "السابع عشر", "الثامن عشر",
        "التاسع عشر", "العشرون", "الحادي والعشرون", "الثاني والعشرون", "الثالث والعشرون", "الرابع والعشرون",
        "الخامس والعشرون", "السادس والعشرون", "السابع والعشرون", "الثامن والعشرون", "التاسع والعشرون", "الثلاثون"];
      function juzOfPage(p) { return p < 22 ? 1 : Math.min(30, Math.floor((p - 2) / 20) + 1); }

      var fontReady = Promise.race([
        (document.fonts && document.fonts.load) ? document.fonts.load('20px "Amiri Quran"') : Promise.resolve(),
        new Promise(function (res) { setTimeout(res, 2500); })
      ]).catch(function () {});

      /* ---- حجم الصفحة: تملأ الشاشة المتاحة ---- */
      function sizeStage() {
        stage.style.width = "";
        stage.style.height = "";
        var top = stage.getBoundingClientRect().top + (window.pageYOffset || 0);
        var availH = Math.floor(window.innerHeight - top - 92 - 44);
        var availW = stage.parentNode.clientWidth;
        if (availH < 300) availH = 300;
        var w = Math.min(availW, Math.max(250, Math.floor(availH / 1.3)));
        var h = Math.min(availH, Math.floor(w * 1.9));
        h = Math.max(h, Math.floor(w * 1.3));
        stage.style.width = w + "px";
        stage.style.height = h + "px";
        W = w; H = h;
      }

      /* ---- تحميل البيانات ---- */
      var layoutCache = {};
      function fetchLayout(n) {
        if (layoutCache[n]) return layoutCache[n];
        var num = ("00" + n).slice(-3);
        var p = new Promise(function (resolve, reject) {
          var i = 0;
          (function tryNext() {
            if (i >= LAYOUT_URLS.length) { reject(new Error("layout")); return; }
            var url = LAYOUT_URLS[i++] + num + ".json";
            fetch(url).then(function (r) {
              if (!r.ok) throw new Error("http");
              return r.json();
            }).then(function (j) {
              if (!j || !j.lines || !j.lines.length) throw new Error("bad");
              var hasText = j.lines.some(function (l) { return l.type === "text" && ((l.words && l.words.length) || l.text); });
              if (!hasText) throw new Error("bad");
              resolve(j);
            }).catch(tryNext);
          })();
        });
        layoutCache[n] = p;
        p.catch(function () { delete layoutCache[n]; });
        return p;
      }

      var qcfCache = {};
      function loadQcf(n) {
        if (qcfCache[n]) return qcfCache[n];
        var name = "qcf2_p" + n;
        var p;
        try {
          var ff = new FontFace(name, "url('" + QCF_URL + n + ".woff2')");
          ff.display = "block";
          p = ff.load().then(function () { document.fonts.add(ff); return true; }).catch(function () { return false; });
        } catch (e) { p = Promise.resolve(false); }
        qcfCache[n] = p;
        return p;
      }

      var snCache = null;
      function loadSurahNames() {
        if (snCache) return snCache;
        snCache = (document.fonts && document.fonts.load)
          ? Promise.race([document.fonts.load("20px surahnames", "001").then(function (f) { return f && f.length > 0; }), new Promise(function (r) { setTimeout(function () { r(false); }, 3000); })]).catch(function () { return false; })
          : Promise.resolve(false);
        return snCache;
      }

      /* ---- إنشاء لوحة الصفحة ---- */
      function createPanel() {
        var el = document.createElement("div");
        el.className = "qr-panel";
        el.innerHTML =
          '<div class="mp"><div class="mp-in">' +
          '<div class="mp-head"><span class="mp-tag mp-juz"></span><span class="mp-tag mp-sur"></span></div>' +
          '<div class="mp-body"></div>' +
          '<div class="mp-foot"><span class="mp-num"></span></div>' +
          '</div></div>';
        stage.appendChild(el);
        return {
          el: el, page: null, mode: "", surah: "",
          body: el.querySelector(".mp-body"), juz: el.querySelector(".mp-juz"),
          sur: el.querySelector(".mp-sur"), num: el.querySelector(".mp-num")
        };
      }

      function setHeader(panel, surahNum) {
        panel.surah = (surahNum && SURAHS[surahNum - 1]) ? SURAHS[surahNum - 1][0] : "";
        panel.juz.textContent = "الجزء " + (JUZ[juzOfPage(panel.page) - 1] || "");
        panel.sur.textContent = panel.surah ? "سورة " + panel.surah : "";
        panel.num.textContent = toAr(panel.page);
      }

      /* ---- العرض الأصلي: أسطر المصحف نفسها + خط الصفحة ---- */
      function renderExact(panel, layout, qcfOk, snOk) {
        var body = panel.body;
        body.className = "mp-body" + (qcfOk ? "" : " fit");
        body.innerHTML = "";
        body.style.justifyContent = "flex-start";
        body.style.fontSize = "16px";

        var lines = layout.lines.slice().sort(function (a, b) { return (a.line || 0) - (b.line || 0); });
        if (qcfOk) {
          lines.forEach(function (l) {
            if (l.type === "text") {
              (l.words || []).forEach(function (w) { if (!w.qpcV2 || !String(w.qpcV2).trim()) qcfOk = false; });
            }
          });
        }
        var maxLine = 0;
        lines.forEach(function (l) { if ((l.line || 0) > maxLine) maxLine = l.line; });
        var total = Math.max(maxLine, panel.page <= 2 ? 8 : 15);
        var bodyH = body.clientHeight || (H - 90);
        var rowH = total >= 15 ? bodyH / total : Math.min(bodyH / 15 * 1.85, bodyH / total);
        if (total < 15) body.style.justifyContent = "center";

        var byLine = {};
        lines.forEach(function (l, i) { byLine[l.line || (i + 1)] = l; });

        var fam = "qcf2_p" + panel.page;
        var lineEls = [];
        var firstSurah = 0;

        for (var ln = 1; ln <= total; ln++) {
          var L = byLine[ln];
          var row = document.createElement("div");
          if (!L) {
            row.style.height = rowH + "px";
            row.style.flex = "none";
            body.appendChild(row);
            continue;
          }
          if (L.type === "surah-header") {
            row.className = "mp-ban";
            row.style.height = (rowH * 0.9) + "px";
            row.style.margin = (rowH * 0.05) + "px 0";
            row.style.fontSize = Math.max(13, rowH * 0.42) + "px";
            if (snOk && L.surah) {
              var sn = document.createElement("span");
              sn.className = "sn";
              sn.textContent = String(L.surah);
              row.appendChild(sn);
            } else {
              row.textContent = L.text || "";
            }
            if (!firstSurah && L.surah) firstSurah = parseInt(L.surah, 10);
          } else if (L.type === "basmala") {
            row.className = "mp-bsm";
            row.style.height = rowH + "px";
            if (qcfOk && L.qpcV2) {
              row.style.fontFamily = fam;
              row.textContent = L.qpcV2;
            } else {
              row.style.fontFamily = "'Amiri Quran','Amiri',serif";
              row.textContent = BISMILLAH;
            }
            row.style.fontSize = Math.max(14, rowH * 0.55) + "px";
            row.setAttribute("data-bsm", "1");
          } else {
            row.className = "mp-line";
            row.style.height = rowH + "px";
            var words = (L.words && L.words.length) ? L.words : String(L.text || "").split(/\s+/).map(function (t) { return { word: t, qpcV2: "" }; });
            if (!firstSurah && L.verseRange) firstSurah = parseInt(String(L.verseRange).split(":")[0], 10);
            words.forEach(function (w) {
              var span = document.createElement("span");
              span.className = "w";
              var glyph = qcfOk && w.qpcV2 ? String(w.qpcV2).trim() : "";
              if (glyph) {
                span.style.fontFamily = fam;
                span.textContent = glyph;
                row.appendChild(span);
              } else {
                var txt = String(w.word || "");
                var m = txt.match(/^(.*?)\s+([٠-٩0-9]+)$/);
                if (m) {
                  span.textContent = m[1];
                  row.appendChild(span);
                  var no = document.createElement("span");
                  no.className = "no";
                  no.textContent = m[2];
                  row.appendChild(no);
                } else {
                  span.textContent = txt;
                  row.appendChild(span);
                }
              }
            });
            lineEls.push(row);
          }
          body.appendChild(row);
        }

        // ضبط حجم الخط ليتسع أعرض سطر في عرض الصفحة
        var Wi = body.clientWidth;
        body.style.fontSize = "100px";
        var GAP = 0.2, fMax = Infinity, info = [];
        lineEls.forEach(function (el) {
          var kids = el.children, sum = 0;
          for (var i = 0; i < kids.length; i++) sum += kids[i].getBoundingClientRect().width;
          var k = kids.length;
          info.push({ el: el, sum: sum, k: k });
          var fl = Wi / (sum / 100 + Math.max(0, k - 1) * GAP);
          if (fl < fMax) fMax = fl;
        });
        if (!isFinite(fMax) || fMax <= 0) fMax = 20;
        var f = Math.min(fMax * 0.99, rowH / 1.55);
        body.style.fontSize = f + "px";
        info.forEach(function (it) {
          var nat = it.sum * f / 100 + Math.max(0, it.k - 1) * GAP * f;
          if (nat < Wi * 0.78) { it.el.style.justifyContent = "center"; it.el.style.gap = "0.4em"; }
          else { it.el.style.justifyContent = "space-between"; it.el.style.gap = "0"; }
        });
        panel.mode = qcfOk ? "exact" : "unicode";
        setHeader(panel, firstSurah);
      }

      /* ---- العرض الاحتياطي (توزيع تلقائي على ١٥ سطرًا) ---- */
      function renderFitted(panel, data) {
        var body = panel.body;
        body.className = "mp-body fit";
        body.style.justifyContent = "flex-start";
        body.innerHTML = "";
        body.style.fontSize = "16px";
        var bodyH = body.clientHeight || (H - 90);
        var Lh = Math.max(20, Math.floor(bodyH / 15));
        var blocks = [], curBlock = null;
        data.ayahs.forEach(function (a) {
          var sNum = a.surah ? a.surah.number : 0;
          var text = a.text;
          if (a.numberInSurah === 1 && sNum && SURAHS[sNum - 1]) {
            blocks.push({ t: "banner", name: SURAHS[sNum - 1][0] });
            if (sNum !== 1 && sNum !== 9) { blocks.push({ t: "bism" }); text = stripBismillah(text); }
            curBlock = null;
          }
          if (!curBlock) { curBlock = { t: "text", items: [] }; blocks.push(curBlock); }
          var words = text.trim().split(/\s+/).filter(Boolean);
          words.forEach(function (w, i) { curBlock.items.push({ w: w, n: i === words.length - 1 ? a.numberInSurah : 0 }); });
        });
        var segEls = [], fixed = 0;
        blocks.forEach(function (b, bi) {
          var el = document.createElement("div");
          if (b.t === "banner") {
            el.className = "mp-ban"; el.style.height = Lh + "px"; el.textContent = "سورة " + b.name; fixed++;
          } else if (b.t === "bism") {
            el.className = "mp-bsm"; el.style.height = Lh + "px"; el.textContent = BISMILLAH; fixed++;
          } else {
            el.className = "mp-seg" + ((bi + 1 < blocks.length && blocks[bi + 1].t === "banner") ? " end" : "");
            el.style.lineHeight = Lh + "px";
            b.items.forEach(function (it, k) {
              var w = document.createElement("span");
              w.className = it.n ? "nw" : "";
              w.appendChild(document.createTextNode(it.w));
              if (it.n) {
                var no = document.createElement("span");
                no.className = "mp-no"; no.textContent = toAr(it.n); w.appendChild(no);
              }
              el.appendChild(w);
              if (k < b.items.length - 1) el.appendChild(document.createTextNode(" "));
            });
            segEls.push(el);
          }
          body.appendChild(el);
        });
        function totalLines() {
          var n = fixed;
          segEls.forEach(function (s) { n += Math.max(1, Math.round(s.offsetHeight / Lh)); });
          return n;
        }
        var lo = 9, hi = Math.floor(Lh / 1.5);
        for (var i = 0; i < 9; i++) {
          var mid = (lo + hi) / 2;
          body.style.fontSize = mid + "px";
          if (totalLines() <= 15) lo = mid; else hi = mid;
        }
        body.style.fontSize = lo + "px";
        var used = totalLines();
        panel.el.className = "qr-panel" + (used < 12 && lo >= Math.floor(Lh / 1.5) - 1 ? " mp-sparse" : "");
        panel.mode = "fitted";
        var first = data.ayahs[0];
        setHeader(panel, first && first.surah ? first.surah.number : 0);
      }

      function loadInto(panel, n) {
        panel.page = n;
        panel.mode = "";
        panel.body.className = "mp-body";
        panel.body.innerHTML = '<div class="mp-load">جاري التحميل...</div>';
        panel.juz.textContent = ""; panel.sur.textContent = ""; panel.num.textContent = toAr(n);

        fetchLayout(n).then(function (layout) {
          return Promise.all([loadQcf(n), loadSurahNames(), fontReady]).then(function (r) {
            if (panel.page !== n) return;
            renderExact(panel, layout, r[0], r[1]);
            if (panel === cur) refreshChrome();
          });
        }).catch(function () {
          if (panel.page !== n) return;
          return getPage(n).then(function (data) {
            return fontReady.then(function () {
              if (panel.page !== n) return;
              renderFitted(panel, data);
              if (panel === cur) refreshChrome();
            });
          });
        }).catch(function () {
          if (panel.page !== n) return;
          panel.body.innerHTML =
            '<div class="mp-load"><div>تعذّر تحميل الصفحة.<br>تأكد من الإنترنت وحاول مرة تانية.<br>' +
            '<button class="qr-retry">إعادة المحاولة</button></div></div>';
          var b = panel.body.querySelector(".qr-retry");
          if (b) b.addEventListener("click", function () { loadInto(panel, n); });
        });
      }

      function place(dx, animate) {
        var t = animate ? "transform .28s ease" : "none";
        panels.forEach(function (p) { p.el.style.transition = t; });
        cur.el.style.visibility = "visible";
        cur.el.style.transform = "translateX(" + dx + "px)";
        panels.forEach(function (p) {
          if (p === cur) return;
          if (p === nxt) { p.el.style.visibility = "visible"; p.el.style.transform = "translateX(" + (dx - W) + "px)"; }
          else if (p === prv) { p.el.style.visibility = "visible"; p.el.style.transform = "translateX(" + (dx + W) + "px)"; }
          else { p.el.style.visibility = "hidden"; p.el.style.transform = "translateX(" + (W * 3) + "px)"; }
        });
      }

      /* تعيين الصفحات الثلاث (الحالية والتالية والسابقة) */
      function assign(p) {
        var want = [p, p + 1 <= TOTAL ? p + 1 : null, p - 1 >= 1 ? p - 1 : null];
        var used = [null, null, null];
        var free = panels.slice();
        want.forEach(function (n, i) {
          if (n === null) return;
          for (var k = 0; k < free.length; k++) {
            if (free[k].page === n && free[k].mode) { used[i] = free[k]; free.splice(k, 1); return; }
          }
        });
        want.forEach(function (n, i) {
          if (n === null || used[i]) return;
          var pn = free.shift();
          used[i] = pn;
          loadInto(pn, n);
        });
        cur = used[0]; nxt = used[1]; prv = used[2];
        place(0, false);
        refreshChrome();
      }

      function refreshChrome() {
        qPill.textContent = "صفحة " + page;
        var on = lsJSON("quranMarks", []).some(function (m) { return m.p === page; });
        qBm.className = "qr-btn" + (on ? " on" : "");
        qBm.innerHTML = on ? BM_IN : BM_OUT;
        var m = cur && cur.mode;
        qHint.textContent = "اسحب الصفحة يمينًا للصفحة التالية، ويسارًا للسابقة" +
          (m === "exact" ? " · مصحف المدينة" : m === "unicode" ? " · نمط الخط البديل" : m === "fitted" ? " · نمط احتياطي" : "");
      }

      function turn(dir) {
        var tp = page + dir;
        if (tp < 1 || tp > TOTAL) { place(0, true); return; }
        place(dir > 0 ? W : -W, true);
        setTimeout(function () {
          page = tp;
          ctx.setPage(page);
          assign(page);
        }, 290);
      }

      /* السحب باليد (وبالماوس) */
      var drag = null;
      stage.addEventListener("pointerdown", function (e) {
        if (e.pointerType === "mouse" && e.button !== 0) return;
        drag = { x: e.clientX, y: e.clientY, t: Date.now(), dx: 0, active: false, id: e.pointerId };
      });
      stage.addEventListener("pointermove", function (e) {
        if (!drag) return;
        var dx = e.clientX - drag.x, dy = e.clientY - drag.y;
        if (!drag.active) {
          if (Math.abs(dx) > 10 && Math.abs(dx) > Math.abs(dy) * 1.2) {
            drag.active = true;
            try { stage.setPointerCapture(e.pointerId); } catch (err) {}
          } else { return; }
        }
        if ((dx > 0 && page >= TOTAL) || (dx < 0 && page <= 1)) dx *= 0.25;
        drag.dx = dx;
        place(dx, false);
      });
      function endDrag() {
        if (!drag) return;
        var d = drag; drag = null;
        if (!d.active) return;
        var v = d.dx / Math.max(1, Date.now() - d.t);
        if (d.dx > W * 0.22 || (d.dx > 40 && v > 0.5)) turn(+1);
        else if (d.dx < -W * 0.22 || (d.dx < -40 && v < -0.5)) turn(-1);
        else place(0, true);
      }
      stage.addEventListener("pointerup", endDrag);
      stage.addEventListener("pointercancel", endDrag);

      function onKey(e) {
        if (!document.body.contains(stage)) { document.removeEventListener("keydown", onKey); return; }
        if (e.key === "ArrowLeft") turn(+1);
        else if (e.key === "ArrowRight") turn(-1);
      }
      document.addEventListener("keydown", onKey);

      var rzTimer = null;
      function onResize() {
        if (!document.body.contains(stage)) { window.removeEventListener("resize", onResize); return; }
        clearTimeout(rzTimer);
        rzTimer = setTimeout(function () {
          var ow = W, oh = H;
          sizeStage();
          if (ow === W && oh === H) return;
          panels.forEach(function (p) { p.page = null; p.mode = ""; });
          assign(page);
        }, 200);
      }
      window.addEventListener("resize", onResize);
      window.addEventListener("orientationchange", onResize);

      document.getElementById("qrIdx").addEventListener("click", ctx.showIndex);
      qPill.addEventListener("click", function () {
        var v = toNumber(prompt("اذهب إلى صفحة (١ - ٦٠٤):", page));
        if (v >= 1 && v <= TOTAL) { page = v; ctx.setPage(page); assign(page); }
      });
      qBm.addEventListener("click", function () {
        var arr = lsJSON("quranMarks", []);
        var k = -1;
        for (var i = 0; i < arr.length; i++) if (arr[i].p === page) k = i;
        if (k >= 0) arr.splice(k, 1); else arr.push({ p: page, s: cur ? cur.surah : "" });
        arr.sort(function (a, b) { return a.p - b.p; });
        lsSet("quranMarks", JSON.stringify(arr));
        refreshChrome();
      });

      window.scrollTo(0, 0);
      sizeStage();
      for (var i = 0; i < 3; i++) panels.push(createPanel());
      assign(page);
  };
})();
