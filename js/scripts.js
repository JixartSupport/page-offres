document.addEventListener("DOMContentLoaded", () => {
  function setStickyHeight() {
    const header = document.querySelector("header");
    const stickyBloc = document.getElementById("bloc-sticky");
    const stickySection = document.getElementById("sticky-section");
    const headerHeight = header.offsetHeight;
    const viewportHeight = window.innerHeight;

    stickyBloc.style.height = "auto";

    if (window.matchMedia("(min-width: 1024px)").matches) {
      stickySection.style.top = headerHeight + "px";

      if (header && stickyBloc) {
        stickyBloc.style.height = viewportHeight - headerHeight + "px";
      }
    }
  }

  // Run on page load and resize
  window.addEventListener("load", setStickyHeight);
  window.addEventListener("resize", setStickyHeight);

  // Same height offers bloc in tablet
  function equalizeHeights() {
    const blocks = document.querySelectorAll(".items-offers");

    // Reset height before calculating
    blocks.forEach((block) => {
      block.style.height = "auto";
    });

    if (
      window.matchMedia("(min-width: 768px) and (max-width: 1024px)").matches
    ) {
      // Get max height
      let maxHeight = 0;
      blocks.forEach((block) => {
        const height = block.offsetHeight;
        if (height > maxHeight) {
          maxHeight = height;
        }
      });

      // Apply max height
      blocks.forEach((block) => {
        block.style.height = maxHeight + "px";
      });
    }
  }

  window.addEventListener("load", equalizeHeights);
  window.addEventListener("resize", equalizeHeights);

  // Show sticky premium on scroll
  const bloc_premium = document.getElementById("premium-sticky");
  const triggerBlock = document.getElementById("bloc-offers");

  let hasEnteredViewport = false;

  const observerScrollOffres = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // TriggerBlock is in view
          hasEnteredViewport = true;
          bloc_premium.classList.add("hidden");
          bloc_premium.classList.remove("opacity-100");
        } else {
          // TriggerBlock is out of view AND was seen before
          if (hasEnteredViewport) {
            bloc_premium.classList.remove("hidden");
            bloc_premium.classList.add("opacity-100");
          }
        }
      });
    },
    {
      root: null,
      threshold: 0,
    }
  );

  observerScrollOffres.observe(triggerBlock);

  // Animation sections on scroll
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    {
      threshold: 0.3,
    }
  );

  document.querySelectorAll(".bloc-animate").forEach((el) => {
    observer.observe(el);
  });

  const blocs = document.querySelectorAll(".bloc-animate");

  if (blocs.length > 0) {
    blocs[0].classList.add("visible");
  }

  blocs.forEach((el, i) => {
    if (i !== 0) observer.observe(el);
  });
});

// Accordion JS
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".accordion").forEach((accordion) => {
    accordion.querySelectorAll(".accordion-header").forEach((header) => {
      header.addEventListener("click", () => {
        const item = header.closest(".accordion-item");
        const content = item.querySelector(".accordion-content");
        const icon = header.querySelector(".icon");

        // Toggle "is-open" class
        const isOpen = item.classList.contains("is-open");

        if (isOpen) {
          content.classList.remove("is-open");
          content.classList.remove("is-active");
          item.classList.remove("is-open");
        } else {
          content.classList.add("is-open");
          item.classList.add("is-open");
        }
      });
    });
  });
});

// Hero slider
document.addEventListener("DOMContentLoaded", () => {
  const heroSwiper = new Swiper(".mySwiper", {
    loop: true,
    loopedSlides: 1,
    autoplay: true,
    effect: "slide",
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });
});

