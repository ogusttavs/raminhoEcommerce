let cartDrawerState = null;

document.addEventListener("DOMContentLoaded", () => {
  if (redirectCartTemplate()) return;

  initStickyHeader();
  initReveal();
  initQuantityPickers(document);
  initMediaThumbs(document);
  initCartDrawer();
  initProductForms(document);
  initProductCardForms(document);
});

function redirectCartTemplate() {
  if (!document.body.classList.contains("template-cart")) return false;

  const fallbackUrl = new URL(window.raminhoTheme?.routes?.root || "/", window.location.origin);

  try {
    if (document.referrer) {
      const referrerUrl = new URL(document.referrer);
      const isSameOrigin = referrerUrl.origin === window.location.origin;
      const isCartPage = /^\/cart(?:[/?#]|$)/.test(referrerUrl.pathname);

      if (isSameOrigin && !isCartPage) {
        referrerUrl.searchParams.set("cart", "open");
        window.location.replace(referrerUrl.toString());
        return true;
      }
    }
  } catch (error) {
    console.warn("Nao foi possivel ler a URL anterior do carrinho.", error);
  }

  fallbackUrl.searchParams.set("cart", "open");
  window.location.replace(fallbackUrl.toString());
  return true;
}

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
    if (picker.dataset.qtyReady === "true") return;
    picker.dataset.qtyReady = "true";

    const input = picker.querySelector("[data-qty-input]");
    if (!input) return;

    picker.querySelectorAll("[data-qty-button]").forEach((button) => {
      button.addEventListener("click", () => {
        const step = Number(button.getAttribute("data-qty-button")) || 0;
        const current = clampQuantityInput(input);
        input.value = Math.max(getMinimumQuantity(input), current + step);
        input.dispatchEvent(new Event("change", { bubbles: true }));
      });
    });

    input.addEventListener("change", () => {
      const nextValue = clampQuantityInput(input);
      input.value = nextValue;
    });
  });
}

function initMediaThumbs(root) {
  root.querySelectorAll(".product-page").forEach((section) => {
    section.querySelectorAll("[data-media-thumb]").forEach((thumb) => {
      if (thumb.dataset.mediaReady === "true") return;
      thumb.dataset.mediaReady = "true";

      thumb.addEventListener("click", () => {
        setActiveMedia(section, thumb.getAttribute("data-media-id"));
      });
    });
  });
}

