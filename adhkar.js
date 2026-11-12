(function () {
  // تنسيق قسم الأذكار
  var style = document.createElement("style");
  style.textContent =
    ".adhkar-tabs{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin-bottom:20px}" +
    ".adhkar-tab{font-family:inherit;font-size:16px;padding:10px 16px;border:1px solid #0b3d91;border-radius:10px;background:#fff;color:#0b3d91;cursor:pointer}" +
    ".adhkar-tab.active{background:#0b3d91;color:#fff}" +
    ".dhikr-card{background:#f3f8ff;border:1px solid #cfe0ff;border-radius:14px;padding:18px;margin-bottom:14px;text-align:center}" +
    ".dhikr-text{font-size:22px;line-height:2;margin:0 0 10px}" +
    ".dhikr-source{font-size:14px;opacity:.75;margin-bottom:12px}" +
    ".dhikr-btn{font-family:inherit;font-size:16px;padding:10px 20px;border:none;border-radius:10px;background:#0b3d91;color:#fff;cursor:pointer}" +
    ".dhikr-btn:disabled{background:#2e8b57;cursor:default}";
  document.head.appendChild(style);

  // الأذكار (مجموعة أولى، وهنزوّد عليها بعدين)
  var data = {
    "أذكار الصباح والمساء": [
      {
        text: "اللَّهُ لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ مَنْ ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلَّا بِإِذْنِهِ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ وَلَا يُحِيطُونَ بِشَيْءٍ مِنْ عِلْمِهِ إِلَّا بِمَا شَاءَ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ وَلَا يَئُودُهُ حِفْظُهُمَا وَهُوَ الْعَلِيُّ الْعَظِيمُ",
        count: 1,
        source: "آية الكرسي، سورة البقرة (255)"
      },
      {
        text: "قُلْ هُوَ اللَّهُ أَحَدٌ اللَّهُ الصَّمَدُ لَمْ يَلِدْ وَلَمْ يُولَدْ وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ",
        count: 3,
        source: "سورة الإخلاص"
      },
      {
        text: "قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ مِن شَرِّ مَا خَلَقَ وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ",
        count: 3,
        source: "سورة الفلق"
      },
      {
        text: "قُلْ أَعُوذُ بِرَبِّ النَّاسِ مَلِكِ النَّاسِ إِلَٰهِ النَّاسِ مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ مِنَ الْجِنَّةِ وَالنَّاسِ",
        count: 3,
        source: "سورة الناس"
      },
      {
        text: "اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ بِذَنْبِي فَاغْفِرْ لِي، فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ",
        count: 1,
        source: "سيد الاستغفار، رواه البخاري"
      },
      {
        text: "بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ",
        count: 3,
        source: "رواه أبو داود والترمذي"
      },
      {
        text: "رَضِيتُ بِاللَّهِ رَبًّا، وَبِالْإِسْلَامِ دِينًا، وَبِمُحَمَّدٍ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ نَبِيًّا",
        count: 3,
        source: "رواه أبو داود والترمذي"
      },
      {
        text: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ",
        count: 100,
        source: "رواه مسلم"
      }
    ],
    "أذكار النوم": [
      {
        text: "اللَّهُ لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ مَنْ ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلَّا بِإِذْنِهِ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ وَلَا يُحِيطُونَ بِشَيْءٍ مِنْ عِلْمِهِ إِلَّا بِمَا شَاءَ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ وَلَا يَئُودُهُ حِفْظُهُمَا وَهُوَ الْعَلِيُّ الْعَظِيمُ",
        count: 1,
        source: "آية الكرسي، رواه البخاري"
      },
      {
        text: "سُبْحَانَ اللَّهِ",
        count: 33,
        source: "تسبيح عند النوم، متفق عليه"
      },
      {
        text: "الْحَمْدُ لِلَّهِ",
        count: 33,
        source: "تسبيح عند النوم، متفق عليه"
      },
      {
        text: "اللَّهُ أَكْبَرُ",
        count: 34,
        source: "تسبيح عند النوم، متفق عليه"
      },
      {
        text: "بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا",
        count: 1,
        source: "رواه البخاري"
      },
      {
        text: "اللَّهُمَّ قِنِي عَذَابَكَ يَوْمَ تَبْعَثُ عِبَادَكَ",
        count: 3,
        source: "رواه أبو داود والترمذي"
      }
    ],
    "أذكار الاستيقاظ": [
      {
        text: "الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ",
        count: 1,
        source: "رواه البخاري"
      }
    ]
  };

  function renderList(name) {
    var list = document.getElementById("adhkarList");
    list.innerHTML = "";
    data[name].forEach(function (item) {
      var card = document.createElement("div");
      card.className = "dhikr-card";

      var p = document.createElement("p");
      p.className = "dhikr-text";
      p.textContent = item.text;

      var src = document.createElement("div");
      src.className = "dhikr-source";
      src.textContent = item.source;

      var btn = document.createElement("button");
      btn.className = "dhikr-btn";
      var left = item.count;

      function paint() {
        if (left > 0) {
          btn.textContent = "التكرار المتبقي: " + left;
          btn.disabled = false;
        } else {
          btn.textContent = "تم ✓";
          btn.disabled = true;
        }
      }

      btn.addEventListener("click", function () {
        if (left > 0) {
          left--;
          paint();
        }
      });

      paint();
      card.appendChild(p);
      card.appendChild(src);
      card.appendChild(btn);
      list.appendChild(card);
    });
  }

  // هذه الدالة هي اللي هنناديها من الصفحة الرئيسية
  window.showAdhkar = function (target) {
    target.innerHTML = '<div class="adhkar-tabs" id="adhkarTabs"></div><div id="adhkarList"></div>';
    var tabs = document.getElementById("adhkarTabs");
    var names = Object.keys(data);

    names.forEach(function (name, index) {
      var tab = document.createElement("button");
      tab.className = "adhkar-tab";
      tab.textContent = name;
      tab.addEventListener("click", function () {
        var all = tabs.querySelectorAll(".adhkar-tab");
        for (var i = 0; i < all.length; i++) {
          all[i].classList.remove("active");
        }
        tab.classList.add("active");
        renderList(name);
      });
      tabs.appendChild(tab);
      if (index === 0) {
        tab.classList.add("active");
        renderList(name);
      }
    });
  };
})();
