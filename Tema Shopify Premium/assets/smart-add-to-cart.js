// -----------------------------------------
// VARIANT SELECTOR (SEGMENTED CONTROL)
// -----------------------------------------
class VariantSelects extends HTMLElement {
  constructor() {
    super();
    this.addEventListener('change', this.onVariantChange);

    // UX HACK FOR APPLE LEVEL INTERACTION: 
    // IF USER CLICKS A RADIO THAT IS ALREADY CHECKED, WE INCREMENT THE STEPPER BELOW IT
    const radios = this.querySelectorAll('input[type="radio"]');
    radios.forEach(r => {
      // Store initial value
      r.dataset.previousWasChecked = r.checked;

      r.addEventListener('click', (e) => {
        if (e.target.dataset.previousWasChecked === "true") {
          // It was already selected before the click! Time to increment the cart quantity!
          let mySectionId = this.dataset.section;
          let smartCartNode = document.querySelector(`smart-add-to-cart[data-section="${mySectionId}"]`);
          if (smartCartNode) {
            smartCartNode.changeQty(1); // Call the custom component method!
          }
        }

        // Update all siblings memory of who is checked
        let name = e.target.name;
        this.querySelectorAll(`input[type="radio"][name="${name}"]`).forEach(sibling => {
          sibling.dataset.previousWasChecked = sibling.checked;
        });
      });
    });
  }

  onVariantChange() {
    this.updateOptions();
    this.updateMasterId();
    this.updateURL();

    if (!this.currentVariant) {
      this.toggleAddButton(true, '', true);
    } else {
      this.updateVariantInput();
      this.renderProductInfo();
    }
  }

  updateOptions() {
    this.options = Array.from(this.querySelectorAll('input[type="radio"]:checked')).map((radio) => radio.value);
  }

  updateMasterId() {
    const variantData = JSON.parse(this.querySelector('script[type="application/json"]').textContent);
    this.currentVariant = variantData.find((variant) => {
      return !variant.options.map((option, index) => {
        return this.options[index] === option;
      }).includes(false);
    });
  }

  updateVariantInput() {
    // Check if it is a card form first
    let productForm = document.querySelector(`#quick-add-form-${this.dataset.section.replace('card-', '')}`);
    if (!productForm) {
      productForm = document.querySelector(`#product-form-${this.dataset.section}`);
    }
    if (productForm) {
      const input = productForm.querySelector('input[name="id"]');
      if (input) {
        input.value = this.currentVariant.id;
        input.dispatchEvent(new Event('change', { bubbles: true }));
      }
    }
  }

  updateURL() {
    // Only update URL if we are on the main product section (not snippets)
    if (!this.currentVariant || this.dataset.updateUrl === 'false' || this.dataset.section.includes('card')) return;
    window.history.replaceState({}, '', `${this.dataset.url}?variant=${this.currentVariant.id}`);
  }

  renderProductInfo() {
    // Update the base price text in the card or hero if applicable via fetching the section HTML
    // (A more optimized SPA way is just reading currentVariant.price directly, which we will do if possible to save payload)
    if (this.currentVariant) {
      this.toggleAddButton(!this.currentVariant.available, 'Esgotado nesta safra');

      let priceSpan = document.querySelector(`#price-${this.dataset.section} .price-current`);
      if (!priceSpan) priceSpan = document.querySelector(`#price-card-${this.dataset.section.replace('card-', '')} .price-current`);

      if (priceSpan) {
        priceSpan.textContent = this.formatCentsToBRL(this.currentVariant.price);
      }
    }
  }

