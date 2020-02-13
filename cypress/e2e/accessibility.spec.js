// Accessibility and Smoke test
// every page is opened via nav links
// page is then tested agains Seciton 508 and best practices A11Y testing

const A11Y_OPTIONS = {
  runOnly: {
    type: 'tag',
    values: ['section508', 'best-practice'],
  },
};

beforeEach(() => {
  cy.visit('/');
  cy.injectAxe();
});

describe('Accessibility (A11Y)', () => {
  it('Passes accessibility', () => {
    cy.findByTestId(/^posts$/i, { selector: 'a' })
      .click()
      .checkA11y(A11Y_OPTIONS);

    cy.findByTestId(/^microblog$/i, { selector: 'a' })
      .click()
      .checkA11y(A11Y_OPTIONS);

    cy.findByTestId(/^about$/i, { selector: 'a' })
      .click()
      .checkA11y(A11Y_OPTIONS);
  });
});
