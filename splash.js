(function () {
  var DURATION = 4000; // مدة ظهور الشاشة بالمللي ثانية (٤ ثواني)

  var css =
    "#splash{position:fixed;top:0;right:0;bottom:0;left:0;z-index:99999;overflow:hidden;direction:rtl;" +
    "font-family:'Tajawal','Cairo',Tahoma,Arial,sans-serif;" +
    "background:" +
    "radial-gradient(ellipse 70% 14% at 25% 56%,rgba(255,255,255,.75),rgba(255,255,255,0) 70%)," +
    "radial-gradient(ellipse 80% 12% at 78% 63%,rgba(255,255,255,.65),rgba(255,255,255,0) 70%)," +
    "radial-gradient(ellipse 60% 9% at 40% 70%,rgba(255,255,255,.5),rgba(255,255,255,0) 70%)," +
    "linear-gradient(180deg,#f7fbff 0%,#e6f1ff 42%,#c4dcf7 70%,#7aaae3 100%);" +
    "transition:opacity .6s ease}" +
    "#splash.hide{opacity:0;pointer-events:none}" +
    "#splash .center{position:absolute;top:0;right:0;left:0;bottom:16vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center}" +
    "#splash .logo{width:150px;height:auto;animation:splashIn .9s ease both}" +
    "#splash .name{margin:6px 0 0;font-size:52px;font-weight:800;color:#1554A6;line-height:1.3;animation:splashIn .9s .15s ease both}" +
    "#splash .tag{display:flex;align-items:center;gap:12px;margin-top:14px;color:#2878D4;font-size:18px;font-weight:500;animation:splashIn .9s .3s ease both}" +
    "#splash .tag i{display:block;width:44px;height:2px;border-radius:2px;background:#2878D4;opacity:.7}" +
    "#splash .sky{position:absolute;left:0;right:0;bottom:0;width:100%;height:42vh}" +
    "#splash .bar{position:absolute;bottom:6vh;left:50%;width:min(210px,50vw);height:5px;margin-left:min(-105px,-25vw);border-radius:5px;background:rgba(255,255,255,.4);overflow:hidden}" +
    "#splash .bar span{display:block;height:100%;width:0;border-radius:5px;background:#fff;animation:splashBar " + DURATION + "ms linear forwards}" +
    "@keyframes splashIn{from{opacity:0;transform:translateY(12px) scale(.96)}to{opacity:1;transform:none}}" +
    "@keyframes splashBar{from{width:0}to{width:100%}}" +
    "@media (min-aspect-ratio:1/1){#splash .sky{left:50%;right:auto;width:calc(42vh * 1.8);transform:translateX(-50%);-webkit-mask-image:linear-gradient(to right,transparent,#000 16%,#000 84%,transparent);mask-image:linear-gradient(to right,transparent,#000 16%,#000 84%,transparent)}#splash::after{content:\"\";position:absolute;left:0;right:0;bottom:0;height:10vh;background:linear-gradient(to top,#2a63b8,rgba(42,99,184,0))}}" +
    "@media (max-width:480px){#splash .logo{width:130px}#splash .name{font-size:46px}#splash .tag{font-size:16px}#splash .tag i{width:34px}}";

  var star = function (cx, cy, rx, ry) {
    return "M" + cx + "," + (cy - ry) +
      " Q" + (cx + 5) + "," + (cy - 8) + " " + (cx + rx) + "," + cy +
      " Q" + (cx + 5) + "," + (cy + 8) + " " + cx + "," + (cy + ry) +
      " Q" + (cx - 5) + "," + (cy + 8) + " " + (cx - rx) + "," + cy +
      " Q" + (cx - 5) + "," + (cy - 8) + " " + cx + "," + (cy - ry) + " Z";
  };

  // شعار التطبيق (رسم متجهي يظل واضحًا على كل الشاشات)
  var logoSvg =
    '<svg class="logo" viewBox="115 35 590 610" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
    "<defs>" +
    '<linearGradient id="spA" x1="0" y1="0" x2="1" y2="0.2"><stop offset="0" stop-color="#1f5fb8"/><stop offset="0.55" stop-color="#4b93e0"/><stop offset="1" stop-color="#7dbbf0"/></linearGradient>' +
    '<linearGradient id="spB" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2878D4"/><stop offset="1" stop-color="#1554A6"/></linearGradient>' +
    '<linearGradient id="spC" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#1554A6"/><stop offset="0.5" stop-color="#2f7bd3"/><stop offset="1" stop-color="#1554A6"/></linearGradient>' +
    "</defs>" +
    // القبة (قوس مدبب)
    '<path fill="url(#spA)" d="M163,478 L163,365 C163,265 255,185 405,118 C555,185 647,265 647,365 L647,478 L575,478 L575,365 C575,285 505,225 405,165 C305,225 237,285 237,365 L237,478 Z"/>' +
    // نجمة القمة ونجمة الداخل
    '<path fill="#3b86dc" d="' + star(405, 88, 36, 46) + '"/>' +
    '<path fill="#3b86dc" d="' + star(405, 262, 36, 46) + '"/>' +
    // العمودان
    '<path fill="url(#spB)" stroke="url(#spB)" stroke-width="8" stroke-linejoin="round" d="M282,418 L367,336 L367,531 L282,493 Z"/>' +
    '<path fill="url(#spB)" stroke="url(#spB)" stroke-width="8" stroke-linejoin="round" d="M528,418 L443,336 L443,531 L528,493 Z"/>' +
    // الكتاب (القاعدة)
    '<path fill="url(#spC)" d="M135,495 C230,498 340,540 405,595 L405,637 C310,610 215,550 135,495 Z"/>' +
    '<path fill="url(#spC)" d="M675,495 C580,498 470,540 405,595 L405,637 C500,610 595,550 675,495 Z"/>' +
    "</svg>";

  // أفق المساجد
  var minaret = function (cx, top, fill) {
    return '<g fill="' + fill + '">' +
      '<rect x="' + (cx - 8) + '" y="' + (top + 42) + '" width="16" height="' + (222 - top - 42) + '"/>' +
      '<rect x="' + (cx - 13) + '" y="' + (top + 36) + '" width="26" height="7" rx="2"/>' +
      '<rect x="' + (cx - 6) + '" y="' + (top + 16) + '" width="12" height="21"/>' +
      '<path d="M' + (cx - 8) + "," + (top + 17) + " Q" + (cx - 8) + "," + (top + 5) + " " + cx + "," + top +
      " Q" + (cx + 8) + "," + (top + 5) + " " + (cx + 8) + "," + (top + 17) + ' Z"/>' +
      "</g>";
  };
  var dome = function (cx, base, w, h, fill) {
    return '<g fill="' + fill + '">' +
      '<path d="M' + (cx - w) + "," + base + " L" + (cx - w) + "," + (base - h * 0.45) +
      " Q" + (cx - w) + "," + (base - h * 0.95) + " " + cx + "," + (base - h) +
      " Q" + (cx + w) + "," + (base - h * 0.95) + " " + (cx + w) + "," + (base - h * 0.45) +
      " L" + (cx + w) + "," + base + ' Z"/>' +
      '<rect x="' + (cx - 1) + '" y="' + (base - h - 12) + '" width="2" height="13"/>' +
      "</g>";
  };

  var skySvg =
    '<svg class="sky" viewBox="0 0 400 222" preserveAspectRatio="xMidYMax slice" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
    "<defs>" +
    '<linearGradient id="spSkyBack" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7fb0e8" stop-opacity=".35"/><stop offset="1" stop-color="#4f8bd6" stop-opacity=".7"/></linearGradient>' +
    '<linearGradient id="spSkyFront" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3d78c9"/><stop offset="1" stop-color="#1554A6"/></linearGradient>' +
    "</defs>" +
    // الجبال والقباب البعيدة
    '<path fill="url(#spSkyBack)" d="M0,222 L0,150 Q50,112 105,138 Q160,160 215,128 Q300,86 400,148 L400,222 Z"/>' +
    dome(205, 190, 38, 62, "#6aa0e2") +
    dome(150, 195, 20, 34, "#6aa0e2") +
    dome(262, 195, 22, 36, "#6aa0e2") +
    // المآذن
    minaret(100, 70, "#4a86d6") +
    minaret(300, 56, "#4a86d6") +
    minaret(175, 128, "#5b93dd") +
    minaret(238, 138, "#5b93dd") +
    // الواجهة الأمامية
    '<path fill="url(#spSkyFront)" d="M0,222 L0,176 Q20,160 38,172 L48,150 L58,172 Q80,168 100,182 Q130,168 160,184 Q200,170 240,184 Q275,166 305,182 Q335,160 362,176 L372,146 L382,176 Q394,170 400,176 L400,222 Z"/>' +
    minaret(34, 116, "#2f69bd") +
    minaret(366, 108, "#2f69bd") +
    "</svg>";

  var style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);

  var el = document.createElement("div");
  el.id = "splash";
  el.innerHTML =
    '<div class="center">' +
    logoSvg +
    '<div class="name">كن مع الله</div>' +
    '<div class="tag"><i></i><span>كن مع الله .. ترتقي</span><i></i></div>' +
    "</div>" +
    skySvg +
    '<div class="bar"><span></span></div>';

  var wide = window.matchMedia && window.matchMedia("(min-aspect-ratio: 1/1)").matches;
  var skyEl = el.querySelector(".sky");
  if (skyEl) skyEl.setAttribute("preserveAspectRatio", wide ? "xMidYMax meet" : "xMidYMax slice");

  document.body.insertBefore(el, document.body.firstChild);
  document.documentElement.style.overflow = "hidden";

  setTimeout(function () {
    el.classList.add("hide");
    setTimeout(function () {
      if (el.parentNode) el.parentNode.removeChild(el);
      document.documentElement.style.overflow = "";
    }, 650);
  }, DURATION);
})();