function initCartDrawer() {
  const root = document.querySelector("[data-cart-drawer]");
  const body = root?.querySelector("[data-cart-drawer-body]");
  if (!root || !body) return;

  const initialCart = parseJsonScript(document.querySelector("[data-cart-initial-state]")) || createEmptyCart();

  cartDrawerState = {
    root,
    body,
    closeButtons: [...root.querySelectorAll("[data-cart-close]")],
    countElements: [...document.querySelectorAll("[data-cart-count]")],
    drawerCountElement: root.querySelector("[data-cart-drawer-count]"),
    cart: initialCart
  };

  cartDrawerState.closeButtons.forEach((button) => {
    button.addEventListener("click", () => closeCartDrawer());
  });

  root.addEventListener("click", handleCartDrawerClick);
  root.addEventListener("change", handleCartDrawerChange);

  document.querySelectorAll("[data-cart-trigger]").forEach((trigger) => {
    if (trigger.dataset.cartReady === "true") return;
    trigger.dataset.cartReady = "true";

    trigger.addEventListener("click", (event) => {
      event.preventDefault();
      trigger.closest("details")?.removeAttribute("open");
      openCartDrawer();
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && cartDrawerState?.root.classList.contains("is-open")) {
      closeCartDrawer();
    }
  });

  renderCartDrawer(initialCart);
  openCartFromUrl();

  window.raminhoTheme = {
    ...window.raminhoTheme,
    openCartDrawer
  };
}

function initProductForms(root) {
  root.querySelectorAll("[data-product-form]").forEach((form) => {
    if (form.dataset.productFormReady === "true") return;
    form.dataset.productFormReady = "true";

    const section = form.closest(".product-page");
    const variantsScript = section?.querySelector("[data-product-variants]");
    if (!section || !variantsScript) return;

    const variants = parseJsonScript(variantsScript);
    if (!Array.isArray(variants) || !variants.length) return;

    const variantIdInput = form.querySelector("[data-variant-id-input]");
    const addButton = form.querySelector("[data-add-to-cart]");
    const priceWrap = section.querySelector("[data-product-price-wrap]");
    const status = form.querySelector("[data-product-status]");
    const optionInputs = form.querySelectorAll("[data-option-input]");
    const quantityInput = form.querySelector("[data-qty-input]");
    const quantityPicker = form.querySelector(".quantity-picker");

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
        if (addButton) {
          addButton.disabled = true;
          addButton.textContent = "Indisponivel";
        }

        if (status) {
          status.textContent = "Esta combinacao nao esta disponivel.";
        }
        return;
      }

      variantIdInput.value = variant.id;

      if (priceWrap) {
        priceWrap.innerHTML = buildPriceMarkup(variant.price, variant.compare_at_price);
      }

      if (variant.featured_media && variant.featured_media.id) {
        setActiveMedia(section, String(variant.featured_media.id));
      }

      const nextUrl = new URL(window.location.href);
      nextUrl.searchParams.set("variant", variant.id);
      window.history.replaceState({}, "", nextUrl.toString());

      syncPurchaseState(variant);
    };

    const syncPurchaseState = (variant) => {
      if (!variant) return;

      const quantity = quantityInput ? clampQuantityInput(quantityInput) : 1;
      const purchaseState = buildPurchaseState(variant, quantity);

      updateMeasurePicker(quantityPicker, purchaseState.totalLabel);

      if (addButton) {
        addButton.disabled = !variant.available;
        addButton.textContent = variant.available ? `Comprar por ${formatMoney(purchaseState.totalPrice)}` : "Indisponivel";
      }

      if (status) {
        status.textContent = variant.available
          ? "Use + e - para ajustar a quantidade."
          : "Produto indisponivel no momento.";
      }
    };

    optionInputs.forEach((input) => {
      input.addEventListener("change", () => {
        renderVariant(findVariant());
      });
    });

    quantityInput?.addEventListener("change", () => {
      syncPurchaseState(findVariant());
    });

    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const variant = findVariant();
      if (!variant || !variant.available) return;

      const quantity = quantityInput ? clampQuantityInput(quantityInput) : 1;
      const restoreText = status?.textContent || "";

      await addToCart({
        variantId: variant.id,
        quantity,
        button: addButton,
        statusElement: status,
        successMessage: "Produto adicionado ao carrinho.",
        restoreMessage: restoreText
      });
    });

    renderVariant(findVariant());
  });
}

