//1.6.25









//animazione dropdown menu
document.addEventListener("DOMContentLoaded", () => {
  if (!window.gsap) return;

  const DROPDOWNS = document.querySelectorAll(".w-dropdown");
  if (!DROPDOWNS.length) return;

  function closeDropdown(dd, instant = false) {
    const list = dd.querySelector(".w-dropdown-list");
    const toggle = dd.querySelector(".w-dropdown-toggle");
    if (!list) return;

    dd.classList.remove("is-open");
    if (toggle) toggle.setAttribute("aria-expanded", "false");

    gsap.killTweensOf(list);

    if (instant) {
      gsap.set(list, { height: 0, opacity: 0, y: -8 });
      return;
    }

    gsap.to(list, { height: 0, opacity: 0, y: -8, duration: 0.5, ease: "power2.out" });
  }

  function openDropdown(dd) {
    const list = dd.querySelector(".w-dropdown-list");
    const toggle = dd.querySelector(".w-dropdown-toggle");
    if (!list) return;

    // chiudi gli altri (opzionale)
    DROPDOWNS.forEach((other) => { if (other !== dd) closeDropdown(other); });

    dd.classList.add("is-open");
    if (toggle) toggle.setAttribute("aria-expanded", "true");

    gsap.killTweensOf(list);
    // da height:0 -> height:auto
    gsap.set(list, { opacity: 0, y: -8, height: 0 });

    gsap.to(list, {
      height: "auto",
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: "power2.inOut"
    });
  }

  // init: forza chiuso “pulito”
  DROPDOWNS.forEach((dd) => {
    const list = dd.querySelector(".w-dropdown-list");
    const toggle = dd.querySelector(".w-dropdown-toggle");
    if (toggle) toggle.setAttribute("aria-expanded", "false");
    if (list) gsap.set(list, { height: 0, opacity: 0, y: -8 });

    // click SOLO sulla freccia apre/chiude
    dd.addEventListener("click", (e) => {
      const clickedArrow = e.target.closest(".w-icon-dropdown-toggle");
      if (!clickedArrow) return;

      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();

      const isOpen = dd.classList.contains("is-open");
      if (isOpen) closeDropdown(dd);
      else openDropdown(dd);
    }, true);
  });

  // chiudi clic fuori
  document.addEventListener("click", (e) => {
    if (e.target.closest(".w-dropdown")) return;
    DROPDOWNS.forEach((dd) => closeDropdown(dd));
  });

  // ESC chiude
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") DROPDOWNS.forEach((dd) => closeDropdown(dd));
  });
});







//Fix dropdown menu
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".w-dropdown-toggle").forEach((toggle) => {
    const isModifiedClick = (e, a) =>
      e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || a?.target === "_blank";

    // 1) Webflow può aprire il dropdown su pointerdown/mousedown: fermalo se stai cliccando il testo-link
    const stopOpenIfText = (e) => {
      const a = e.target.closest("a.nav-link-navbar");
      if (!a) return; // non è il testo -> lascia che Webflow gestisca (freccia apre)
      if (isModifiedClick(e, a)) return; // lascia comportamento browser (nuova tab ecc.)

      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
    };

    toggle.addEventListener("pointerdown", stopOpenIfText, true);
    toggle.addEventListener("mousedown", stopOpenIfText, true);
    toggle.addEventListener("touchstart", stopOpenIfText, { capture: true, passive: false });

    // 2) Sul click del testo: naviga (ed evita l’apertura)
    toggle.addEventListener(
      "click",
      (e) => {
        const a = e.target.closest("a.nav-link-navbar");
        if (!a) return;

        // per cmd/ctrl click ecc. blocca solo Webflow, lascia al browser l'azione default
        if (isModifiedClick(e, a)) {
          e.stopPropagation();
          e.stopImmediatePropagation();
          return;
        }

        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        window.location.assign(a.href);
      },
      true
    );
  });
});







