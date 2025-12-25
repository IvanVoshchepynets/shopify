class FeaturedProducts extends HTMLElement {
  connectedCallback() {
    this.sectionId = this.dataset.sectionId;
    this.sectionUrl = this.dataset.sectionUrl;

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

      await this.refreshSection();
      this.openCartDrawer();

    } catch (error) {
      console.error(error);
      button.textContent = 'Error';
      button.disabled = false;
    }
  };

  async refreshSection() {
    const url = `${this.sectionUrl}?section_id=${this.sectionId}`;

    const response = await fetch(url);
    const html = await response.text();

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    const newSection = doc.querySelector(
      `featured-products[data-section-id="${this.sectionId}"]`
    );

    if (newSection) {
      this.replaceWith(newSection);
    }
  }

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
