# たまにたまヨガ 公式サイト（ブレンド改善版）

多摩市落合のおうちヨガサロン「たまにたまヨガ」のホームページです。

Claude Code 版と Codex 版の2つの試作サイトを7観点で採点・比較し、
両者の長所をブレンドした統合版です。

## 取り入れたもの
- 土台（Claude Code版）：SEO・構造化データ、動的カレンダー、ハンバーガーメニュー、LINE URL一元管理
- 移植（Codex版）：Philosophyセクション、回数券カード、figure/figcaptionギャラリー、詳細alt、ol/article
- 新規追加：FAQ、フォーカス可視化、areaServed/makesOffer、og:image、ローカルSEO文言

## 運用
- OPEN日カレンダー：`schedule.js` を毎月更新するだけで自動反映されます。
- LINE予約URL：`main.js` の `LINE_URL` を1か所変更すれば全ボタンに反映されます。

## 公開
GitHub Pages: https://tamanitamayoga-svg.github.io/tamanitamayoga2ai/