// Fade-in immagini con classe .immagine-fade-in (GSAP + ScrollTrigger)
window.addEventListener("load", () => {
  if (!window.gsap || !window.ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);

  gsap.utils.toArray(".immagine-fade-in").forEach((el) => {
    // stato iniziale
    gsap.set(el, { autoAlpha: 0, y: 16 });

    gsap.to(el, {
      autoAlpha: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: el,
        start: "top 60%",
        toggleActions: "play none none none",
        once: true,
      },
    });
  });

  ScrollTrigger.refresh();
});





// Fade-in Testi con classe .testo-fade-in (GSAP + ScrollTrigger)
window.addEventListener("load", () => {
  if (!window.gsap || !window.ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);

  gsap.utils.toArray(".testo-fade-in").forEach((el) => {
    // stato iniziale
    gsap.set(el, { autoAlpha: 0, y: 16 });

    gsap.to(el, {
      autoAlpha: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: el,
        start: "top 75%",
        toggleActions: "play none none none",
        once: true,
      },
    });
  });

  ScrollTrigger.refresh();
});












//animazioni bottoni
document.addEventListener("DOMContentLoaded", () => {

  const buttons = document.querySelectorAll(
    ".contact-button, .work-button, .form-button"
  );

  buttons.forEach((btn) => {

    // wrapper interno (testo + icona)
    const wrapper = btn.querySelector(
      ".contact-button-text, .work-button-text, .form-button-text"
    );

    const text = btn.querySelector(".text-block-2");
    const icon = btn.querySelector("img");

    // testo base visibile
    gsap.set(text, {
      clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)"
    });

    // bordo esterno base
    gsap.set(btn, {
      "--after-scale": "0.8",
      "--after-opacity": "0"
    });

    // icona base
    if (icon) {
      gsap.set(icon, { rotateZ: 0 });
    }

    btn.addEventListener("mouseenter", () => {

      // respiro padding
      gsap.to(wrapper, {
        paddingLeft: "+=6",
        paddingRight: "+=6",
        duration: 0.35,
        ease: "linear"
      });

      // reveal diagonale del testo
      gsap.fromTo(
        text,
        { clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" },
        {
          clipPath: "polygon(0 0, 100% 8%, 100% 100%, 0 92%)",
          duration: 0.35,
          ease: "linear"
        }
      );

      // bordo esterno animato
      gsap.to(btn, {
        "--after-scale": 1,
        "--after-opacity": 1,
        duration: 0.35,
        ease: "linear",
        onUpdate: () => {
          btn.style.setProperty("--after-scale", gsap.getProperty(btn, "--after-scale"));
          btn.style.setProperty("--after-opacity", gsap.getProperty(btn, "--after-opacity"));
        }
      });

      // icona rotazione
      if (icon) {
        gsap.to(icon, {
          rotateZ: -45,
          duration: 0.35,
          ease: "linear"
        });
      }

    });

    btn.addEventListener("mouseleave", () => {

      gsap.to(wrapper, {
        paddingLeft: "-=6",
        paddingRight: "-=6",
        duration: 0.35,
        ease: "linear"
      });

      gsap.to(btn, {
        "--after-scale": 0.8,
        "--after-opacity": 0,
        duration: 0.35,
        ease: "linear",
        onUpdate: () => {
          btn.style.setProperty("--after-scale", gsap.getProperty(btn, "--after-scale"));
          btn.style.setProperty("--after-opacity", gsap.getProperty(btn, "--after-opacity"));
        }
      });

      gsap.set(text, {
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)"
      });

      if (icon) {
        gsap.to(icon, {
          rotateZ: 0,
          duration: 0.35,
          ease: "linear"
        });
      }

    });

  });

});








// animazione footer desktop
document.addEventListener("DOMContentLoaded", () => {
  if (!window.gsap || !window.ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);

  gsap.fromTo(".footer",
    { clipPath: "inset(100% 0% 0% 0%)", autoAlpha: 0, yPercent: -50 },
    {
      clipPath: "inset(0% 0% 0% 0%)",
      autoAlpha: 1,
      yPercent: 0,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".footer-wrapper",
        start: "top 100%",
        end: "top 50%",
        scrub: true,
        invalidateOnRefresh: true
      }
    }
  );
});











