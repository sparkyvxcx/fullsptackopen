/// <reference types="cypress" />
describe("Blog app", function () {
  beforeEach(function () {
    // clear database
    cy.request("POST", "http://localhost:3001/api/testing/reset");
    const user = {
      name: "Elliot Alderson",
      username: "elliot",
      password: "fsocity",
    };
    // create test user
    cy.request("POST", "http://localhost:3001/api/users/", user);
    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", function () {
    cy.contains("login").click();
    cy.get("#username").type("test");
    cy.get("#password").type("test");
    cy.get("#login-button").click();
    cy.contains("wrong username or password");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.contains("login").click();
      cy.get("#username").type("elliot");
      cy.get("#password").type("fsocity");
      cy.get("#login-button").click();

      cy.contains("Elliot Alderson logged in");
    });

    it("fails with wrong credentials", function () {
      cy.contains("login").click();
      cy.get("#username").type("whiterose");
      cy.get("#password").type("darkarmy");
      cy.get("#login-button").click();
      cy.contains("wrong username or password");

      // check notification shown with unsuccessful login is displayed red with solid border
      cy.get(".error")
        .should("contain", "wrong username or password")
        .should("have.css", "color", "rgb(255, 0, 0)")
        .should("have.css", "border-style", "solid");

      cy.get("html").should("not.contain", "Elliot Alderson logged in");
    });
  });
});
