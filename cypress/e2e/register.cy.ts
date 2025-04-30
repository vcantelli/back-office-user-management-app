describe("Register flow", () => {
  beforeEach(() => {
    cy.visit("/register");
  });

  it("should show error when passwords do not match", () => {
    cy.get('input[name="name"]').type("Test User");
    cy.get('input[name="email"]').type("test@user.com");
    cy.get('input[name="password"]').type("123456");
    cy.get('input[name="confirmPassword"]').type("654321");
    cy.get("form").submit();

    cy.contains("Passwords do not match").should("exist");
  });

  it("should show error for short password", () => {
    cy.get('input[name="name"]').type("Test User");
    cy.get('input[name="email"]').type("test@example.com");
    cy.get('input[name="password"]').type("123");
    cy.get('input[name="confirmPassword"]').type("123");
    cy.get("form").submit();

    cy.contains("Password must be at least 6 characters").should("exist");
  });

  it("should register and redirect to dashboard", () => {
    cy.get('input[name="name"]').type("Victor Calegon");
    cy.get('input[name="email"]').type("eve.holt@reqres.in");
    cy.get('input[name="password"]').type("pistol");
    cy.get('input[name="confirmPassword"]').type("pistol");
    cy.get("form").submit();

    cy.url().should("include", "/dashboard");
    cy.contains("User Management").should("exist");
  });
});
