(function () {
  const body = document.body;
  const moneyFormatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });

  function formatMoney(cents) {
    return moneyFormatter.format((cents || 0) / 100);
  }

  function escapeHtml(value) {
    return String(value || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function normalizeText(value) {
    return String(value || '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim();
  }

  function getVariantText(variant) {
    if (!variant) return '';

    return [
      variant.title,
      variant.option1,
      variant.option2,
      variant.option3,
      ...(Array.isArray(variant.options) ? variant.options : [])
    ]
      .filter(Boolean)
      .join(' ');
  }

  function getPurchaseMode(variant) {
    return parseWeightGrams(variant) != null ? 'weight' : 'unit';
  }

  function parseNumericToken(value) {
    return Number(String(value || '').replace(',', '.'));
  }

  function parseUnitCount(variant) {
    const text = normalizeText(getVariantText(variant));
    const match = text.match(/(\d+(?:[.,]\d+)?)\s*(unidade|unidades|unit|units|und|un)\b/);
    if (match) return parseNumericToken(match[1]);
    if (/(unidade|unidades|unit|units|und|un)\b/.test(text)) return 1;
    return null;
  }

  function parseWeightGrams(variant) {
    const text = normalizeText(getVariantText(variant));

    let match = text.match(/(\d+(?:[.,]\d+)?)\s*(kg|quilo|quilos)\b/);
    if (match) return parseNumericToken(match[1]) * 1000;

    match = text.match(/(\d+(?:[.,]\d+)?)\s*(g|grama|gramas)\b/);
    if (match) return parseNumericToken(match[1]);

    return /(quilo|\bkg\b|grama|peso|weight)/.test(text) ? 300 : null;
  }

  function chooseRepresentativeVariant(current, candidate, metricGetter) {
    if (!current) return candidate;
    if (candidate.available && !current.available) return candidate;
    if (current.available && !candidate.available) return current;

    const currentMetric = metricGetter(current);
    const candidateMetric = metricGetter(candidate);

    if (candidateMetric != null && currentMetric != null && candidateMetric < currentMetric) return candidate;
    if (candidateMetric != null && currentMetric == null) return candidate;
    if (candidateMetric == null && currentMetric != null) return current;
    if ((candidate.price || 0) < (current.price || 0)) return candidate;

    return current;
  }

  function getCanonicalVariantOptions(variants) {
    let unitVariant = null;
    let weightVariant = null;

    variants.forEach((variant) => {
      if (getPurchaseMode(variant) === 'weight') {
        weightVariant = chooseRepresentativeVariant(weightVariant, variant, parseWeightGrams);
      } else {
        unitVariant = chooseRepresentativeVariant(unitVariant, variant, parseUnitCount);
      }
    });

    const canonicalOptions = [];
    if (unitVariant) canonicalOptions.push({ mode: 'unit', label: 'Unidade', variant: unitVariant });
    if (weightVariant) canonicalOptions.push({ mode: 'weight', label: 'Por quilo', variant: weightVariant });

    if (!canonicalOptions.length && variants[0]) {
      canonicalOptions.push({
        mode: getPurchaseMode(variants[0]),
        label: getPurchaseMode(variants[0]) === 'weight' ? 'Por quilo' : 'Unidade',
        variant: variants[0]
      });
    }

    return canonicalOptions;
  }

  function applyCanonicalVariantOptions(root, form, variants) {
    const picker = root.querySelector('.product-variant-picker');
    const optionNodes = Array.from(form.querySelectorAll('.pill-option'));
    const modeDisplay = root.querySelector('[data-purchase-mode-display]');
    const modeLabel = root.querySelector('[data-purchase-mode-label]');
    const variantInput = form.querySelector('[name="id"]');
    const canonicalOptions = getCanonicalVariantOptions(variants);

    if (modeDisplay && modeLabel) {
      const singleOption = canonicalOptions.length === 1 ? canonicalOptions[0] : null;
      modeDisplay.hidden = !singleOption;
      modeLabel.textContent = singleOption ? (singleOption.mode === 'weight' ? 'Por quilo' : 'Por unidade') : '';
    }

    if (!picker || !optionNodes.length) {
      if (variantInput && canonicalOptions.length === 1) {
        variantInput.value = String(canonicalOptions[0].variant.id);
      }
      return;
    }

    const canonicalById = new Map(canonicalOptions.map((item) => [Number(item.variant.id), item]));
    const checkedInput = form.querySelector('[name="id"]:checked');
    const checkedId = checkedInput ? Number(checkedInput.value) : null;
    const fallbackId = canonicalOptions[0] ? Number(canonicalOptions[0].variant.id) : null;
    const selectedId = canonicalById.has(checkedId) ? checkedId : fallbackId;

    optionNodes.forEach((optionNode) => {
      const input = optionNode.querySelector('[name="id"]');
      const label = optionNode.querySelector('span');
      const optionId = Number(input ? input.value : 0);
      const canonicalOption = canonicalById.get(optionId);

      if (!input || !canonicalOption) {
        optionNode.hidden = true;
        if (input) input.checked = false;
        return;
      }

      optionNode.hidden = false;
      input.checked = optionId === selectedId;
      if (label) label.textContent = canonicalOption.label;
    });

    picker.hidden = canonicalOptions.length <= 1;
  }

  function getVariantModeLabel(variant) {
    if (variant && variant.title && variant.title !== 'Default Title') return variant.title;
    return getPurchaseMode(variant) === 'weight' ? 'Por quilo' : 'Por unidade';
  }

  function formatWeightLabel(grams) {
    const value = Number(grams || 0);
    if (value >= 1000) {
      const kilos = value / 1000;
      return Number.isInteger(kilos)
        ? `${kilos} kg`
        : `${String(kilos.toFixed(1)).replace('.', ',')} kg`;
    }

    return `${value} g`;
  }

  function buildPurchaseState(variant, quantitySteps, weightStepGrams) {
    const mode = getPurchaseMode(variant);
    const steps = Math.max(1, Number(quantitySteps || 1));

    if (mode === 'weight') {
      const grams = steps * weightStepGrams;
      const selection = formatWeightLabel(grams);

      return {
        mode,
        steps,
        quantity: steps,
        display: selection,
        summary: `${selection} selecionados`,
        note: `Preço para ${selection}.`,
        helper: `Em incrementos de ${formatWeightLabel(weightStepGrams)}.`,
        quantityLabel: 'Peso',
        propertySelection: selection,
        totalPrice: (variant?.price || 0) * steps,
        totalComparePrice: (variant?.compare_at_price || 0) * steps
      };
    }

    const unitLabel = steps === 1 ? '1 unidade' : `${steps} unidades`;

    return {
      mode,
      steps,
      quantity: steps,
      display: unitLabel,
      summary: steps === 1 ? '1 unidade selecionada' : `${steps} unidades selecionadas`,
      note: steps === 1 ? 'Preço para 1 unidade.' : `Preço para ${steps} unidades.`,
      helper: 'Selecione a quantidade desejada.',
      quantityLabel: 'Quantidade',
      propertySelection: unitLabel,
      totalPrice: (variant?.price || 0) * steps,
      totalComparePrice: (variant?.compare_at_price || 0) * steps
    };
  }

  function renderProperties(properties) {
    return Object.entries(properties || {})
      .filter(([key, value]) => key && key.charAt(0) !== '_' && value != null && String(value).trim() !== '')
      .map(([key, value]) => `<div class="drawer-note">${escapeHtml(key)}: ${escapeHtml(value)}</div>`)
      .join('');
  }

  function setupStickyHeader() {
    const header = document.querySelector('[data-site-header]');
    if (!header) return;

    const sync = () => {
      header.classList.toggle('is-scrolled', window.scrollY > 24);
    };

    sync();
    window.addEventListener('scroll', sync, { passive: true });
  }

  function setupDrawers() {
    const drawers = document.querySelectorAll('[data-drawer]');

    const closeAll = () => {
      drawers.forEach((drawer) => drawer.classList.remove('is-open'));
      body.classList.remove('has-drawer-open');
    };

    const open = (name) => {
      const drawer = document.querySelector(`[data-drawer="${name}"]`);
      if (!drawer) return;
      drawers.forEach((item) => {
        if (item !== drawer) item.classList.remove('is-open');
      });
      drawer.classList.add('is-open');
      body.classList.add('has-drawer-open');
    };

    document.addEventListener('click', (event) => {
      const openTrigger = event.target.closest('[data-drawer-toggle]');
      const closeTrigger = event.target.closest('[data-drawer-close]');

      if (openTrigger) {
        event.preventDefault();
        open(openTrigger.getAttribute('data-drawer-toggle'));
      }

      if (closeTrigger) {
        event.preventDefault();
        closeAll();
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeAll();
    });

    return { open, closeAll };
  }

  function setupQuantityControls() {
    document.addEventListener('click', (event) => {
      const control = event.target.closest('[data-quantity-control]');
      if (!control) return;

      const wrapper = control.closest('[data-quantity-wrapper]');
      const input = wrapper ? wrapper.querySelector('[data-quantity-input]') : null;
      if (!input) return;

      const current = Number(input.value || 1);
      const min = Number(input.min || 1);
      const max = Number(input.max || 999);
      const next = control.dataset.quantityControl === 'increase'
        ? Math.min(max, current + 1)
        : Math.max(min, current - 1);

      input.value = next;
      input.dispatchEvent(new Event('change', { bubbles: true }));
    });
  }

  function setupTabs() {
    document.querySelectorAll('[data-tabs-root]').forEach((root) => {
      const triggers = Array.from(root.querySelectorAll('[data-tab-trigger]'));
      const panels = Array.from(root.querySelectorAll('[data-tab-panel]'));
      if (!triggers.length || !panels.length) return;
      const desktopQuery = window.matchMedia('(min-width: 990px)');

      const activate = (tabId) => {
        triggers.forEach((trigger) => {
          const isActive = trigger.dataset.tabTarget === tabId;
          trigger.classList.toggle('is-active', isActive);
          trigger.setAttribute('aria-selected', isActive ? 'true' : 'false');
        });

        panels.forEach((panel) => {
          const isActive = panel.dataset.tabId === tabId;
          panel.classList.toggle('is-active', isActive);
          panel.hidden = !isActive;
        });
      };

      const syncByViewport = () => {
        if (!desktopQuery.matches) {
          triggers.forEach((trigger, index) => {
            trigger.classList.toggle('is-active', index === 0);
            trigger.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
          });

          panels.forEach((panel) => {
            panel.classList.add('is-active');
            panel.hidden = false;
          });
          return;
        }

        activate(triggers[0].dataset.tabTarget);
      };

      triggers.forEach((trigger) => {
        trigger.addEventListener('click', () => {
          if (!desktopQuery.matches) return;
          activate(trigger.dataset.tabTarget);
        });
      });

      if (typeof desktopQuery.addEventListener === 'function') {
        desktopQuery.addEventListener('change', syncByViewport);
      } else if (typeof desktopQuery.addListener === 'function') {
        desktopQuery.addListener(syncByViewport);
      }

      syncByViewport();
    });
  }

  function setupProductForms(drawerApi) {
    const productRoots = document.querySelectorAll('[data-product-root]');

    productRoots.forEach((root) => {
      const variantData = root.querySelector('[data-product-json]');
      if (!variantData) return;

      let variants = [];
      try {
        variants = JSON.parse(variantData.textContent);
      } catch (error) {
        variants = [];
      }

      const form = root.querySelector('[data-product-form]');
      if (!form) return;

      applyCanonicalVariantOptions(root, form, variants);

      const priceNode = root.querySelector('[data-product-price]');
      const compareNode = root.querySelector('[data-product-compare-price]');
      const priceNote = root.querySelector('[data-product-price-note]');
      const submitLabel = root.querySelector('[data-product-submit-label]');
      const submitPrice = root.querySelector('[data-product-submit-price]');
      const submitButton = form.querySelector('[type="submit"]');
      const quantityInput = form.querySelector('[data-purchase-quantity-input]');
      const quantityDisplay = root.querySelector('[data-purchase-quantity-display]');
      const quantityLabel = root.querySelector('[data-purchase-quantity-label]');
      const quantityHelper = root.querySelector('[data-purchase-helper]');
      const purchaseSummary = root.querySelector('[data-purchase-summary-label]');
      const purchaseTotal = root.querySelector('[data-purchase-total]');
      const propertyMode = root.querySelector('[data-purchase-property-mode]');
      const propertySelection = root.querySelector('[data-purchase-property-selection]');
      const weightStepGrams = Number(root.dataset.weightStepGrams || form.dataset.weightStepGrams || 300);
      const isCompactCard = form.classList.contains('purchase-form--card');
      let lastMode = null;

      const syncVariant = () => {
        const selected = form.querySelector('[name="id"]:checked, [name="id"] option:checked, [name="id"]');
        const selectedId = Number(selected ? selected.value : 0);
        const variant = variants.find((item) => Number(item.id) === selectedId) || variants[0];
        if (!variant) return;

        const mode = getPurchaseMode(variant);
        if (lastMode && lastMode !== mode && quantityInput) {
          quantityInput.value = '1';
        }
        lastMode = mode;

        const purchaseState = buildPurchaseState(variant, quantityInput ? quantityInput.value : 1, weightStepGrams);

        if (quantityInput) {
          quantityInput.min = '1';
          quantityInput.max = mode === 'weight' ? '20' : '99';
          quantityInput.value = String(Math.min(Number(quantityInput.max), Math.max(1, purchaseState.quantity)));
        }

        if (priceNode) priceNode.textContent = formatMoney(purchaseState.totalPrice);

        if (compareNode) {
          if (purchaseState.totalComparePrice && purchaseState.totalComparePrice > purchaseState.totalPrice) {
            compareNode.textContent = formatMoney(purchaseState.totalComparePrice);
            compareNode.hidden = false;
          } else {
            compareNode.textContent = '';
            compareNode.hidden = true;
          }
        }

        if (priceNote) priceNote.textContent = purchaseState.note;
        if (quantityDisplay) quantityDisplay.textContent = purchaseState.display;
        if (quantityLabel) quantityLabel.textContent = purchaseState.quantityLabel;
        if (quantityHelper) quantityHelper.textContent = purchaseState.helper;
        if (purchaseSummary) purchaseSummary.textContent = purchaseState.summary;
        if (purchaseTotal) purchaseTotal.textContent = formatMoney(purchaseState.totalPrice);
        if (submitPrice) submitPrice.textContent = formatMoney(purchaseState.totalPrice);
        if (submitLabel) submitLabel.textContent = variant.available ? (isCompactCard ? 'Adicionar' : 'Adicionar ao carrinho') : 'Indisponível';
        if (submitButton) submitButton.disabled = !variant.available;
        if (propertyMode) propertyMode.value = getVariantModeLabel(variant);
        if (propertySelection) propertySelection.value = purchaseState.propertySelection;
      };

      form.addEventListener('change', syncVariant);
      syncVariant();
    });

    document.addEventListener('submit', async (event) => {
      const form = event.target.closest('[data-product-form]');
      if (!form) return;

      event.preventDefault();

      const submitButton = form.querySelector('[type="submit"]');
      if (submitButton) submitButton.disabled = true;

      try {
        const response = await fetch('/cart/add.js', {
          method: 'POST',
          headers: {
            'X-Requested-With': 'XMLHttpRequest'
          },
          body: new FormData(form)
        });

        if (!response.ok) {
          throw new Error('Falha ao adicionar item');
        }

        await updateCartUI(drawerApi, true);
      } catch (error) {
        console.error(error);
      } finally {
        if (submitButton) submitButton.disabled = false;
      }
    });
  }

  async function fetchCart() {
    const response = await fetch('/cart.js', {
      headers: { 'X-Requested-With': 'XMLHttpRequest' }
    });
    return response.json();
  }

  function renderCartLine(item) {
    const variantTitle = item.variant_title ? `<div class="drawer-line__variant">${escapeHtml(item.variant_title)}</div>` : '';
    const properties = renderProperties(item.properties);
    const hasSelectionProperty = item.properties && Object.prototype.hasOwnProperty.call(item.properties, 'Selecao');
    const image = item.featured_image
      ? `<img src="${escapeHtml(item.featured_image.url)}&width=160" alt="${escapeHtml(item.product_title)}">`
      : '';

    return `
      <article class="drawer-line">
        <a class="drawer-line__media" href="${escapeHtml(item.url)}">${image}</a>
        <div>
          <h3 class="drawer-line__title"><a href="${escapeHtml(item.url)}">${escapeHtml(item.product_title)}</a></h3>
          ${variantTitle}
          ${properties}
          ${hasSelectionProperty ? '' : `<div class="drawer-note">Qtd. ${item.quantity}</div>`}
        </div>
        <div class="stack">
          <strong>${formatMoney(item.final_line_price)}</strong>
          <button class="drawer-remove" data-cart-remove="${escapeHtml(item.key)}" type="button">Remover</button>
        </div>
      </article>
    `;
  }

  function getMinimumOrderState(drawer, cart) {
    const minimumOrder = Number(drawer.dataset.minimumOrder || 0);
    const subtotal = cart.total_price || 0;
    const remaining = Math.max(0, minimumOrder - subtotal);

    return {
      minimumOrder,
      subtotal,
      remaining,
      isMet: minimumOrder <= 0 || subtotal >= minimumOrder
    };
  }

  function renderCartMeta(drawer, cart) {
    const minimumState = getMinimumOrderState(drawer, cart);
    const minimumMessage = minimumState.isMet
      ? 'Pedido pronto para seguir ao pagamento.'
      : `Faltam ${formatMoney(minimumState.remaining)} para atingir o pedido mínimo de ${formatMoney(minimumState.minimumOrder)}.`;

    return `
      <div class="summary-card">
        <h3 class="summary-card__title">Resumo</h3>
        <div class="summary-meta">
          <span>Subtotal</span>
          <strong>${formatMoney(minimumState.subtotal)}</strong>
        </div>
        <div class="cart-note">${minimumMessage}</div>
      </div>
    `;
  }

  function syncCartCount(cart) {
    document.querySelectorAll('[data-cart-count]').forEach((countNode) => {
      countNode.textContent = String(cart.item_count || 0);
      countNode.classList.toggle('is-hidden', !cart.item_count);
      countNode.classList.toggle('is-empty', !cart.item_count);
    });
  }

  async function updateCartUI(drawerApi, openDrawer) {
    const drawer = document.querySelector('[data-cart-drawer]');
    if (!drawer) return;

    const itemsNode = drawer.querySelector('[data-cart-items]');
    const metaNode = drawer.querySelector('[data-cart-meta]');
    const actionNode = drawer.querySelector('[data-cart-actions]');
    const cart = await fetchCart();

    syncCartCount(cart);

    if (!cart.item_count) {
      itemsNode.innerHTML = '<div class="cart-drawer__empty">Sua seleção ainda está vazia. Escolha os produtos que deseja receber e acompanhe tudo por aqui.</div>';
      metaNode.innerHTML = '';
      actionNode.innerHTML = `
        <a class="button button--secondary button--block" href="/collections/all">Explorar catálogo</a>
      `;
    } else {
      const minimumState = getMinimumOrderState(drawer, cart);
      itemsNode.innerHTML = cart.items.map(renderCartLine).join('');
      metaNode.innerHTML = renderCartMeta(drawer, cart);
      actionNode.innerHTML = `
        <button class="button button--secondary button--block" type="button" data-external-checkout ${minimumState.isMet ? '' : 'disabled aria-disabled="true"'}>
          ${minimumState.isMet ? 'Seguir para o pagamento' : `Pedido mínimo ${formatMoney(minimumState.minimumOrder)}`}
        </button>
        ${minimumState.isMet ? '' : `<p class="drawer-actions__note">Adicione mais ${formatMoney(minimumState.remaining)} para liberar o checkout.</p>`}
      `;
    }

    if (openDrawer && drawerApi) drawerApi.open('cart');
  }

  function setupCart(drawerApi) {
    const drawer = document.querySelector('[data-cart-drawer]');
    if (!drawer) return;

    updateCartUI(drawerApi, false).catch((error) => console.error(error));

    document.addEventListener('click', async (event) => {
      const removeTrigger = event.target.closest('[data-cart-remove]');
      if (!removeTrigger) return;

      event.preventDefault();

      try {
        const response = await fetch('/cart/change.js', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
          },
          body: JSON.stringify({
            id: removeTrigger.getAttribute('data-cart-remove'),
            quantity: 0
          })
        });

        if (!response.ok) {
          throw new Error('Falha ao remover item');
        }

        await updateCartUI(drawerApi, false);
      } catch (error) {
        console.error(error);
      }
    });

    document.addEventListener('click', (event) => {
      const cartButton = event.target.closest('[data-cart-open]');
      if (!cartButton) return;
      event.preventDefault();
      updateCartUI(drawerApi, true).catch((error) => console.error(error));
    });

    document.addEventListener('click', async (event) => {
      const checkoutTrigger = event.target.closest('[data-external-checkout]');
      if (!checkoutTrigger) return;

      event.preventDefault();
      if (checkoutTrigger.disabled || checkoutTrigger.getAttribute('aria-disabled') === 'true') return;

      checkoutTrigger.disabled = true;

      try {
        if (!window.RaminhoCheckout || typeof window.RaminhoCheckout.open !== 'function') {
          throw new Error('Checkout externo indisponível no momento.');
        }

        await window.RaminhoCheckout.open();
      } catch (error) {
        console.error(error);
        window.alert(error.message || 'Nao foi possivel abrir o checkout agora.');
        checkoutTrigger.disabled = false;
      }
    });
  }

  const drawerApi = setupDrawers();
  setupStickyHeader();
  setupTabs();
  setupQuantityControls();
  setupProductForms(drawerApi);
  setupCart(drawerApi);
})();
