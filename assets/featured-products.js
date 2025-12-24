class FeaturedProducts extends HTMLElement {
  connectedCallback() {
    console.log('FeaturedProducts connected');

    this.buttons = this.querySelectorAll('.featured-products__button');
    console.log('Buttons found:', this.buttons.length);

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

  onAddToCartClick(event) {
    event.preventDefault();
    console.log('Add to cart clicked', event.currentTarget);
  }
}

if (!customElements.get('featured-products')) {
  customElements.define('featured-products', FeaturedProducts);
}

document.addEventListener('shopify:section:load', (event) => {
  const section = event.target.querySelector('featured-products');
  if (section && section.connectedCallback) {
    section.connectedCallback();
  }
});
