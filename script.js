
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
(() => {
  const WRAP_SELECTOR = ".title-animation";
  const INNER_TEXT_TAGS = "h1,h2,h3,h4,h5,h6,p";

  function initTitleLineAnim() {
    if (!window.gsap || !window.ScrollTrigger) return;
    gsap.registerPlugin(ScrollTrigger);

    document.querySelectorAll(WRAP_SELECTOR).forEach((wrap) => {
      const target = pickTarget(wrap);
      if (!target) return;

      // evita doppie esecuzioni
      if (target.dataset.linesSplit === "1") return;

      // 1) crea wrapper inline senza cambiare tag (h1/h2/p restano)
      const raw = target.innerText
        .replace(/\u00A0/g, " ")
        .replace(/\s+/g, " ")
        .trim();

      if (!raw) return;

      target.innerHTML = `<span class="title-text">${raw}</span>`;
      const textEl = target.querySelector(".title-text");
      if (!textEl) return;

      // 2) split in righe reali
      const lineCount = splitLines(textEl);

      // se non ha creato righe, non animare
      if (!lineCount) return;

      target.dataset.linesSplit = "1";

      // 3) animazione riga per riga
      const lines = target.querySelectorAll(".title-line-inner");
      
      // forza overflow hidden durante l'animazione (su wrap e su ogni line)
      gsap.set(wrap, { overflow: "hidden" });
      gsap.set(target.querySelectorAll(".title-line"), { overflow: "hidden" });
      
      gsap.from(lines, {
        yPercent: 120,
        rotate: -6,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.12,
        onComplete: () => {
          // quando l'animazione è finita, libera overflow
          gsap.set(wrap, { overflow: "visible" });
          gsap.set(target.querySelectorAll(".title-line"), { overflow: "visible" });
        },
        onReverseComplete: () => {
          // quando torni indietro (reverse), ripristina per la prossima entrata
          gsap.set(wrap, { overflow: "hidden" });
          gsap.set(target.querySelectorAll(".title-line"), { overflow: "hidden" });
        },
        scrollTrigger: {
          trigger: wrap,
          start: "top 80%",
          toggleActions: "play none none reverse",
          onEnter: () => {
            gsap.set(wrap, { overflow: "hidden" });
            gsap.set(target.querySelectorAll(".title-line"), { overflow: "hidden" });
          },
          onEnterBack: () => {
            gsap.set(wrap, { overflow: "hidden" });
            gsap.set(target.querySelectorAll(".title-line"), { overflow: "hidden" });
          },
          onLeave: () => {
            // quando hai finito e sei uscito sotto, libera overflow
            gsap.set(wrap, { overflow: "visible" });
            gsap.set(target.querySelectorAll(".title-line"), { overflow: "visible" });
          },
          onLeaveBack: () => {
            // quando esci sopra, libera overflow
            gsap.set(wrap, { overflow: "visible" });
            gsap.set(target.querySelectorAll(".title-line"), { overflow: "visible" });
          }
        }
      });
    });

    // dopo aver creato linee e trigger, rinfresca
    ScrollTrigger.refresh();
  }

  function pickTarget(wrap) {
    // Se la classe è sul titolo stesso (h1..h6, p)
    if (wrap.matches(INNER_TEXT_TAGS)) return wrap;

    // Se la classe è su un wrapper (div ecc.), prendi il primo titolo/testo dentro
    const inside = wrap.querySelector(INNER_TEXT_TAGS);
    if (inside) return inside;

    // fallback: usa wrap (solo se davvero non c’è altro)
    return wrap;
  }

  function splitLines(el) {
    const words = el.innerText.split(" ");
    el.innerHTML = "";

    // crea parole misurabili
    const wordSpans = words.map((word) => {
      const s = document.createElement("span");
      s.textContent = word;
      s.style.display = "inline-block";
      s.style.marginRight = "0.28em"; // spazio tra parole
      el.appendChild(s);
      return s;
    });

    // raggruppa per linea usando rect.top
    const lines = [];
    let currentTop = null;
    let current = [];

    for (const span of wordSpans) {
      const rect = span.getClientRects()[0];
      if (!rect) continue;

      if (currentTop === null) currentTop = rect.top;

      if (Math.abs(rect.top - currentTop) > 2) {
        lines.push(current);
        current = [];
        currentTop = rect.top;
      }
      current.push(span);
    }
    if (current.length) lines.push(current);

    // se per qualche motivo non è misurabile (rect vuoti), ripristina testo e stop
    if (!lines.length) {
      el.textContent = words.join(" ");
      return 0;
    }

    // ricostruisci DOM per righe
    el.innerHTML = "";
    lines.forEach((wordsInLine) => {
      // niente spazio a fine riga
      const last = wordsInLine[wordsInLine.length - 1];
      if (last) last.style.marginRight = "0";

      const line = document.createElement("span");
      line.className = "title-line";

      const inner = document.createElement("span");
      inner.className = "title-line-inner";

      wordsInLine.forEach((w) => inner.appendChild(w));

      line.appendChild(inner);
      el.appendChild(line);
    });

    return lines.length;
  }

  // init in 3 momenti: DOM, load, fonts ready (per misure corrette)
  document.addEventListener("DOMContentLoaded", initTitleLineAnim);
  window.addEventListener("load", initTitleLineAnim);
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(initTitleLineAnim);
  }

  // se cambi breakpoint / resize, meglio ricreare (qui: refresh semplice)
  window.addEventListener("resize", () => {
    if (window.ScrollTrigger) ScrollTrigger.refresh();
  });
})();
