//1.6.27









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
// animazione menu (CON lock Lenis)
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

    const lenis = window.lenis || null;

    let isOpen = false;
    let isAnimating = false;
    let tl = null;

    // ----- Lenis scroll lock -----
    let savedScroll = 0;
    const preventKeys = new Set(["ArrowUp","ArrowDown","PageUp","PageDown","Home","End"," ","Spacebar"]);

    function onWheel(e) { e.preventDefault(); }
    function onTouch(e) { e.preventDefault(); }
    function onKeyDown(e) { if (preventKeys.has(e.key)) e.preventDefault(); }

    function lockScroll() {
      savedScroll =
        lenis && typeof lenis.scroll === "number"
          ? lenis.scroll
          : (window.scrollY || window.pageYOffset || 0);

      // stop Lenis
      if (lenis?.stop) lenis.stop();

      // hard lock (evita wheel/touch che “scappano”)
      window.addEventListener("wheel", onWheel, { passive: false });
      window.addEventListener("touchmove", onTouch, { passive: false });
      window.addEventListener("keydown", onKeyDown, { passive: false });

      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    }

    function unlockScroll() {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("keydown", onKeyDown);

      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";

      if (lenis?.start) lenis.start();

      // ripristina posizione
      if (lenis?.scrollTo) {
        try {
          lenis.scrollTo(savedScroll, { immediate: true });
        } catch (_) {
          window.scrollTo(0, savedScroll);
        }
      } else {
        window.scrollTo(0, savedScroll);
      }
    }

    // safety: evita lock “appeso” su reload/nav
    window.addEventListener("pagehide", () => { try { unlockScroll(); } catch(_){} });

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

      // anima SOLO page-layer
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




document.addEventListener("DOMContentLoaded", () => {
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
})


let lenis2 = new Lenis({
  lerp: 0.1,
  wheelMultiplier: 0.7,
  gestureOrientation: "vertical",
  normalizeWheel: false,
  smoothTouch: false,
});
function raf(time) {
  lenis2.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

