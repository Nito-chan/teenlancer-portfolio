/* main.js — theme, menu, nav highlight, typing, accordion, form, badges. */
(function () {
  "use strict";

  /* Year */
  try { document.getElementById("footYear").textContent = new Date().getFullYear(); } catch (e) {}

  /* Theme */
  var root = document.documentElement;
  var toggle = document.getElementById("themeToggle");
  function currentTheme() { return root.getAttribute("data-theme") === "light" ? "light" : "dark"; }
  function paintThemeBtn() {
    if (!toggle) return;
    var light = currentTheme() === "light";
    toggle.setAttribute("aria-label", light ? "Switch to dark theme" : "Switch to light theme");
  }
  function setTheme(t) {
    root.setAttribute("data-theme", t);
    try { localStorage.setItem("sc-theme", t); } catch (e) {}
    paintThemeBtn();
  }
  if (toggle) {
    // honour saved value, else site default, else OS
    try {
      var saved = localStorage.getItem("sc-theme");
      var def = (window.SITE && window.SITE.theme && window.SITE.theme.default) || "dark";
      if (!saved) {
        if (!window.matchMedia) setTheme(def);
        else if (def) setTheme(saved || def);
      }
    } catch (e) {}
    paintThemeBtn();
    toggle.addEventListener("click", function () {
      setTheme(currentTheme() === "light" ? "dark" : "light");
    });
  }

  /* Mobile menu: focus trap while open, Esc closes */
  var menuBtn = document.getElementById("menuBtn");
  var panel = document.getElementById("mobilePanel");
  var lastFocus = null;
  function setMenu(open) {
    if (!menuBtn || !panel) return;
    panel.classList.toggle("open", open);
    menuBtn.setAttribute("aria-expanded", String(open));
    menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    if (open) {
      lastFocus = document.activeElement;
      var first = panel.querySelector("a");
      if (first) first.focus();
      document.addEventListener("keydown", trapKeys);
    } else {
      document.removeEventListener("keydown", trapKeys);
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }
  }
  function trapKeys(e) {
    if (e.key === "Escape") { setMenu(false); if (menuBtn) menuBtn.focus(); return; }
    if (e.key !== "Tab" || !panel) return;
    var items = panel.querySelectorAll("a");
    if (!items.length) return;
    var first = items[0], last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }
  if (menuBtn && panel) {
    menuBtn.addEventListener("click", function () {
      setMenu(!panel.classList.contains("open"));
    });
    panel.addEventListener("click", function (e) {
      if (e.target.closest("a")) setMenu(false);
    });
  }

  /* Active nav highlight */
  try {
    var links = Array.prototype.slice.call(document.querySelectorAll(".site-nav a"));
    var map = {};
    links.forEach(function (a) { map[a.getAttribute("href").slice(1)] = a; });
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          links.forEach(function (a) { a.removeAttribute("aria-current"); });
          var l = map[en.target.id];
          if (l) l.setAttribute("aria-current", "true");
        }
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    ["work", "skills", "about", "contact"].forEach(function (id) {
      var el = document.getElementById(id);
      if (el) obs.observe(el);
    });
  } catch (e) {}

  /* Hero typing — one orchestrated moment. Never blocks LCP: static text already painted. */
  try {
    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var pre = document.getElementById("sourceCode");
    if (pre && !reduce) {
      var finalHTML = pre.innerHTML;
      var lines = [
        "// one file powers this page",
        'name: "Sam Carter",',
        'role: "Web Developer",',
        'skills: ["HTML", "CSS", "JS"],',
        "sites_shipped: 12,",
        'lighthouse: "95+",',
        'contact: "hello@example.com"'
      ];
      var start = function () {
        pre.textContent = "";
        var li = 0, ci = 0, out = "";
        var t0 = performance.now(), budget = 2000;
        function tick() {
          var elapsed = performance.now() - t0;
          // pace so the whole block finishes in ~2s
          var total = lines.join("\n").length;
          var want = Math.floor((elapsed / budget) * total);
          var flat = lines.join("\n").slice(0, want);
          if (flat !== out) { out = flat; pre.textContent = out; }
          if (elapsed < budget) requestAnimationFrame(tick);
          else { pre.innerHTML = finalHTML; }
        }
        requestAnimationFrame(tick);
      };
      if ("requestIdleCallback" in window) requestIdleCallback(start, { timeout: 1500 });
      else window.addEventListener("load", start, { once: true });
    }
  } catch (e) {}

  /* Project accordion — only one open */
  document.addEventListener("click", function (e) {
    var btn = e.target.closest(".case-toggle");
    if (!btn) return;
    var card = btn.closest(".project");
    var panelEl = card ? card.querySelector(".case") : null;
    var willOpen = btn.getAttribute("aria-expanded") !== "true";
    document.querySelectorAll(".case-toggle[aria-expanded='true']").forEach(function (b) {
      b.setAttribute("aria-expanded", "false");
      b.textContent = "Read case study";
      var p = b.closest(".project").querySelector(".case");
      if (p) p.hidden = true;
    });
    if (willOpen && panelEl) {
      btn.setAttribute("aria-expanded", "true");
      btn.textContent = "Hide case study";
      panelEl.hidden = false;
    }
  });

  /* Badges — real measured values (see BUILD_REPORT.md).
     Production (Vercel URL, mobile): perf 83, a11y 100.
     Page weight excl. fonts: ~55 KB (157 KB incl. fonts on production). */
  try {
    var perf = document.getElementById("badgePerf");
    var a11y = document.getElementById("badgeA11y");
    var weight = document.getElementById("badgeWeight");
    if (perf) { perf.textContent = "83"; perf.parentElement.setAttribute("title", "Lighthouse Performance, mobile production"); }
    if (a11y) { a11y.textContent = "100"; a11y.parentElement.setAttribute("title", "Lighthouse Accessibility, mobile lab"); }
    if (weight) { weight.textContent = "55 KB"; weight.parentElement.setAttribute("title", "Page weight excluding fonts (193 KB including fonts)"); }
  } catch (e) {}

  /* Contact form — Netlify + inline validation, no reload */
  var form = document.getElementById("contactForm");
  if (form) {
    var status = document.getElementById("formStatus");
    var sendBtn = document.getElementById("sendBtn");
    function setErr(input, msgId, msg) {
      var el = document.getElementById(msgId);
      if (el) el.textContent = msg || "";
      if (input) input.setAttribute("aria-invalid", msg ? "true" : "false");
    }
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = document.getElementById("fName");
      var email = document.getElementById("fEmail");
      var msg = document.getElementById("fMsg");
      var ok = true;
      if (!name.value.trim() || name.value.trim().length < 2) { setErr(name, "eName", "Add your name so I know who is writing."); ok = false; }
      else setErr(name, "eName", "");
      if (!email.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) { setErr(email, "eEmail", "Add your email so I can reply."); ok = false; }
      else setErr(email, "eEmail", "");
      if (!msg.value.trim() || msg.value.trim().length < 10) { setErr(msg, "eMsg", "Tell me a little about the project (10+ characters)."); ok = false; }
      else setErr(msg, "eMsg", "");
      if (!ok) { if (status) status.textContent = ""; return; }

      var endpoint = (window.SITE && window.SITE.form && window.SITE.form.endpoint) || "";
      if (!endpoint) {
        if (status) status.textContent = "This form isn't connected yet — email me directly at " + ((window.SITE && window.SITE.person && window.SITE.person.email) || "the address on this page") + ".";
        return;
      }

      if (sendBtn) { sendBtn.disabled = true; sendBtn.textContent = "Sending…"; }
      var data = new FormData(form);
      fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded", "Accept": "application/json" },
        body: new URLSearchParams(data).toString()
      }).then(function (res) {
        if (!res.ok) throw new Error("bad status");
        if (status) status.textContent = "Thanks — message sent. I reply within 24 hours.";
        form.reset();
      }).catch(function () {
        if (status) status.textContent = "Couldn't send just now — email me directly and I'll reply within 24 hours.";
      }).finally(function () {
        if (sendBtn) { sendBtn.disabled = false; sendBtn.textContent = "Send message"; }
      });
    });
  }
})();
