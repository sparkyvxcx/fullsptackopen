/// <reference types="cypress" />

const { func } = require("prop-types");

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

  describe.only("When logged in", function () {
    beforeEach(function () {
      // user log in
      cy.contains("login").click();
      cy.get("#username").type("elliot");
      cy.get("#password").type("fsocity");
      cy.get("#login-button").click();
    });

    it("A blog can be created", function () {
      // toggle blog form
      cy.contains("Create new blog").click();

      cy.get("#title").type("A new blog post about 5-9 attack");
      cy.get("#author").type("MR. ROBOT");
      cy.get("#url").type("https://www.fsocity.com");
      cy.get("#create-blog").click();

      cy.get("#blog-item").should(
        "contain",
        "A new blog post about 5-9 attack MR. ROBOT"
      );
    });

    describe("when a blog exists", function () {
      beforeEach(function () {
        cy.contains("Create new blog").click();
        cy.get("#title").type("A new blog post about 5-9 attack");
        cy.get("#author").type("MR. ROBOT");
        cy.get("#url").type("https://www.fsocity.com");
        cy.get("#create-blog").click();

        const user = {
          name: "Minister Zhange",
          username: "whiterose",
          password: "darkarmy",
        };
        // create a new test user
        cy.request("POST", "http://localhost:3001/api/users/", user);
      });

      it("User can like a blog", function () {
        cy.get("#blog-item").as("theBlog");
        cy.get("@theBlog").contains("view").click();
        cy.get("@theBlog").get(".likeButton").click();
        cy.get("@theBlog").contains("likes 1");
      });

      it("User can delete a blog created by himself/herself", function () {
        cy.get("#blog-item").as("theBlog");
        cy.get("@theBlog").contains("view").click();
        cy.get("@theBlog").contains("remove").click();

        cy.get("html").should(
          "not.contain",
          "A new blog post about 5-9 attack MR. ROBOT"
        );
      });

      it("A user cannot delete a blog that is not created by himself/herself", function () {
        // log out
        cy.contains("log out").click();

        // log in
        cy.contains("login").click();
        cy.get("#username").type("whiterose");
        cy.get("#password").type("darkarmy");
        cy.get("#login-button").click();

        cy.get("#blog-item").as("theBlog");
        cy.get("@theBlog").contains("view").click();
        cy.get("@theBlog")
          .contains("remove")
          .should("have.css", "display", "none");
      });
    });
  });
});
