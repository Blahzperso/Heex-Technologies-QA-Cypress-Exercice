import { links, navBar } from "../../support/navigation_elements.js";

import { HomePage } from "../../support/pages/homePage.js";
import { LoginPage } from "../../support/pages/loginPage.js";
const homePage = new HomePage();
const loginPage = new LoginPage();

describe("Navigation and Basic Page Verification", () => {

    beforeEach(() => {
        homePage.visit();
    });
    
    it("Home page loads correctly and displays the main heading", () => {
        cy.get('h1')
            .should('be.visible')
            .and('contain.text', "Welcome to ShopTalk");
    });
    
    it("Navigation links are present", () => {
        cy.get('nav a').should('have.length.at.least', 7);
        cy.get('nav a').each(link => {
            cy.wrap(link).should('have.attr', 'href');
        });
    });
    
    it("Navbar leads to correct pages as logged in user", () => {
        // Save local storage as logged in
        loginPage.visit();
        loginPage.login();
        cy.window().then(win => {
            const auth = { ...win.localStorage };
            cy.wrap(auth).as('localStorageAuth');
        });

        navBar.forEach(menu => { // used .forEach (not .each) to avoid async error related to localStorage
            // Insert local storage as logged in before cy.visit()
            cy.get('@localStorageAuth').then(auth => {
                cy.window().then(win => {
                    Object.entries(auth).forEach(([key, value]) => {
                        win.localStorage.setItem(key, value);
                    });
                });
            });
            // Assert link works correctly
            homePage.visit();
            cy.get('nav a').contains(menu.text).should('be.visible').click();
            cy.url().should('include', menu.path);
        });
    });

    it("Navbar leads to correct pages as logged out user", () => {
        navBar.forEach(menu => {
            homePage.visit();
            cy.get('nav a').contains(menu.text).should('be.visible').click();
            if (menu.text === "Dashboard") {
                cy.url().should('include', links.Login);
            } else {
                cy.url().should('include', menu.path);
            }
        });
    });

});