  formatCentsToBRL(cents) {
    return (cents / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  toggleAddButton(disable = true, text, modifyClass = true) {
    let productForm = document.getElementById(`quick-add-form-${this.dataset.section.replace('card-', '')}`);
    if (!productForm) {
      productForm = document.getElementById(`product-form-${this.dataset.section}`);
    }
    if (!productForm) return;

    const addButton = productForm.querySelector('[name="add"]');
    const btnText = productForm.querySelector('.btn-text');
    const btnPrice = productForm.querySelector('.btn-price');

    if (!addButton || !btnText) return;

    if (disable) {
      addButton.setAttribute('disabled', 'disabled');
      if (text) btnText.textContent = text;
      if (btnPrice) btnPrice.style.display = 'none';
      addButton.style.cursor = "not-allowed";
      addButton.style.opacity = "0.6";
    } else {
      addButton.removeAttribute('disabled');
      btnText.textContent = btnText.closest('.product-card') ? 'Adicionar' : 'Adicionar ao Carrinho';
      if (btnPrice) btnPrice.style.display = 'block';
      addButton.style.cursor = "pointer";
      addButton.style.opacity = "1";
    }
  }
}

if (!customElements.get('variant-selects')) {
  customElements.define('variant-selects', VariantSelects);
}

// -----------------------------------------
// SMART ADD TO CART + QUANTITY PARSER LOGIC
// -----------------------------------------
class SmartAddToCart extends HTMLElement {
  constructor() {
    super();
    this.form = this.querySelector('form');
    this.qtyInput = this.querySelector('.stepper-input');
    this.btnMinus = this.querySelector('.stepper-minus');
    this.btnPlus = this.querySelector('.stepper-plus');
    this.stepperText = this.querySelector('.stepper-text');
    this.submitBtn = this.querySelector('[name="add"]');
    this.btnText = this.querySelector('.btn-text');
    this.btnPrice = this.querySelector('.btn-price');
    this.variantInput = this.querySelector('.variant-id-input');

    // Support either globally nested variant-selects (Product page) or sibling inside same card wrapper
    let cardScopeSelects = this.parentElement.querySelector('variant-selects script[type="application/json"]');
    if (!cardScopeSelects) cardScopeSelects = this.closest('.product-card')?.querySelector('variant-selects script[type="application/json"]');

    const globalScopeSelects = document.querySelector('variant-selects script[type="application/json"]');
    this.variantsScript = cardScopeSelects || globalScopeSelects;
    this.variantsJson = this.variantsScript ? JSON.parse(this.variantsScript.textContent) : null;

    this.bindEvents();
    if (this.variantsJson) this.updateUI();
  }

  bindEvents() {
    if (this.btnMinus) this.btnMinus.addEventListener('click', () => this.changeQty(-1));
    if (this.btnPlus) this.btnPlus.addEventListener('click', () => this.changeQty(1));

    // Listen for variant changes from the hidden ID input
    if (this.variantInput) {
      this.variantInput.addEventListener('change', () => {
        if (this.qtyInput) this.qtyInput.value = 1; // Reset qty when switching weight vs unit
        this.updateUI();
      });
    }

    if (this.form) {
      this.form.addEventListener('submit', this.handleAddToCart.bind(this));
    }
  }

  getCurrentVariant() {
    if (!this.variantsJson || !this.variantInput) return null;
    const id = parseInt(this.variantInput.value, 10);
    return this.variantsJson.find(v => v.id === id);
  }

  changeQty(step) {
    if (!this.qtyInput) return;
    let currentVal = parseInt(this.qtyInput.value, 10) || 1;
    let newVal = currentVal + step;
    if (newVal < 1) newVal = 1;
    this.qtyInput.value = newVal;
    this.updateUI();
  }

  updateUI() {
    const variant = this.getCurrentVariant();
    if (!variant) return;

    let qty = 1;
    if (this.qtyInput) qty = parseInt(this.qtyInput.value, 10);

    if (this.stepperText) {
      this.stepperText.textContent = this.getSmartQuantityText(variant.title, qty);
    }

    if (variant.available && this.btnPrice) {
      const totalCents = variant.price * qty;
      this.btnPrice.textContent = this.formatCentsToBRL(totalCents);
    }
  }

  getSmartQuantityText(variantTitle, quantity) {
    let title = (variantTitle || "").toLowerCase();

    let gMatch = title.match(/(\d+)\s*g/);
    if (gMatch && !title.includes('kg')) {
      let baseGrams = parseInt(gMatch[1], 10);
      let totalGrams = baseGrams * quantity;
      if (totalGrams >= 1000) {
        let kg = totalGrams / 1000;
        let p = kg.toString().replace('.', ',');
        return (p.endsWith(',0') ? p.split(',')[0] : p) + 'kg';
      }
      return totalGrams + 'g';
    }

    let kgMatch = title.match(/([\d.,]+)\s*kg/);
    if (kgMatch) {
      let baseKg = parseFloat(kgMatch[1].replace(',', '.'));
      let totalKg = baseKg * quantity;
      let p = totalKg.toString().replace('.', ',');
      return (p.endsWith(',0') ? p.split(',')[0] : p) + 'kg';
    }

    return quantity + ' un';
  }

  formatCentsToBRL(cents) {
    return (cents / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  handleAddToCart(e) {
    e.preventDefault();

    const originalText = this.btnText ? this.btnText.textContent : 'Adicionar';
    const originalBg = this.submitBtn.style.backgroundColor;

    this.submitBtn.disabled = true;
    if (this.btnText) {
      this.btnText.innerHTML = '<span style="display:inline-flex; align-items:center; gap:6px;"><svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" opacity="0.5"><animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="1s" repeatCount="indefinite"/></path></svg> Separando na Safra...</span>';
    }
    if (this.btnPrice) this.btnPrice.style.display = 'none';

    const formData = new FormData(this.form);

    fetch(window.Shopify.routes.root + 'cart/add.js', {
      method: 'POST',
      headers: { 'X-Requested-With': 'XMLHttpRequest' },
      body: formData
    })
      .then(response => response.json())
      .then(data => {
        // Forçado via Yampi snippet posteriormente se necessário
        if (this.btnText) {
          this.btnText.innerHTML = '<span style="display:inline-flex; align-items:center; gap:6px; font-weight:700;"><svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg> Adicionado</span>';
        }
        this.submitBtn.style.backgroundColor = "var(--color-primary-dark)";
        this.submitBtn.style.color = "white";

        setTimeout(() => {
          this.submitBtn.disabled = false;
          if (this.btnText) this.btnText.textContent = originalText;
          this.submitBtn.style.backgroundColor = originalBg;
          this.submitBtn.style.color = "";
          if (this.btnPrice) this.btnPrice.style.display = 'block';
        }, 2500);
      })
      .catch((error) => {
        if (this.btnText) this.btnText.textContent = "Erro!";
        setTimeout(() => {
          this.submitBtn.disabled = false;
          if (this.btnText) this.btnText.textContent = originalText;
          if (this.btnPrice) this.btnPrice.style.display = 'block';
        }, 2000);
      });
  }
}

if (!customElements.get('smart-add-to-cart')) {
  customElements.define('smart-add-to-cart', SmartAddToCart);
}
