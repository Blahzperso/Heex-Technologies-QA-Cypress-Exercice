import { links } from "../navigation_elements";

export class DashboardPage {
    logOutBtn = "[data-testid=logout-button]";

    visit() {
        cy.visit(links.Dashboard);
    }

    logOut() {
        cy.get(this.logOutBtn).click();
    }

}