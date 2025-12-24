class FeaturedProducts extends HTMLElement {
  connectedCallback() {
    this.cards = this.querySelectorAll('.featured-products__card');
    this.buttons = this.querySelectorAll('.featured-products__button');

    this.hideProductsAlreadyInCart();

    this.buttons.forEach((button) => {
      button.addEventListener('click', this.onAddToCartClick);
    });
  }

  disconnectedCallback() {
    if (!this.buttons) return;

    this.buttons.forEach((button) => {
      button.removeEventListener('click', this.onAddToCartClick);
    });
  }

  async hideProductsAlreadyInCart() {
    try {
      const response = await fetch('/cart.js');
      const cart = await response.json();

      const variantsInCart = cart.items.map(
        (item) => String(item.variant_id)
      );

      this.cards.forEach((card) => {
        const variantId = card.dataset.variantId;

        if (variantsInCart.includes(variantId)) {
          card.classList.add('is-in-cart');
          const button = card.querySelector('.featured-products__button');
          if (button) {
            button.disabled = true;
            button.textContent = 'In cart';
          }
        }
      });
    } catch (error) {
      console.error('Failed to check cart', error);
    }
  }

  onAddToCartClick = async (event) => {
    event.preventDefault();

    const button = event.currentTarget;
    const variantId = button.dataset.variantId;

    if (!variantId) return;

    button.disabled = true;
    button.textContent = 'Adding...';

    try {
      const response = await fetch('/cart/add.js', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          id: variantId,
          quantity: 1,
        }),
      });

      if (!response.ok) {
        throw new Error('Add to cart failed');
      }

      await response.json();

      // 🔥 ОНОВИТИ СТАН КАРТОЧКИ
      const card = button.closest('.featured-products__card');
      if (card) {
        card.classList.add('is-in-cart');
        button.textContent = 'In cart';
      }

      this.openCartDrawer();

    } catch (error) {
      console.error(error);
      button.textContent = 'Error';
      button.disabled = false;
    }
  };

  openCartDrawer() {
    document.dispatchEvent(new CustomEvent('cart:refresh'));

    const cartDrawer = document.querySelector('cart-drawer');
    if (cartDrawer && typeof cartDrawer.open === 'function') {
      cartDrawer.open();
    }
  }
}

if (!customElements.get('featured-products')) {
  customElements.define('featured-products', FeaturedProducts);
}
