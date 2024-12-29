document.addEventListener('DOMContentLoaded', function() {
    const logoutNavLink = document.getElementById('logout-nav-link');
    if (!logoutNavLink) {
        console.error('Logout nav link not found!');
        return; // Hentikan eksekusi jika elemen tidak ditemukan
    }

    logoutNavLink.addEventListener('click', function() {
        localStorage.removeItem('user');
        window.location.href = 'index.html';
    });
});