function initProductCardForms(root) {
  root.querySelectorAll("[data-card-product-form]").forEach((form) => {
    if (form.dataset.cardFormReady === "true") return;
    form.dataset.cardFormReady = "true";

    const variants = parseJsonScript(form.querySelector("[data-card-variants]"));
    if (!Array.isArray(variants) || !variants.length) return;

    const hiddenVariantInput = form.querySelector("[data-card-variant-id]");
    const addButton = form.querySelector("[data-card-add-to-cart]");
    const status = form.querySelector("[data-card-status]");
    const quantityInput = form.querySelector("[data-qty-input]");
    const quantityPicker = form.querySelector(".quantity-picker");
    const badge = form.closest(".product-card")?.querySelector("[data-card-variant-badge]");
    const quickVariant = pickQuickAddVariant(variants);

    const renderCard = () => {
      const quantity = quantityInput ? clampQuantityInput(quantityInput) : 1;

      if (!quickVariant) {
        if (addButton) {
          addButton.disabled = true;
          addButton.textContent = "Indisponivel";
        }

        if (status) {
          status.textContent = "Produto indisponivel no momento.";
        }
        return;
      }

      const purchaseState = buildPurchaseState(quickVariant, quantity);

      if (hiddenVariantInput) {
        hiddenVariantInput.value = quickVariant.id;
      }

      if (badge) {
        badge.classList.remove("is-hidden");
        badge.textContent = purchaseState.stepLabel;
      }

      updateMeasurePicker(quantityPicker, purchaseState.totalLabel);

      if (addButton) {
        addButton.disabled = !quickVariant.available;
        addButton.textContent = quickVariant.available ? `Comprar por ${formatMoney(purchaseState.totalPrice)}` : "Indisponivel";
      }

      if (status) {
        status.textContent = quickVariant.available
          ? "Use + e - para ajustar a quantidade."
          : "Produto indisponivel no momento.";
      }
    };

    quantityInput?.addEventListener("change", renderCard);

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      if (!quickVariant || !quickVariant.available) return;

      const quantity = quantityInput ? clampQuantityInput(quantityInput) : 1;

      await addToCart({
        variantId: quickVariant.id,
        quantity,
        button: addButton,
        statusElement: status,
        successMessage: "Adicionado ao carrinho.",
        restoreMessage: status?.textContent || ""
      });
    });

    renderCard();
  });
}

function handleCartDrawerClick(event) {
  const closeTarget = event.target.closest("[data-cart-close]");
  if (closeTarget) {
    event.preventDefault();
    closeCartDrawer();
    return;
  }

  const actionButton = event.target.closest("[data-cart-line-action]");
  if (!actionButton) return;

  event.preventDefault();

  const lineKey = actionButton.getAttribute("data-line-key");
  const action = actionButton.getAttribute("data-cart-line-action");
  const input = cartDrawerState?.root.querySelector(`[data-cart-line-input="${cssEscape(lineKey)}"]`);
  const currentValue = input ? clampQuantityInput(input, 0) : 0;
  const nextQuantity = action === "increase"
    ? currentValue + 1
    : action === "remove"
      ? 0
      : currentValue - 1;

  void updateCartLine(lineKey, nextQuantity);
}

function handleCartDrawerChange(event) {
  const input = event.target.closest("[data-cart-line-input]");
  if (!input) return;

  const lineKey = input.getAttribute("data-cart-line-input");
  const nextQuantity = clampQuantityInput(input, 0);
  void updateCartLine(lineKey, nextQuantity);
}

async function addToCart({ variantId, quantity, button, statusElement, successMessage, restoreMessage }) {
  const originalButtonLabel = button?.textContent || "";

  if (button) {
    button.disabled = true;
    button.textContent = "Adicionando...";
  }

  try {
    await fetchJson(window.raminhoTheme?.routes?.cartAdd, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        items: [
          {
            id: Number(variantId),
            quantity: Number(quantity) || 1
          }
        ]
      })
    });

    const cart = await refreshCart({ open: true });

    if (statusElement) {
      statusElement.textContent = successMessage;
      window.setTimeout(() => {
        statusElement.textContent = restoreMessage;
      }, 2400);
    }

    return cart;
  } catch (error) {
    if (statusElement) {
      statusElement.textContent = error.message || "Nao foi possivel adicionar o produto.";
    }

    console.error("Falha ao adicionar produto ao carrinho.", error);
    return null;
  } finally {
    if (button) {
      button.disabled = false;
      button.textContent = originalButtonLabel;
    }
  }
}

async function updateCartLine(lineKey, quantity) {
  if (!lineKey) return;

  try {
    const cart = await fetchJson(window.raminhoTheme?.routes?.cartChange, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        id: lineKey,
        quantity: Math.max(0, Number(quantity) || 0)
      })
    });

    renderCartDrawer(cart);
  } catch (error) {
    console.error("Falha ao atualizar o carrinho.", error);
  }
}

async function refreshCart({ open = false } = {}) {
  const cart = await fetchCart();
  renderCartDrawer(cart);

  if (open) {
    openCartDrawer();
  }

  return cart;
}

