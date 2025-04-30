describe("Login flow", () => {
  beforeEach(() => {
    cy.visit("/login");
  });

  it("should show error for short password", () => {
    cy.get('input[name="email"]').type("test@example.com");
    cy.get('input[name="password"]').type("123");
    cy.get("form").submit();

    cy.contains("Password must be at least 6 characters").should("exist");
  });

  it("should show error for invalid credentials", () => {
    cy.get('input[name="email"]').type("fake@example.com");
    cy.get('input[name="password"]').type("invalidpassword");
    cy.get("form").submit();

    cy.contains("Invalid credentials").should("exist");
  });

  it("should login and redirect to dashboard", () => {
    cy.get('input[name="email"]').type("eve.holt@reqres.in");
    cy.get('input[name="password"]').type("cityslicka");
    cy.get("form").submit();

    cy.url().should("include", "/dashboard");
    cy.contains("User Management").should("exist");
  });
});
