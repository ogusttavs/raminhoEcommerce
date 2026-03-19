document.addEventListener("DOMContentLoaded", () => {
  initStickyHeader();
  initReveal();
  initQuantityPickers(document);
  initMediaThumbs(document);
  initProductForms(document);
});

function initStickyHeader() {
  const header = document.querySelector("[data-site-header]");
  if (!header) return;

  const sync = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 12);
  };

  sync();
  window.addEventListener("scroll", sync, { passive: true });
}

function initReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!items.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.15 });

  items.forEach((item) => observer.observe(item));
}

function initQuantityPickers(root) {
  root.querySelectorAll(".quantity-picker").forEach((picker) => {
    const input = picker.querySelector("[data-qty-input]");
    if (!input) return;

    picker.querySelectorAll("[data-qty-button]").forEach((button) => {
      button.addEventListener("click", () => {
        const step = Number(button.getAttribute("data-qty-button")) || 0;
        const current = Number(input.value) || 1;
        input.value = Math.max(1, current + step);
        input.dispatchEvent(new Event("change", { bubbles: true }));
      });
    });
  });
}

function initMediaThumbs(root) {
  root.querySelectorAll(".product-page").forEach((section) => {
    section.querySelectorAll("[data-media-thumb]").forEach((thumb) => {
      thumb.addEventListener("click", () => {
        setActiveMedia(section, thumb.getAttribute("data-media-id"));
      });
    });
  });
}

function initProductForms(root) {
  root.querySelectorAll("[data-product-form]").forEach((form) => {
    const section = form.closest(".product-page");
    const variantsScript = section?.querySelector("[data-product-variants]");
    if (!section || !variantsScript) return;

    let variants = [];
    try {
      variants = JSON.parse(variantsScript.textContent);
    } catch (error) {
      console.error("Nao foi possivel ler as variantes do produto.", error);
      return;
    }

    const variantIdInput = form.querySelector("[data-variant-id-input]");
    const addButton = form.querySelector("[data-add-to-cart]");
    const priceWrap = section.querySelector("[data-product-price-wrap]");
    const status = form.querySelector("[data-product-status]");
    const optionInputs = form.querySelectorAll("[data-option-input]");

    const getSelectedOptions = () => {
      const selected = [];
      form.querySelectorAll("[data-option-input]:checked").forEach((input) => {
        const position = Number(input.getAttribute("data-option-position")) - 1;
        selected[position] = input.value;
      });
      return selected.filter(Boolean);
    };

    const findVariant = () => {
      if (!variants.length) return null;
      if (!optionInputs.length) {
        return variants.find((variant) => String(variant.id) === variantIdInput.value) || variants[0];
      }

      const selectedOptions = getSelectedOptions();
      return variants.find((variant) => {
        return variant.options.every((option, index) => option === selectedOptions[index]);
      }) || null;
    };

    const renderVariant = (variant) => {
      if (!variant) {
        addButton.disabled = true;
        addButton.textContent = "Indisponivel";
        if (status) status.textContent = "Esta combinacao nao esta disponivel.";
        return;
      }

      variantIdInput.value = variant.id;
      addButton.disabled = !variant.available;
      addButton.textContent = variant.available ? "Adicionar ao carrinho" : "Indisponivel";

      if (status) {
        status.textContent = variant.available
          ? "Disponivel para entrega programada."
          : "Produto indisponivel no momento.";
      }

      if (priceWrap) {
        const compareMarkup = variant.compare_at_price && variant.compare_at_price > variant.price
          ? `<span class="price-block__compare">${formatMoney(variant.compare_at_price)}</span>`
          : "";

        priceWrap.innerHTML = `
          <div class="price-block ${compareMarkup ? "price-block--sale" : ""}">
            <span class="price-block__current">${formatMoney(variant.price)}</span>
            ${compareMarkup}
          </div>
        `;
      }

      if (variant.featured_media && variant.featured_media.id) {
        setActiveMedia(section, String(variant.featured_media.id));
      }

      const nextUrl = new URL(window.location.href);
      nextUrl.searchParams.set("variant", variant.id);
      window.history.replaceState({}, "", nextUrl.toString());
    };

    optionInputs.forEach((input) => {
      input.addEventListener("change", () => {
        renderVariant(findVariant());
      });
    });

    renderVariant(findVariant());
  });
}

function setActiveMedia(section, mediaId) {
  if (!section || !mediaId) return;

  section.querySelectorAll("[data-media-slide]").forEach((slide) => {
    slide.classList.toggle("is-active", slide.getAttribute("data-media-id") === String(mediaId));
  });

  section.querySelectorAll("[data-media-thumb]").forEach((thumb) => {
    thumb.classList.toggle("is-active", thumb.getAttribute("data-media-id") === String(mediaId));
  });
}

function formatMoney(cents) {
  const currency = window.raminhoTheme?.moneyCurrency || "BRL";
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency
  }).format((Number(cents) || 0) / 100);
}