//animazioni cta + freccia
document.addEventListener('DOMContentLoaded', function() {
  // Seleziona tutti i link con la classe 'text-link'
  const textLinks = document.querySelectorAll('.text-link');
  
  console.log(textLinks);

  // Aggiungi l'evento hover a ogni link
  textLinks.forEach(function(textLinks) {

    // Aggiungi classe '.hovered' quando il mouse entra
    textLinks.addEventListener('mouseenter', function() {
      textLinks.classList.remove('hover-leave');
      textLinks.classList.add('hovered');
    });

    // Rimuovi la classe '.hovered' quando il mouse esce
    textLinks.addEventListener('mouseleave', function() {
      textLinks.classList.remove('hovered');
      textLinks.classList.add('hover-leave');
    });
  });
});








//animazione menu
(() => {
  function initMenu() {
    if (!window.gsap) return;

    const container   = document.querySelector(".content-container");
    const pageLayer   = container?.querySelector(":scope > .page-layer") || document.querySelector(".page-layer");
    const menuOverlay = document.querySelector(".menu-overlay");
    const menuContent = document.querySelector(".menu-content");
    const brandImg    = document.querySelector(".nav-brand img");

    const openBtn  = document.querySelector("img.menu-open");
    const closeBtn = document.querySelector("img.menu-close");

    const openBrandSrc    = "https://cdn.prod.website-files.com/68f6081c93cf52481f6bceb3/691753236796e9f7de4f93b9_Logo%20blue.svg";
    const defaultBrandSrc = brandImg?.src;

    if (!container || !pageLayer || !menuOverlay || !menuContent || (!openBtn && !closeBtn)) return;
    if (window.__MENU_ANIM_INIT__) return;
    window.__MENU_ANIM_INIT__ = true;

    let isOpen = false;
    let isAnimating = false;
    let tl = null;

    // ✅ safety: se in passato hai lasciato body bloccato, ripulisci
    document.body.classList.remove("no-scroll");
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.left = "";
    document.body.style.right = "";
    document.body.style.width = "";

    // --- Scroll lock (pulito) ---
    let savedY = 0;
    function lockScroll() {
      savedY = window.scrollY || 0;
      document.body.style.position = "fixed";
      document.body.style.top = `-${savedY}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.width = "100%";
      document.body.classList.add("no-scroll"); // opzionale: se hai CSS per touch-action ecc.
    }
    function unlockScroll() {
      document.body.classList.remove("no-scroll");
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      window.scrollTo(0, savedY);
    }

    // ----- Stati iniziali -----
    gsap.set(menuOverlay, {
      pointerEvents: "none",
      clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)"
    });

    gsap.set(menuContent, { rotation: -15, x: -100, y: -100, scale: 1.5, opacity: 0.25 });
    gsap.set([".menu-link .w-dropdown", ".menu-link a"], { y: "120%", opacity: 0.25 });

    gsap.set([pageLayer, menuContent], { willChange: "transform", transformOrigin: "50% 50%" });

    function showOpenIcon() {
      if (openBtn)  gsap.set(openBtn,  { opacity: 1, x: 0, y: 0, rotation: 0, pointerEvents: "auto" });
      if (closeBtn) gsap.set(closeBtn, { opacity: 0, x: -5, y: 10, rotation: 5, pointerEvents: "none" });
    }

    function showCloseIcon() {
      if (openBtn)  gsap.set(openBtn,  { opacity: 0, x: -5, y: -10, rotation: -5, pointerEvents: "none" });
      if (closeBtn) gsap.set(closeBtn, { opacity: 1, x: 0, y: 0, rotation: 0, pointerEvents: "auto" });
    }

    showOpenIcon();

    openBtn?.addEventListener("click", (e) => { e.preventDefault(); openMenu(); });
    closeBtn?.addEventListener("click", (e) => { e.preventDefault(); closeMenu(); });

    function openMenu() {
      if (isAnimating || isOpen) return;
      isAnimating = true;

      lockScroll();
      if (brandImg) brandImg.src = openBrandSrc;
      showCloseIcon();

      gsap.set(menuOverlay, { pointerEvents: "auto" });

      tl?.kill();
      tl = gsap.timeline({
        defaults: { duration: 1.25, ease: "power4.inOut" },
        onComplete: () => { isOpen = true; isAnimating = false; }
      });

      tl.to(pageLayer, { rotation: 10, x: 300, y: 450, scale: 1.5, overwrite: "auto" }, 0);
      tl.to(menuContent, { rotation: 0, x: 0, y: 0, scale: 1, opacity: 1, overwrite: "auto" }, 0);
      tl.to(menuOverlay, { clipPath: "polygon(0% 0%, 100% 0%, 100% 175%, 0% 100%)" }, 0);

      tl.to([".menu-link .w-dropdown", ".menu-link a"], {
        y: "0%",
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        stagger: 0.1
      }, 0.75);
    }

    function closeMenu() {
      if (isAnimating || !isOpen) return;
      isAnimating = true;

      showOpenIcon();

      tl?.kill();
      tl = gsap.timeline({
        defaults: { duration: 1.25, ease: "power4.inOut" },
        onComplete: () => {
          isOpen = false;
          isAnimating = false;

          gsap.set(menuOverlay, { pointerEvents: "none" });
          gsap.set([".menu-link .w-dropdown", ".menu-link a"], { y: "120%", opacity: 0.25 });

          if (brandImg) brandImg.src = defaultBrandSrc;

          unlockScroll();
        }
      });

      tl.to(pageLayer, { rotation: 0, x: 0, y: 0, scale: 1, overwrite: "auto", clearProps: "transform" }, 0);
      tl.to(menuContent, { rotation: -15, x: -100, y: -100, scale: 1.5, opacity: 0.25, overwrite: "auto" }, 0);
      tl.to(menuOverlay, { clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)" }, 0);
    }

    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && isOpen) closeMenu();
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initMenu);
  else initMenu();
})();






















//animazioni titoli
window.addEventListener("load", () => {

  // Desktop-only: niente animazione sotto 992px (Webflow tablet/mobile)
  if (window.matchMedia("(max-width: 991px)").matches) return;
  
  (() => {
    const WRAP_SELECTOR = ".title-animation";
    const INNER_TEXT_TAGS = "h1,h2,h3,h4,h5,h6,p";
    const TOP_TOLERANCE = 2;
    const RESIZE_DEBOUNCE = 150;

    function initTitleLineAnim() {
      if (!window.gsap || !window.ScrollTrigger) return;
      gsap.registerPlugin(ScrollTrigger);

      document.querySelectorAll(WRAP_SELECTOR).forEach((wrap) => {
        const target = pickTarget(wrap);
        if (!target) return;

        buildOrRebuild(wrap, target);
        ensureObservers(wrap, target);
      });

      ScrollTrigger.refresh();
    }

    function pickTarget(wrap) {
      if (wrap.matches(INNER_TEXT_TAGS)) return wrap;
      const inside = wrap.querySelector(INNER_TEXT_TAGS);
      if (inside) return inside;
      return wrap;
    }

    function getLayoutWidth(el) {
      // offsetWidth NON è influenzato da transform/scale
      return el.offsetWidth || el.clientWidth || 0;
    }

    function buildOrRebuild(wrap, target) {
      if (!target.dataset.titleRaw) {
        const raw = (target.innerText || "")
          .replace(/\u00A0/g, " ")
          .replace(/\s+/g, " ")
          .trim();
        if (!raw) return;
        target.dataset.titleRaw = raw;
      }

      const w = getLayoutWidth(target);

      // evita rebuild inutili (su transform del menu non cambia)
      if (target.dataset.linesSplit === "1" && Number(target.dataset.splitWidth || 0) === w) {
        // se già animato, assicurati che resti “fisso”
        if (target.dataset.titleAnimDone === "1") {
          const doneLines = target.querySelectorAll(".title-line-inner");
          if (doneLines.length) gsap.set(doneLines, { yPercent: 0, clearProps: "transform" });
        }
        return;
      }

      // kill vecchi
      if (target._titleTween) target._titleTween.kill();
      if (target._titleST) target._titleST.kill();

      // rebuild markup
      target.innerHTML = "";
      const textEl = document.createElement("span");
      textEl.className = "title-text";
      target.appendChild(textEl);

      const lines = splitLinesByRange(textEl, target.dataset.titleRaw);
      if (!lines || !lines.length) return;

      textEl.textContent = "";
      lines.forEach((lineText) => {
        const line = document.createElement("span");
        line.className = "title-line";

        const inner = document.createElement("span");
        inner.className = "title-line-inner";
        inner.textContent = lineText;

        line.appendChild(inner);
        textEl.appendChild(line);
      });

      target.dataset.linesSplit = "1";
      target.dataset.splitWidth = String(w);

      const lineInners = target.querySelectorAll(".title-line-inner");
      if (!lineInners.length) return;
      
      // se già completato: stato finale e stop
      if (target.dataset.titleAnimDone === "1") {
        gsap.set(lineInners, { yPercent: 0, clearProps: "transform" });
        return;
      }
      
      // ✅ stato iniziale “nascosto” (così non li vedi già fissati)
      gsap.set(lineInners, { yPercent: 130 });
      
      // anima verso lo stato finale
      const tween = gsap.to(lineInners, {
        yPercent: 0,
        duration: 1.2,
        ease: "power2.inOut",
        stagger: 0.12,
        paused: true,
        overwrite: "auto"
      });
      
      const st = ScrollTrigger.create({
        trigger: wrap,
        start: "top 80%",
        once: true,
        onEnter: () => tween.play()
      });
      
      tween.eventCallback("onComplete", () => {
        target.dataset.titleAnimDone = "1";
        st.kill();
        gsap.set(lineInners, { yPercent: 0, clearProps: "transform" });
      });
      
      target._titleTween = tween;
      target._titleST = st;
    }

    function splitLinesByRange(containerEl, raw) {
      containerEl.textContent = raw;
      const node = containerEl.firstChild;
      if (!node || node.nodeType !== Node.TEXT_NODE) return [raw];

      const range = document.createRange();

      const wordStarts = [];
      const re = /\S+/g;
      let m;
      while ((m = re.exec(raw))) wordStarts.push(m.index);
      if (!wordStarts.length) return [raw];

      const lineStarts = [0];
      let currentTop = getCharTop(range, node, wordStarts[0]);
      if (currentTop == null) return [raw];

      for (let i = 1; i < wordStarts.length; i++) {
        const idx = wordStarts[i];
        const top = getCharTop(range, node, idx);
        if (top == null) continue;

        if (Math.abs(top - currentTop) > TOP_TOLERANCE) {
          lineStarts.push(idx);
          currentTop = top;
        }
      }

      const lines = [];
      for (let i = 0; i < lineStarts.length; i++) {
        const start = lineStarts[i];
        const end = (i + 1 < lineStarts.length) ? lineStarts[i + 1] : raw.length;
        const chunk = raw.slice(start, end).trimEnd();
        if (chunk) lines.push(chunk);
      }

      return lines.length ? lines : [raw];
    }

    function getCharTop(range, textNode, index) {
      const len = textNode.length;
      if (index < 0 || index >= len) return null;

      let i = index;
      while (i < len && /\s/.test(textNode.data[i])) i++;
      if (i >= len) return null;

      range.setStart(textNode, i);
      range.setEnd(textNode, i + 1);

      const rect = range.getBoundingClientRect();
      if (!rect || !isFinite(rect.top) || rect.height === 0) return null;
      return rect.top;
    }

    function ensureObservers(wrap, target) {
      if (target._titleRO) return;

      let t = null;
      const schedule = () => {
        clearTimeout(t);
        t = setTimeout(() => {
          buildOrRebuild(wrap, target);
          if (window.ScrollTrigger) ScrollTrigger.refresh();
        }, RESIZE_DEBOUNCE);
      };

      if (window.ResizeObserver) {
        target._titleRO = new ResizeObserver(schedule);
        target._titleRO.observe(target);
      } else {
        window.addEventListener("resize", schedule);
        target._titleRO = { disconnect() {} };
      }
    }

    initTitleLineAnim();

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(initTitleLineAnim);
    }
  })();
});





let lenis = new Lenis({
  lerp: 0.1,
  wheelMultiplier: 0.7,
  gestureOrientation: "vertical",
  normalizeWheel: false,
  smoothTouch: false,
});
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);
