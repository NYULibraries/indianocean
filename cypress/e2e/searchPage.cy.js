import { waitTime, homeURL, aboutURL, searchURL } from "../support/constants";

describe("Search page visit", () => {
	describe("Text content load", () => {
		it("Should load text content", () => {
			cy.visit("/search");
			cy.get(".page-title", { timeout: waitTime }).contains("Browse titles");
		});
	});
	describe("Check filter", () => {
		it("Should check that the filter exists", () => {
			cy.get(".filters").should("exist");
		});
	});
	describe("Check results display", () => {
		it("Should check that the results display", () => {
			cy.get(".resultsnum").should("exist");
		});
	});
	describe("Check resource load", () => {
		it("Should check that there are 12 cards", () => {
			cy.get(".card")
				.should("have.length", 12)
				.each(($child) => {
					cy.wrap($child).find(".thumbs").should("exist");
					cy.wrap($child).find(".md_title").should("exist");
					cy.wrap($child).find(".md_authors").should("exist");
					cy.wrap($child).find(".md_publisher").should("exist");
					cy.wrap($child).find(".md_provider").should("exist");
					cy.wrap($child).find(".md_subjects").should("exist");
				});
		});
	});
	describe("Check filter", () => {
		it("Should check items after being sorted by title", () => {
			cy.get("#browse-select").select(1);
			cy.url().should("include", `${searchURL}?q=*:*&page=1&sortField=ss_longlabel&sortDir=asc`);
			cy.wait(waitTime);
			let titles = [];
			cy.get(".md_title")
				.find("a:nth-child(1)")
				.each(($title) => {
					titles.push($title.text());
					const alphabeticalOrder = isSortedAlphabetically(titles);
					expect(alphabeticalOrder).to.be.true;
				});
		});
		it("Should check items after being sorted by author", () => {
			cy.get("#browse-select").select(2);
			cy.url().should("include", `${searchURL}?q=*:*&page=1&sortField=ss_sauthor&sortDir=asc`);
			cy.wait(waitTime);
			let authors = [];
			cy.get(".flex-container")
				.find("span.md_author:nth-child(2)")
				.each(($author) => {
					authors.push($author.text());
					const alphabeticalOrder = isSortedAlphabetically(authors);
					expect(alphabeticalOrder).to.be.true;
				});
		});
		// it("Should check items after being sorted by subject", () => {
		// 	cy.get("#browse-select").select(3);
		// 	cy.url().should("include", `${searchURL}?q=*:*&page=1&sortField=ss_ssubject&sortDir=asc`);
		// 	cy.wait(waitTime);
		// 	let subjects = [];
		// 	cy.get(".flex-container")
		// 		.find("a.md_subject")
		// 		.each(($subject) => {
		// 			subjects.push($subject.text());
		// 			const alphabeticalOrder = isSortedAlphabetically(subjects);
		// 			expect(alphabeticalOrder).to.be.true;
		// 		});
		// });
		it("Should check items after being sorted by place", () => {
			cy.get("#browse-select").select(3);
			cy.url().should("include", `${searchURL}?q=*:*&page=1&sortField=ss_publocation&sortDir=asc`);
			cy.wait(waitTime);
			let pubs = [];
			cy.get(".md_publisher")
				.find("span:nth-child(2)")
				.each(($pub) => {
					pubs.push($pub.text());
					const alphabeticalOrder = isSortedAlphabetically(pubs);
					expect(alphabeticalOrder).to.be.true;
				});
		});
	});
	describe("Check search", () => {
		it("Should type something into the search,submit, and check url", () => {
			const query = "abc";
			cy.get('[name="q"]').type(query);
			cy.get("form").submit();
			cy.url().should("eq", `${searchURL}?q=abc&page=1&sortField=default&sortDir=asc`);
			cy.get(".s-query").should("contain", query);
			cy.visit("/search");
		});
	});
	describe("Check footer", () => {
		it("Should check footer is loaded", () => {
			cy.get(".footer-wrapper-top")
				.children()
				.each(($child) => {
					cy.wrap($child).should("exist");
				});
		});
	});
});
function isSortedAlphabetically(arr) {
	for (let i = 1; i < arr.length; i++) {
		if (arr[i - 1].localeCompare(arr[i]) > 0) {
			return false;
		}
	}
	return true;
}
