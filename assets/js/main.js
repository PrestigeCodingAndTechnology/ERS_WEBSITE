
(function(){
  "use strict";

  const $body = document.body;
  const loader = document.getElementById("page-loader");
  const header = document.querySelector(".site-header");
  const menuToggle = document.querySelector(".menu-toggle");
  const mobilePanel = document.querySelector(".mobile-panel");
  const menuOverlay = document.querySelector(".menu-overlay");
  const scrollTopBtn = document.querySelector(".scroll-top");
  const heroVisual = document.querySelector(".hero-visual");

  window.addEventListener("load", function(){
    setTimeout(() => loader && loader.classList.add("hide"), 250);
  });

  const syncHeader = () => {
    if(header) header.classList.toggle("scrolled", window.scrollY > 10);
    if(scrollTopBtn) scrollTopBtn.classList.toggle("show", window.scrollY > 450);
  };
  syncHeader();
  window.addEventListener("scroll", syncHeader, {passive:true});

  const closeMenu = () => {
    if(!mobilePanel) return;
    mobilePanel.classList.remove("open");
    menuOverlay && menuOverlay.classList.remove("show");
    $body.classList.remove("menu-open");
    if(menuToggle){
      menuToggle.setAttribute("aria-expanded","false");
      const i = menuToggle.querySelector("i");
      if(i) i.className = "fa-solid fa-bars";
    }
  };

  if(menuToggle){
    menuToggle.addEventListener("click", () => {
      const open = !mobilePanel.classList.contains("open");
      mobilePanel.classList.toggle("open", open);
      menuOverlay && menuOverlay.classList.toggle("show", open);
      $body.classList.toggle("menu-open", open);
      menuToggle.setAttribute("aria-expanded", String(open));
      const i = menuToggle.querySelector("i");
      if(i) i.className = open ? "fa-solid fa-xmark" : "fa-solid fa-bars";
    });
  }
  menuOverlay && menuOverlay.addEventListener("click", closeMenu);
  document.querySelectorAll(".mobile-panel a").forEach(a => a.addEventListener("click", closeMenu));
  window.addEventListener("resize", () => { if(window.innerWidth > 850) closeMenu(); });

  scrollTopBtn && scrollTopBtn.addEventListener("click", () => window.scrollTo({top:0,behavior:"smooth"}));

  if(window.AOS){
    AOS.init({
      duration: 760,
      easing: "ease-out-cubic",
      once: true,
      offset: 70
    });
  }

  if(window.VanillaTilt){
    VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
      max: 5,
      speed: 650,
      glare: true,
      "max-glare": .07
    });
  }

  if(window.jQuery && jQuery.fn.owlCarousel){
    jQuery(".integration-carousel").owlCarousel({
      loop:true,
      margin:12,
      autoplay:true,
      autoplayTimeout:2300,
      autoplayHoverPause:true,
      smartSpeed:650,
      dots:false,
      nav:false,
      responsive:{0:{items:2},520:{items:3},850:{items:4},1100:{items:6}}
    });

    jQuery(".project-carousel").owlCarousel({
      loop:false,
      margin:18,
      dots:false,
      nav:true,
      navText:['<i class="fa-solid fa-arrow-left"></i>','<i class="fa-solid fa-arrow-right"></i>'],
      smartSpeed:650,
      responsive:{0:{items:1},650:{items:2},980:{items:3},1180:{items:4}}
    });
  }

  document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", function(){
      document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
      this.classList.add("active");
      const filter = this.dataset.filter || "all";
      const carousel = jQuery(".project-carousel");
      if(!carousel.length) return;

      const sourceCards = Array.from(document.querySelectorAll("#project-source .project-card"));
      carousel.trigger("destroy.owl.carousel");
      carousel.empty();
      sourceCards
        .filter(card => filter === "all" || card.dataset.category === filter)
        .forEach(card => carousel.append(card.cloneNode(true)));

      carousel.owlCarousel({
        loop:false,margin:18,dots:false,nav:true,
        navText:['<i class="fa-solid fa-arrow-left"></i>','<i class="fa-solid fa-arrow-right"></i>'],
        smartSpeed:650,
        responsive:{0:{items:1},650:{items:2},980:{items:3},1180:{items:4}}
      });
    });
  });

  // Lightweight parallax for the hero visual.
  if(heroVisual && window.matchMedia("(pointer:fine)").matches){
    const img = heroVisual.querySelector(".hero-image");
    heroVisual.addEventListener("mousemove", e => {
      const r = heroVisual.getBoundingClientRect();
      const x = (e.clientX-r.left)/r.width - .5;
      const y = (e.clientY-r.top)/r.height - .5;
      if(img) img.style.transform = `perspective(900px) rotateY(${x*7-3}deg) rotateX(${-y*5}deg) translateY(-3px)`;
    });
    heroVisual.addEventListener("mouseleave", () => {
      if(img) img.style.transform = "perspective(900px) rotateY(-3deg)";
    });
  }

  // Contact form: front-end validation and confirmation. Ready for backend/API wiring.
  const contactForm = document.getElementById("contact-form");
  if(contactForm){
    contactForm.addEventListener("submit", function(e){
      e.preventDefault();
      const required = Array.from(contactForm.querySelectorAll("[required]"));
      const invalid = required.find(el => !String(el.value || "").trim());
      if(invalid){
        invalid.focus();
        invalid.style.borderColor = "#df2d36";
        setTimeout(() => invalid.style.borderColor = "", 1800);
        return;
      }
      const status = document.querySelector(".form-status");
      if(status){
        status.style.display = "block";
        status.textContent = "Thank you. Your enquiry has been captured. The ERS team can now connect this form to the preferred email or CRM endpoint.";
      }
      contactForm.reset();
    });
  }

  const newsletter = document.querySelector(".newsletter");
  if(newsletter){
    newsletter.addEventListener("submit", function(e){
      e.preventDefault();
      const input = this.querySelector("input");
      const button = this.querySelector("button");
      if(input && input.value.trim()){
        button.textContent = "Added";
        button.disabled = true;
        setTimeout(()=>{ button.textContent = "Subscribe"; button.disabled = false; input.value = ""; },1800);
      }
    });
  }

  // Smooth internal anchors.
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener("click", e=>{
      const target = document.querySelector(a.getAttribute("href"));
      if(target){
        e.preventDefault();
        target.scrollIntoView({behavior:"smooth",block:"start"});
      }
    });
  });
})();
