/// <reference types="cypress" />
describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3001/api/testing/reset");
    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", function () {
    cy.contains("login").click();
    cy.get("#username").type("test");
    cy.get("#password").type("test");
    cy.get("#login-button").click();
    cy.contains("wrong username or password");
  });
});
