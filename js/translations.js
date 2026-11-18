/* ============================================================
   英文翻译字典
   - 页面默认内容为中文（写在 index.html 里，无 JS 也可读）
   - 切换到 EN 时，main.js 按 data-i18n 键从此处取英文替换
   - 修改/新增文案：在 index.html 改中文，并在此处补上同键英文
   ============================================================ */

window.I18N = {
  en: {
    /* meta */
    "meta.title": "PerfSki — Download My Apps",
    "meta.description":
      "Download page for PerfSki's personal works: HeyTRACE and other self-developed tools & apps. Free download.",

    /* nav */
    "nav.menu": "Open menu",
    "nav.about": "About",
    "nav.projects": "Projects",
    "nav.contact": "Contact",
    "nav.theme": "Toggle theme",

    /* hero */
    "hero.kicker": "Welcome to my works page 👋",
    "hero.title.pre": "I'm",
    "hero.role": "Indie Developer · Performance Analysis Tools",
    "hero.desc":
      "This is the official download page for my personal works — the tools and apps I build. Everything is free to download and use. Enjoy!",
    "hero.cta.download": "Download Works",
    "hero.cta.contact": "Contact Me",
    "hero.stat.works": "Published works",
    "hero.stat.version": "Latest version",
    "hero.stat.platform": "Platform",

    /* projects / downloads */
    "projects.kicker": "Works",
    "projects.title": "All Downloads",
    "projects.desc":
      "Here are all my currently published works. Click to download.",
    "projects.heytrace.meta": "Windows · 106.6 MB · RAR archive",
    "projects.heytrace.desc":
      "An AI-powered Android performance trace analysis desktop app. Built on Perfetto data, it ships with an AI agent and a rich analysis skill set (jank detection, frame pipeline analysis, CPU scheduling & throttling, SurfaceFlinger composition, React Native bridge jank, power analysis, and more), supports GLM / Kimi / Qwen and other LLMs, and generates professional performance analysis reports in one click.",
    "projects.heytrace.download": "Download HeyTRACE 1.1.0",
    "projects.tag.jank": "Jank Analysis",
    "projects.tag.frame": "Frame Pipeline",
    "projects.tag.power": "CPU / Power",
    "projects.link.release": "Release Page",

    /* about */
    "about.kicker": "About",
    "about.title": "Solving problems with code, winning users with experience",
    "about.p1":
      "I'm a software developer focused on performance analysis tools and applications. I enjoy digging into performance optimization, engineering efficiency, and interaction details — I believe great products need both a solid core and a smooth experience.",
    "about.p2":
      "Outside of work, I enjoy skiing, reading, and tinkering with new technology. If any of that sounds interesting — or you'd like to collaborate — feel free to reach out.",
    "about.fact.location.label": "Location",
    "about.fact.location.value": "China · Remote friendly",
    "about.fact.focus.label": "Focus",
    "about.fact.focus.value": "Performance Analysis · Tooling · AI Apps",
    "about.fact.email.label": "Email",

    /* contact */
    "contact.kicker": "Contact",
    "contact.title": "Feedback & Collaboration",
    "contact.desc":
      "Hit a problem, have a feature idea, or want to collaborate — drop me an email anytime.",
    "contact.cta.email": "Send an Email",

    /* footer */
    "footer.rights": "All rights reserved",
    "footer.built": "Built with plain HTML / CSS / JS"
  }
};
