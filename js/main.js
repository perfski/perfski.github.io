/* ============================================================
   PerfSki — 主交互脚本
   功能：主题切换 / 中英切换 / 移动端菜单 / 滚动出现动画 / 导航高亮
   各功能独立容错：任何一步失败都不会影响其他功能。
   ============================================================ */

(function () {
  "use strict";

  var doc = document.documentElement;
  var EN = (window.I18N && window.I18N.en) || {};

  /* ---------- 安全的本地存储封装 ----------
     file://、隐私模式或某些浏览器设置下 localStorage 会抛异常，
     必须全部包在 try/catch 里，否则整个脚本会直接中断。 */
  function storageGet(key) {
    try {
      return window.localStorage.getItem(key);
    } catch (e) {
      return null;
    }
  }

  function storageSet(key, value) {
    try {
      window.localStorage.setItem(key, value);
    } catch (e) {
      /* 不可用时静默降级：只在当前会话生效 */
    }
  }

  /* ---------- 主题切换 ---------- */
  // 优先级：用户手动选择 > 系统偏好 > 深色
  try {
    var storedTheme = storageGet("theme");
    var systemDark =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    // 优先级：用户手动选择 > 系统偏好 > 浅色（产品站默认）
    doc.setAttribute("data-theme", storedTheme || (systemDark ? "dark" : "light"));

    document.getElementById("themeToggle").addEventListener("click", function () {
      var next = doc.getAttribute("data-theme") === "light" ? "dark" : "light";
      doc.setAttribute("data-theme", next);
      storageSet("theme", next);
    });
  } catch (e) {
    doc.setAttribute("data-theme", "light");
  }

  /* ---------- 中英切换 ----------
     页面默认中文（写在 HTML 里），首次运行时把原文记入 i18nNodes，
     切到 EN 用 translations.js 的字典替换，切回中文时还原。 */
  try {
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
        i18nNodes.push({
          el: el,
          prop: prop,
          key: el.getAttribute(attr),
          orig: prop === "textContent" ? el.textContent : el.getAttribute(prop) || ""
        });
      }
    });

    function applyLang(lang) {
      for (var i = 0; i < i18nNodes.length; i++) {
        var item = i18nNodes[i];
        var text =
          lang === "en" && EN[item.key] != null ? EN[item.key] : item.orig;
        if (item.prop === "textContent") {
          item.el.textContent = text;
        } else {
          item.el.setAttribute(item.prop, text);
        }
      }
      doc.lang = lang === "en" ? "en" : "zh-CN";
      var label = document.querySelector("[data-lang-label]");
      if (label) label.textContent = lang === "en" ? "中文" : "EN";
      storageSet("lang", lang);
    }

    // 初始语言：用户上次选择 > 浏览器语言 > 中文
    var initialLang =
      storageGet("lang") ||
      (/^en\b/i.test(navigator.language || "") ? "en" : "zh");
    applyLang(initialLang);

    // 切换按钮：无论 applyLang 内部状态如何都能来回切
    document.getElementById("langToggle").addEventListener("click", function () {
      applyLang(doc.lang === "zh-CN" ? "en" : "zh");
    });
  } catch (e) {
    /* i18n 失败时保持页面默认中文，不影响其他功能 */
  }

  /* ---------- 移动端菜单 ---------- */
  try {
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
  } catch (e) { /* noop */ }

  /* ---------- 滚动出现动画 ---------- */
  try {
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
  } catch (e) { /* noop */ }

  /* ---------- 导航高亮 ---------- */
  try {
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
  } catch (e) { /* noop */ }

  /* ---------- 页脚年份 ---------- */
  try {
    document.getElementById("year").textContent = new Date().getFullYear();
  } catch (e) { /* noop */ }
})();
