/* 성경으로 세상읽기 — 공통 스크립트
   - 모바일 네비 토글
   - 오늘의 말씀 (날짜 기반 회전 + 새로고침)
   - 읽기 진행바
   - 현재 연도
*/
(function () {
  "use strict";

  /* ---- 다크 모드 ---- */
  var root = document.documentElement;
  function applyTheme(t) {
    root.setAttribute("data-theme", t);
    var btn = document.querySelector(".theme-toggle");
    if (btn) {
      btn.textContent = t === "dark" ? "☀️" : "🌙";
      btn.setAttribute("aria-label", t === "dark" ? "밝은 테마로" : "어두운 테마로");
    }
  }
  var stored = null;
  try { stored = localStorage.getItem("bw-theme"); } catch (e) {}
  var initial = stored ||
    ((window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) ? "dark" : "light");
  applyTheme(initial);

  var nav = document.querySelector(".nav");
  var navToggleEl = document.querySelector(".nav-toggle");
  if (nav) {
    var tbtn = document.createElement("button");
    tbtn.className = "theme-toggle";
    tbtn.type = "button";
    if (navToggleEl) nav.insertBefore(tbtn, navToggleEl);
    else nav.appendChild(tbtn);
    applyTheme(root.getAttribute("data-theme") || "light");
    tbtn.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      applyTheme(next);
      try { localStorage.setItem("bw-theme", next); } catch (e) {}
    });
  }

  /* ---- 모바일 네비 ---- */
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      links.classList.toggle("open");
    });
  }

  /* ---- 현재 연도 ---- */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* ---- 오늘의 말씀 ---- */
  var VERSES = [
    { t: "태초에 하나님이 천지를 창조하시니라", r: "창세기 1:1" },
    { t: "여호와는 나의 목자시니 내게 부족함이 없으리로다", r: "시편 23:1" },
    { t: "네 마음을 다하여 여호와를 신뢰하고 네 명철을 의지하지 말라", r: "잠언 3:5" },
    { t: "수고하고 무거운 짐 진 자들아 다 내게로 오라 내가 너희를 쉬게 하리라", r: "마태복음 11:28" },
    { t: "너희는 먼저 그의 나라와 그의 의를 구하라", r: "마태복음 6:33" },
    { t: "내가 산을 향하여 눈을 들리라 나의 도움이 어디서 올까", r: "시편 121:1" },
    { t: "여호와의 말씀에 내가 너희를 향한 생각을 아나니 평안이요 재앙이 아니니라", r: "예레미야 29:11" },
    { t: "무릇 지킬 만한 것보다 더욱 네 마음을 지키라 생명의 근원이 이에서 남이니라", r: "잠언 4:23" },
    { t: "두려워하지 말라 내가 너와 함께 함이라 놀라지 말라 나는 네 하나님이 됨이라", r: "이사야 41:10" },
    { t: "사람이 마음으로 자기의 길을 계획할지라도 그의 걸음을 인도하시는 이는 여호와시니라", r: "잠언 16:9" },
    { t: "여호와를 경외하는 것이 지혜의 근본이요", r: "잠언 9:10" },
    { t: "빛이 어둠에 비치되 어둠이 깨닫지 못하더라", r: "요한복음 1:5" },
    { t: "범사에 감사하라 이것이 그리스도 예수 안에서 너희를 향하신 하나님의 뜻이니라", r: "데살로니가전서 5:18" },
    { t: "여호와는 마음이 상한 자를 가까이 하시고 충심으로 통회하는 자를 구원하시는도다", r: "시편 34:18" },
    { t: "너희 안에서 착한 일을 시작하신 이가 그리스도 예수의 날까지 이루실 줄을 우리는 확신하노라", r: "빌립보서 1:6" }
  ];

  var host = document.querySelector("[data-verse]");
  if (host) {
    var blockquote = host.querySelector("blockquote");
    var cite = host.querySelector("cite");

    // 날짜 기반 인덱스 → 하루 동안 같은 말씀
    function dayIndex() {
      var now = new Date();
      var start = new Date(now.getFullYear(), 0, 0);
      var day = Math.floor((now - start) / 86400000);
      return day % VERSES.length;
    }
    var idx = dayIndex();

    function render() {
      var v = VERSES[idx % VERSES.length];
      blockquote.textContent = "“" + v.t + "”";
      cite.textContent = "— " + v.r;
    }
    render();

    var refresh = host.querySelector(".verse-refresh");
    if (refresh) {
      refresh.addEventListener("click", function () {
        idx = (idx + 1) % VERSES.length;
        render();
      });
    }
  }

  /* ---- 읽기 진행바 (아티클 페이지) ---- */
  var bar = document.getElementById("progress");
  if (bar) {
    window.addEventListener("scroll", function () {
      var h = document.documentElement;
      var scrolled = h.scrollTop;
      var height = h.scrollHeight - h.clientHeight;
      var pct = height > 0 ? (scrolled / height) * 100 : 0;
      bar.style.width = pct + "%";
    }, { passive: true });
  }
})();
