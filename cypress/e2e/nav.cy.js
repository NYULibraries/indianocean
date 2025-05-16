import { waitTime, homeURL, aboutURL, searchURL } from "../support/constants";

describe("Navigation checks", () => {
	describe("initialize", () => {
		it("Should setup viewport", () => {
			cy.viewport(1000, 660);
		});
		it("Navigate to home page", () => {
			cy.visit("/");
			cy.wait(waitTime);
		});
	});

	describe("Navigation check", () => {
		it("Should visit home page and check url", () => {
			cy.get(".navbar-nav").find("li").eq(0).click();
			cy.wait(waitTime);
			cy.url({ timeout: 1000 }).should("eq", homeURL);
		});
		it("Should visit about page and check url", () => {
			cy.get(".navbar-nav").find("li").eq(1).click();
			cy.wait(waitTime);
			cy.url({ timeout: 1000 }).should("eq", aboutURL);
		});
		it("Should visit search page and check url", () => {
			cy.get(".navbar-nav").find("li").eq(2).click();
			cy.wait(waitTime);
			cy.url({ timeout: 1000 }).should("eq", `${searchURL}?q=*:*&page=1&sortField=default&sortDir=asc`);
		});
	});

	describe("Footer navigation check", () => {
		it("Should visit home page and check url", () => {
			cy.get(".footer-nav").find("li").eq(0).click();
			cy.wait(waitTime);
			cy.url({ timeout: 1000 }).should("eq", homeURL);
		});
		it("Should visit about page and check url", () => {
			cy.get(".footer-nav").find("li").eq(1).click();
			cy.wait(waitTime);
			cy.url({ timeout: 1000 }).should("eq", aboutURL);
		});
		it("Should visit search page and check url", () => {
			cy.get(".footer-nav").find("li").eq(2).click();
			cy.wait(waitTime);
			cy.url({ timeout: 1000 }).should("eq", `${searchURL}?q=*:*&page=1&sortField=default&sortDir=asc`);
		});
	});

	describe("Mobile navigation check", () => {
		it("Should revisit home page and open mobile menu", () => {
			cy.visit("/");
			cy.viewport(767, 660);
			cy.get(".navbar-header").find("button").click();
			cy.get(".navbar-collapse").invoke("height").should("eq", 238);
			cy.wait(waitTime);
		});
		it("Should visit home page and check url", () => {
			cy.get(".navbar-nav").find("li").eq(0).click();
			cy.wait(waitTime);
			cy.url({ timeout: 1000 }).should("eq", homeURL);
		});
		it("Should reset mobile viewport", () => {
			cy.viewport(767, 600);
			cy.get(".navbar-header").find("button").click();
			cy.get(".navbar-collapse").invoke("height").should("eq", 238);
			cy.wait(waitTime);
		});
		it("Should visit about page and check url", () => {
			cy.get(".navbar-nav").find("li").eq(1).click();
			cy.wait(waitTime);
			cy.url({ timeout: 1000 }).should("eq", aboutURL);
		});
		it("Should reset mobile viewport", () => {
			cy.viewport(767, 600);
			cy.get(".navbar-header").find("button").click();
			cy.get(".navbar-collapse").invoke("height").should("eq", 238);
			cy.wait(waitTime);
		});
		it("Should visit search page and check url", () => {
			cy.get(".navbar-nav").find("li").eq(2).click();
			cy.wait(waitTime);
			cy.url({ timeout: 1000 }).should("eq", `${searchURL}?q=*:*&page=1&sortField=default&sortDir=asc`);
		});
	});
});
