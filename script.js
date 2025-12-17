
//Lenis
document.addEventListener("DOMContentLoaded", () => {
  const lenis = new Lenis({
    duration: 1.2,
    smooth: true,
    lerp: .5
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  // sincronizza GSAP con Lenis
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
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
  gsap.registerPlugin(ScrollTrigger);

  gsap.fromTo(
    ".footer",
    {
      clipPath: "inset(100% 0% 0% 0%)",
      opacity: 0,
      // Imposta la posizione iniziale fuori schermo (come un "misterioso reveal")
      transform: "translate3d(0, -50%, 0)"  // Footer parte più sotto
    },
    {
      clipPath: "inset(0% 0% 0% 0%)",
      opacity: 1,
      transform: "translate3d(0, 0%, 0)", // Footer arriva al suo posto
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".footer-wrapper",
        start: "top 100%",   // parte quando è vicino alla fine dello scroll
        end: "top 50%",      // termina quando arriva a metà viewport
        scrub: true,
      }
    }
  );
});












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









(() => {
  function initMenu() {
    const container   = document.querySelector(".content-container");
    const menuOverlay = document.querySelector(".menu-overlay");
    const menuContent = document.querySelector(".menu-content");
    const brandImg    = document.querySelector(".nav-brand img");

    const openBtn  = document.querySelector("img.menu-open");
    const closeBtn = document.querySelector("img.menu-close");

    const openBrandSrc    = "https://cdn.prod.website-files.com/68f6081c93cf52481f6bceb3/691753236796e9f7de4f93b9_Logo%20blue.svg";
    const defaultBrandSrc = brandImg?.src;

    if (!container || !menuOverlay || !menuContent || (!openBtn && !closeBtn)) return;

    let isOpen = false;
    let isAnimating = false;

    // --- scroll lock ---
    let scrollY = 0;
    function lockBodyScroll() {
      scrollY = window.scrollY || window.pageYOffset || 0;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";
    }
    function unlockBodyScroll() {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      window.scrollTo(0, scrollY);
    }

    // stato iniziale overlay
    gsap.set(menuOverlay, { pointerEvents: "none" });

    function showOpenIcon() {
      if (openBtn)  gsap.set(openBtn,  { opacity: 1, x: 0, y: 0, rotation: 0, pointerEvents: "auto" });
      if (closeBtn) gsap.set(closeBtn, { opacity: 0, x: -5, y: 10, rotation: 5, pointerEvents: "none" });
    }
    function showCloseIcon() {
      if (openBtn)  gsap.set(openBtn,  { opacity: 0, x: -5, y: -10, rotation: -5, pointerEvents: "none" });
      if (closeBtn) gsap.set(closeBtn, { opacity: 1, x: 0, y: 0, rotation: 0, pointerEvents: "auto" });
    }

    // set icone coerenti con stato iniziale
    showOpenIcon();

    // click separati
    if (openBtn) {
      openBtn.style.cursor = "pointer";
      openBtn.addEventListener("click", (e) => {
        e.preventDefault();
        openMenu();
      });
    }
    if (closeBtn) {
      closeBtn.style.cursor = "pointer";
      closeBtn.addEventListener("click", (e) => {
        e.preventDefault();
        closeMenu();
      });
    }

    function openMenu() {
      if (isAnimating || isOpen) return;
      isAnimating = true;

      lockBodyScroll();
      if (brandImg) brandImg.src = openBrandSrc;

      showCloseIcon();

      gsap.to(container, {
        rotation: 10,
        x: 300,
        y: 450,
        scale: 1.5,
        duration: 1.25,
        ease: "power4.inOut",
      });

      gsap.to(menuContent, {
        rotation: 0,
        x: 0,
        y: 0,
        scale: 1,
        opacity: 1,
        duration: 1.25,
        ease: "power4.inOut",
      });

      gsap.to([".menu-link .w-dropdown", ".menu-link a"], {
        y: "0%",
        opacity: 1,
        delay: 0.75,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
      });

      gsap.set(menuOverlay, { pointerEvents: "auto" });

      gsap.to(menuOverlay, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 175%, 0% 100%)",
        duration: 1.25,
        ease: "power4.inOut",
        onComplete: () => {
          isOpen = true;
          isAnimating = false;
        },
      });
    }

    function closeMenu() {
      if (isAnimating || !isOpen) return;
      isAnimating = true;

      showOpenIcon();

      gsap.to(container, {
        rotation: 0,
        x: 0,
        y: 0,
        scale: 1,
        duration: 1.25,
        ease: "power4.inOut",
      });

      gsap.to(menuContent, {
        rotation: -15,
        x: -100,
        y: -100,
        scale: 1.5,
        opacity: 0.25,
        duration: 1.25,
        ease: "power4.inOut",
      });

      gsap.to(menuOverlay, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
        duration: 1.25,
        ease: "power4.inOut",
        onComplete: () => {
          isOpen = false;
          isAnimating = false;

          gsap.set(menuOverlay, { pointerEvents: "none" });
          gsap.set([".menu-link .w-dropdown", ".menu-link a"], { y: "120%", opacity: 0.25 });

          if (brandImg) brandImg.src = defaultBrandSrc;
          unlockBodyScroll();
        },
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initMenu);
  } else {
    initMenu();
  }
})();











