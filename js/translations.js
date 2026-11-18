/* ============================================================
   英文翻译字典
   - 页面默认内容为中文（写在 index.html 里，无 JS 也可读）
   - 切换到 EN 时，main.js 按 data-i18n 键从此处取英文替换
   - 修改/新增文案：在 index.html 改中文，并在此处补上同键英文
   ============================================================ */

window.I18N = {
  en: {
    /* meta */
    "meta.title": "HeyTRACE — Tool Download",
    "meta.description":
      "PerfSki tool download center: HeyTRACE and other self-developed tools & apps. Free download.",

    /* nav */
    "nav.menu": "Open menu",
    "nav.projects": "Downloads",
    "nav.contact": "Contact",
    "nav.theme": "Toggle theme",

    /* hero */
    "hero.role": "Performance tools & apps · Free download",
    "hero.desc":
      "The official download center for the tools I build. Everything is free to download and use. Enjoy!",
    "hero.cta.download": "Download",
    "hero.cta.contact": "Contact Me",
    "hero.stat.version": "Latest version",
    "hero.stat.platform": "Platform",

    /* tools / downloads */
    "projects.title": "Tool Downloads",
    "projects.desc": "All currently released tools. Click to download.",
    "projects.heytrace.meta": "Windows · 106.6 MB · RAR archive",
    "projects.heytrace.desc":
      "An AI-powered Android performance trace analysis desktop app. Built on Perfetto data, it ships with an AI agent and a rich analysis skill set (jank detection, frame pipeline analysis, CPU scheduling & throttling, SurfaceFlinger composition, React Native bridge jank, power analysis, and more), supports GLM / Kimi / Qwen and other LLMs, and generates professional performance analysis reports in one click.",
    "projects.heytrace.download": "Download HeyTRACE 1.1.0",
    "projects.tag.jank": "Jank Analysis",
    "projects.tag.frame": "Frame Pipeline",
    "projects.tag.power": "CPU / Power",

    /* contact */
    "contact.title": "Feedback & Collaboration",
    "contact.desc":
      "Hit a problem, have a feature idea, or want to collaborate — drop me an email anytime.",

    /* footer */
    "footer.rights": "All rights reserved"
  }
};