// Blogs slider JS
document.addEventListener("DOMContentLoaded", () => {
  function equalizeSlideHeights() {
    const slides = document.querySelectorAll(
      ".mySwiperBlogs .swiper-slide .blog-item-content"
    );
    let maxHeight = 0;

    slides.forEach((slide) => {
      slide.style.height = "auto"; // reset first
      maxHeight = Math.max(maxHeight, slide.offsetHeight);
    });

    slides.forEach((slide) => {
      slide.style.height = `${maxHeight}px`;
    });
  }

  const swiperBlogs = new Swiper(".mySwiperBlogs", {
    loop: true,
    loopedSlides: 3,
    autoHeight: true,
    breakpoints: {
      0: {
        slidesPerView: 1.5,
        spaceBetween: 14,
      },
      834: {
        slidesPerView: 3.5,
        spaceBetween: 20,
      },
      1440: {
        slidesPerView: 4.5,
        spaceBetween: 20,
      },
    },
    on: {
      init: equalizeSlideHeights,
      resize: equalizeSlideHeights,
    },
    effect: "slide",
  });
});

// Div

document.addEventListener("DOMContentLoaded", function () {
  // When clicking an offer box, select its radio
  document.querySelectorAll(".subscription-offer").forEach(function (offer) {
    offer.addEventListener("click", function (e) {
      if (e.target.tagName === "INPUT") return;
      const radio = offer.querySelector('input[type="radio"]');
      if (radio) {
        radio.checked = true;
        radio.dispatchEvent(new Event("change", { bubbles: true }));
      }
    });
  });

  document.querySelectorAll('input[type="radio"][name="subscription"]').forEach(function (radio) {
    radio.addEventListener("change", function () {
      if (!radio.checked) return;

      const itemOffer = radio.closest(".item-offer");
      if (!itemOffer) return;

      const offerTitleEl = itemOffer.querySelector(".title-offre");
      const offerType = offerTitleEl ? offerTitleEl.textContent.trim().toLowerCase() : "";

      let ctaHref = "#";
      let googleHref = "#";
      let offerLabel = "";
      let comptes = "";
      let priceLine = "";

      if (offerType.includes("premium")) {
        offerLabel = "Premium";
        comptes = "2 comptes";

        if (radio.value === "annuelle") {
          ctaHref = "https://example.com/premium-annuelle";
          googleHref = "https://example.com/premium-annuelle-google";
          priceLine = "Annuelle 139,99€";
        } else if (radio.value === "mensuelle") {
          ctaHref = "https://example.com/premium-mensuelle";
          googleHref = "https://example.com/premium-mensuelle-google";
          priceLine = "Mensuelle 11,99€/mois";
        }
      } else if (offerType.includes("numérique")) {
        offerLabel = "Numérique";
        comptes = "1 compte";

        if (radio.value === "annuelle") {
          ctaHref = "https://example.com/numerique-annuelle";
          googleHref = "https://example.com/numerique-annuelle-google";
          priceLine = "Annuelle 79,99€";
        } else if (radio.value === "mensuelle") {
          ctaHref = "https://example.com/numerique-mensuelle";
          googleHref = "https://example.com/numerique-mensuelle-google";
          priceLine = "Mensuelle 6,99€/mois";
        }
      }

      const ctaButton = itemOffer.querySelector(".primary-button");
      const googleButton = itemOffer.querySelector(".button.bg-white");
      if (ctaButton) ctaButton.href = ctaHref;
      if (googleButton) googleButton.href = googleHref;

      const sticky = document.getElementById("premium-sticky");
      if (sticky) {
        const stickyText = sticky.querySelector(".text-sm");
        const stickyButton = sticky.querySelector(".sticky-btn");
        if (stickyText && stickyButton) {
          stickyText.innerHTML = `
            <span class="font-bold">${offerLabel}</span><span> - </span><span class="font-semibold italic">${comptes}</span>
            <p class="font-semibold text-xs">${priceLine}</p>
          `;
          stickyButton.href = ctaHref;
        }
      }
    });
  });

  // 👉 Initialize sticky element by triggering change on the checked radio on load
  const checkedRadio = document.querySelector('input[type="radio"][name="subscription"]:checked');
  if (checkedRadio) {
    checkedRadio.dispatchEvent(new Event("change", { bubbles: true }));
  }
});


