class CartDrawer {
    constructor() {
        this.drawer = document.getElementById('CartDrawer');
        this.overlay = document.getElementById('CartDrawerOverlay');
        this.closeBtn = document.getElementById('CartDrawerClose');
        this.content = document.getElementById('CartDrawerContent');
        this.footer = document.getElementById('CartDrawerFooterContent');
        this.cartBtns = document.querySelectorAll('.cart-btn');

        this.init();
    }

    init() {
        if (!this.drawer) return;

        this.cartBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.open();
            });
        });

        this.closeBtn.addEventListener('click', () => this.close());
        this.overlay.addEventListener('click', () => this.close());

        // Listen for custom event to refresh cart
        document.addEventListener('cart:refresh', () => {
            this.refresh();
            this.open();
        });

        // Delegate clicks for removal and quantity
        this.content.addEventListener('click', (e) => {
            const removeBtn = e.target.closest('.cart-item-remove');
            if (removeBtn) {
                this.updateItem(removeBtn.dataset.key, 0);
            }
        });
    }

    open() {
        this.drawer.classList.add('is-active');
        document.body.style.overflow = 'hidden';
        this.refresh();
    }

    close() {
        this.drawer.classList.remove('is-active');
        document.body.style.overflow = '';
    }

    async refresh() {
        this.content.innerHTML = '<div class="spinner"></div>';

        try {
            const response = await fetch(window.Shopify.routes.root + 'cart.js');
            const cart = await response.json();
            this.render(cart);
        } catch (error) {
            this.content.innerHTML = '<p class="cart-empty-state">Erro ao carregar colheita. Tente novamente.</p>';
        }
    }

    render(cart) {
        if (cart.item_count === 0) {
            this.content.innerHTML = '<div class="cart-empty-state"><p>Sua colheita está vazia.</p><a href="/collections/all" class="btn-primary-apple" style="margin-top:2rem; font-size: 0.9rem; padding: 1rem;">Ver Produtos</a></div>';
            this.footer.innerHTML = '';
            this.updateHeaderCount(0);
            return;
        }

        let html = '';
        cart.items.forEach(item => {
            const quantityText = this.getSmartQuantityText(item.variant_title || item.product_title, item.quantity);

            html += `
                <div class="cart-drawer-item" style="margin-bottom: 1.5rem;">
                    <img src="${item.image}" alt="${item.title}" class="cart-item-image">
                    <div class="cart-item-details">
                        <span class="cart-item-title">${item.product_title}</span>
                        <span class="cart-item-variant">${item.variant_title || ''}</span>
                        
                        <!-- Mini Stepper iOS Style -->
                        <div class="drawer-item-qty-action flex items-center" style="margin-top: 0.5rem; gap: 0.8rem;">
                           <div class="mini-stepper flex items-center" style="background: rgba(0,0,0,0.05); border-radius: 8px; padding: 2px;">
                              <button type="button" class="mini-stepper-btn" onclick="window.cartDrawer.updateItem('${item.key}', ${item.quantity - 1})" style="padding: 4px 8px; cursor:pointer; border:none; background:none; font-size: 1.2rem;">-</button>
                              <span style="font-weight: 700; font-size: 0.9rem; min-width: 45px; text-align:center;">${quantityText}</span>
                              <button type="button" class="mini-stepper-btn" onclick="window.cartDrawer.updateItem('${item.key}', ${item.quantity + 1})" style="padding: 4px 8px; cursor:pointer; border:none; background:none; font-size: 1.2rem;">+</button>
                           </div>
                        </div>
                    </div>
                    <div class="cart-item-actions flex flex-col items-end justify-between">
                        <span class="cart-item-price" style="font-weight: 700;">${this.formatMoney(item.original_line_price)}</span>
                        <button type="button" class="cart-item-remove" data-key="${item.key}" style="font-size: 0.75rem; opacity: 0.4; border:none; background:none; cursor:pointer; text-decoration:underline; padding:0;">Remover</button>
                    </div>
                </div>
            `;
        });

        this.content.innerHTML = html;

        // Shipping Progress & Minimum Order Logic
        const shippingThreshold = 49700; // R$ 497,00 (Official per DOC-004)
        const minOrderThreshold = 12990; // R$ 129,90 (Official per DOC-004)

        const remainingShipping = shippingThreshold - cart.total_price;
        const remainingMinOrder = minOrderThreshold - cart.total_price;

        let headerStatusHtml = '';

        if (remainingMinOrder > 0) {
            headerStatusHtml = `
              <div class="min-order-alert" style="background: #fff5f5; border: 1px solid #feb2b2; padding: 1rem; border-radius: 12px; margin-bottom: 1.5rem; animation: shake 0.5s ease;">
                 <p class="font-body" style="font-size: 0.85rem; color: #c53030;">
                    🍎 <strong>Quase lá!</strong> Falta <strong>${this.formatMoney(remainingMinOrder)}</strong> para atingir o pedido mínimo da colheita.
                 </p>
              </div>
              <style>
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
                    20%, 40%, 60%, 80% { transform: translateX(5px); }
                }
              </style>
           `;
        } else if (remainingShipping > 0) {
            const percentage = Math.min((cart.total_price / shippingThreshold) * 100, 100);
            headerStatusHtml = `
                <div class="shipping-progress-wrapper" style="margin-bottom: 1.5rem; background: rgba(0,0,0,0.03); padding: 1rem; border-radius: 12px;">
                    <p class="font-body" style="font-size: 0.85rem; margin-bottom: 0.5rem;">Faltam <strong>${this.formatMoney(remainingShipping)}</strong> para <strong>Frete Grátis</strong></p>
                    <div class="progress-bar-bg" style="height: 6px; background: rgba(0,0,0,0.05); border-radius: 10px; overflow: hidden;">
                        <div class="progress-bar-fill" style="height: 100%; width: ${percentage}%; background: var(--color-primary); transition: width 0.6s ease;"></div>
                    </div>
                </div>
            `;
        } else {
            headerStatusHtml = `
                <div class="shipping-progress-wrapper" style="margin-bottom: 1.5rem; background: rgba(13, 124, 74, 0.1); padding: 1rem; border-radius: 12px; text-align: center;">
                    <p class="font-body" style="font-size: 0.85rem; color: var(--color-primary-dark);">🎉 Parabéns! Você ganhou <strong>Frete Grátis</strong></p>
                </div>
            `;
        }

        this.content.insertAdjacentHTML('afterbegin', headerStatusHtml);

        // Render Footer
        const isMinOrderMet = cart.total_price >= minOrderThreshold;

        this.footer.innerHTML = `
            <div class="cart-footer-row" style="margin-bottom: 1.5rem; display: flex; justify-content: space-between; align-items: end;">
                <span class="total-label font-body uppercase" style="opacity: 0.5; font-size: 0.8rem; letter-spacing: 0.05em;">Subtotal</span>
                <span class="total-value font-heading" style="font-size: 1.8rem; line-height: 1;">${this.formatMoney(cart.total_price)}</span>
            </div>
            <a href="${isMinOrderMet ? '/checkout' : '#'}" 
               class="btn-primary-apple" 
               style="width: 100%; display: flex; justify-content: center; font-size: 1.1rem; ${!isMinOrderMet ? 'opacity: 0.2; cursor: not-allowed; filter: grayscale(1); pointer-events: none;' : ''}">
               ${isMinOrderMet ? 'Finalizar Compra' : 'Mínimo R$ 129,90'}
            </a>
            <p class="font-body" style="text-align: center; font-size: 0.8rem; margin-top: 1rem; opacity: 0.5;">
               ${isMinOrderMet ? 'Sua colheita está pronta!' : 'Adicione mais itens para prosseguir.'}
            </p>
        `;

        this.updateHeaderCount(cart.item_count);
    }

    async updateItem(key, qty) {
        if (qty < 0) return;
        this.content.innerHTML = '<div class="spinner"></div>';
        try {
            await fetch(window.Shopify.routes.root + 'cart/change.js', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: key, quantity: qty })
            });
            this.refresh();
        } catch (error) {
            console.error("Cart update error", error);
        }
    }

    getSmartQuantityText(titleText, quantity) {
        return window.RaminhoUtils.getSmartQuantityText(titleText, quantity);
    }

    updateHeaderCount(count) {
        const counts = document.querySelectorAll('.cart-count');
        counts.forEach(c => {
            if (count > 0) {
                c.textContent = count;
                c.style.display = 'flex';
            } else {
                c.style.display = 'none';
            }
        });

        // If count was 0 and now is > 0 and no count span exists, we might need to inject it or handle it
        // For simplicity, we assume header.liquid already has it or doesn't.
    }

    formatMoney(cents) {
        return (cents / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.cartDrawer = new CartDrawer();
});
