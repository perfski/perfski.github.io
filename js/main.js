/* ============================================================
   PerfSki — 主交互脚本
   功能：主题切换 / 中英切换 / 移动端菜单 / 滚动出现动画 / 导航高亮
   ============================================================ */

(function () {
  "use strict";

  var doc = document.documentElement;
  var EN = (window.I18N && window.I18N.en) || {};

  /* ---------- 主题切换 ---------- */
  // 优先级：用户手动选择 > 系统偏好 > 深色
  var THEME_KEY = "theme";
  var storedTheme = localStorage.getItem(THEME_KEY);
  var systemLight = window.matchMedia("(prefers-color-scheme: light)").matches;
  doc.setAttribute("data-theme", storedTheme || (systemLight ? "light" : "dark"));

  document.getElementById("themeToggle").addEventListener("click", function () {
    var next = doc.getAttribute("data-theme") === "light" ? "dark" : "light";
    doc.setAttribute("data-theme", next);
    localStorage.setItem(THEME_KEY, next);
  });

  /* ---------- 中英切换 ----------
     页面默认中文（写在 HTML 里），首次运行时把原文存起来，
     切到 EN 用 translations.js 的字典替换，切回中文时还原。 */
  var LANG_KEY = "lang";
  var i18nNodes = [];
  var attrMap = {
    "data-i18n": "textContent",
    "data-i18n-content": "content",
    "data-i18n-aria": "aria-label",
    "data-i18n-placeholder": "placeholder",
    "data-i18n-title": "title",
    "data-i18n-alt": "alt"
  };

  Object.keys(attrMap).forEach(function (attr) {
    var nodes = document.querySelectorAll("[" + attr + "]");
    for (var i = 0; i < nodes.length; i++) {
      var el = nodes[i];
      var prop = attrMap[attr];
      // 记录中文原文，便于切回
      el.dataset["i18nOrig_" + prop] =
        prop === "textContent" ? el.textContent : el.getAttribute(prop) || "";
      i18nNodes.push({ el: el, prop: prop, key: el.getAttribute(attr) });
    }
  });

  function applyLang(lang) {
    for (var i = 0; i < i18nNodes.length; i++) {
      var item = i18nNodes[i];
      var text =
        lang === "en" && EN[item.key] != null
          ? EN[item.key]
          : item.el.dataset["i18nOrig_" + item.prop];
      if (item.prop === "textContent") {
        item.el.textContent = text;
      } else {
        item.el.setAttribute(item.prop, text);
      }
    }
    doc.lang = lang === "en" ? "en" : "zh-CN";
    document.querySelector("[data-lang-label]").textContent =
      lang === "en" ? "中文" : "EN";
    localStorage.setItem(LANG_KEY, lang);
  }

  // 初始语言：用户上次选择 > 浏览器语言 > 中文
  var initialLang =
    localStorage.getItem(LANG_KEY) ||
    (/^en\b/i.test(navigator.language || "") ? "en" : "zh");
  applyLang(initialLang);

  document.getElementById("langToggle").addEventListener("click", function () {
    applyLang(doc.lang === "zh-CN" ? "en" : "zh");
  });

  /* ---------- 移动端菜单 ---------- */
  var navToggle = document.getElementById("navToggle");
  var navMenu = document.getElementById("navMenu");

  navToggle.addEventListener("click", function () {
    var open = navMenu.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", open ? "true" : "false");
  });

  navMenu.addEventListener("click", function (e) {
    if (e.target.closest("a")) {
      navMenu.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });

  /* ---------- 滚动出现动画 ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("visible");
    });
  }

  /* ---------- 导航高亮 ---------- */
  var sections = document.querySelectorAll("main section[id]");
  var navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  if ("IntersectionObserver" in window && sections.length) {
    var sectionObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          navLinks.forEach(function (link) {
            link.classList.toggle(
              "active",
              link.getAttribute("href") === "#" + entry.target.id
            );
          });
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach(function (section) {
      sectionObserver.observe(section);
    });
  }

  /* ---------- 页脚年份 ---------- */
  document.getElementById("year").textContent = new Date().getFullYear();
})();
