class FeaturedProducts extends HTMLElement {
  connectedCallback() {
    this.buttons = this.querySelectorAll('.featured-products__button');

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

      this.openCartDrawer();

      button.textContent = 'Added';
      setTimeout(() => {
        button.textContent = 'Add to cart';
        button.disabled = false;
      }, 1000);

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
