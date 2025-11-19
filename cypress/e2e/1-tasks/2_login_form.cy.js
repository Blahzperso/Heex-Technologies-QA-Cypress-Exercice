import { links } from "../../support/navigation_elements.js";
import { baseEmail, basePassword } from "../../support/test_credentials.js";

import { LoginPage } from "../../support/pages/loginPage.js";
import { DashboardPage } from "../../support/pages/dashboardPage.js"
const loginPage = new LoginPage();
const dashboardPage = new DashboardPage();

describe("Login Form Validation and Authentication", () => {

    beforeEach(() => {
        loginPage.visit();
    });
    
    it("Empty email submission validation", () => {
        loginPage.fillForm("", basePassword);
        loginPage.submit();
        cy.get('[class=error]')
            .should('be.visible')
            .should('contain.text', "Email is required");
        cy.url().should('include', links.Login);
    });

    it("Empty password submission validation", () => {
        loginPage.fillForm(baseEmail, "");
        loginPage.submit();
        cy.get('[class=error]')
            .should('be.visible')
            .should('contain.text', "Password is required");
        cy.url().should('include', links.Login);
    });

    it("Invalid email format validation", () => {
        loginPage.fillForm("invalid_email", basePassword);
        loginPage.submit(); // Error message handled by navigator
        cy.url().should('include', links.Login);
    });

    it("Password too short validation", () => {
        loginPage.fillForm(baseEmail, "short");
        loginPage.submit();
        cy.get('[class=error]')
            .should('be.visible')
            .should('contain.text', "Password must be at least 6 characters");
        cy.url().should('include', links.Login);
    });

    it("Valid credentials submission and redirect to dashboard", () => {
        loginPage.fillForm(baseEmail, basePassword);
        loginPage.submit();
        cy.get(loginPage.loginBtn).should('not.exist');
        cy.url().should('include', links.Dashboard);
    });

    it("User email is displayed on dashboard", () => {
        loginPage.login(baseEmail, basePassword);
        dashboardPage.visit();
        cy.get(loginPage.loginBtn).should('not.exist');
        // Assert user email is visible
        cy.contains(baseEmail).should('be.visible');
    });

    it("Logout functionality and redirect back to login", () => {
        loginPage.login();
        dashboardPage.visit();
        // Assert logOutBtn works
        cy.get(dashboardPage.logOutBtn).should('be.visible');
        dashboardPage.logOut();
        cy.url().should('include', links.Login);
    });

});