window.addEventListener("load", () => {
  if (!window.gsap || !window.ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);

  document.querySelectorAll(".parallax-image").forEach((wrap) => {
    // --- 1) IMG parallax (solo immagini "card", NON fullwidth) ---

// se dentro c'è un fullwidth, non applicare parallax su <img>
const isFullwidth = wrap.classList.contains("fullwidth-image") || wrap.querySelector(".fullwidth-image");
if (!isFullwidth) {
  const img = wrap.querySelector(":scope > img, :scope > picture > img"); // niente ", img"

  if (img) {
    const SCALE = 1.12;

    const setParallaxImg = () => {
      const extra = wrap.offsetHeight * (SCALE - 1);
      const maxY  = extra / 2;

      gsap.set(img, {
        willChange: "transform",
        transformOrigin: "50% 50%",
        scale: SCALE
      });

      gsap.fromTo(img,
        { y:  maxY },
        {
          y: -maxY,
          ease: "none",
          scrollTrigger: {
            trigger: wrap,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
            invalidateOnRefresh: true
          }
        }
      );
    };

    setParallaxImg();
    ScrollTrigger.addEventListener("refreshInit", setParallaxImg);
  }
}

    // --- 2) Background parallax ---
    // Se hai un elemento interno che porta il background (es. .fullwidth-image / section) usa quello,
    // altrimenti anima il background del wrapper stesso.
    let bgEl = wrap.querySelector(".fullwidth-image, section");
    if (!bgEl || getComputedStyle(bgEl).backgroundImage === "none") {
      bgEl = wrap; // fallback: background sul wrapper
    }

    if (getComputedStyle(bgEl).backgroundImage !== "none") {
      gsap.fromTo(bgEl,
        { backgroundPosition: "50% 40%" },
        {
          backgroundPosition: "50% 55%",
          ease: "none",
          scrollTrigger: {
            trigger: wrap,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
            invalidateOnRefresh: true
          }
        }
      );
    }
  });

  ScrollTrigger.refresh();
});










//animazioni titoli
window.addEventListener("load", () => {
  // animazioni titoli (split SOLO in righe, senza wrapper per parola)
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

    function buildOrRebuild(wrap, target) {
      if (!target.dataset.titleRaw) {
        const raw = (target.innerText || "")
          .replace(/\u00A0/g, " ")
          .replace(/\s+/g, " ")
          .trim();
        if (!raw) return;
        target.dataset.titleRaw = raw;
      }

      const w = Math.round(target.getBoundingClientRect().width);
      if (target.dataset.linesSplit === "1" && Number(target.dataset.splitWidth || 0) === w) return;

      if (target._titleTween) target._titleTween.kill();
      if (target._titleST) target._titleST.kill();

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
      target._titleTween = gsap.from(lineInners, {
        yPercent: 120,
        duration: 1.3,
        ease: "power2.inOut",
        stagger: 0.12,
        paused: true
      });

      target._titleST = ScrollTrigger.create({
        trigger: wrap,
        start: "top 80%",
        once: true,
        onEnter: () => target._titleTween && target._titleTween.play()
      });
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

    // qui basta chiamare una volta, perché siamo già dentro al load
    initTitleLineAnim();

    // opzionale: se vuoi comunque considerare font swap dopo load
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(initTitleLineAnim);
    }
  })();
});
