(function () {
  var style = document.createElement("style");
  style.textContent =
    ".p-field{text-align:right;margin-bottom:14px}" +
    ".p-field label{display:block;font-weight:700;margin-bottom:6px}" +
    ".p-field select{width:100%;font-family:inherit;font-size:18px;padding:10px;border:1px solid #0b3d91;border-radius:10px;color:#0b3d91;background:#fff}" +
    ".p-btn{font-family:inherit;font-size:18px;padding:12px 24px;border:none;border-radius:10px;background:#0b3d91;color:#fff;cursor:pointer}" +
    ".p-msg{margin-top:18px;line-height:2}" +
    ".p-list{margin-top:18px}" +
    ".p-row{display:flex;justify-content:space-between;background:#f3f8ff;border:1px solid #cfe0ff;border-radius:12px;padding:12px 18px;margin-bottom:10px;font-size:20px}" +
    ".p-row b{font-weight:700}" +
    ".p-date{font-size:18px;margin-top:18px}" +
    ".p-note{font-size:14px;opacity:.8;margin-top:14px;line-height:1.8}";
  document.head.appendChild(style);

  /* ===== دوال الرياضيات (بالدرجات) ===== */
  var PI = Math.PI;
  function sin(d) { return Math.sin(d * PI / 180); }
  function cos(d) { return Math.cos(d * PI / 180); }
  function tan(d) { return Math.tan(d * PI / 180); }
  function arcsin(x) { return Math.asin(x) * 180 / PI; }
  function arccos(x) { return Math.acos(x) * 180 / PI; }
  function arctan2(y, x) { return Math.atan2(y, x) * 180 / PI; }
  function arccot(x) { return Math.atan(1 / x) * 180 / PI; }
  function fix(a, b) {
    a = a - b * Math.floor(a / b);
    return a < 0 ? a + b : a;
  }
  function fixAngle(a) { return fix(a, 360); }
  function fixHour(a) { return fix(a, 24); }

  /* ===== الحسابات الفلكية ===== */
  function julian(y, m, d) {
    if (m <= 2) { y -= 1; m += 12; }
    var A = Math.floor(y / 100);
    var B = 2 - A + Math.floor(A / 4);
    return Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + d + B - 1524.5;
  }

  function sunPosition(jd) {
    var D = jd - 2451545.0;
    var g = fixAngle(357.529 + 0.98560028 * D);
    var q = fixAngle(280.459 + 0.98564736 * D);
    var L = fixAngle(q + 1.915 * sin(g) + 0.020 * sin(2 * g));
    var e = 23.439 - 0.00000036 * D;
    var RA = arctan2(cos(e) * sin(L), cos(L)) / 15;
    return {
      decl: arcsin(sin(e) * sin(L)),
      eqt: q / 15 - fixHour(RA)
    };
  }

  function midDay(jd, t) {
    return fixHour(12 - sunPosition(jd + t).eqt);
  }

  function sunAngleTime(jd, lat, angle, t, ccw) {
    var decl = sunPosition(jd + t).decl;
    var noon = midDay(jd, t);
    var x = (-sin(angle) - sin(decl) * sin(lat)) / (cos(decl) * cos(lat));
    if (x < -1 || x > 1) return NaN;
    var h = arccos(x) / 15;
    return noon + (ccw ? -h : h);
  }

  function asrTime(jd, lat, factor, t) {
    var decl = sunPosition(jd + t).decl;
    var angle = -arccot(factor + tan(Math.abs(lat - decl)));
    return sunAngleTime(jd, lat, angle, t, false);
  }

  // طرق الحساب
  var METHODS = {
    "4": { fajr: 18.5, ishaMin: 90 },   // أم القرى
    "5": { fajr: 19.5, isha: 17.5 },    // الهيئة المصرية
    "3": { fajr: 18, isha: 17 },        // رابطة العالم الإسلامي
    "2": { fajr: 15, isha: 15 },        // أمريكا الشمالية
    "1": { fajr: 18, isha: 18 }         // كراتشي
  };

  function step(t, jd, lat, m, asrF) {
    var f = {};
    for (var k in t) { f[k] = t[k] / 24; }
    var maghrib = sunAngleTime(jd, lat, 0.833, f.maghrib, false);
    return {
      fajr: sunAngleTime(jd, lat, m.fajr, f.fajr, true),
      sunrise: sunAngleTime(jd, lat, 0.833, f.sunrise, true),
      dhuhr: midDay(jd, f.dhuhr),
      asr: asrTime(jd, lat, asrF, f.asr),
      maghrib: maghrib,
      isha: m.ishaMin ? maghrib + m.ishaMin / 60 : sunAngleTime(jd, lat, m.isha, f.isha, false)
    };
  }

  function calculate(lat, lng, date, methodId, asrF) {
    var m = METHODS[methodId];
    var tz = -date.getTimezoneOffset() / 60;
    var jd = julian(date.getFullYear(), date.getMonth() + 1, date.getDate()) - lng / (15 * 24);
    var t = { fajr: 5, sunrise: 6, dhuhr: 12, asr: 13, maghrib: 18, isha: 18 };
    for (var i = 0; i < 2; i++) {
      var r = step(t, jd, lat, m, asrF);
      var ok = true;
      for (var k in r) { if (isNaN(r[k])) ok = false; }
      if (!ok) { t = r; break; }
      t = r;
    }
    var out = {};
    for (var key in t) {
      out[key] = t[key] + tz - lng / 15;
    }
    return out;
  }

  function fmt(h) {
    if (isNaN(h)) return "—";
    var total = Math.round(fixHour(h) * 60);
    var hh = Math.floor(total / 60) % 24;
    var mm = total % 60;
    var suffix = hh >= 12 ? "م" : "ص";
    hh = hh % 12;
    if (hh === 0) hh = 12;
    return hh + ":" + (mm < 10 ? "0" : "") + mm + " " + suffix;
  }

  var names = [
    ["fajr", "الفجر"],
    ["sunrise", "الشروق"],
    ["dhuhr", "الظهر"],
    ["asr", "العصر"],
    ["maghrib", "المغرب"],
    ["isha", "العشاء"]
  ];

  window.SECTIONS = window.SECTIONS || {};

  window.SECTIONS["مواقيت الصلاة"] = function (target) {
    target.innerHTML =
      '<div class="p-field"><label>طريقة الحساب</label>' +
      '<select id="pMethod">' +
      '<option value="4">أم القرى (مكة المكرمة)</option>' +
      '<option value="5">الهيئة المصرية العامة للمساحة</option>' +
      '<option value="3">رابطة العالم الإسلامي</option>' +
      '<option value="2">الجمعية الإسلامية لأمريكا الشمالية</option>' +
      '<option value="1">جامعة العلوم الإسلامية بكراتشي</option>' +
      "</select></div>" +
      '<div class="p-field"><label>وقت العصر</label>' +
      '<select id="pAsr">' +
      '<option value="1">الجمهور (ظل الشيء مثله)</option>' +
      '<option value="2">الحنفي (ظل الشيء مثليه)</option>' +
      "</select></div>" +
      '<button class="p-btn" id="pBtn">حدّد موقعي واعرض المواقيت</button>' +
      '<div id="pOut"></div>';

    var out = document.getElementById("pOut");

    function showMsg(text) {
      out.innerHTML = '<div class="p-msg">' + text + "</div>";
    }

    document.getElementById("pBtn").addEventListener("click", function () {
      if (!navigator.geolocation) {
        showMsg("متصفحك لا يدعم تحديد الموقع.");
        return;
      }
      showMsg("جاري تحديد موقعك... وافق على طلب الإذن لو ظهر لك.");

      navigator.geolocation.getCurrentPosition(
        function (pos) {
          var lat = pos.coords.latitude;
          var lng = pos.coords.longitude;
          var methodId = document.getElementById("pMethod").value;
          var asrF = parseInt(document.getElementById("pAsr").value, 10);
          var now = new Date();
          var t = calculate(lat, lng, now, methodId, asrF);

          var html = "";
          try {
            var hijri = new Intl.DateTimeFormat("ar-SA-u-ca-islamic-umalqura", {
              day: "numeric", month: "long", year: "numeric"
            }).format(now);
            html += '<div class="p-date">' + hijri + "</div>";
          } catch (e) {}

          html += '<div class="p-list">';
          names.forEach(function (n) {
            html += '<div class="p-row"><span>' + n[1] + "</span><b>" + fmt(t[n[0]]) + "</b></div>";
          });
          html += "</div>";
          html += '<div class="p-note">المواقيت محسوبة تلقائيًا حسب موقعك وتوقيت جهازك، فتأكد أن توقيت جهازك صحيح. قد يختلف الناتج دقيقة أو دقيقتين عن التقويم الرسمي لبلدك، فاعتمد دائمًا مواقيت الجهة الرسمية في بلدك.</div>';
          out.innerHTML = html;
        },
        function (err) {
          if (err && err.code === 1) {
            showMsg("لم يتم السماح بتحديد الموقع. اسمح للموقع بالوصول لموقعك من إعدادات المتصفح وحاول مرة تانية.");
          } else {
            showMsg("تعذّر تحديد موقعك. حاول مرة تانية.");
          }
        },
        { timeout: 15000 }
      );
    });
  };
})();
