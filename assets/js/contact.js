const form = document.querySelector('form#contact');

form.addEventListener('submit', async evt => {
  evt.preventDefault();

  const formData = new FormData(form);
  const data = Object.fromEntries(formData);
  const errMsg = 'Something went wrong. Reach out via my socials instead.';

  try {
    const request = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const response = await request.json();

    if (request.status !== 200) {
      console.error(request.statusText);
      alert(errMsg);
    }

    if (response.success) {
      form.reset();
      alert('Message sent successfully!');
    } else {
      console.error(response);
      alert(errMsg);
    }
  } catch (err) {
    console.error(err);
    alert(errMsg);
  }
});
