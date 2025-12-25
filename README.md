# Refactor Shopify Technical Test

Custom **Featured Products** section built on top of **Shopify Dawn theme**.

This project demonstrates modern Shopify theme development practices:

- custom sections
- Web Components
- AJAX cart
- Section Rendering API
- SCSS build with Gulp

## Tech Stack

- Shopify (Online Store 2.0)
- Dawn theme
- Liquid
- JavaScript (ES6)
- Web Components
- SCSS
- Gulp

## Features Implemented

### Featured Products Section

- Custom section with schema settings:
  - section title
  - collection picker
  - products limit
- Configurable via Shopify Theme Customizer

### Product Card Component

- Extracted into reusable snippet
- Displays:
  - product image
  - title
  - price
  - add to cart button

### AJAX Add to Cart

- Uses `/cart/add.js`
- Adds products without page reload
- Button loading and success states

### Cart Drawer Integration (Dawn)

- Automatically opens cart drawer after add to cart
- Cart state is refreshed via custom events

### Hide Products Already in Cart

- Fetches `/cart.js`
- Detects products already added
- Disables button and updates UI state

### Section Rendering API

- Section re-renders after adding product to cart
- Added product disappears from featured list
- No full page reload

### SCSS Build with Gulp

- SCSS → CSS compilation
- Minified output
- Simple and clean build setup

## Development Setup

1. Clone repository

git clone https://github.com/IvanVoshchepynets/shopify.git

cd shopify

2. Install dependencies

npm install

3. Run SCSS build

npm run build

npm run watch

4. Run Shopify theme locally

shopify theme dev
