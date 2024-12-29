document.addEventListener('DOMContentLoaded', function() {
    const greetingMessage = document.getElementById('greeting-message');
    const user = JSON.parse(localStorage.getItem('user'));

    function updateGreeting() {
        const now = new Date();
        const hours = now.getHours();
        let greeting = 'Hello';
        if (hours < 12) {
            greeting = 'Good Morning';
        } else if (hours < 18) {
            greeting = 'Good Afternoon';
        } else if (hours < 21) {
            greeting = 'Good Evening';
        } else {
            greeting = 'Good Night';
        }
        const options = { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', timeZone: 'Asia/Jakarta' };
        const formattedDate = now.toLocaleDateString('id-ID', options);
        if (user) {
            greetingMessage.textContent = `Hello, ${user.username}! ${greeting}! ${formattedDate}`;
        } else {
            greetingMessage.textContent = `${greeting}! ${formattedDate}`;
        }
    }

    updateGreeting();
    setInterval(updateGreeting, 1000);
});