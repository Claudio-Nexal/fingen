<script src="https://unpkg.com/lenis@1.3.15/dist/lenis.min.js"></script> 



<script>
document.addEventListener("DOMContentLoaded", () => {
  const navbar     = document.querySelector(".navbar");
  const menuButton = document.querySelector(".w-nav-button");
  const navMenu    = document.querySelector(".w-nav-menu");
  const overlay    = document.querySelector(".w-nav-overlay");

  const brandImg   = document.querySelector(".nav-brand img");
  let menuImg      = document.querySelector(".menu-button-image") || document.querySelector(".menu.button.image");

  const openMenuIconSrc  = "https://cdn.prod.website-files.com/68f6081c93cf52481f6bceb3/691753c4f684e1fd143601fe_menu%20button%20close.svg";
  const openBrandSrc     = "https://cdn.prod.website-files.com/68f6081c93cf52481f6bceb3/691753236796e9f7de4f93b9_Logo%20blue.svg";
  const defaultBrandSrc  = brandImg?.src;
  const defaultMenuIconSrc = menuImg?.src;

  const DELAY = 300;

  function updateNavbarState() {
    const isOpen = menuButton.classList.contains("w--open");

    if (isOpen) {
      /* APERTURA */
      navbar.classList.add("navbar-is-open");

      // lock scroll
      document.body.classList.add("no-scroll");

      // ritardo visibilità del menu
      setTimeout(() => {
        navMenu?.classList.add("menu-visible");
        overlay?.classList.add("menu-visible");
      }, DELAY);

      // cambio icone/logo
      if (menuImg) menuImg.src = openMenuIconSrc;
      if (brandImg) brandImg.src = openBrandSrc;

    } else {
      /* CHIUSURA */

      // unlock scroll (dopo che il menu ha iniziato a chiudersi)
      setTimeout(() => {
        document.body.classList.remove("no-scroll");
      }, DELAY);

      // menu sparisce subito
      navMenu?.classList.remove("menu-visible");
      overlay?.classList.remove("menu-visible");

      // ritardo reset header
      setTimeout(() => {
        navbar.classList.remove("navbar-is-open");
      }, DELAY);

      // reset icone/logo
      if (menuImg) menuImg.src = defaultMenuIconSrc;
      if (brandImg) brandImg.src = defaultBrandSrc;
    }
  }

  menuButton.addEventListener("click", () => {
    setTimeout(updateNavbarState, 30);
  });
});
</script>













<script>
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
</script>

<script>
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
        markers: true        // mostra markers per vedere il trigger
      }
    }
  );
});
</script>



<script>
document.addEventListener("DOMContentLoaded", () => {
  const lenis = new Lenis({
    duration: 1.2,
    smooth: true,
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
</script>
