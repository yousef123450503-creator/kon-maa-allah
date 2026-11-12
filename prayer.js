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
    ".p-date{font-size:18px;margin-top:6px}" +
    ".p-note{font-size:14px;opacity:.8;margin-top:14px}";
  document.head.appendChild(style);

  var names = [
    ["Fajr", "الفجر"],
    ["Sunrise", "الشروق"],
    ["Dhuhr", "الظهر"],
    ["Asr", "العصر"],
    ["Maghrib", "المغرب"],
    ["Isha", "العشاء"]
  ];

  function to12(t) {
    var p = String(t).split(":");
    var h = parseInt(p[0], 10);
    var m = p[1].slice(0, 2);
    var suffix = h >= 12 ? "م" : "ص";
    h = h % 12;
    if (h === 0) h = 12;
    return h + ":" + m + " " + suffix;
  }

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
          var lon = pos.coords.longitude;
          var method = document.getElementById("pMethod").value;
          var url =
            "https://api.aladhan.com/v1/timings?latitude=" + lat +
            "&longitude=" + lon + "&method=" + method;

          showMsg("جاري جلب المواقيت...");

          fetch(url)
            .then(function (r) { return r.json(); })
            .then(function (json) {
              var t = json.data.timings;
              var html = "";

              try {
                var h = json.data.date.hijri;
                html += '<div class="p-date">' + h.day + " " + h.month.ar + " " + h.year + " هـ</div>";
              } catch (e) {}

              html += '<div class="p-list">';
              names.forEach(function (n) {
                html += '<div class="p-row"><span>' + n[1] + "</span><b>" + to12(t[n[0]]) + "</b></div>";
              });
              html += "</div>";
              html += '<div class="p-note">المواقيت حسب موقعك الحالي وطريقة الحساب المختارة. تأكد دائمًا من مواقيت بلدك المعتمدة.</div>';
              out.innerHTML = html;
            })
            .catch(function () {
              showMsg("تعذّر جلب المواقيت. تأكد من الإنترنت وحاول مرة تانية.");
            });
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