async function fetchCart() {
  return fetchJson(window.raminhoTheme?.routes?.cartJson, {
    method: "GET",
    headers: {
      Accept: "application/json"
    }
  });
}

function renderCartDrawer(cart) {
  if (!cartDrawerState) return;

  const safeCart = cart || createEmptyCart();
  cartDrawerState.cart = safeCart;

  cartDrawerState.countElements.forEach((element) => {
    element.textContent = safeCart.item_count;
  });

  if (cartDrawerState.drawerCountElement) {
    cartDrawerState.drawerCountElement.textContent = formatCartCount(safeCart.item_count);
  }

  cartDrawerState.body.innerHTML = safeCart.item_count > 0
    ? renderCartItems(safeCart)
    : renderEmptyCart();
}

function openCartDrawer() {
  if (!cartDrawerState) return;

  cartDrawerState.root.classList.add("is-open");
  cartDrawerState.root.setAttribute("aria-hidden", "false");
  document.body.classList.add("is-cart-open");
}

function closeCartDrawer() {
  if (!cartDrawerState) return;

  cartDrawerState.root.classList.remove("is-open");
  cartDrawerState.root.setAttribute("aria-hidden", "true");
  document.body.classList.remove("is-cart-open");
}

function openCartFromUrl() {
  const currentUrl = new URL(window.location.href);
  if (currentUrl.searchParams.get("cart") !== "open") return;

  currentUrl.searchParams.delete("cart");
  window.history.replaceState({}, "", currentUrl.toString());
  openCartDrawer();
}

function renderCartItems(cart) {
  const itemsMarkup = cart.items.map((item) => renderCartItem(item)).join("");

  return `
    <div class="cart-drawer__items">
      ${itemsMarkup}
    </div>

    ${renderCartSummary(cart)}
  `;
}

function renderCartSummary(cart) {
  const subtotal = getCartSubtotal(cart);
  const progressState = buildCartProgressState(subtotal);
  const checkoutMarkup = progressState.canCheckout
    ? `<a class="button button--purchase button--wide" href="${escapeHtml(window.raminhoTheme?.routes?.checkout || "/checkout")}">Finalizar pedido</a>`
    : `<button class="button button--purchase button--wide" type="button" disabled>${escapeHtml(progressState.buttonLabel)}</button>`;

  return `
    <div class="cart-drawer__summary">
      <div class="cart-drawer__summary-line">
        <span>Subtotal</span>
        <strong>${formatMoney(subtotal)}</strong>
      </div>
      ${renderCartProgress(progressState, subtotal)}
      <p class="cart-drawer__summary-note">${escapeHtml(progressState.message)}</p>
      <p class="cart-drawer__summary-meta">${escapeHtml(progressState.helper)}</p>
      <div class="cart-drawer__summary-actions">
        ${checkoutMarkup}
        <button class="button button--ghost button--wide" type="button" data-cart-close>Continuar comprando</button>
      </div>
    </div>
  `;
}

function renderCartProgress(progressState, subtotal) {
  return `
    <div class="cart-progress cart-progress--${progressState.stage}" aria-label="${escapeHtml(progressState.eyebrow)}">
      <div class="cart-progress__head">
        <p class="cart-progress__eyebrow">${escapeHtml(progressState.eyebrow)}</p>
        <p class="cart-progress__title">${escapeHtml(progressState.title)}</p>
      </div>
      <div
        class="cart-progress__track"
        role="progressbar"
        aria-valuemin="0"
        aria-valuemax="${progressState.progressMax}"
        aria-valuenow="${progressState.progressValue}"
        aria-valuetext="${escapeHtml(progressState.ariaText)}"
      >
        <span class="cart-progress__fill" style="width:${progressState.progressPercent}%"></span>
      </div>
      <div class="cart-progress__meta">
        <span>Atual ${formatMoney(subtotal)}</span>
        <span>Meta ${formatMoney(progressState.targetCents)}</span>
      </div>
    </div>
  `;
}

