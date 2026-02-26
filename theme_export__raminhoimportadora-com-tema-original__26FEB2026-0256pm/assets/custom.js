/**
 * Include your custom JavaScript here.
 *
 * We also offer some hooks so you can plug your own logic. For instance, if you want to be notified when the variant
 * changes on product page, you can attach a listener to the document:
 *
 * document.addEventListener('variant:changed', function(event) {
 *   var variant = event.detail.variant; // Gives you access to the whole variant details
 * });
 *
 * You can also add a listener whenever a product is added to the cart:
 *
 * document.addEventListener('product:added', function(event) {
 *   var variant = event.detail.variant; // Get the variant that was added
 *   var quantity = event.detail.quantity; // Get the quantity that was added
 * });
 *
 * If you are an app developer and requires the theme to re-render the mini-cart, you can trigger your own event. If
 * you are adding a product, you need to trigger the "product:added" event, and make sure that you pass the quantity
 * that was added so the theme can properly update the quantity:
 *
 * document.documentElement.dispatchEvent(new CustomEvent('product:added', {
 *   bubbles: true,
 *   detail: {
 *     quantity: 1
 *   }
 * }));
 *
 * If you just want to force refresh the mini-cart without adding a specific product, you can trigger the event
 * "cart:refresh" in a similar way (in that case, passing the quantity is not necessary):
 *
 * document.documentElement.dispatchEvent(new CustomEvent('cart:refresh', {
 *   bubbles: true
 * }));
 */
document.addEventListener('DOMContentLoaded', () => {
  const cartButton = document.querySelector('.header__cart-toggle');
  const miniCart = document.querySelector('#mini-cart');

  if (!cartButton) {
    console.error('Botão do carrinho não encontrado.');
    return;
  }

  // Sobrescrever o comportamento padrão do botão
  cartButton.addEventListener('click', (e) => {
    e.preventDefault(); // Impede o redirecionamento

    if (miniCart) {
      const isHidden = miniCart.getAttribute('aria-hidden') === 'true';

      if (isHidden) {
        miniCart.setAttribute('aria-hidden', 'false');
        miniCart.classList.add('is-open');
      } else {
        miniCart.setAttribute('aria-hidden', 'true');
        miniCart.classList.remove('is-open');
      }
    }
  });

  console.log('Evento do botão do carrinho registrado com sucesso.');
});