import { links } from "../navigation_elements";

export class LoginPage {
   emailInput = "[data-testid=email-input]";
   passwordInput = "[data-testid=password-input]";
   loginBtn = "[data-testid=login-button]";

   visit() {
      cy.visit(links.Login);
   }

   fillForm(email, password) {
      if (email) {
         cy.get(this.emailInput).clear().type(email);
      };
      if (password) {
         cy.get(this.passwordInput).clear().type(password);
      };
   }

   submit() {
      cy.get(this.loginBtn).click();
   }

   login(email = "admin@test.com", password = "password123") {
      cy.intercept("POST", "/api/login").as("loginRequest");
      this.fillForm(email, password);
      this.submit();
      cy.wait("@loginRequest");
   }

}