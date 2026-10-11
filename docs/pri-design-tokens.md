# PRI Design Tokens — Japanese Academic Minimalism

Source of truth: `src/styles/pri-tokens.css` (imported by `src/styles/global.css`).
Three layers: raw palette (`--pri-palette-*`) → semantic roles (`--pri-*`) → legacy aliases (`--bg-main`, `--text-main`, …) so existing pages inherit the system. New code should use `--pri-*`.

| Role | Token | Light | Dark |
|---|---|---|---|
| Primary 藍鉄 | `--pri-primary` | #264A54 | #8FB2B9 |
| Primary dark 深藍 | `--pri-primary-dark` | #17353D | #A9C6CB |
| Background 卯の花 | `--pri-bg` | #F7F7F2 | #0F1A1D |
| Alternate 生成り | `--pri-bg-alt` | #F3EFE5 | #142327 |
| Surface 白練 | `--pri-surface` | #FCFBF7 | #162429 |
| Accent 利休鼠 (borders/rules) | `--pri-accent` | #788676 | #8D9C8B |
| Text 墨色 | `--pri-text` | #242C2D | #E9EDE6 |
| Muted text | `--pri-text-muted` | #5F6A68 (spec #65706E, darkened to reach 4.5:1 on 生成り) | #9AA7A3 |
| Decorative gold 鈍金 (hairlines only) | `--pri-gold` | #A18656 | #B79B66 |
| Border | `--pri-border` | #DDE2DB | #2A3B40 |

Dark follows `prefers-color-scheme`; `<html data-theme="light|dark">` forces a theme.

## Logo
The logo files are never filtered or recoloured. The approved dark logo is shown on light surfaces and the approved reversed logo (`/brand/logo-reversed.svg`) on dark surfaces and in the footer. Partner-brand logos sit on a fixed light plate.

## Rules
- Gold and accent are decorative/border colours, never text.
- No gradients, blur, glass, hover lift or heavy shadows; popovers use `--pri-shadow-pop`.
- Keyboard focus: global `:focus-visible` 2px outline in `--pri-focus`.
