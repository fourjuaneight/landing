import React from 'react';
import { cleanup, fireEvent, render } from '@testing-library/react';
import 'whatwg-fetch';

import Form from '../contact';

afterEach(cleanup);

/* eslint-disable global-require */
beforeEach(() => {
  require('mutationobserver-shim');
});
/* eslint-enable */

// checks all inputs by data-testid
test('contact form renders all inputs', () => {
  const { getByLabelText } = render(<Form />);

  expect(getByLabelText(/name/i)).toBeDefined();
  expect(getByLabelText(/email/i)).toBeDefined();
  expect(getByLabelText(/message/i)).toBeDefined();
});

// checks required inputs submit data
test('contact form submits required fields', async () => {
  const { getByTestId, findByTestId } = render(<Form />);

  const name = getByTestId('name');
  const email = getByTestId('email');
  const message = getByTestId('message');
  const submit = getByTestId('submit');

  fireEvent.input(name, { target: { value: 'Juan Semilla Manzana' } });
  fireEvent.input(email, { target: { value: 'test@email.com' } });
  fireEvent.input(message, { target: { value: 'None pizza with left Juan.' } });
  fireEvent.click(submit);

  await findByTestId('confirmation');
});
