const heroVisual = document.getElementById("hero-visual");
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("main section[id]");

const layers = heroVisual ? heroVisual.querySelectorAll("[data-depth]") : [];
let heroBounds = heroVisual ? heroVisual.getBoundingClientRect() : null;
let heroFrame = null;
let heroPointer = { x: 0, y: 0 };
let heroCurrent = { x: 0, y: 0 };

const updateHeroBounds = () => {
  if (!heroVisual) return;
  heroBounds = heroVisual.getBoundingClientRect();
};

const renderParallax = () => {
  if (!heroBounds) return;
  heroCurrent.x += (heroPointer.x - heroCurrent.x) * 0.12;
  heroCurrent.y += (heroPointer.y - heroCurrent.y) * 0.12;
  const x = heroCurrent.x / heroBounds.width - 0.5;
  const y = heroCurrent.y / heroBounds.height - 0.5;
  const x = heroPointer.x / heroBounds.width - 0.5;
  const y = heroPointer.y / heroBounds.height - 0.5;
  layers.forEach((layer) => {
    const depth = Number(layer.dataset.depth);
    layer.style.transform = `translate3d(${x * depth}px, ${y * depth}px, 0)`;
  });
  heroFrame = requestAnimationFrame(renderParallax);
  heroFrame = null;
};

const handleParallax = (event) => {
  if (!heroBounds) return;
  heroPointer = {
    x: event.clientX - heroBounds.left,
    y: event.clientY - heroBounds.top,
  };
  if (!heroFrame) {
    heroFrame = requestAnimationFrame(renderParallax);
  }
};

if (heroVisual) {
  updateHeroBounds();
  window.addEventListener("resize", updateHeroBounds, { passive: true });
  heroVisual.addEventListener("pointermove", handleParallax, { passive: true });
  heroVisual.addEventListener("mouseleave", () => {
    heroPointer = { x: heroBounds.width / 2, y: heroBounds.height / 2 };
    heroCurrent = { ...heroPointer };
    layers.forEach((layer) => {
      layer.style.transform = "translate3d(0, 0, 0)";
    });
    if (heroFrame) {
      cancelAnimationFrame(heroFrame);
      heroFrame = null;
    }
  });
  heroPointer = { x: heroBounds.width / 2, y: heroBounds.height / 2 };
  heroCurrent = { ...heroPointer };
  heroFrame = requestAnimationFrame(renderParallax);
    layers.forEach((layer) => {
const handleParallax = (event) => {
  const { clientX, clientY } = event;
  const bounds = heroVisual.getBoundingClientRect();
  const x = (clientX - bounds.left) / bounds.width - 0.5;
  const y = (clientY - bounds.top) / bounds.height - 0.5;

  heroVisual.querySelectorAll("[data-depth]").forEach((layer) => {
    const depth = Number(layer.dataset.depth);
    const moveX = x * depth;
    const moveY = y * depth;
    layer.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
  });
};

if (heroVisual) {
  heroVisual.addEventListener("mousemove", handleParallax);
  heroVisual.addEventListener("mouseleave", () => {
    heroVisual.querySelectorAll("[data-depth]").forEach((layer) => {
      layer.style.transform = "translate3d(0, 0, 0)";
    });
  });
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => link.classList.remove("active"));
        const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
        if (active) {
          active.classList.add("active");
        }
      }
    });
  },
  {
    threshold: 0.5,
  }
);

sections.forEach((section) => observer.observe(section));

const buttons = document.querySelectorAll(".pill-button");
buttons.forEach((button) => {
  let frame = null;
  let rect = button.getBoundingClientRect();
  let pointer = { x: rect.width / 2, y: rect.height / 2 };
  let current = { ...pointer };

  const updateRect = () => {
    rect = button.getBoundingClientRect();
  };

  const renderGlow = () => {
    current.x += (pointer.x - current.x) * 0.2;
    current.y += (pointer.y - current.y) * 0.2;
    button.style.setProperty("--x", `${current.x}px`);
    button.style.setProperty("--y", `${current.y}px`);
    frame = requestAnimationFrame(renderGlow);
    button.style.setProperty("--x", `${pointer.x}px`);
    button.style.setProperty("--y", `${pointer.y}px`);
    frame = null;
  };

  button.addEventListener("pointerenter", updateRect, { passive: true });
  button.addEventListener(
    "pointermove",
    (event) => {
      pointer = { x: event.clientX - rect.left, y: event.clientY - rect.top };
      if (!frame) {
        frame = requestAnimationFrame(renderGlow);
      }
    },
    { passive: true }
  );
  button.addEventListener("pointerleave", () => {
    pointer = { x: rect.width / 2, y: rect.height / 2 };
    current = { ...pointer };
    if (frame) {
      cancelAnimationFrame(frame);
      frame = null;
    }
  button.addEventListener("mousemove", (event) => {
    const rect = button.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    button.style.setProperty("--x", `${x}px`);
    button.style.setProperty("--y", `${y}px`);
  });
});
