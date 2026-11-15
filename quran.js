(function () {
  // خط المصحف
  var link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "https://fonts.googleapis.com/css2?family=Amiri+Quran&display=swap";
  document.head.appendChild(link);

  var style = document.createElement("style");
  style.textContent =
    ".page-box.bare{background:transparent!important;border:none!important;box-shadow:none!important;padding:0!important}" +
    ".qx-search{display:flex;align-items:center;gap:10px;background:#EAF3FF;border-radius:18px;padding:12px 16px;box-shadow:inset 0 0 0 1px #d6e6fb}" +
    ".qx-search input{flex:1;border:none;background:transparent;font-family:inherit;font-size:16px;color:#1554A6;outline:none;min-width:0}" +
    ".qx-search input::placeholder{color:#7f9bc4}" +
    ".qx-tabs{display:flex;gap:8px;margin:12px 0}" +
    ".qx-tabs button{flex:1;border:none;border-radius:14px;padding:9px;font-family:inherit;font-size:15px;font-weight:700;background:#fff;color:#687589;box-shadow:0 2px 8px rgba(21,84,166,.08);cursor:pointer}" +
    ".qx-tabs button.on{background:#1554A6;color:#fff}" +
    ".qx-resume{display:flex;align-items:center;justify-content:space-between;gap:10px;background:linear-gradient(100deg,#2878D4,#1554A6);color:#fff;border-radius:20px;padding:14px 16px;margin-bottom:12px;cursor:pointer;box-shadow:0 8px 22px rgba(21,84,166,.25);text-align:right}" +
    ".qx-resume b{font-size:16px;display:block}.qx-resume small{font-size:13px;opacity:.9}" +
    ".qx-resume span.go{background:rgba(255,255,255,.2);border-radius:14px;padding:6px 14px;font-weight:700;font-size:14px;white-space:nowrap}" +
    ".qx-list{background:#fff;border-radius:22px;border:1px solid #e1ecfb;box-shadow:0 6px 22px rgba(21,84,166,.08);padding:4px 14px}" +
    ".qx-row{display:flex;align-items:center;gap:14px;padding:12px 0;border-bottom:1px solid #eef3fb;cursor:pointer;text-align:right}" +
    ".qx-row:last-child{border-bottom:none}" +
    ".qx-num{width:44px;height:44px;border-radius:14px;background:#EAF3FF;color:#1554A6;display:flex;align-items:center;justify-content:center;font-size:18px;font-weight:800;flex:none}" +
    ".qx-info{flex:1;min-width:0}" +
    ".qx-name{font-size:17px;font-weight:800;color:#1554A6}" +
    ".qx-cnt{font-size:13px;color:#687589;margin-top:1px}" +
    ".qx-bm{border:none;background:transparent;cursor:pointer;padding:8px;color:#1554A6;font-size:0;line-height:0}" +
    ".qx-bm svg{width:22px;height:22px}" +
    ".qx-empty{padding:26px 8px;color:#687589;text-align:center;font-size:15px;line-height:2}" +
    ".qx-sub{font-size:13px;color:#687589;margin:10px 4px 2px;text-align:right;font-weight:700}" +
    ".qr-top{display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:10px}" +
    ".qr-btn{border:none;background:#fff;color:#1554A6;font-family:inherit;font-size:14px;font-weight:700;border-radius:14px;padding:9px 16px;box-shadow:0 3px 10px rgba(21,84,166,.12);cursor:pointer;display:inline-flex;align-items:center;gap:6px}" +
    ".qr-btn.on{background:#1554A6;color:#fff}" +
    ".qr-btn svg{width:18px;height:18px}" +
    ".qr-stage{position:relative;overflow:hidden;touch-action:pan-y;user-select:none;-webkit-user-select:none;border-radius:10px}" +
    ".qr-panel{position:absolute;top:0;left:0;width:100%;will-change:transform}" +
    ".mp{background:repeating-linear-gradient(135deg,#7cc4e6 0 4px,#bfe6f5 4px 8px);border:1.5px solid #1b5f8a;padding:7px;box-shadow:0 8px 24px rgba(21,84,166,.16)}" +
    ".mp-in{background:#fff;border:1.5px solid #1b5f8a;padding:6px 10px 4px}" +
    ".mp-head{display:flex;justify-content:space-between;align-items:center;height:30px;margin-bottom:4px}" +
    ".mp-tag{border:1.3px solid #2b7aa8;background:#eef8fc;color:#164a73;font-family:'Tajawal',sans-serif;font-size:12px;font-weight:700;padding:2px 12px;border-radius:5px;min-width:78px;text-align:center}" +
    ".mp-body{font-family:'Amiri Quran','Amiri',serif;color:#111;direction:rtl;overflow:hidden}" +
    ".mp-seg{margin:0;text-align:justify;text-align-last:justify}" +
    ".mp-seg.end{text-align-last:center}" +
    ".mp-sparse .mp-seg{text-align:center;text-align-last:center}" +
    ".mp-ban{display:flex;align-items:center;justify-content:center;font-size:.92em;font-weight:700;color:#164a73;background:linear-gradient(180deg,#eef8fc,#d8eef8);border:1.4px solid #2b7aa8;border-radius:6px;box-shadow:inset 0 0 0 2px #fff,inset 0 0 0 3px #8fc6e0}" +
    ".mp-bsm{display:flex;align-items:center;justify-content:center}" +
    ".mp-no{display:inline-flex;align-items:center;justify-content:center;width:1.5em;height:1.5em;border:1.3px solid #2a7bb0;border-radius:50%;color:#164a73;font-size:.52em;font-family:'Tajawal',sans-serif;font-weight:700;margin:0 .3em;vertical-align:middle;line-height:1;background:#f2fafe}" +
    ".nw{white-space:nowrap}" +
    ".mp-foot{display:flex;justify-content:center;align-items:center;height:32px;margin-top:2px}" +
    ".mp-num{min-width:44px;text-align:center;padding:2px 12px;border:1.3px solid #2b7aa8;background:#eef8fc;color:#164a73;font-family:'Tajawal',sans-serif;font-size:14px;font-weight:800;border-radius:12px}" +
    ".mp-load{display:flex;align-items:center;justify-content:center;height:100%;font-family:'Tajawal',sans-serif;font-size:15px;color:#687589;text-align:center;line-height:2;padding:0 14px}" +
    ".qr-retry{margin-top:8px;border:none;background:#1554A6;color:#fff;border-radius:14px;padding:9px 20px;font-family:inherit;font-size:15px;font-weight:700;cursor:pointer}" +
    ".qr-hint{text-align:center;font-size:12.5px;color:#687589;margin-top:10px}";
  document.head.appendChild(style);

  var API = "https://api.alquran.cloud/v1";
  var BISMILLAH = "بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ";
  var TOTAL = 604;

  // أسماء السور وعدد آياتها
  var SURAHS = [
    ["الفاتحة",7],["البقرة",286],["آل عمران",200],["النساء",176],["المائدة",120],["الأنعام",165],
    ["الأعراف",206],["الأنفال",75],["التوبة",129],["يونس",109],["هود",123],["يوسف",111],
    ["الرعد",43],["إبراهيم",52],["الحجر",99],["النحل",128],["الإسراء",111],["الكهف",110],
    ["مريم",98],["طه",135],["الأنبياء",112],["الحج",78],["المؤمنون",118],["النور",64],
    ["الفرقان",77],["الشعراء",227],["النمل",93],["القصص",88],["العنكبوت",69],["الروم",60],
    ["لقمان",34],["السجدة",30],["الأحزاب",73],["سبأ",54],["فاطر",45],["يس",83],
    ["الصافات",182],["ص",88],["الزمر",75],["غافر",85],["فصلت",54],["الشورى",53],
    ["الزخرف",89],["الدخان",59],["الجاثية",37],["الأحقاف",35],["محمد",38],["الفتح",29],
    ["الحجرات",18],["ق",45],["الذاريات",60],["الطور",49],["النجم",62],["القمر",55],
    ["الرحمن",78],["الواقعة",96],["الحديد",29],["المجادلة",22],["الحشر",24],["الممتحنة",13],
    ["الصف",14],["الجمعة",11],["المنافقون",11],["التغابن",18],["الطلاق",12],["التحريم",12],
    ["الملك",30],["القلم",52],["الحاقة",52],["المعارج",44],["نوح",28],["الجن",28],
    ["المزمل",20],["المدثر",56],["القيامة",40],["الإنسان",31],["المرسلات",50],["النبأ",40],
    ["النازعات",46],["عبس",42],["التكوير",29],["الانفطار",19],["المطففين",36],["الانشقاق",25],
    ["البروج",22],["الطارق",17],["الأعلى",19],["الغاشية",26],["الفجر",30],["البلد",20],
    ["الشمس",15],["الليل",21],["الضحى",11],["الشرح",8],["التين",8],["العلق",19],
    ["القدر",5],["البينة",8],["الزلزلة",8],["العاديات",11],["القارعة",11],["التكاثر",8],
    ["العصر",3],["الهمزة",9],["الفيل",5],["قريش",4],["الماعون",7],["الكوثر",3],
    ["الكافرون",6],["النصر",3],["المسد",5],["الإخلاص",4],["الفلق",5],["الناس",6]
  ];

  var BM_OUT = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1z"/></svg>';
  var BM_IN = '<svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1z"/></svg>';
  var SEARCH_SVG = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1554A6" stroke-width="2.2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>';

  function toAr(n) {
    return String(n).replace(/\d/g, function (d) { return "٠١٢٣٤٥٦٧٨٩".charAt(d); });
  }
  function toNumber(text) {
    var s = String(text || "").replace(/[٠-٩]/g, function (d) { return "٠١٢٣٤٥٦٧٨٩".indexOf(d); });
    var n = parseInt(s, 10);
    return isNaN(n) ? 0 : n;
  }
  function norm(s) {
    return String(s)
      .replace(/[\u064B-\u065F\u0670\u0640\u06D6-\u06ED]/g, "")
      .replace(/[أإآٱ]/g, "ا")
      .replace(/ة/g, "ه")
      .replace(/ى/g, "ي")
      .trim();
  }
  function stripBismillah(text) {
    var words = text.trim().split(/\s+/);
    if (words.length > 4 && norm(words.slice(0, 4).join(" ")) === "بسم الله الرحمن الرحيم") {
      return words.slice(4).join(" ");
    }
    return text;
  }
  function countText(n) {
    return n + (n >= 3 && n <= 10 ? " آيات" : " آية");
  }

  function lsGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function lsSet(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  function lsJSON(k, def) {
    try { var v = JSON.parse(lsGet(k)); return v === null || v === undefined ? def : v; } catch (e) { return def; }
  }
  function lsInt(k, def) {
    var v = parseInt(lsGet(k), 10);
    return isNaN(v) ? def : v;
  }

  function getJSON(url) {
    return fetch(url).then(function (r) {
      if (!r.ok) throw new Error("http " + r.status);
      return r.json();
    });
  }

  var cache = {};
  function getPage(n) {
    if (cache[n]) return Promise.resolve(cache[n]);
    return getJSON(API + "/page/" + n + "/quran-uthmani").then(function (j) {
      cache[n] = j.data;
      return j.data;
    });
  }

  // صفحة بداية كل سورة (تُجلب مرة واحدة وتُحفظ)
  function surahStart(n) {
    var starts = lsJSON("quranStarts", {});
    if (starts[n]) return Promise.resolve(starts[n]);
    return getJSON(API + "/ayah/" + n + ":1").then(function (j) {
      starts[n] = j.data.page;
      lsSet("quranStarts", JSON.stringify(starts));
      return j.data.page;
    });
  }

  window.SECTIONS = window.SECTIONS || {};

  window.SECTIONS["القرآن الكريم"] = function (target) {
    // إزالة صندوق القسم الأبيض لهذا القسم فقط
    var box = target.parentNode;
    var titleEl = document.getElementById("sectionTitle");
    if (box && box.classList) {
      box.classList.add("bare");
      if (titleEl && window.MutationObserver) {
        var mo = new MutationObserver(function () {
          if (titleEl.textContent !== "القرآن الكريم") {
            box.classList.remove("bare");
            mo.disconnect();
          }
        });
        mo.observe(titleEl, { childList: true, characterData: true, subtree: true });
      }
    }

    var page = Math.min(Math.max(lsInt("quranPage", 1), 1), TOTAL);
    var hasSaved = lsGet("quranPage") !== null;
    var tab = "all";
    var query = "";
    var reqId = 0;

    /* ========== فهرس السور ========== */
    function showIndex() {
      reqId++;
      target.onclick = null;
      target.innerHTML =
        '<div class="qx-search">' + SEARCH_SVG + '<input id="qxS" type="text" placeholder="ابحث عن سورة..." autocomplete="off"></div>' +
        '<div class="qx-tabs"><button data-tab="all">السور</button><button data-tab="saved">المحفوظات</button></div>' +
        '<div id="qxResume"></div><div id="qxList"></div>';

      var input = document.getElementById("qxS");
      input.value = query;
      input.addEventListener("input", function () { query = input.value; renderList(); });

      var tabBtns = target.querySelectorAll(".qx-tabs button");
      for (var i = 0; i < tabBtns.length; i++) {
        tabBtns[i].addEventListener("click", function () {
          tab = this.getAttribute("data-tab");
          renderList();
        });
      }

      // بطاقة متابعة القراءة
      var res = document.getElementById("qxResume");
      if (hasSaved) {
        var rc = document.createElement("div");
        rc.className = "qx-resume";
        rc.innerHTML = '<div><b>متابعة القراءة</b><small>آخر موضع: صفحة ' + page + '</small></div><span class="go">فتح ←</span>';
        rc.addEventListener("click", function () { showReader(); });
        res.appendChild(rc);
      }
      renderList();
    }

    function openSurah(n, rowEl) {
      if (rowEl) rowEl.style.opacity = ".55";
      surahStart(n).then(function (p) {
        page = p;
        lsSet("quranPage", String(page));
        hasSaved = true;
        showReader();
      }).catch(function () {
        if (rowEl) rowEl.style.opacity = "";
        var list = document.getElementById("qxList");
        if (list) {
          var m = document.createElement("div");
          m.className = "qx-empty";
          m.textContent = "تعذّر فتح السورة. تأكد من الإنترنت وحاول مرة تانية.";
          list.insertBefore(m, list.firstChild);
        }
      });
    }

    function renderList() {
      var tabBtns = target.querySelectorAll(".qx-tabs button");
      for (var t = 0; t < tabBtns.length; t++) {
        tabBtns[t].className = tabBtns[t].getAttribute("data-tab") === tab ? "on" : "";
      }
      var favs = lsJSON("quranFavSurahs", []);
      var marks = lsJSON("quranMarks", []);
      var out = document.getElementById("qxList");
      out.innerHTML = "";
      var q = norm(query);

      function surahRow(i) {
        var n = i + 1;
        var row = document.createElement("div");
        row.className = "qx-row";
        var isFav = favs.indexOf(n) >= 0;
        row.innerHTML =
          '<div class="qx-num">' + n + '</div>' +
          '<div class="qx-info"><div class="qx-name">' + SURAHS[i][0] + '</div><div class="qx-cnt">' + countText(SURAHS[i][1]) + '</div></div>' +
          '<button class="qx-bm" aria-label="حفظ السورة">' + (isFav ? BM_IN : BM_OUT) + '</button>';
        row.addEventListener("click", function () { openSurah(n, row); });
        row.querySelector(".qx-bm").addEventListener("click", function (e) {
          e.stopPropagation();
          var f = lsJSON("quranFavSurahs", []);
          var k = f.indexOf(n);
          if (k >= 0) f.splice(k, 1); else f.push(n);
          lsSet("quranFavSurahs", JSON.stringify(f));
          renderList();
        });
        return row;
      }

      if (tab === "all") {
        var list = document.createElement("div");
        list.className = "qx-list";
        var shown = 0;
        for (var i = 0; i < SURAHS.length; i++) {
          if (q && norm(SURAHS[i][0]).indexOf(q) < 0 && String(i + 1) !== toNumber(q).toString()) continue;
          list.appendChild(surahRow(i));
          shown++;
        }
        if (!shown) {
          var e = document.createElement("div");
          e.className = "qx-empty";
          e.textContent = "لا توجد سورة بهذا الاسم.";
          list.appendChild(e);
        }
        out.appendChild(list);
      } else {
        var wrapper = document.createElement("div");
        var hasAny = false;

        if (favs.length) {
          hasAny = true;
          var s1 = document.createElement("div"); s1.className = "qx-sub"; s1.textContent = "سور محفوظة";
          wrapper.appendChild(s1);
          var l1 = document.createElement("div"); l1.className = "qx-list";
          favs.slice().sort(function (a, b) { return a - b; }).forEach(function (n) {
            if (SURAHS[n - 1]) l1.appendChild(surahRow(n - 1));
          });
          wrapper.appendChild(l1);
        }
        if (marks.length) {
          hasAny = true;
          var s2 = document.createElement("div"); s2.className = "qx-sub"; s2.textContent = "صفحات محفوظة";
          wrapper.appendChild(s2);
          var l2 = document.createElement("div"); l2.className = "qx-list";
          marks.forEach(function (m) {
            var row = document.createElement("div");
            row.className = "qx-row";
            row.innerHTML =
              '<div class="qx-num">' + m.p + '</div>' +
              '<div class="qx-info"><div class="qx-name">صفحة ' + m.p + '</div><div class="qx-cnt">' + (m.s ? "سورة " + m.s : "") + '</div></div>' +
              '<button class="qx-bm" aria-label="إزالة">' + BM_IN + '</button>';
            row.addEventListener("click", function () {
              page = m.p; lsSet("quranPage", String(page)); hasSaved = true; showReader();
            });
            row.querySelector(".qx-bm").addEventListener("click", function (e) {
              e.stopPropagation();
              var arr = lsJSON("quranMarks", []).filter(function (x) { return x.p !== m.p; });
              lsSet("quranMarks", JSON.stringify(arr));
              renderList();
            });
            l2.appendChild(row);
          });
          wrapper.appendChild(l2);
        }
        if (!hasAny) {
          var emp = document.createElement("div");
          emp.className = "qx-list";
          emp.innerHTML = '<div class="qx-empty">لا يوجد شيء محفوظ بعد.<br>اضغط على علامة الحفظ بجوار السورة، أو داخل صفحة المصحف.</div>';
          wrapper.appendChild(emp);
        }
        out.appendChild(wrapper);
      }
    }

    /* ========== صفحة القراءة (صفحة المصحف) ========== */
    function showReader() {
      reqId++;
      target.onclick = null;
      target.innerHTML =
        '<div class="qr-top">' +
        '<button class="qr-btn" id="qrIdx">☰ الفهرس</button>' +
        '<button class="qr-btn" id="qrPill">صفحة 1</button>' +
        '<button class="qr-btn" id="qrBm" aria-label="حفظ الصفحة"></button>' +
        '</div>' +
        '<div class="qr-stage" id="qrStage"></div>' +
        '<div class="qr-hint">اسحب الصفحة يمينًا للصفحة التالية، ويسارًا للصفحة السابقة</div>';

      var stage = document.getElementById("qrStage");
      var qPill = document.getElementById("qrPill");
      var qBm = document.getElementById("qrBm");
      var W = 0, Lh = 30;
      var panels = [];
      var cur = null, nxt = null, prv = null;

      var JUZ = ["الأول", "الثاني", "الثالث", "الرابع", "الخامس", "السادس", "السابع", "الثامن", "التاسع", "العاشر",
        "الحادي عشر", "الثاني عشر", "الثالث عشر", "الرابع عشر", "الخامس عشر", "السادس عشر", "السابع عشر", "الثامن عشر",
        "التاسع عشر", "العشرون", "الحادي والعشرون", "الثاني والعشرون", "الثالث والعشرون", "الرابع والعشرون",
        "الخامس والعشرون", "السادس والعشرون", "السابع والعشرون", "الثامن والعشرون", "التاسع والعشرون", "الثلاثون"];

      var fontReady = Promise.race([
        (document.fonts && document.fonts.load) ? document.fonts.load('20px "Amiri Quran"') : Promise.resolve(),
        new Promise(function (res) { setTimeout(res, 2500); })
      ]).catch(function () {});

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
          el: el, page: null, data: null, surah: "",
          body: el.querySelector(".mp-body"), juz: el.querySelector(".mp-juz"),
          sur: el.querySelector(".mp-sur"), num: el.querySelector(".mp-num")
        };
      }

      function measure() {
        W = stage.clientWidth;
        var p = panels[0];
        var bodyW = p.body.clientWidth || (W - 40);
        Lh = Math.max(28, Math.min(40, Math.round(bodyW * 0.108)));
        panels.forEach(function (q) { q.body.style.height = (15 * Lh) + "px"; });
        stage.style.height = p.el.offsetHeight + "px";
      }

      function juzName(j) { return JUZ[j - 1] || ""; }

      /* توزيع كلمات الصفحة على ١٥ سطرًا */
      function layout(panel, data) {
        var body = panel.body;
        body.innerHTML = "";
        body.style.fontSize = "16px";
        var blocks = [];
        var curBlock = null;
        data.ayahs.forEach(function (a) {
          var sNum = a.surah ? a.surah.number : 0;
          var text = a.text;
          if (a.numberInSurah === 1 && sNum && SURAHS[sNum - 1]) {
            blocks.push({ t: "banner", name: SURAHS[sNum - 1][0] });
            if (sNum !== 1 && sNum !== 9) {
              blocks.push({ t: "bism" });
              text = stripBismillah(text);
            }
            curBlock = null;
          }
          if (!curBlock) { curBlock = { t: "text", items: [] }; blocks.push(curBlock); }
          var words = text.trim().split(/\s+/).filter(Boolean);
          words.forEach(function (w, i) {
            curBlock.items.push({ w: w, n: i === words.length - 1 ? a.numberInSurah : 0 });
          });
        });

        var segEls = [];
        var fixed = 0;
        blocks.forEach(function (b, bi) {
          var el = document.createElement("div");
          if (b.t === "banner") {
            el.className = "mp-ban";
            el.style.height = Lh + "px";
            el.textContent = "سورة " + b.name;
            fixed++;
          } else if (b.t === "bism") {
            el.className = "mp-bsm";
            el.style.height = Lh + "px";
            el.textContent = BISMILLAH;
            fixed++;
          } else {
            el.className = "mp-seg" + ((bi + 1 < blocks.length && blocks[bi + 1].t === "banner") ? " end" : "");
            el.style.lineHeight = Lh + "px";
            b.items.forEach(function (it, k) {
              var w = document.createElement("span");
              w.className = it.n ? "nw" : "";
              w.appendChild(document.createTextNode(it.w));
              if (it.n) {
                var no = document.createElement("span");
                no.className = "mp-no";
                no.textContent = toAr(it.n);
                w.appendChild(no);
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

        var first = data.ayahs[0];
        panel.surah = (first && first.surah && SURAHS[first.surah.number - 1]) ? SURAHS[first.surah.number - 1][0] : "";
        panel.juz.textContent = first ? "الجزء " + juzName(first.juz) : "";
        panel.sur.textContent = panel.surah ? "سورة " + panel.surah : "";
        panel.num.textContent = toAr(panel.page);
      }

      function loadInto(panel, n) {
        panel.page = n;
        panel.data = null;
        panel.body.innerHTML = '<div class="mp-load">جاري التحميل...</div>';
        panel.juz.textContent = ""; panel.sur.textContent = ""; panel.num.textContent = toAr(n);
        getPage(n).then(function (data) {
          return fontReady.then(function () {
            if (panel.page !== n) return;
            panel.data = data;
            layout(panel, data);
            if (panel === cur) refreshChrome();
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
            if (free[k].page === n) { used[i] = free[k]; free.splice(k, 1); return; }
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
      }

      function turn(dir) {
        var tp = page + dir;
        if (tp < 1 || tp > TOTAL) { place(0, true); return; }
        place(dir > 0 ? W : -W, true);
        setTimeout(function () {
          page = tp;
          lsSet("quranPage", String(page));
          hasSaved = true;
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
          if (stage.clientWidth === W) return;
          panels.forEach(function (p) { p.page = null; });
          W = stage.clientWidth;
          measure();
          assign(page);
        }, 200);
      }
      window.addEventListener("resize", onResize);

      document.getElementById("qrIdx").addEventListener("click", showIndex);
      qPill.addEventListener("click", function () {
        var v = toNumber(prompt("اذهب إلى صفحة (١ - ٦٠٤):", page));
        if (v >= 1 && v <= TOTAL) { page = v; lsSet("quranPage", String(page)); assign(page); }
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

      for (var i = 0; i < 3; i++) panels.push(createPanel());
      measure();
      assign(page);
    }

    showIndex();
  };
})();
