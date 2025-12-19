const heroVisual = document.getElementById("hero-visual");
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("main section[id]");

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
  button.addEventListener("mousemove", (event) => {
    const rect = button.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    button.style.setProperty("--x", `${x}px`);
    button.style.setProperty("--y", `${y}px`);
  });
});
