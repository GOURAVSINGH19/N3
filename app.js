import { gsap } from "gsap";

import { Flip } from "gsap/Flip";

gsap.registerPlugin(Flip, GSDevTools);

const perloaderbg = document.querySelector(".preloader__background");
const preloadertext = document.querySelector(".preloader__text span");
const heroTitles = [...document.querySelectorAll(".hero__title span span")];
const heroimgStart = document.querySelector(".hero-image-start");
const heroCaption = document.querySelector(".hero__caption span");
const herobutton = document.querySelector(".hero__button");
const heroimg = document.querySelector(".hero__image");
const heroImageWrapper = document.querySelector(".hero__image img");
const heroItems = [...document.querySelectorAll(".header *")];

let master = gsap.timeline();

const setintialstate = () => {
  gsap.set(heroItems, {
    y: 24,
    autoAlpha: 0,
  });

  gsap.set(herobutton, {
    y: 64,
    autoAlpha: 0,
  });

  gsap.set([preloadertext, heroTitles, heroCaption], {
    yPercent: 100,
  });
};

const animestate = () => {
  let tl = gsap.timeline({
    defaults: {
      ease: "power2.out",
    },
  });

  tl.to(preloadertext, {
    yPercent: -10,
    delay: 0.3,
  })
    .to(preloadertext, {
      yPercent: -110,
      duration: 0.3,
      delay: 0.5,
    })
    .to(perloaderbg, {
      yPercent: -100,
      duration: 1.5,
      ease: "power4.inOut",
    });
  return tl;
};

const ImageAnimation = () => {
  const tl = gsap.timeline({
    defaults: {
      ease: "power3.inOut",
      duration: 2,
    },
  });

  const state = Flip.getState(heroImageWrapper);
  heroimgStart.appendChild(heroImageWrapper);

  tl.from(heroimg, {
    scale: 1.05,
  })
    .to(
      heroImageWrapper,
      {
        borderRadius: "16px",
      },
      "<"
    )
    .add(() => {
      Flip.to(state, {
        duration: 2,
        ease: "power3.inOut",
      });
    }, "<");
  return tl;
};

const TextAnimation = () => {
  const tl = gsap.timeline({
    delay: 0.5,
    defaults: {
      ease: "power3.inOut",
      duration: 1.7,
      yPercent: 0,
      y: 0,
    },
  });

  tl.to(heroCaption, {
    duration: 1.2,
    ease: "power3.inOut",
  })
    .to(
      heroTitles,
      {
        stagger: 0.2,
      },
      "-=.9"
    )
    .to(
      herobutton,
      {
        autoAlpha: 1,
      },
      0.5
    )
    .to(
      heroItems,
      {
        autoAlpha: 1,
      },
      0.5
    );

  return tl;
};

// GSDevTools.create();

master
  .add(setintialstate())
  .add(animestate())
  .add(ImageAnimation(), "-=1.5")
  .add(TextAnimation(), "-=1.5");
