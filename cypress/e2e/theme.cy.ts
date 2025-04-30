describe("Theme persistence", () => {
  beforeEach(() => {
    cy.setCookie("auth_token", "fake-valid-token");
    cy.visit("/dashboard");
  });

  it("should toggle theme dynamically based on current mode", () => {
    cy.get("body")
      .invoke("attr", "data-theme")
      .then(currentTheme => {
        const expectedTheme = currentTheme === "light" ? "dark" : "light";
        cy.get('[aria-label="Toggle theme"]').click();
        cy.get("body").should("have.attr", "data-theme", expectedTheme);
        cy.reload();
        cy.get("body").should("have.attr", "data-theme", expectedTheme);
      });
  });
});
