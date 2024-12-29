document.addEventListener('DOMContentLoaded', function() {
    const user = JSON.parse(localStorage.getItem('user'));
    const registerNavLink = document.getElementById('register-nav-link');
    const profileNavLink = document.getElementById('profile-nav-link');
    const greetingMessage = document.getElementById('greeting-message');

    if (user) {
        registerNavLink.classList.add('d-none');
        profileNavLink.classList.remove('d-none');
        greetingMessage.textContent = `Hello, ${user.username}!`;
    }
});