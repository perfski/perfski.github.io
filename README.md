# perfski.github.io

PerfSki 的个人工具下载站，纯静态 HTML / CSS / JS 构建，中英双语，无任何外部依赖

**Live site:** <https://perfski.github.io>

## 目录结构

```
├── index.html          # 主页（中文默认内容，data-i18n 键对应英文翻译）
├── 404.html            # 404 页面
├── css/style.css       # 样式（深/浅主题、响应式、动画）
├── js/translations.js  # 英文翻译字典
├── js/main.js          # 主题切换 / 语言切换 / 交互
├── assets/logo.png     # 站点 logo（透明底像素画）
├── assets/favicon.png  # 网站图标（logo + 深色圆角底板）
├── project/            # 工具安装包源文件（不入库，见下）
├── .gitignore
└── LICENSE             # Apache-2.0
```

## 工具下载托管（GitHub Releases）

安装包超过 GitHub 仓库单文件 100MB 上限，
因此安装包统一托管在**公开发布仓库** [perfski/heytrace](https://github.com/perfski/heytrace) 的
[Releases](https://github.com/perfski/heytrace/releases)：

1. 把安装包放到 `project/` 目录（该目录已加入 .gitignore）
2. 在 `perfski/heytrace` 创建 Release（tag 例如 `HeyTRACE-v1.2.0`）并上传安装包
3. 下载链接格式：
   `https://github.com/perfski/heytrace/releases/download/<tag>/<文件名>`

当前发布：**HeyTRACE 1.1.0**（tag `HeyTRACE-v1.1.0`）

## 本地预览

无需构建，直接用浏览器打开 `index.html`，或起一个本地服务：

```bash
python -m http.server 8000
# 打开 http://localhost:8000
```

## 如何修改内容

1. **中文文案**：直接改 `index.html` 里对应的中文
2. **英文文案**：在 `js/translations.js` 中找到同名 `data-i18n` 键修改；
   新增内容时，在 HTML 元素上加 `data-i18n="your.key"`，并在 `translations.js` 的 `en` 中补上同键英文
3. **新增工具**：在 `index.html` 的 `#projects` 区块按注释追加下载卡片，并同步 `translations.js`
4. **个人信息**：邮箱（`hello@perfski.dev`）、GitHub 链接、关于文案都在 `index.html` 中
5. **配色**：`css/style.css` 顶部的 CSS 变量（`--accent`、`--text`、`--border` 等）

## 部署（GitHub Pages）

1. 仓库 Settings → Pages → Source 选择 `Deploy from a branch`
2. Branch 选 `main` / `root`，保存
3. 稍等片刻即可访问 `https://perfski.github.io`

推送到 main 即自动发布：

```bash
git add .
git commit -m "Update site"
git push origin main
```

## License

[Apache-2.0](LICENSE)