function renderCartItem(item) {
  const imageMarkup = item.image
    ? `<img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.product_title)}" loading="lazy">`
    : `<div class="cart-drawer__placeholder">Selecao do dia</div>`;

  const variantMarkup = item.variant_title && item.variant_title !== "Default Title"
    ? `<p class="cart-drawer__variant">${escapeHtml(item.variant_title)}</p>`
    : "";

  return `
    <article class="cart-drawer__item">
      <a class="cart-drawer__item-media" href="${escapeHtml(item.url)}">
        ${imageMarkup}
      </a>

      <div class="cart-drawer__item-copy">
        <div>
          <h3><a href="${escapeHtml(item.url)}">${escapeHtml(item.product_title)}</a></h3>
          ${variantMarkup}
        </div>

        <div class="cart-drawer__item-footer">
          <div class="cart-drawer__quantity" aria-label="Quantidade">
            <button type="button" aria-label="Diminuir quantidade" data-cart-line-action="decrease" data-line-key="${escapeHtml(item.key)}">-</button>
            <input type="number" min="0" value="${item.quantity}" inputmode="numeric" data-cart-line-input="${escapeHtml(item.key)}">
            <button type="button" aria-label="Aumentar quantidade" data-cart-line-action="increase" data-line-key="${escapeHtml(item.key)}">+</button>
          </div>

          <button class="text-link" type="button" data-cart-line-action="remove" data-line-key="${escapeHtml(item.key)}">Remover</button>
        </div>
      </div>

      <div class="cart-drawer__line-total">${formatMoney(item.final_line_price)}</div>
    </article>
  `;
}

function renderEmptyCart() {
  return `
    <div class="cart-drawer__empty">
      <h3>Seu carrinho esta vazio.</h3>
      <p>Escolha frutas, legumes e selecoes especiais para montar a sua proxima entrega.</p>
      <button class="button button--wide" type="button" data-cart-close>Continuar comprando</button>
    </div>
  `;
}

function pickQuickAddVariant(variants) {
  const pool = variants.filter((variant) => variant.available);
  const source = pool.length ? pool : variants;

  return [...source].sort((left, right) => {
    const leftMeasurement = parseVariantMeasurement(left);
    const rightMeasurement = parseVariantMeasurement(right);

    if (leftMeasurement.rank !== rightMeasurement.rank) {
      return leftMeasurement.rank - rightMeasurement.rank;
    }

    if (leftMeasurement.base !== rightMeasurement.base) {
      return leftMeasurement.base - rightMeasurement.base;
    }

    return (Number(left.price) || 0) - (Number(right.price) || 0);
  })[0] || null;
}

function getCartRules() {
  const configuredRules = window.raminhoTheme?.cartRules || {};
  const minimumOrderCents = Math.max(0, Number(configuredRules.minimumOrderCents) || 12000);
  const freeShippingCents = Math.max(minimumOrderCents, Number(configuredRules.freeShippingCents) || 59900);

  return {
    minimumOrderCents,
    freeShippingCents
  };
}

function getCartSubtotal(cart) {
  return Math.max(0, Number(cart?.total_price) || 0);
}

