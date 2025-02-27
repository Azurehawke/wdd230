document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registration-form');
    const password = document.getElementById('password');
    const passwordConfirm = document.getElementById('password-confirm');
    const passwordError = document.getElementById('password-error');
    const rating = document.getElementById('rating');
    const ratingValue = document.getElementById('rating-value');

    // Update rating value display
    rating.addEventListener('input', () => {
        ratingValue.textContent = rating.value;
    });

    // Validate password match on form submit
    form.addEventListener('submit', (e) => {
        if (password.value !== passwordConfirm.value) {
            e.preventDefault();
            passwordError.textContent = 'Passwords do not match. Please try again.';
            passwordError.style.display = 'block';
            password.value = '';
            passwordConfirm.value = '';
            password.focus();
        } else {
            passwordError.style.display = 'none';
        }
    });
});