// Loop through each item-offer section to enable/disable buttons
document.addEventListener("DOMContentLoaded", function() {
  const offers = document.querySelectorAll(".item-offer");

  function updateButtons() {
    // Find the checked radio
    const checkedRadio = document.querySelector('input[name="subscription"]:checked');
    if (!checkedRadio) return;

    // Determine which offer contains the checked radio
    offers.forEach(offer => {
      const offerContainsChecked = offer.contains(checkedRadio);
      const buttons = offer.querySelectorAll("a.button");

      buttons.forEach(btn => {
        if (offerContainsChecked) {
          btn.classList.remove("disabled");
        } else {
          btn.classList.add("disabled");
        }
      });
    });
  }

  // Initial state on page load
  updateButtons();

  // Update when any radio changes
  document.querySelectorAll('input[name="subscription"]').forEach(radio => {
    radio.addEventListener("change", updateButtons);
  });
});


// FLux rss

document.addEventListener("DOMContentLoaded", async () => {
  const swiperContainer = document.querySelector(".mySwiperBlogs");
  const wrapper = swiperContainer?.querySelector(".swiper-wrapper");

  if (!swiperContainer || !wrapper) {
    console.error("Le Swiper .mySwiperBlogs n’a pas été trouvé sur la page.");
    return;
  }

  try {
    const response = await fetch("/rss-proxy.php"); // ou ton URL proxy côté serveur
    const text = await response.text();
    const parser = new DOMParser();
    const xml = parser.parseFromString(text, "application/xml");

    const items = xml.querySelectorAll("item");
    items.forEach((item, index) => {
      const title = item.querySelector("title")?.textContent || "Sans titre";
      const link = item.querySelector("link")?.textContent || "#";
      const description = item.querySelector("description")?.textContent || "";
      const category = item.querySelector("category")?.textContent || "Article";

      // Optional: Extract image from <media:content> or first img in description
      const media = item.querySelector("media\\:content, content");
      let imageUrl = "./assets/placeholder.jpg"; // fallback
      if (media) {
        imageUrl = media.getAttribute("url");
      } else {
        const tmpDiv = document.createElement("div");
        tmpDiv.innerHTML = description;
        const imgInDesc = tmpDiv.querySelector("img");
        if (imgInDesc) imageUrl = imgInDesc.src;
      }

      const slide = document.createElement("div");
      slide.className = "swiper-slide item-blog";
      slide.innerHTML = `
        <div class="absolute flex top-2 left-2 gap-2">
          <img class="rounded-[2px]" src="./assets/lock-icon.svg" alt="" />
          <span class="bg-white px-1 uppercase text-primary text-sm rounded-[2px]">${category}</span>
        </div>
        <img class="blog-item-img" src="${imageUrl}" alt="" />
        <div class="blog-item-content bg-white px-3 pt-3 pb-[31px] flex flex-col gap-15 rounded-bl-[12px] rounded-br-[12px]">
          <h2 class="text-primary text-xl font-extrabold">${title}</h2>
          <p class="font-inter font-semibold text-base">${description.replace(/(<([^>]+)>)/gi, "").slice(0, 150)}...</p>
          <a class="font-inter text-sm text-secondary underline mt-2" href="${link}" target="_blank" rel="noopener">Lire l'article</a>
        </div>
      `;
      wrapper.appendChild(slide);
    });

    // Initialize Swiper only for this specific container
    new Swiper(swiperContainer, {
      slidesPerView: 1,
      spaceBetween: 20,
      loop: true,
      pagination: {
        el: swiperContainer.querySelector(".swiper-pagination"),
        clickable: true,
      },
      navigation: {
        nextEl: swiperContainer.querySelector(".swiper-button-next"),
        prevEl: swiperContainer.querySelector(".swiper-button-prev"),
      },
      breakpoints: {
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      },
    });
  } catch (error) {
    console.error("Erreur lors du chargement du flux RSS :", error);
    wrapper.innerHTML = "<p class='text-red-500'>Impossible de charger le contenu pour le moment.</p>";
  }
});
