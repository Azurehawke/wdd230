document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registration-form');
    const password = document.getElementById('password');
    const passwordConfirm = document.getElementById('password-confirm');
    const passwordError = document.getElementById('password-error');
    const email = document.getElementById('email');
    const rating = document.getElementById('rating');
    const ratingValue = document.getElementById('rating-value');

    // Set initial rating value on page load
    ratingValue.textContent = rating.value;

    // Update rating value dynamically as slider moves
    rating.addEventListener('input', () => {
        ratingValue.textContent = rating.value;
    });

    // Validate form on submit
    form.addEventListener('submit', (e) => {
        let isValid = true;

        // Password match check
        if (password.value !== passwordConfirm.value) {
            isValid = false;
            passwordError.textContent = 'Passwords do not match. Please try again.';
            passwordError.style.display = 'block';
            password.value = '';
            passwordConfirm.value = '';
            password.focus();
        } else {
            passwordError.style.display = 'none';
        }

        // Email domain check
        if (!email.value.endsWith('@byui.edu')) {
            isValid = false;
            alert('Please use a valid byui.edu email address.');
            email.focus();
        }

        // Check HTML5 validation (pattern, required, etc.)
        if (!form.checkValidity()) {
            isValid = false;
        }

        // Prevent submission if any validation fails
        if (!isValid) {
            e.preventDefault();
        }
    });
});