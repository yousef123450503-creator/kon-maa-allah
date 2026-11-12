(function () {
  var style = document.createElement("style");
  style.textContent =
    ".z-field{text-align:right;margin-bottom:14px}" +
    ".z-field label{display:block;font-weight:700;margin-bottom:6px}" +
    ".z-field input,.z-field select{width:100%;font-family:inherit;font-size:18px;padding:10px;border:1px solid #0b3d91;border-radius:10px;color:#0b3d91;background:#fff}" +
    ".z-btn{font-family:inherit;font-size:18px;padding:12px 28px;border:none;border-radius:10px;background:#0b3d91;color:#fff;cursor:pointer;margin-top:6px}" +
    ".z-result{margin-top:20px;background:#f3f8ff;border:1px solid #cfe0ff;border-radius:14px;padding:18px;text-align:right;line-height:2}" +
    ".z-big{font-size:26px;font-weight:700;text-align:center}" +
    ".z-note{font-size:14px;opacity:.8;margin-top:14px}";
  document.head.appendChild(style);

  // تحويل الأرقام العربية إلى إنجليزية
  function toNumber(text) {
    var s = String(text || "");
    s = s.replace(/[٠-٩]/g, function (d) {
      return "٠١٢٣٤٥٦٧٨٩".indexOf(d);
    });
    s = s.replace(/٫/g, ".").replace(/،/g, "").replace(/,/g, "");
    var n = parseFloat(s);
    return isNaN(n) ? 0 : n;
  }

  function fmt(n) {
    return n.toLocaleString("en-US", { maximumFractionDigits: 2 });
  }

  window.SECTIONS = window.SECTIONS || {};

  window.SECTIONS["حاسبة الزكاة"] = function (target) {
    target.innerHTML =
      '<div class="z-field"><label>إجمالي أموالك التي مرّ عليها سنة هجرية (نقد، مدخرات، ذهب وفضة ادخار، عروض تجارة)</label>' +
      '<input type="text" inputmode="decimal" id="zMoney" placeholder="مثال: 200000"></div>' +
      '<div class="z-field"><label>الديون الحالّة عليك (إن وجدت)</label>' +
      '<input type="text" inputmode="decimal" id="zDebts" placeholder="0"></div>' +
      '<div class="z-field"><label>اعتماد النصاب على</label>' +
      '<select id="zBasis"><option value="gold">الذهب (85 جرام ذهب عيار 24)</option>' +
      '<option value="silver">الفضة (595 جرام فضة)</option></select></div>' +
      '<div class="z-field"><label>سعر جرام الذهب عيار 24 اليوم (بعملتك)</label>' +
      '<input type="text" inputmode="decimal" id="zGold" placeholder="اكتب سعر الجرام"></div>' +
      '<div class="z-field"><label>سعر جرام الفضة اليوم (بعملتك)</label>' +
      '<input type="text" inputmode="decimal" id="zSilver" placeholder="اكتب سعر الجرام"></div>' +
      '<button class="z-btn" id="zCalc">احسب الزكاة</button>' +
      '<div id="zOut"></div>';

    var basis = document.getElementById("zBasis");
    var goldBox = document.getElementById("zGold").parentNode;
    var silverBox = document.getElementById("zSilver").parentNode;

    function toggleFields() {
      if (basis.value === "gold") {
        goldBox.style.display = "block";
        silverBox.style.display = "none";
      } else {
        goldBox.style.display = "none";
        silverBox.style.display = "block";
      }
    }
    basis.addEventListener("change", toggleFields);
    toggleFields();

    document.getElementById("zCalc").addEventListener("click", function () {
      var out = document.getElementById("zOut");
      var money = toNumber(document.getElementById("zMoney").value);
      var debts = toNumber(document.getElementById("zDebts").value);
      var isGold = basis.value === "gold";
      var price = toNumber(document.getElementById(isGold ? "zGold" : "zSilver").value);
      var grams = isGold ? 85 : 595;
      var metal = isGold ? "الذهب" : "الفضة";

      if (money <= 0) {
        out.innerHTML = '<div class="z-result">من فضلك اكتب إجمالي أموالك أولًا.</div>';
        return;
      }
      if (price <= 0) {
        out.innerHTML = '<div class="z-result">من فضلك اكتب سعر جرام ' + metal + ' اليوم.</div>';
        return;
      }

      var net = money - debts;
      var nisab = grams * price;
      var html = '<div class="z-result">';
      html += "<div>1) المال الصافي = " + fmt(money) + " − " + fmt(debts) + " = <b>" + fmt(net) + "</b></div>";
      html += "<div>2) النصاب = " + grams + " جرام × " + fmt(price) + " = <b>" + fmt(nisab) + "</b></div>";

      if (net >= nisab) {
        var zakat = net * 0.025;
        html += "<div>3) مالك بلغ النصاب، فالزكاة = 2.5% × " + fmt(net) + "</div>";
        html += '<div class="z-big">الزكاة الواجبة: ' + fmt(zakat) + "</div>";
      } else {
        html += "<div>3) مالك لم يبلغ النصاب، فلا زكاة عليك الآن.</div>";
      }

      html += '<div class="z-note">الحساب تقديري، وتجب الزكاة بعد مرور سنة هجرية على المال بعد بلوغه النصاب. وفي الحالات الخاصة (ديون كثيرة، أسهم، عقارات تجارية...) اسأل أهل العلم.</div>';
      html += "</div>";
      out.innerHTML = html;
    });
  };
})();
