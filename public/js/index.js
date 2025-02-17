import { login, logout } from './login.js';
import { updateSettings } from './updateSettings.js';
import { bookTour } from './stripe.js';
import '@babel/polyfill';
document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('.form--login');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      login(email, password);
    });
  } else {
    console.error('Form element not found!');
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const logoutBtn = document.querySelector('.nav__el--logout');

  if (logoutBtn) {
    logoutBtn.addEventListener('click', logout);
  } else {
    console.error('Logout button not found in the DOM!');
  }
});

document.addEventListener('DOMContentLoaded', function () {
  const updateForm = document.querySelector('.form-user-data'); // Correct form class

  if (updateForm) {
    updateForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const form = new FormData();
      form.append('name', document.getElementById('name').value);
      form.append('email', document.getElementById('email').value);
      form.append('photo', document.getElementById('photo').files[0]);

      // Retrieve input values

      // Call the updateUser function
      updateSettings(form, 'data');
    });
  } else {
    console.error('Form element not found!');
  }
});
const userPasswordForm = document.querySelector('.form-user-password');

document.addEventListener('DOMContentLoaded', () => {
  if (userPasswordForm) {
    userPasswordForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      document.querySelector('.btn--save-password').textContent = 'Updating...';
      const passwordCurrent = document.getElementById('password-current').value;
      const password = document.getElementById('password').value;
      const passwordConfirm = document.getElementById('password-confirm').value;
      await updateSettings(
        { passwordCurrent, password, passwordConfirm },
        'password',
      );
      document.getElementById('password-current').value = '';
      document.getElementById('password').value = '';
      document.getElementById('password-confirm').value = '';

      document.querySelector('.btn--save-password').textContent =
        'SAVE PASSWORD';
    });
  }
});
const bookBtn = document.getElementById('book-tour');

if (bookBtn) {
  bookBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    e.target.textContent = 'Processing...';
    const { tourId } = e.target.dataset;
    await bookTour(tourId);
  });
} else {
  console.error('Book tour button not found!');
}