function buildCartProgressState(subtotal) {
  const rules = getCartRules();

  if (subtotal < rules.minimumOrderCents) {
    const remaining = rules.minimumOrderCents - subtotal;
    const progressPercent = clampPercent((subtotal / Math.max(rules.minimumOrderCents, 1)) * 100);

    return {
      stage: "minimum",
      eyebrow: "Pedido minimo",
      title: `Faltam ${formatMoney(remaining)} para liberar o checkout.`,
      message: `Pedidos abaixo de ${formatMoney(rules.minimumOrderCents)} nao seguem para o checkout.`,
      helper: "Assim que o minimo for atingido, a barra passa a acompanhar o frete gratis.",
      buttonLabel: `Minimo de ${formatMoney(rules.minimumOrderCents)}`,
      canCheckout: false,
      targetCents: rules.minimumOrderCents,
      progressPercent,
      progressValue: subtotal,
      progressMax: rules.minimumOrderCents,
      ariaText: `${formatMoney(subtotal)} de ${formatMoney(rules.minimumOrderCents)} para liberar o checkout.`
    };
  }

  if (subtotal < rules.freeShippingCents) {
    const remaining = rules.freeShippingCents - subtotal;
    const freeShippingRange = Math.max(rules.freeShippingCents - rules.minimumOrderCents, 1);
    const progressValue = subtotal - rules.minimumOrderCents;
    const progressPercent = clampPercent((progressValue / freeShippingRange) * 100);

    return {
      stage: "shipping",
      eyebrow: "Frete gratis",
      title: `Faltam ${formatMoney(remaining)} para bater a meta de frete gratis.`,
      message: "Pedido minimo atingido. Seu carrinho ja pode seguir para o checkout.",
      helper: "Agora a barra acompanha o valor necessario para liberar o frete gratis acima da faixa definida.",
      buttonLabel: "Finalizar pedido",
      canCheckout: true,
      targetCents: rules.freeShippingCents,
      progressPercent,
      progressValue,
      progressMax: freeShippingRange,
      ariaText: `${formatMoney(subtotal)} no carrinho. Faltam ${formatMoney(remaining)} para o frete gratis.`
    };
  }

  return {
    stage: "shipping is-complete",
    eyebrow: "Frete gratis liberado",
    title: "Seu pedido ja entrou na faixa de frete gratis.",
    message: "Pedido minimo atendido e frete gratis conquistado para esta compra.",
    helper: "Revise os itens e siga para o checkout quando quiser.",
    buttonLabel: "Finalizar pedido",
    canCheckout: true,
    targetCents: rules.freeShippingCents,
    progressPercent: 100,
    progressValue: rules.freeShippingCents,
    progressMax: rules.freeShippingCents,
    ariaText: `Frete gratis liberado com ${formatMoney(subtotal)} no carrinho.`
  };
}

function buildPurchaseState(variant, quantity) {
  const safeQuantity = Math.max(1, Number(quantity) || 1);
  const measurement = parseVariantMeasurement(variant);
  const totalLabel = buildTotalMeasurementLabel(measurement, safeQuantity);
  const totalPrice = (Number(variant?.price) || 0) * safeQuantity;

  return {
    safeQuantity,
    stepLabel: measurement.label,
    totalLabel,
    totalPrice,
    buttonLabel: `Adicionar ${totalLabel} • ${formatMoney(totalPrice)}`
  };
}

function parseVariantMeasurement(variant) {
  const candidates = [];

  if (Array.isArray(variant?.options) && variant.options.length > 0) {
    candidates.push(variant.options[0]);
  }

  [variant?.option1, variant?.public_title, variant?.title, variant?.name].forEach((value) => {
    if (value) candidates.push(value);
  });

  for (const candidate of candidates) {
    const primaryLabel = String(candidate).split("/")[0].trim();
    const parsed = parseMeasurement(primaryLabel);
    if (parsed) return parsed;
  }

  return {
    type: "unit",
    base: 1,
    label: "1 un",
    rank: 99
  };
}

function parseMeasurement(rawLabel) {
  const label = String(rawLabel || "").trim();
  if (!label) return null;

  const normalized = label.toLowerCase().replace(/\s+/g, " ").trim();
  const match = normalized.match(/(\d+(?:[.,]\d+)?)\s*(kg|g|gr|grama|gramas|ml|l|un|und|unid|unidade|unidades)\b/);
  if (!match) return null;

  const amount = Number.parseFloat(match[1].replace(",", "."));
  if (!Number.isFinite(amount)) return null;

  const unit = match[2];

  if (unit === "kg") {
    const grams = amount * 1000;
    return { type: "weight", base: grams, label: formatWeight(grams), rank: 0 };
  }

  if (unit === "g" || unit === "gr" || unit === "grama" || unit === "gramas") {
    return { type: "weight", base: amount, label: formatWeight(amount), rank: 0 };
  }

  if (unit === "l") {
    const milliliters = amount * 1000;
    return { type: "volume", base: milliliters, label: formatVolume(milliliters), rank: 1 };
  }

  if (unit === "ml") {
    return { type: "volume", base: amount, label: formatVolume(amount), rank: 1 };
  }

  return { type: "unit", base: amount, label: formatUnits(amount), rank: 2 };
}

