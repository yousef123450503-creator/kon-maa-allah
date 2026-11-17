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
    ".qx-back{margin-top:10px;border:none;background:#1554A6;color:#fff;border-radius:14px;padding:9px 20px;font-family:inherit;font-size:15px;font-weight:700;cursor:pointer}" +
    ".qx-sub{font-size:13px;color:#687589;margin:10px 4px 2px;text-align:right;font-weight:700}";
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

  // مشاركة الأدوات مع ملف صفحة القراءة
  window.QURAN_LIB = {
    SURAHS: SURAHS, BISMILLAH: BISMILLAH, TOTAL: TOTAL, BM_IN: BM_IN, BM_OUT: BM_OUT,
    toAr: toAr, toNumber: toNumber, norm: norm, stripBismillah: stripBismillah,
    lsGet: lsGet, lsSet: lsSet, lsJSON: lsJSON, lsInt: lsInt, getJSON: getJSON, API: API
  };

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

    /* ========== فهرس السور ========== */
    function showIndex() {
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

    /* ========== صفحة القراءة (تُحمَّل من ملف quran-reader.js) ========== */
    function showReader() {
      var ctx = {
        target: target,
        getPage: function () { return page; },
        setPage: function (p) { page = p; hasSaved = true; lsSet("quranPage", String(p)); },
        showIndex: showIndex
      };
      function go() { window.QURAN_READER(ctx); }
      if (window.QURAN_READER) { go(); return; }
      target.innerHTML = '<div class="qx-empty">جاري فتح المصحف...</div>';
      var sc = document.createElement("script");
      sc.src = "quran-reader.js";
      sc.onload = function () { if (window.QURAN_READER) go(); else sc.onerror(); };
      sc.onerror = function () {
        target.innerHTML = '<div class="qx-empty">تعذّر تحميل صفحة المصحف.<br>تأكد أن ملف quran-reader.js موجود في المستودع.<br><button class="qx-back" id="qxBack">رجوع للفهرس</button></div>';
        var b = document.getElementById("qxBack");
        if (b) b.addEventListener("click", showIndex);
      };
      document.head.appendChild(sc);
    }

    showIndex();
  };
})();
