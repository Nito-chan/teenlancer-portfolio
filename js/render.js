/* render.js — builds repeated sections from window.SITE. No-JS fallback stays readable. */
(function () {
  "use strict";
  var S = window.SITE;
  if (!S) return;

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  /* Hero + person */
  try {
    if (S.hero) {
      var h = document.getElementById("hero-h");
      var sub = document.getElementById("heroSub");
      if (h && S.hero.headline) h.textContent = S.hero.headline;
      if (sub && S.hero.subline) sub.textContent = S.hero.subline;
      var ctas = document.querySelector(".hero-ctas");
      if (ctas && S.hero.primaryCta && S.hero.secondaryCta) {
        ctas.innerHTML =
          '<a class="btn btn-primary" href="' + esc(S.hero.primaryCta.href) + '">' + esc(S.hero.primaryCta.label) + "</a>" +
          '<a class="text-link" href="' + esc(S.hero.secondaryCta.href) + '">' + esc(S.hero.secondaryCta.label) + " →</a>";
      }
    }
    if (S.person && S.person.availability) {
      var av = document.getElementById("availText");
      if (av) av.textContent = S.person.availability.text;
    }
    document.title = S.meta.title;
  } catch (e) {}

  /* Proof */
  try {
    var proof = document.getElementById("proofList");
    if (proof && Array.isArray(S.proof)) {
      proof.innerHTML = S.proof.slice(0, 3).map(function (p) {
        return "<li><b>" + esc(p.value) + "</b><span>" + esc(p.label) + "</span></li>";
      }).join("");
    }
  } catch (e) {}

  /* Services */
  try {
    var sl = document.getElementById("servicesList");
    if (sl && Array.isArray(S.services)) {
      sl.innerHTML = S.services.map(function (s) {
        var chips = (s.tools || []).map(function (t) { return '<span class="chip">' + esc(t) + "</span>"; }).join("");
        return "<li><h3>" + esc(s.title) + "</h3><p>" + esc(s.outcome) + '</p><div class="tool-row">' + chips + "</div></li>";
      }).join("");
    }
  } catch (e) {}

  /* Thumbnails: pure CSS browser mocks per type */
  function thumbHTML(kind) {
    var screen = "";
    if (kind === "store") {
      screen = '<div class="hero-mock"></div><div class="col3"><span class="sk"></span><span class="sk"></span><span class="sk"></span></div><div class="row"><span class="sk accent"></span><span class="sk"></span></div>';
    } else if (kind === "booking") {
      screen = '<div class="row"><span class="sk"></span><span class="sk"></span><span class="sk"></span><span class="sk"></span></div><div class="hero-mock"></div><div class="row"><span class="sk accent"></span><span class="sk"></span></div>';
    } else if (kind === "dashboard") {
      screen = '<div class="row"><span class="sk"></span><span class="sk"></span><span class="sk"></span></div><div class="hero-mock"></div><div class="lines"><div class="sk" style="width:90%"></div><div class="sk" style="width:70%"></div></div>';
    } else {
      screen = '<div class="lines"><div class="sk" style="width:60%;height:12px"></div><div class="sk" style="width:95%"></div><div class="sk" style="width:88%"></div><div class="sk" style="width:75%"></div></div><div class="row"><span class="sk accent"></span><span class="sk"></span></div>';
    }
    return '<div class="thumb" aria-hidden="true"><div class="browser"><div class="browser-bar"><i></i><i></i><i></i><span class="url-pill"></span></div><div class="browser-screen">' + screen + "</div></div></div>";
  }

  /* Projects */
  try {
    var grid = document.getElementById("projectsGrid");
    if (grid && Array.isArray(S.projects)) {
      grid.innerHTML = S.projects.slice(0, 4).map(function (p, i) {
        var chips = (p.stack || []).map(function (t) { return '<span class="chip">' + esc(t) + "</span>"; }).join("");
        var feat = i === 0 ? " project-featured" : "";
        var cid = "case-" + i;
        return (
          '<article class="project' + feat + '">' + thumbHTML(p.thumb) +
          '<div class="project-body"><h3>' + esc(p.title) + "</h3>" +
          '<p class="summary">' + esc(p.summary) + "</p>" +
          '<div class="tool-row">' + chips + "</div>" +
          '<div><button class="btn btn-ghost btn-small case-toggle" aria-expanded="false" aria-controls="' + cid + '">Read case study</button></div>' +
          '<dl class="case" id="' + cid + '" hidden>' +
          "<div><dt>Problem</dt><dd>" + esc(p.problem) + "</dd></div>" +
          "<div><dt>What I did</dt><dd>" + esc(p.role) + "</dd></div>" +
          "<div><dt>Result</dt><dd>" + esc(p.result) + "</dd></div>" +
          "</dl>" +
          '<div class="project-links"><a class="text-link" href="' + esc(p.liveUrl) + '">Live site →</a><a class="text-link" href="' + esc(p.codeUrl) + '">Source code →</a></div>' +
          "</div></article>"
        );
      }).join("");
    }
  } catch (e) {}

  /* Skills — max 14 */
  try {
    var sg = document.getElementById("skillsGrid");
    if (sg && Array.isArray(S.skills)) {
      var count = 0;
      sg.innerHTML = S.skills.map(function (g) {
        var items = (g.items || []).filter(function () { return count++ < 14; }).map(function (it) {
          return "<li><span>" + esc(it.name) + '</span><span class="level">' + esc(it.level) + "</span></li>";
        }).join("");
        return "<div class='skill-group'><h3>" + esc(g.group) + "</h3><ul>" + items + "</ul></div>";
      }).join("");
    }
  } catch (e) {}

  /* Process */
  try {
    var pl = document.getElementById("processList");
    if (pl && Array.isArray(S.process)) {
      pl.innerHTML = S.process.slice(0, 4).map(function (s) {
        return "<li><h3>" + esc(s.step) + "</h3><p>" + esc(s.text) + "</p></li>";
      }).join("");
    }
  } catch (e) {}

  /* Testimonials — hide section if empty */
  try {
    var q = document.getElementById("quotes");
    if (q) {
      if (!S.testimonials || !S.testimonials.length) {
        var sec = document.getElementById("kind-words");
        if (sec) sec.hidden = true;
      } else {
        q.innerHTML = S.testimonials.map(function (t) {
          var tag = t.sample ? ' <span class="sample-tag">Sample</span>' : "";
          return "<figure class='quote'><blockquote><p>“" + esc(t.quote) + "”</p></blockquote><footer><span><strong>" + esc(t.name) + "</strong> · " + esc(t.role) + "</span>" + tag + "</footer></figure>";
        }).join("");
      }
    }
  } catch (e) {}

  /* About */
  try {
    var copy = document.getElementById("aboutCopy");
    if (copy && S.about && Array.isArray(S.about.paragraphs)) {
      var initials = (S.person.name || "SC").split(/\s+/).map(function (w) { return w[0]; }).join("").slice(0, 2).toUpperCase();
      var av = document.getElementById("aboutAvatar");
      if (av) av.textContent = initials;
      var brand = document.querySelector(".brand .monogram");
      if (brand) brand.textContent = initials;
      var html = S.about.paragraphs.slice(0, 2).map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("");
      var resume = S.person.resumeUrl && S.person.resumeUrl !== "#"
        ? '<p><a class="text-link" id="resumeLink" href="' + esc(S.person.resumeUrl) + '">Download resume →</a></p>'
        : '<p><a class="text-link" id="resumeLink" href="#">Download resume →</a></p>';
      copy.innerHTML = html + resume;
    }
    var em = document.getElementById("emailLink");
    if (em && S.person.email) { em.textContent = S.person.email; em.href = "mailto:" + S.person.email; }
    var wa = document.getElementById("waLink");
    if (wa && S.person.whatsapp) wa.href = "https://wa.me/" + String(S.person.whatsapp).replace(/\D/g, "");
  } catch (e) {}

  /* Social + footer */
  try {
    var sr = document.getElementById("socialRow");
    var fs = document.getElementById("footSocial");
    if (S.social) {
      if (sr) sr.innerHTML = S.social.map(function (s) { return '<a class="btn btn-ghost btn-small" href="' + esc(s.href) + '" rel="noopener">' + esc(s.label) + "</a>"; }).join("");
      if (fs) fs.innerHTML = S.social.map(function (s) { return '<li><a href="' + esc(s.href) + '" rel="noopener">' + esc(s.label) + "</a></li>"; }).join("");
    }
    var fn = document.getElementById("footName");
    if (fn) fn.textContent = S.person.name;
  } catch (e) {}
})();
