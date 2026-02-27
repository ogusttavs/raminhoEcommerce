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
            html += `
                <div class="cart-drawer-item">
                    <img src="${item.image}" alt="${item.title}" class="cart-item-image">
                    <div class="cart-item-details">
                        <span class="cart-item-title">${item.product_title}</span>
                        <span class="cart-item-variant">${item.variant_title || ''}</span>
                        <div class="cart-item-qty-row">
                           <span class="cart-item-variant">${item.quantity} un x ${this.formatMoney(item.price)}</span>
                        </div>
                    </div>
                    <div class="cart-item-actions flex flex-col items-end">
                        <span class="cart-item-price">${this.formatMoney(item.original_line_price)}</span>
                        <button type="button" class="cart-item-remove" data-key="${item.key}">Remover</button>
                    </div>
                </div>
            `;
        });

        this.content.innerHTML = html;

        // Shipping Progress Bar logic
        const threshold = 25000; // Example: R$ 250,00 for free shipping
        const remaining = threshold - cart.total_price;
        let shippingHtml = '';

        if (remaining > 0) {
            const percentage = Math.min((cart.total_price / threshold) * 100, 100);
            shippingHtml = `
                <div class="shipping-progress-wrapper" style="margin-bottom: 1.5rem; background: rgba(0,0,0,0.03); padding: 1rem; border-radius: 12px;">
                    <p class="font-body" style="font-size: 0.85rem; margin-bottom: 0.5rem;">Faltam <strong>${this.formatMoney(remaining)}</strong> para <strong>Frete Grátis</strong></p>
                    <div class="progress-bar-bg" style="height: 6px; background: rgba(0,0,0,0.05); border-radius: 10px; overflow: hidden;">
                        <div class="progress-bar-fill" style="height: 100%; width: ${percentage}%; background: var(--color-primary); transition: width 0.6s ease;"></div>
                    </div>
                </div>
            `;
        } else {
            shippingHtml = `
                <div class="shipping-progress-wrapper" style="margin-bottom: 1.5rem; background: rgba(13, 124, 74, 0.1); padding: 1rem; border-radius: 12px; text-align: center;">
                    <p class="font-body" style="font-size: 0.85rem; color: var(--color-primary-dark);">🎉 Parabéns! Você ganhou <strong>Frete Grátis</strong></p>
                </div>
            `;
        }

        this.content.insertAdjacentHTML('afterbegin', shippingHtml);

        // Render Footer
        this.footer.innerHTML = `
            <div class="cart-footer-row">
                <span class="total-label font-body uppercase">Subtotal</span>
                <span class="total-value font-heading">${this.formatMoney(cart.total_price)}</span>
            </div>
            <a href="/checkout" class="btn-primary-apple" style="width: 100%; display: flex; justify-content: center; font-size: 1.2rem;">
               Continuar para Pagamento
            </a>
            <p class="font-body" style="text-align: center; font-size: 0.8rem; margin-top: 1rem; opacity: 0.5;">Pedido mínimo: R$ 129,90</p>
        `;

        this.updateHeaderCount(cart.item_count);
    }

    async updateItem(key, qty) {
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
