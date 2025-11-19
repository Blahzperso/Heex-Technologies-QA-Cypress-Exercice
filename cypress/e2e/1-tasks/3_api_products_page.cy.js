import { productCategories } from "../../support/product_category.js"

import { ProductsPage } from "../../support/pages/productsPage.js"
const productsPage = new ProductsPage();

describe("API Testing - Products Page", () => {

    beforeEach(() => {
        productsPage.visit();
    });
    
    it("API call is made to FakeStoreAPI and has response 200", () => {
        cy.intercept(
            "GET",
            "https://fakestoreapi.com/products"
        ).as("getProducts");
        productsPage.visit();
        cy.wait("@getProducts").its('response.statusCode').should('eq', 200); 
    });

    it("Products display correctly after API response", () => {
        
        // Mock api products request
        cy.intercept(
            "GET",
            "https://fakestoreapi.com/products",
            {
                fixture: "fakestoreapi_products_set_1.json"
            }  
        ).as("getProducts");
        productsPage.visit();
        cy.wait("@getProducts").then(request => {

            // Assert product containers, images, and buttons are visible
            cy.wrap(request.response.body).each(product => {
                cy.get(productsPage.productContainer(product.id)).should('be.visible');
                cy.get(productsPage.productImage(product.id)).should('be.visible');
                cy.get(productsPage.productAddBtn(product.id)).should('be.visible');
            });

        });
    });

    it("Products data displays correctly after API response", () => {
        
        // Mock api products request
        cy.intercept(
            "GET",
            "https://fakestoreapi.com/products",
            {
                fixture: "fakestoreapi_products_set_1.json"
            }  
        ).as("getProducts");
        productsPage.visit();
        cy.wait("@getProducts").then(request => {

            // Assert product data is visible
            cy.wrap(request.response.body).each(product => {
                const container = productsPage.productContainer(product.id);
                cy.get(container).contains(product.title).should('be.visible');
                cy.get(container).contains(product.description).should('be.visible');
                cy.get(container).contains(product.category).should('be.visible');
                cy.get(container).contains("$" + product.price).should('be.visible');
                cy.get(container).contains(product.rating.rate).should('be.visible');
                cy.get(container).contains(product.rating.count).should('be.visible');
            });

        });
    });

    it("Loading indicator appears while fetching", () => {
        
        // Intercept products request to return nothing
        cy.intercept(
            "GET",
            "https://fakestoreapi.com/products",
            (req) => {return;}
        ).as("getProducts");

        // Assert loading indicator displays
        cy.get(productsPage.loadingIndicator)
            .should('be.visible')
            .and('contain.text', "Loading products...");

    });

    it("Search functionality works on fetched data", () => {

        // Mock api products request
        cy.intercept(
            "GET",
            "https://fakestoreapi.com/products",
            {
                fixture: 'fakestoreapi_products_set_2.json'
            }  
        ).as("getProducts");
        productsPage.visit();
        cy.wait("@getProducts");

        // Search an existing product
        productsPage.search("Product 1");
        // Assert products are displayed/hidden
        cy.get(productsPage.productContainer(1)).should('be.visible');
        cy.get(productsPage.productContainer(2)).should('be.visible');
        cy.get(productsPage.productContainer(3)).should('not.exist');

    });

    it("Filter dropdown (All/Electronics/Jewelery/etc.) displays all options", () => {
        cy.get(productsPage.filterDropdown).find('option').then($options => {
            const actualOptions = [...$options].map(opt => opt.text);
            const expectedOptions = productCategories;
            expect(actualOptions).to.deep.eq(expectedOptions);
        });
    });

    it("Filter dropdown (All/Electronics/Jewelery/etc.) works correctly", () => {

        // Mock api products request
        cy.intercept(
            "GET",
            "https://fakestoreapi.com/products",
            {
                fixture: 'fakestoreapi_products_set_3.json'
            }  
        ).as("getProducts");
        productsPage.visit();
        cy.wait("@getProducts").then(request => {

            // Select a category
            cy.wrap(productCategories).each(selectedCategory => {
                cy.get(productsPage.filterDropdown).select(selectedCategory);
                // Assert each products display or not according to their category
                cy.wrap(request.response.body).each(product => {
                    if (product.category === selectedCategory.toLowerCase() // .toLowerCase() needed because product categories displays in different case
                    || selectedCategory === "All Products") {
                        cy.get(productsPage.productContainer(product.id))
                            .should('be.visible');
                    } else {
                        cy.get(productsPage.productContainer(product.id))
                            .should('not.exist');
                    }
                });
            });
        });
    });

    it("Error handling when API fails (mock a failed API response)", () => {
    
        // Mock api products error response
        const errorStatus = 404
        const errorMessage = "Error message"
        cy.intercept(
            "GET",
            "https://fakestoreapi.com/products",
            {
                statusCode: errorStatus,
                body: {
                    message: errorMessage
                }
            }  
        ).as("getProducts");
        productsPage.visit();
        cy.wait("@getProducts");

        // Assert error message et retry button are visible
        cy.get('[class=error]')
            .should('be.visible')
            .and('contain.text', "Failed to fetch products:")
            .and('contain.text', errorStatus);
        cy.get(productsPage.retryBtn).should('be.visible');
        
    });

    // Todo add test to check retryBtn works when api error

});