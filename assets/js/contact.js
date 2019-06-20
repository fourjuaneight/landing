const name = document.querySelector('input#name');
const email = document.querySelector('input#email');
const message = document.querySelector('textarea#message');
const submit = document.querySelector('button.contact__button');

message.addEventListener('keyup', () => {
  const filledName = name.checkValidity();
  const filledEmail = email.checkValidity();
  const filledMessage = message.checkValidity();

  if (filledName && filledEmail && filledMessage) {
    submit.classList.add('active');
  }
});