function buildTotalMeasurementLabel(measurement, quantity) {
  const safeQuantity = Math.max(1, Number(quantity) || 1);

  if (measurement?.type === "weight") {
    return formatWeight((measurement.base || 0) * safeQuantity);
  }

  if (measurement?.type === "volume") {
    return formatVolume((measurement.base || 0) * safeQuantity);
  }

  return formatUnits((measurement?.base || 1) * safeQuantity);
}

function updateMeasurePicker(picker, totalLabel) {
  const display = picker?.querySelector("[data-qty-display]");
  if (display) {
    display.textContent = totalLabel;
  }
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

function buildPriceMarkup(price, compareAtPrice) {
  const compareMarkup = compareAtPrice && compareAtPrice > price
    ? `<span class="price-block__compare">${formatMoney(compareAtPrice)}</span>`
    : "";

  return `
    <div class="price-block ${compareMarkup ? "price-block--sale" : ""}">
      <span class="price-block__current">${formatMoney(price)}</span>
      ${compareMarkup}
    </div>
  `;
}

function clampQuantityInput(input, minimumOverride) {
  const minimum = typeof minimumOverride === "number" ? minimumOverride : getMinimumQuantity(input);
  const parsed = Number.parseInt(input.value, 10);
  return Number.isFinite(parsed) ? Math.max(minimum, parsed) : minimum;
}

function getMinimumQuantity(input) {
  const parsed = Number.parseInt(input.getAttribute("min"), 10);
  return Number.isFinite(parsed) ? parsed : 1;
}

function parseJsonScript(element) {
  if (!element) return null;

  try {
    return JSON.parse(element.textContent);
  } catch (error) {
    console.error("Nao foi possivel ler um bloco JSON do tema.", error);
    return null;
  }
}

async function fetchJson(url, options) {
  const response = await fetch(url, options);
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data?.description || data?.message || "Ocorreu um erro na comunicacao com o carrinho.");
  }

  return data;
}

function createEmptyCart() {
  return {
    item_count: 0,
    total_price: 0,
    items: []
  };
}

function formatCartCount(count) {
  return `${count} ${count === 1 ? "item" : "itens"}`;
}

function clampPercent(value) {
  return Math.max(0, Math.min(100, Number(value) || 0));
}

function formatWeight(grams) {
  const safeValue = Number(grams) || 0;

  if (safeValue >= 1000) {
    return `${formatDecimal(safeValue / 1000)} kg`;
  }

  return `${formatDecimal(safeValue)} g`;
}

function formatVolume(milliliters) {
  const safeValue = Number(milliliters) || 0;

  if (safeValue >= 1000) {
    return `${formatDecimal(safeValue / 1000)} l`;
  }

  return `${formatDecimal(safeValue)} ml`;
}

function formatUnits(units) {
  const safeValue = Number(units) || 0;
  return `${formatDecimal(safeValue)} un`;
}

function formatDecimal(value) {
  return new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: Number.isInteger(value) ? 0 : 1,
    maximumFractionDigits: 2
  }).format(value);
}

function formatMoney(cents) {
  const currency = window.raminhoTheme?.moneyCurrency || "BRL";
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency
  }).format((Number(cents) || 0) / 100);
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function cssEscape(value) {
  if (window.CSS && typeof window.CSS.escape === "function") {
    return window.CSS.escape(value);
  }

  return String(value).replace(/["\\]/g, "\\$&");
}
