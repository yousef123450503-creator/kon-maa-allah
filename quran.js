(function () {
  // خط المصحف
  var link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "https://fonts.googleapis.com/css2?family=Amiri+Quran&display=swap";
  document.head.appendChild(link);

  var style = document.createElement("style");
  style.textContent =
    ".q-bar{display:flex;flex-wrap:wrap;gap:10px;align-items:center;justify-content:center;margin-bottom:14px}" +
    ".q-bar select{font-family:inherit;font-size:16px;padding:9px;border:1px solid #0b3d91;border-radius:10px;color:#0b3d91;background:#fff;max-width:100%}" +
    ".q-go{display:flex;gap:6px;align-items:center}" +
    ".q-go input{width:80px;font-family:inherit;font-size:16px;padding:9px;border:1px solid #0b3d91;border-radius:10px;color:#0b3d91;text-align:center}" +
    ".q-btn{font-family:inherit;font-size:16px;padding:9px 16px;border:none;border-radius:10px;background:#0b3d91;color:#fff;cursor:pointer}" +
    ".q-btn.light{background:#fff;color:#0b3d91;border:1px solid #0b3d91}" +
    ".q-info{font-size:16px;margin-bottom:12px;opacity:.85}" +
    ".q-page{background:#fffdf7;border:1px solid #e3d9b8;border-radius:14px;padding:22px 18px;font-family:'Amiri Quran','Amiri',serif;line-height:2.5;text-align:justify;direction:rtl;color:#1a1a1a}" +
    ".q-surah{background:#0b3d91;color:#fff;border-radius:10px;text-align:center;padding:8px;margin:14px 0;font-size:1.1em}" +
    ".q-bism{text-align:center;margin:8px 0 14px}" +
    ".q-flow{margin:0}" +
    ".q-no{color:#0b3d91;font-size:.75em;margin:0 4px}" +
    ".q-nav{display:flex;justify-content:space-between;margin-top:16px}" +
    ".q-err{text-align:center;line-height:2}";
  document.head.appendChild(style);

  var API = "https://api.alquran.cloud/v1";
  var BISMILLAH = "بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ";
  var TOTAL = 604;

  function toAr(n) {
    return String(n).replace(/\d/g, function (d) { return "٠١٢٣٤٥٦٧٨٩".charAt(d); });
  }

  function toNumber(text) {
    var s = String(text || "").replace(/[٠-٩]/g, function (d) { return "٠١٢٣٤٥٦٧٨٩".indexOf(d); });
    var n = parseInt(s, 10);
    return isNaN(n) ? 0 : n;
  }

  // إزالة التشكيل للمقارنة فقط
  function norm(s) {
    return s.replace(/[\u064B-\u065F\u0670\u0640\u06D6-\u06ED]/g, "").replace(/ٱ/g, "ا");
  }

  // بعض النسخ تضع البسملة في أول آية السورة، فنفصلها ونعرضها بشكل مستقل
  function stripBismillah(text) {
    var words = text.trim().split(/\s+/);
    if (words.length > 4 && norm(words.slice(0, 4).join(" ")) === "بسم الله الرحمن الرحيم") {
      return words.slice(4).join(" ");
    }
    return text;
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

  function loadSaved(name, def) {
    try {
      var v = parseInt(localStorage.getItem(name), 10);
      return isNaN(v) ? def : v;
    } catch (e) {
      return def;
    }
  }

  function saveValue(name, v) {
    try { localStorage.setItem(name, String(v)); } catch (e) {}
  }

  window.SECTIONS = window.SECTIONS || {};

  window.SECTIONS["القرآن الكريم"] = function (target) {
    var page = Math.min(Math.max(loadSaved("quranPage", 1), 1), TOTAL);
    var fontSize = Math.min(Math.max(loadSaved("quranFont", 28), 18), 48);
    var reqId = 0;

    target.innerHTML =
      '<div class="q-bar">' +
      '<select id="qSurah"><option>جاري تحميل السور...</option></select>' +
      '<div class="q-go"><input id="qPage" type="text" inputmode="numeric">' +
      '<button class="q-btn" data-action="go">اذهب</button></div>' +
      '<div class="q-go"><button class="q-btn light" data-action="fm">أ−</button>' +
      '<button class="q-btn light" data-action="fp">أ+</button></div>' +
      "</div>" +
      '<div class="q-info" id="qInfo"></div>' +
      '<div class="q-page" id="qText"></div>' +
      '<div class="q-nav">' +
      '<button class="q-btn" data-action="prev">→ السابق</button>' +
      '<button class="q-btn" data-action="next">التالي ←</button>' +
      "</div>";

    var qText = document.getElementById("qText");
    var qInfo = document.getElementById("qInfo");
    var qPage = document.getElementById("qPage");
    var qSurah = document.getElementById("qSurah");

    // فهرس السور
    getJSON(API + "/surah")
      .then(function (j) {
        qSurah.innerHTML = '<option value="">اختر السورة...</option>';
        j.data.forEach(function (s) {
          var opt = document.createElement("option");
          opt.value = s.number;
          opt.textContent = toAr(s.number) + ". " + s.name;
          qSurah.appendChild(opt);
        });
      })
      .catch(function () {
        qSurah.innerHTML = '<option value="">تعذّر تحميل الفهرس</option>';
      });

    qSurah.onchange = function () {
      var n = parseInt(qSurah.value, 10);
      if (!n) return;
      getJSON(API + "/ayah/" + n + ":1")
        .then(function (j) { goTo(j.data.page); })
        .catch(function () {
          qText.innerHTML = '<div class="q-err">تعذّر فتح السورة. تأكد من الإنترنت وحاول مرة تانية.</div>';
        });
    };

    function goTo(n) {
      page = Math.min(Math.max(n, 1), TOTAL);
      saveValue("quranPage", page);
      render();
    }

    function newFlow() {
      var d = document.createElement("div");
      d.className = "q-flow";
      return d;
    }

    function draw(data) {
      qText.innerHTML = "";
      qText.style.fontSize = fontSize + "px";
      var flow = newFlow();
      qText.appendChild(flow);

      data.ayahs.forEach(function (a) {
        var text = a.text;
        var sNum = a.surah ? a.surah.number : 0;

        if (a.numberInSurah === 1 && a.surah) {
          if (flow.childNodes.length === 0) {
            qText.removeChild(flow);
          }
          var banner = document.createElement("div");
          banner.className = "q-surah";
          banner.textContent = a.surah.name;
          qText.appendChild(banner);

          if (sNum !== 1 && sNum !== 9) {
            var b = document.createElement("div");
            b.className = "q-bism";
            b.textContent = BISMILLAH;
            qText.appendChild(b);
            text = stripBismillah(text);
          }
          flow = newFlow();
          qText.appendChild(flow);
        }

        var span = document.createElement("span");
        span.textContent = text + " ";
        flow.appendChild(span);

        var no = document.createElement("span");
        no.className = "q-no";
        no.textContent = "﴿" + toAr(a.numberInSurah) + "﴾";
        flow.appendChild(no);
      });

      var juz = data.ayahs.length ? data.ayahs[0].juz : "";
      qInfo.textContent = (juz ? "الجزء " + toAr(juz) + " · " : "") + "صفحة " + toAr(page) + " من " + toAr(TOTAL);
      qPage.value = page;
      window.scrollTo(0, 0);
    }

    function render() {
      var my = ++reqId;
      qText.textContent = "جاري التحميل...";
      getPage(page)
        .then(function (data) {
          if (my !== reqId) return;
          draw(data);
        })
        .catch(function () {
          if (my !== reqId) return;
          qText.innerHTML =
            '<div class="q-err">تعذّر تحميل الصفحة. تأكد من الإنترنت وحاول مرة تانية.<br>' +
            '<button class="q-btn" data-action="retry">إعادة المحاولة</button></div>';
        });
    }

    target.onclick = function (e) {
      var el = e.target;
      while (el && el !== target && !el.getAttribute("data-action")) {
        el = el.parentNode;
      }
      if (!el || el === target) return;
      var action = el.getAttribute("data-action");

      if (action === "next") goTo(page + 1);
      else if (action === "prev") goTo(page - 1);
      else if (action === "retry") render();
      else if (action === "go") {
        var n = toNumber(qPage.value);
        if (n >= 1 && n <= TOTAL) goTo(n);
      } else if (action === "fp") {
        fontSize = Math.min(fontSize + 2, 48);
        saveValue("quranFont", fontSize);
        qText.style.fontSize = fontSize + "px";
      } else if (action === "fm") {
        fontSize = Math.max(fontSize - 2, 18);
        saveValue("quranFont", fontSize);
        qText.style.fontSize = fontSize + "px";
      }
    };

    render();
  };
})();
