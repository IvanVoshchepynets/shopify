class FeaturedProducts {
  constructor(section) {
    this.section = section;
    this.init();
  }

  init() {
    this.bindUI();
  }

  bindUI() {
    const buttons = this.section.querySelectorAll(
      '.featured-products__button'
    );

    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        console.log('Add to cart clicked');
      });
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('.featured-products');

  sections.forEach((section) => {
    new FeaturedProducts(section);
  });
});
