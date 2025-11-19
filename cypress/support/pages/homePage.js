import { links } from "../navigation_elements";

export class HomePage {

    visit() {
        cy.visit(links.Home);
    }

}