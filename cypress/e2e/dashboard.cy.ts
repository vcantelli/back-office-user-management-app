describe("Dashboard", () => {
  beforeEach(() => {
    cy.setCookie("auth_token", "fake-valid-token");
    cy.visit("/dashboard");
  });

  it("should list users with pagination", () => {
    cy.get("table").should("exist");
    cy.get("table tbody tr").should("have.length", 6);
    cy.get('[aria-label="Go to page 2"]').click();
    cy.get("table tbody tr").should("have.length.greaterThan", 0);
  });

  it("should open and close the Add User dialog", () => {
    cy.contains("Add User").click();
    cy.get('input[name="first_name"]').should("exist");
    cy.contains("Cancel").click();
    cy.get('input[name="first_name"]').should("not.exist");
  });

  it("should create a new user", () => {
    cy.contains("Add User").click();
    cy.get('input[name="first_name"]').type("Cypress User");
    cy.get('input[name="job"]').type("Tester");
    cy.contains("button", "Create").click();
    cy.get('input[name="first_name"]').should("not.exist");
  });

  it("should edit an existing user", () => {
    cy.get("table tbody tr")
      .first()
      .within(() => {
        cy.get('[aria-label="edit user"]').click();
      });
    cy.get('input[name="job"]').clear().type("Edited Job");
    cy.contains("button", "Update").click();
    cy.get('input[name="name"]').should("not.exist");
  });

  it("should delete a user", () => {
    cy.get("table tbody tr")
      .first()
      .within(() => {
        cy.get('[aria-label="delete user"]').click();
      });
    cy.contains("button", "Delete").click();
    cy.get('input[name="name"]').should("not.exist");
  });
});
