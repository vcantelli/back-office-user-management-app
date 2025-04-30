describe("Logout flow", () => {
  beforeEach(() => {
    cy.setCookie("auth_token", "fake-valid-token");
    cy.visit("/dashboard");
  });

  it("should log out and redirect to login", () => {
    cy.contains("button", "Logout").click();

    cy.url().should("include", "/login");
    cy.get("input[name=email]").should("exist");
  });
});
