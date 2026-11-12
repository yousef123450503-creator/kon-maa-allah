(function () {
  var style = document.createElement("style");
  style.textContent =
    ".dhikr-select{font-family:inherit;font-size:20px;padding:10px;border:1px solid #0b3d91;border-radius:10px;color:#0b3d91;background:#fff;max-width:100%}" +
    ".count{font-size:90px;font-weight:700;margin:20px 0}" +
    ".tap-btn{background:#0b3d91;color:#fff;border:none;border-radius:50%;width:170px;height:170px;font-family:inherit;font-size:28px;font-weight:700;cursor:pointer}" +
    ".tap-btn:active{background:#082c6c}" +
    ".reset-btn{display:block;margin:25px auto 0;background:#fff;color:#0b3d91;border:1px solid #0b3d91;border-radius:10px;padding:10px 22px;font-family:inherit;font-size:16px;cursor:pointer}";
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

  window.showTasbih = function (target) {
    var counts = {};
    try {
      counts = JSON.parse(localStorage.getItem("tasbihCounts")) || {};
    } catch (e) {
      counts = {};
    }

    var current = adhkar[0];

    target.innerHTML =
      '<select class="dhikr-select" id="dhikrSelect"></select>' +
      '<div class="count" id="countNum">0</div>' +
      '<button class="tap-btn" id="tapBtn">سبّح</button>' +
      '<button class="reset-btn" id="resetBtn">إعادة ضبط</button>';

    var select = document.getElementById("dhikrSelect");
    var countNum = document.getElementById("countNum");

    adhkar.forEach(function (d) {
      var opt = document.createElement("option");
      opt.value = d;
      opt.textContent = d;
      select.appendChild(opt);
    });

    function refresh() {
      countNum.textContent = counts[current] || 0;
    }

    function save() {
      try {
        localStorage.setItem("tasbihCounts", JSON.stringify(counts));
      } catch (e) {}
    }

    select.addEventListener("change", function () {
      current = select.value;
      refresh();
    });

    document.getElementById("tapBtn").addEventListener("click", function () {
      counts[current] = (counts[current] || 0) + 1;
      save();
      refresh();
    });

    document.getElementById("resetBtn").addEventListener("click", function () {
      counts[current] = 0;
      save();
      refresh();
    });

    refresh();
  };
})();
