/* ============================================================
   たまにたまヨガ — main.js
   LINE URLはここ1行を書き換えるだけで全ページに反映されます
   ============================================================ */

const LINE_URL = "https://lin.ee/vO7a0w9";

/* --- LINE リンクをすべてセット --- */
function applyLineUrls() {
  document.querySelectorAll(".js-line-url").forEach(el => {
    el.href = LINE_URL;
  });
}

/* --- ヘッダー: スクロールで背景を付ける --- */
function initHeader() {
  const header = document.getElementById("site-header");
  const onScroll = () => {
    header.classList.toggle("scrolled", window.scrollY > 60);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

/* --- モバイルメニュー --- */
function initMobileMenu() {
  const toggle = document.getElementById("menuToggle");
  const menu   = document.getElementById("mobileMenu");
  if (!toggle || !menu) return;

  toggle.addEventListener("click", () => {
    const open = menu.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open);
  });

  menu.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => {
      menu.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

/* --- カレンダー生成 --- */
function generateCalendar() {
  const container = document.getElementById("calendar-container");
  if (!container || typeof SCHEDULE === "undefined") return;

  const { year, month, monthName, openHours, openDays } = SCHEDULE;

  const WDAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const MONTH_EN    = ["January","February","March","April","May","June",
                       "July","August","September","October","November","December"];

  const firstDay  = new Date(year, month - 1, 1).getDay(); // 0=Sun
  const lastDate  = new Date(year, month, 0).getDate();

  /* 曜日ヘッダー */
  let wdayHtml = WDAY_LABELS.map((d, i) => {
    const cls = i === 0 ? "sun" : i === 6 ? "sat" : "";
    return `<div class="cal-wday ${cls}">${d}</div>`;
  }).join("");

  /* 日付セル */
  let cellHtml = "";
  for (let i = 0; i < firstDay; i++) {
    cellHtml += `<div class="cal-day empty"></div>`;
  }
  for (let d = 1; d <= lastDate; d++) {
    const dow   = (firstDay + d - 1) % 7;
    const open  = openDays.includes(d);
    let cls = "cal-day";
    if (open)      cls += " open";
    if (dow === 0) cls += " sun";
    if (dow === 6) cls += " sat";
    cellHtml += `<div class="${cls}">${d}</div>`;
  }

  container.innerHTML = `
    <div class="calendar-wrapper">
      <div class="cal-head">
        <div class="cal-ym">${year}年 ${month}月<span class="cal-kana">${monthName}</span></div>
        <div class="cal-en">${MONTH_EN[month - 1]}</div>
      </div>
      <div class="cal-wdays">${wdayHtml}</div>
      <div class="cal-days">${cellHtml}</div>
    </div>
  `;

  const hoursEl = document.getElementById("open-hours-text");
  if (hoursEl) {
    hoursEl.innerHTML =
      `オープン時間 &nbsp;${openHours.default}` +
      `<br><span class="hours-note">水曜日のみ ${openHours.wednesday}</span>`;
  }
}

/* --- ギャラリー: ドラッグスクロール --- */
function initGalleryDrag() {
  const wrapper = document.querySelector(".gallery-scroll-wrapper");
  if (!wrapper) return;

  let dragging = false, startX = 0, scrollLeft = 0;

  wrapper.addEventListener("mousedown", e => {
    dragging   = true;
    startX     = e.pageX - wrapper.offsetLeft;
    scrollLeft = wrapper.scrollLeft;
    wrapper.classList.add("grabbing");
  });
  ["mouseleave", "mouseup"].forEach(ev => {
    wrapper.addEventListener(ev, () => {
      dragging = false;
      wrapper.classList.remove("grabbing");
    });
  });
  wrapper.addEventListener("mousemove", e => {
    if (!dragging) return;
    e.preventDefault();
    wrapper.scrollLeft = scrollLeft - (e.pageX - wrapper.offsetLeft - startX) * 1.4;
  });
}

/* --- スクロールフェードイン --- */
function initFadeIn() {
  const targets = document.querySelectorAll(
    ".feature, .flow-step, .price-item, .info-table tr"
  );
  if (!("IntersectionObserver" in window)) return;

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  targets.forEach(el => {
    el.classList.add("fade-init");
    obs.observe(el);
  });
}

/* --- ヒーロー: 矢印アニメーション(クリックでスクロール) --- */
function initHeroArrow() {
  const arrow = document.getElementById("heroArrow");
  if (!arrow) return;
  arrow.addEventListener("click", () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  });
}

/* --- 初期化 --- */
document.addEventListener("DOMContentLoaded", () => {
  applyLineUrls();
  initHeader();
  initMobileMenu();
  generateCalendar();
  initGalleryDrag();
  initFadeIn();
  initHeroArrow();
});
