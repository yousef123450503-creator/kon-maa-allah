(function () {
  var style = document.createElement("style");
  style.textContent =
    ".w-card{background:#f3f8ff;border:1px solid #cfe0ff;border-radius:14px;padding:16px;margin-bottom:14px;text-align:right}" +
    ".w-title{font-size:20px;font-weight:700;margin-bottom:8px}" +
    ".w-count{font-size:30px;font-weight:700;margin:6px 0}" +
    ".w-row{display:flex;flex-wrap:wrap;gap:8px;margin-top:8px}" +
    ".w-btn{font-family:inherit;font-size:16px;padding:9px 16px;border:none;border-radius:10px;background:#0b3d91;color:#fff;cursor:pointer}" +
    ".w-btn.light{background:#fff;color:#0b3d91;border:1px solid #0b3d91}" +
    ".w-bar{background:#dce8ff;border-radius:10px;height:18px;overflow:hidden;margin:10px 0}" +
    ".w-fill{background:#0b3d91;height:100%;width:0}" +
    ".w-check{display:flex;align-items:center;justify-content:space-between;background:#fff;border:1px solid #cfe0ff;border-radius:10px;padding:10px 14px;margin-top:8px;cursor:pointer;font-size:18px;font-family:inherit;width:100%;color:#0b3d91}" +
    ".w-check.on{background:#e3f6ea;border-color:#2e8b57}" +
    ".w-done{text-align:center;font-size:20px;font-weight:700;color:#2e8b57;margin-bottom:12px}";
  document.head.appendChild(style);

  function toNumber(text) {
    var s = String(text || "");
    s = s.replace(/[٠-٩]/g, function (d) { return "٠١٢٣٤٥٦٧٨٩".indexOf(d); });
    var n = parseInt(s, 10);
    return isNaN(n) ? 0 : n;
  }

  function key(d) {
    var m = d.getMonth() + 1;
    var day = d.getDate();
    return d.getFullYear() + "-" + (m < 10 ? "0" : "") + m + "-" + (day < 10 ? "0" : "") + day;
  }

  function load() {
    try {
      var d = JSON.parse(localStorage.getItem("wirdData"));
      if (d && d.days && d.goals) return d;
    } catch (e) {}
    return { goals: { quran: 5, istighfar: 100 }, days: {} };
  }

  function save(d) {
    try { localStorage.setItem("wirdData", JSON.stringify(d)); } catch (e) {}
  }

  function getDay(d, k) {
    if (!d.days[k]) {
      d.days[k] = { quran: 0, istighfar: 0, morning: false, evening: false, sleep: false };
    }
    return d.days[k];
  }

  function percent(d, day) {
    if (!day) return 0;
    var g = d.goals;
    var parts = [
      Math.min(day.quran / g.quran, 1),
      Math.min(day.istighfar / g.istighfar, 1),
      day.morning ? 1 : 0,
      day.evening ? 1 : 0,
      day.sleep ? 1 : 0
    ];
    var sum = 0;
    for (var i = 0; i < parts.length; i++) sum += parts[i];
    return Math.round((sum / parts.length) * 100);
  }

  function streak(d) {
    var count = 0;
    var dt = new Date();
    if (percent(d, d.days[key(dt)]) < 100) dt.setDate(dt.getDate() - 1);
    while (percent(d, d.days[key(dt)]) === 100) {
      count++;
      dt.setDate(dt.getDate() - 1);
    }
    return count;
  }

  window.SECTIONS = window.SECTIONS || {};

  window.SECTIONS["وردي اليومي"] = function (target) {
    var data = load();

    function draw() {
      var today = getDay(data, key(new Date()));
      var g = data.goals;
      var pct = percent(data, today);

      function check(k, label) {
        return '<button class="w-check ' + (today[k] ? "on" : "") + '" data-action="tog" data-key="' + k + '">' +
          "<span>" + label + "</span><span>" + (today[k] ? "✓" : "○") + "</span></button>";
      }

      var html = "";
      if (pct === 100) {
        html += '<div class="w-done">ما شاء الله، أتممت وردك اليوم. تقبّل الله منك 🤍</div>';
      }
      html +=
        '<div class="w-card"><div class="w-title">إنجاز اليوم: ' + pct + "%</div>" +
        '<div class="w-bar"><div class="w-fill" style="width:' + pct + '%"></div></div>' +
        "<div>أيام متتالية أتممت فيها وردك: <b>" + streak(data) + "</b></div></div>" +

        '<div class="w-card"><div class="w-title">القرآن الكريم</div>' +
        '<div class="w-count">' + today.quran + " / " + g.quran + " صفحة</div>" +
        '<div class="w-row">' +
        '<button class="w-btn" data-action="q+">+ صفحة</button>' +
        '<button class="w-btn light" data-action="q-">− صفحة</button>' +
        '<button class="w-btn light" data-action="qgoal">تعديل الهدف</button></div></div>' +

        '<div class="w-card"><div class="w-title">الأذكار</div>' +
        check("morning", "أذكار الصباح") +
        check("evening", "أذكار المساء") +
        check("sleep", "أذكار النوم") + "</div>" +

        '<div class="w-card"><div class="w-title">الاستغفار</div>' +
        '<div class="w-count">' + today.istighfar + " / " + g.istighfar + "</div>" +
        '<div class="w-row">' +
        '<button class="w-btn" data-action="i1">+1</button>' +
        '<button class="w-btn" data-action="i10">+10</button>' +
        '<button class="w-btn light" data-action="i0">تصفير</button>' +
        '<button class="w-btn light" data-action="igoal">تعديل الهدف</button></div></div>';

      target.innerHTML = html;
    }

    target.onclick = function (e) {
      var el = e.target;
      while (el && el !== target && !el.getAttribute("data-action")) {
        el = el.parentNode;
      }
      if (!el || el === target) return;

      var action = el.getAttribute("data-action");
      var today = getDay(data, key(new Date()));

      if (action === "q+") today.quran++;
      else if (action === "q-") today.quran = Math.max(0, today.quran - 1);
      else if (action === "i1") today.istighfar += 1;
      else if (action === "i10") today.istighfar += 10;
      else if (action === "i0") today.istighfar = 0;
      else if (action === "tog") {
        var k = el.getAttribute("data-key");
        today[k] = !today[k];
      } else if (action === "qgoal") {
        var a = toNumber(prompt("كم صفحة هدفك اليومي من القرآن؟", data.goals.quran));
        if (a > 0) data.goals.quran = a;
      } else if (action === "igoal") {
        var b = toNumber(prompt("كم مرة هدفك اليومي من الاستغفار؟", data.goals.istighfar));
        if (b > 0) data.goals.istighfar = b;
      }

      save(data);
      draw();
    };

    draw();
  };
})();
