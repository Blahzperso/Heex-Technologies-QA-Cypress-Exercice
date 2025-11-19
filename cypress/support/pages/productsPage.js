import { links } from "../navigation_elements";

export class ProductsPage {
    searchInput = "[data-testid=search-input]";
    filterDropdown = "[data-testid=filter-select]";
    loadingIndicator = "[data-testid=loading-indicator]";
    retryBtn = "[data-testid=retry-button]";

    productContainer(id) {
        return "[data-testid=product-" + id + "]";
    }

    productImage(id) {
        return "[data-testid=product-image-" + id + "]";
    }

    productAddBtn(id) {
        return "[data-testid=add-to-cart-" + id + "]";
    }

    visit() {
        cy.visit(links.Products);
    }

    search(product) {
        cy.get(this.searchInput).type(product);
    }

    filter(category) {
        cy.get(this.filterDropdown).select(category);
    }

}