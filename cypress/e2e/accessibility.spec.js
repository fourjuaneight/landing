// Accessibility and Smoke test
// every page is opened via nav links
// page is then tested agains Seciton 508 and best practices A11Y testing

const A11Y_OPTIONS = {
  runOnly: {
    type: 'tag',
    values: [
      'wcag2a',
      'wcag2aa',
      'wcag21a',
      'wcag21aa',
      'section508',
      'best-practice',
      'cat.aria',
      'cat.forms',
    ],
  },
};

beforeEach(() => {
  cy.visit('http://localhost:8000/');
  cy.injectAxe();
});

it('Passes accessibility', () => {
  cy.findByTestId(/^home$/i, { selector: 'a' }).checkA11y(A11Y_OPTIONS);

  cy.visit('http://localhost:8000/uses/')
    .injectAxe()
    .findByTestId(/^home$/i, { selector: 'a' })
    .checkA11y(A11Y_OPTIONS);

  cy.findByTestId(/^home$/i, { selector: 'a' })
    .click()
    .checkA11y(A11Y_OPTIONS);

  cy.findByTestId(/^archive$/i, { selector: 'a' })
    .click()
    .checkA11y(A11Y_OPTIONS);

  cy.findByTestId(/^microblog$/i, { selector: 'a' })
    .click()
    .checkA11y(A11Y_OPTIONS);

  cy.findByTestId(/^archive$/i, { selector: 'a' })
    .click()
    .checkA11y(A11Y_OPTIONS);

  cy.findByTestId(/^about$/i, { selector: 'a' })
    .click()
    .checkA11y(A11Y_OPTIONS);

  cy.visit('http://localhost:8000/contact/')
    .injectAxe()
    .findByTestId(/^home$/i, { selector: 'a' })
    .checkA11y(A11Y_OPTIONS);
});
