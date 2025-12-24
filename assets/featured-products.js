class FeaturedProducts extends HTMLElement {
  connectedCallback() {
    console.log('FeaturedProducts connected');

    this.addEventListener('click', this.onClick.bind(this));
  }

  disconnectedCallback() {
    this.removeEventListener('click', this.onClick);
  }

  async onClick(event) {
    const button = event.target.closest('.featured-products__button');
    if (!button) return;

    console.log('Add to cart clicked');

    const variantId = button.dataset.variantId;
    if (!variantId) {
      console.error('No variant ID');
      return;
    }

    button.disabled = true;
    button.textContent = 'Adding...';

    try {
      const response = await fetch('/cart/add.js', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          id: variantId,
          quantity: 1
        })
      });

      if (!response.ok) {
        throw new Error('Add to cart failed');
      }

      const data = await response.json();
      console.log('Added to cart:', data);

      button.textContent = 'Added ✓';

      setTimeout(() => {
        button.textContent = 'Add to cart';
        button.disabled = false;
      }, 1500);

    } catch (error) {
      console.error(error);
      button.textContent = 'Error';
      button.disabled = false;
    }
  }
}

if (!customElements.get('featured-products')) {
  customElements.define('featured-products', FeaturedProducts);
}
